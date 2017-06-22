let Magix = require('magix');
let Store = {
    extend(props) {
        let AppViews = {};
        let AppData = {};
        let SyncUI = (data) => {
            Magix.mix(AppData, data);
            let views = AppViews;
            for (let v in views) {
                let view = views[v];
                let updater = view.updater;
                if (updater) {
                    updater.digest(data);
                }
            }
        };
        let AppStore = Magix.Base.extend({
            ctor(updater) {
                let me = this;
                me.updater = updater;
            },
            dispatch(name) {
                let fn = AppStore[name];
                let isLoad = name == 'load';
                let me = this;
                if (fn) {
                    if (isLoad && AppStore.$lp) {
                        AppStore.$lp.then(() => {
                            me.digest();
                        });
                    } else {
                        let r = fn.apply(AppStore, [].slice.call(arguments, 1));
                        r.then((data) => {
                            SyncUI(data);
                        });
                        if (isLoad) {
                            AppStore.$lp = r;
                        }
                    }
                }
            },
            get(key) {
                return this.updater.get(key);
            },
            set(data) {
                this.updater.set(data);
                return this;
            },
            digest(data) {
                this.updater.digest(data);
                return this;
            }
        }, Magix.mix({
            get(key) {
                let data = AppData;
                if (key) {
                    data = data[key];
                }
                return data;
            }
        }, props));
        return {
            ctor() {
                let me = this;
                me.store = new AppStore(me.updater);
                let views = AppViews;
                views[me.id] = me;
                // let init = AppStore.init;
                // if (init) {
                //     let tData = init.apply(AppStore);
                //     Magix.mix(AppData, tData);
                //     delete AppStore.init;
                // }
                me.updater.set(AppData);
                me.on('destroy', () => {
                    delete views[me.id];
                });
            }
        };
    }
};
module.exports = Store;