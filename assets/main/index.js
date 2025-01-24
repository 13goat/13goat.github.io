System.register("chunks:///_virtual/AdClient.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, EventTarget;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }],
    execute: function () {
      cclegacy._RF.push({}, "913ddXSZoBEo5AGp798igBP", "AdClient", undefined);

      /**
       * AdClient
       * @zh
       * 所有广告类型的基类
       * @en
       * Base class for all ads.
       */
      var AdClient = exports('AdClient', /*#__PURE__*/function (_EventTarget) {
        _inheritsLoose(AdClient, _EventTarget);
        function AdClient() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _EventTarget.call.apply(_EventTarget, [this].concat(args)) || this;
          /**
           * @zh
           * 广告单元 Id
           * @en
           * The unit Id 
           */
          _this.unitId = void 0;
          return _this;
        }
        return AdClient;
      }(EventTarget));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AdListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f6d88RBS9tPzIA7DyZtLjZT", "AdListener", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * AdListener
       * @zh
       * 广告监听器，和原生的 AdListener 方法保持一致
       * @en
       * The ad listener, has same methods as the AdListener in the native.
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AppOpenAdClient.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Bridge.ts', './Route.ts', './AppOpenAd.ts', './AdClient.ts', './PaidEventNTF.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, js, log, bridge, route, LoadAppOpenAdREQ, LoadAppOpenAdACK, IsAdAvailableREQ, IsAdAvailableACK, ShowAppOpenAdREQ, ShowAppOpenAdACK, AppOpenAdLoadCallbackNTF, AppOpenAdFullScreenContentCallbackNTF, ShowAppOpenAdCompleteNTF, AdClient, AppOpenPaidEventNTF;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      js = module.js;
      log = module.log;
    }, function (module) {
      bridge = module.bridge;
    }, function (module) {
      route = module.route;
    }, function (module) {
      LoadAppOpenAdREQ = module.LoadAppOpenAdREQ;
      LoadAppOpenAdACK = module.LoadAppOpenAdACK;
      IsAdAvailableREQ = module.IsAdAvailableREQ;
      IsAdAvailableACK = module.IsAdAvailableACK;
      ShowAppOpenAdREQ = module.ShowAppOpenAdREQ;
      ShowAppOpenAdACK = module.ShowAppOpenAdACK;
      AppOpenAdLoadCallbackNTF = module.AppOpenAdLoadCallbackNTF;
      AppOpenAdFullScreenContentCallbackNTF = module.AppOpenAdFullScreenContentCallbackNTF;
      ShowAppOpenAdCompleteNTF = module.ShowAppOpenAdCompleteNTF;
    }, function (module) {
      AdClient = module.AdClient;
    }, function (module) {
      AppOpenPaidEventNTF = module.AppOpenPaidEventNTF;
    }],
    execute: function () {
      cclegacy._RF.push({}, "de391JGZ7RFmILooPgf1Zbb", "AppOpenAdClient", undefined);

      /**
       * @zh
       * 开屏广告的 TS 端实现
       * @en
       * Implementing of app open ad.
       */
      var module$1 = "[AppOpenAdClient]";
      var AppOpenAdClient = exports('AppOpenAdClient', /*#__PURE__*/function (_AdClient) {
        _inheritsLoose(AppOpenAdClient, _AdClient);
        function AppOpenAdClient() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _AdClient.call.apply(_AdClient, [this].concat(args)) || this;
          /**
           * @zh
           * 开屏广告的事件接收器，多个类型的联合
           * @en
           * The listener of app open ad.
           */
          _this._appOpenAdListener = void 0;
          return _this;
        }
        var _proto = AppOpenAdClient.prototype;
        /**
         * @zh
         * 加载开屏广告
         * @en
         * load app open ad.
         * @param unitId 
         *  @zh 开屏广告的单元 Id
         *  @en the unit id of app open ad
         * @param appOpenAdListener 
         *  @zh 开屏广告监听器
         *  @en listener for app open ad
         */
        _proto.loadAd = function loadAd(unitId, appOpenAdListener) {
          this.appOpenAdListener = appOpenAdListener;
          this.unitId = unitId;
          bridge.sendToNative(js.getClassName(LoadAppOpenAdREQ), {
            unitId: unitId
          }, js.getClassName(LoadAppOpenAdACK), function (ack) {}, this);
        }

        /**
         * @zh
         * 开屏广告是否有效
         * 要从回调中去判断是否有效，在安卓上，消息是来自其他线程的，因此是异步的。
         * @en
         * whether the app open ad is valid.
         * @param onComplete 
         * @param thisArg 
         */;
        _proto.isValid = function isValid(onComplete, thisArg) {
          bridge.sendToNative(js.getClassName(IsAdAvailableREQ), {
            unitId: this.unitId
          }, js.getClassName(IsAdAvailableACK), function (ack) {
            log(module$1, "isValid", ack.valid);
            if (onComplete && thisArg) {
              onComplete.call(thisArg, ack.valid);
            }
          });
        }

        /**
         * @zh
         *  显示开屏广告
         * @en
         *  Show app open ad.
         * @param onComplete 
         *  @zh 展示结束
         *  @en whether the show process is complete
         */;
        _proto.show = function show(onComplete) {
          bridge.sendToNative(js.getClassName(ShowAppOpenAdREQ), {
            unitId: this.unitId
          }, js.getClassName(ShowAppOpenAdACK), function (ack) {
            log(module$1, "showAdIfAvailable", ack);
            if (onComplete) {
              onComplete();
            }
          });
        }

        /**
         * @zh
         * 销毁开屏广告
         * 安卓中没有手动销毁的方法，这里的销毁是事件回调
         * @en
         * Destroy the app open ad
         * Note that there is no 'destroy' method on the app open ad.
         * Simply deregister all callbacks.
         */;
        _proto.destroy = function destroy() {
          this.appOpenAdListener = null;
        };
        _proto.onAppOpenAdLoadCallbackNTF = function onAppOpenAdLoadCallbackNTF(ntf) {
          if (this.appOpenAdListener) {
            var method = this.appOpenAdListener[ntf.method];
            if (method) {
              method(ntf.loadAdError);
            }
          }
        };
        _proto.onFullScreenContentCallbackNTF = function onFullScreenContentCallbackNTF(ntf) {
          if (ntf && ntf.method && this.appOpenAdListener) {
            var method = this.appOpenAdListener[ntf.method];
            if (method) {
              method(ntf.adError);
            }
          }
        };
        _proto.onShowCompleteNTF = function onShowCompleteNTF(ntf) {
          var c = this.appOpenAdListener;
          if (c && c.onShowAdComplete) {
            c.onShowAdComplete(ntf.unitId);
          }
        };
        _proto.onPaidEvent = function onPaidEvent(ntf) {
          var listener = this.appOpenAdListener;
          if (listener && listener.onPaidEvent) {
            listener.onPaidEvent(ntf);
          }
        };
        _createClass(AppOpenAdClient, [{
          key: "appOpenAdListener",
          get:
          /**
           * @zh
           * 开屏广告的事件接收器，多个类型的联合
           * @en
           * The listener of app open ad.
           */
          function get() {
            return this._appOpenAdListener;
          },
          set:
          /**
           * @zh
           * 开屏广告的事件接收器，多个类型的联合
           * @en
           * The listener of app open ad.
           */
          function set(value) {
            if (this._appOpenAdListener) {
              route.off(js.getClassName(AppOpenAdLoadCallbackNTF), this.onAppOpenAdLoadCallbackNTF, this);
              route.off(js.getClassName(AppOpenPaidEventNTF), this.onPaidEvent, this);
              route.off(js.getClassName(AppOpenAdFullScreenContentCallbackNTF), this.onFullScreenContentCallbackNTF, this);
              route.off(js.getClassName(ShowAppOpenAdCompleteNTF), this.onShowCompleteNTF, this);
            }
            this._appOpenAdListener = value;
            if (value) {
              route.on(js.getClassName(AppOpenAdLoadCallbackNTF), this.onAppOpenAdLoadCallbackNTF, this);
              route.on(js.getClassName(AppOpenPaidEventNTF), this.onPaidEvent, this);
              route.on(js.getClassName(AppOpenAdFullScreenContentCallbackNTF), this.onFullScreenContentCallbackNTF, this);
              route.on(js.getClassName(ShowAppOpenAdCompleteNTF), this.onShowCompleteNTF, this);
            }
          }
        }]);
        return AppOpenAdClient;
      }(AdClient));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AppOpenAdFullScreenContentCallback.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a57d6Vr4nlN9pl61y73AbVj", "AppOpenAdFullScreenContentCallback", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @en
       * FullScreenContentCallback 的别名，供开屏广告使用
       * @en
       * Alias for FullScreenContentCallback, only work with App Open Ad.
       * 
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AppOpenAdListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "515ea1S85lFFpJR2p7bWBrP", "AppOpenAdListener", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @zh
       * 开屏广告的监听器的联合类型
       * @en
       * Union of listeners for App Open Ad.
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AppOpenAdLoadCallback.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "22adflecGJOkqbjch9VPNzC", "AppOpenAdLoadCallback", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * AppOpenAdLoadCallback
       * @zh
       * 加载开屏广告的监听回调
       * @en
       * Callback to load App Open Ad.
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AppOpenAd.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Base.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Base;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      Base = module.Base;
    }],
    execute: function () {
      var _dec, _class, _dec2, _class2, _dec3, _class3, _dec4, _class4, _dec5, _class5, _dec6, _class6, _dec7, _class8, _dec8, _class10, _dec9, _class11;
      cclegacy._RF.push({}, "1b2e4BJmARLoYFp0UFuCx/t", "AppOpenAd", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var LoadAppOpenAdREQ = exports('LoadAppOpenAdREQ', (_dec = ccclass("LoadAppOpenAdREQ"), _dec(_class = /*#__PURE__*/function (_Base) {
        _inheritsLoose(LoadAppOpenAdREQ, _Base);
        function LoadAppOpenAdREQ() {
          return _Base.apply(this, arguments) || this;
        }
        return LoadAppOpenAdREQ;
      }(Base)) || _class));
      var LoadAppOpenAdACK = exports('LoadAppOpenAdACK', (_dec2 = ccclass("LoadAppOpenAdACK"), _dec2(_class2 = /*#__PURE__*/function (_Base2) {
        _inheritsLoose(LoadAppOpenAdACK, _Base2);
        function LoadAppOpenAdACK() {
          return _Base2.apply(this, arguments) || this;
        }
        return LoadAppOpenAdACK;
      }(Base)) || _class2));
      var ShowAppOpenAdREQ = exports('ShowAppOpenAdREQ', (_dec3 = ccclass("ShowAppOpenAdREQ"), _dec3(_class3 = /*#__PURE__*/function (_Base3) {
        _inheritsLoose(ShowAppOpenAdREQ, _Base3);
        function ShowAppOpenAdREQ() {
          return _Base3.apply(this, arguments) || this;
        }
        return ShowAppOpenAdREQ;
      }(Base)) || _class3));
      var ShowAppOpenAdACK = exports('ShowAppOpenAdACK', (_dec4 = ccclass("ShowAppOpenAdACK"), _dec4(_class4 = /*#__PURE__*/function (_Base4) {
        _inheritsLoose(ShowAppOpenAdACK, _Base4);
        function ShowAppOpenAdACK() {
          return _Base4.apply(this, arguments) || this;
        }
        return ShowAppOpenAdACK;
      }(Base)) || _class4));
      var ShowAppOpenAdCompleteNTF = exports('ShowAppOpenAdCompleteNTF', (_dec5 = ccclass("ShowAppOpenAdCompleteNTF"), _dec5(_class5 = /*#__PURE__*/function (_Base5) {
        _inheritsLoose(ShowAppOpenAdCompleteNTF, _Base5);
        function ShowAppOpenAdCompleteNTF() {
          return _Base5.apply(this, arguments) || this;
        }
        return ShowAppOpenAdCompleteNTF;
      }(Base)) || _class5));
      var AppOpenAdFullScreenContentCallbackNTF = exports('AppOpenAdFullScreenContentCallbackNTF', (_dec6 = ccclass("AppOpenAdFullScreenContentCallbackNTF"), _dec6(_class6 = /*#__PURE__*/function (_Base6) {
        _inheritsLoose(AppOpenAdFullScreenContentCallbackNTF, _Base6);
        function AppOpenAdFullScreenContentCallbackNTF() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Base6.call.apply(_Base6, [this].concat(args)) || this;
          _this.method = void 0;
          _this.adError = void 0;
          return _this;
        }
        return AppOpenAdFullScreenContentCallbackNTF;
      }(Base)) || _class6));
      var AppOpenAdLoadCallbackNTF = exports('AppOpenAdLoadCallbackNTF', (_dec7 = ccclass("AppOpenAdLoadCallbackNTF"), _dec7(_class8 = /*#__PURE__*/function (_Base7) {
        _inheritsLoose(AppOpenAdLoadCallbackNTF, _Base7);
        function AppOpenAdLoadCallbackNTF() {
          var _this2;
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          _this2 = _Base7.call.apply(_Base7, [this].concat(args)) || this;
          _this2.method = void 0;
          _this2.loadAdError = void 0;
          return _this2;
        }
        return AppOpenAdLoadCallbackNTF;
      }(Base)) || _class8));
      var IsAdAvailableREQ = exports('IsAdAvailableREQ', (_dec8 = ccclass("IsAdAvailableREQ"), _dec8(_class10 = /*#__PURE__*/function (_Base8) {
        _inheritsLoose(IsAdAvailableREQ, _Base8);
        function IsAdAvailableREQ() {
          return _Base8.apply(this, arguments) || this;
        }
        return IsAdAvailableREQ;
      }(Base)) || _class10));
      var IsAdAvailableACK = exports('IsAdAvailableACK', (_dec9 = ccclass("IsAdAvailableACK"), _dec9(_class11 = /*#__PURE__*/function (_Base9) {
        _inheritsLoose(IsAdAvailableACK, _Base9);
        function IsAdAvailableACK() {
          var _this3;
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }
          _this3 = _Base9.call.apply(_Base9, [this].concat(args)) || this;
          _this3.valid = false;
          return _this3;
        }
        return IsAdAvailableACK;
      }(Base)) || _class11));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/backgroundManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "a758aH29adLi70RI3S0cG61", "backgroundManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var backgroundManager = exports('backgroundManager', (_dec = ccclass('backgroundManager'), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(backgroundManager, _Component);
        function backgroundManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "background", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = backgroundManager.prototype;
        _proto.start = function start() {};
        return backgroundManager;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "background", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BannerAdListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "94014wU+XZGi4mP2AihKg4J", "BannerAdListener", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @zh
       * 横幅广告的监听器联合类型
       * @en
       * Union of all banner listeners
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BannerAd.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Base.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Base;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      Base = module.Base;
    }],
    execute: function () {
      var _dec, _class, _dec2, _class3, _dec3, _class4, _dec4, _class6, _dec5, _class8, _dec6, _class9, _dec7, _class10;
      cclegacy._RF.push({}, "a3850FFnhpK8LXjWJ/XukPq", "BannerAd", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var LoadBannerREQ = exports('LoadBannerREQ', (_dec = ccclass("LoadBannerREQ"), _dec(_class = /*#__PURE__*/function (_Base) {
        _inheritsLoose(LoadBannerREQ, _Base);
        function LoadBannerREQ() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Base.call.apply(_Base, [this].concat(args)) || this;
          _this.bannerSizeType = void 0;
          _this.bannerSize = void 0;
          _this.alignments = void 0;
          return _this;
        }
        return LoadBannerREQ;
      }(Base)) || _class));
      var LoadBannerACK = exports('LoadBannerACK', (_dec2 = ccclass("LoadBannerACK"), _dec2(_class3 = /*#__PURE__*/function (_Base2) {
        _inheritsLoose(LoadBannerACK, _Base2);
        function LoadBannerACK() {
          return _Base2.apply(this, arguments) || this;
        }
        return LoadBannerACK;
      }(Base)) || _class3));
      var ShowBannerREQ = exports('ShowBannerREQ', (_dec3 = ccclass("ShowBannerREQ"), _dec3(_class4 = /*#__PURE__*/function (_Base3) {
        _inheritsLoose(ShowBannerREQ, _Base3);
        function ShowBannerREQ() {
          var _this2;
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          _this2 = _Base3.call.apply(_Base3, [this].concat(args)) || this;
          _this2.visible = void 0;
          return _this2;
        }
        return ShowBannerREQ;
      }(Base)) || _class4));
      var ShowBannerACK = exports('ShowBannerACK', (_dec4 = ccclass("ShowBannerACK"), _dec4(_class6 = /*#__PURE__*/function (_Base4) {
        _inheritsLoose(ShowBannerACK, _Base4);
        function ShowBannerACK() {
          var _this3;
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }
          _this3 = _Base4.call.apply(_Base4, [this].concat(args)) || this;
          _this3.visible = void 0;
          return _this3;
        }
        return ShowBannerACK;
      }(Base)) || _class6));
      var DestroyBannerREQ = exports('DestroyBannerREQ', (_dec5 = ccclass("DestroyBannerREQ"), _dec5(_class8 = /*#__PURE__*/function (_Base5) {
        _inheritsLoose(DestroyBannerREQ, _Base5);
        function DestroyBannerREQ() {
          return _Base5.apply(this, arguments) || this;
        }
        return DestroyBannerREQ;
      }(Base)) || _class8));
      var DestroyBannerACK = exports('DestroyBannerACK', (_dec6 = ccclass("DestroyBannerACK"), _dec6(_class9 = /*#__PURE__*/function (_Base6) {
        _inheritsLoose(DestroyBannerACK, _Base6);
        function DestroyBannerACK() {
          return _Base6.apply(this, arguments) || this;
        }
        return DestroyBannerACK;
      }(Base)) || _class9));
      var BannerAdListenerNTF = exports('BannerAdListenerNTF', (_dec7 = ccclass("BannerAdListenerNTF"), _dec7(_class10 = /*#__PURE__*/function (_Base7) {
        _inheritsLoose(BannerAdListenerNTF, _Base7);
        function BannerAdListenerNTF() {
          var _this4;
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }
          _this4 = _Base7.call.apply(_Base7, [this].concat(args)) || this;
          _this4.method = void 0;
          _this4.loadAdError = void 0;
          return _this4;
        }
        return BannerAdListenerNTF;
      }(Base)) || _class10));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BannerAlignment.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "22c7dg+reFL/bvh46PA4/ED", "BannerAlignment", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
        https://www.cocos.com/
        Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
        The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */

      /**
       * @en
       * Defines the RelativeLayout of Android in Typescript. 
       * See RelativeLayout.java for more details. 
       */
      var BannerAlignment = exports('BannerAlignment', /*#__PURE__*/function (BannerAlignment) {
        BannerAlignment["ALIGN_LEFT"] = "ALIGN_LEFT";
        BannerAlignment["ALIGN_TOP"] = "ALIGN_TOP";
        BannerAlignment["ALIGN_RIGHT"] = "ALIGN_RIGHT";
        BannerAlignment["ALIGN_BOTTOM"] = "ALIGN_BOTTOM";
        BannerAlignment["CENTER_HORIZONTAL"] = "CENTER_HORIZONTAL";
        BannerAlignment["CENTER_VERTICAL"] = "CENTER_VERTICAL";
        BannerAlignment["ALIGN_PARENT_BOTTOM"] = "ALIGN_PARENT_BOTTOM";
        return BannerAlignment;
      }({}));

      /**
       * @en
       * Put the banner at bottom-center of the screen
       */
      var BottomCenter = exports('BottomCenter', [BannerAlignment.ALIGN_PARENT_BOTTOM, BannerAlignment.CENTER_HORIZONTAL]);

      /**
       * @en
       * Put the banner at the top-center of the screen.
       */
      var TopCenter = exports('TopCenter', [BannerAlignment.ALIGN_TOP, BannerAlignment.CENTER_HORIZONTAL]);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BannerClient.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AdClient.ts', './BannerAd.ts', './Bridge.ts', './Route.ts', './BannerSize.ts', './BannerAlignment.ts', './PaidEventNTF.ts', './BannerSizeType.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, js, log, AdClient, ShowBannerREQ, LoadBannerREQ, LoadBannerACK, DestroyBannerREQ, DestroyBannerACK, BannerAdListenerNTF, bridge, route, BannerSize, BottomCenter, BannerPaidEventNTF, BannerSizeType;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      js = module.js;
      log = module.log;
    }, function (module) {
      AdClient = module.AdClient;
    }, function (module) {
      ShowBannerREQ = module.ShowBannerREQ;
      LoadBannerREQ = module.LoadBannerREQ;
      LoadBannerACK = module.LoadBannerACK;
      DestroyBannerREQ = module.DestroyBannerREQ;
      DestroyBannerACK = module.DestroyBannerACK;
      BannerAdListenerNTF = module.BannerAdListenerNTF;
    }, function (module) {
      bridge = module.bridge;
    }, function (module) {
      route = module.route;
    }, function (module) {
      BannerSize = module.BannerSize;
    }, function (module) {
      BottomCenter = module.BottomCenter;
    }, function (module) {
      BannerPaidEventNTF = module.BannerPaidEventNTF;
    }, function (module) {
      BannerSizeType = module.BannerSizeType;
    }],
    execute: function () {
      cclegacy._RF.push({}, "67876+xkzJIO6gfVziSiyV8", "BannerClient", undefined);

      /**
       * @zh
       * 横幅的客户端
       * @en
       * TS client for Banner ad.
       */
      var module$1 = "[BannerClient]";
      var BannerClient = exports('BannerClient', /*#__PURE__*/function (_AdClient) {
        _inheritsLoose(BannerClient, _AdClient);
        function BannerClient() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _AdClient.call.apply(_AdClient, [this].concat(args)) || this;
          /**
           * @zh
           * Banner 的事件监听器，由多种监听器联合
           * @en
           * Union of all banner events listener
           */
          _this._adListener = null;
          return _this;
        }
        var _proto = BannerClient.prototype;
        /**
         * @zh
         * 展示横幅
         * @en
         * Show banner 
         * @param visible 
         *  @zh 横幅的可见性
         *  @en Visibility of the banner
         */
        _proto.show = function show(visible) {
          var req = new ShowBannerREQ(this.unitId);
          req.visible = visible;
          bridge.sendToNative(js.getClassName(ShowBannerREQ), req);
        }

        /**
         * @zh
         * 加载横幅
         * 加载后会自动展示
         * @en
         * Load the banner 
         * The banner will be visible automatically
         * @param unitId 
         * @param adListener 
         * @param opt 
         */;
        _proto.load = function load(unitId, adListener, opt) {
          this.adListener = adListener;
          this.unitId = unitId;
          bridge.sendToNative(js.getClassName(LoadBannerREQ), {
            unitId: unitId,
            bannerSize: opt != null && opt.size ? opt == null ? void 0 : opt.size : BannerSize.BANNER,
            alignments: opt != null && opt.alignments ? opt == null ? void 0 : opt.alignments : BottomCenter,
            bannerSizeType: opt != null && opt.type ? opt == null ? void 0 : opt.type : BannerSizeType.Builtin
          }, js.getClassName(LoadBannerACK), function (response) {}, this);
        }

        /**
         * @zh
         * 销毁横幅广告
         * @en
         * Destroy the banner id
         */;
        _proto.destroy = function destroy() {
          log(module$1, "destroy", this.unitId);
          var req = new DestroyBannerREQ(this.unitId);
          this.adListener = null;
          bridge.sendToNative(js.getClassName(DestroyBannerREQ), req, js.getClassName(DestroyBannerACK), function (response) {});
        };
        _proto.onAdListenerEvent = function onAdListenerEvent(ntf) {
          if (this.adListener) {
            var method = this.adListener[ntf.method];
            if (method && typeof method == "function") {
              method(ntf.loadAdError);
            }
          }
        };
        _proto.onPaidEvent = function onPaidEvent(ntf) {
          var listener = this.adListener;
          if (listener && listener.onPaidEvent) {
            listener.onPaidEvent(ntf);
          }
        };
        _createClass(BannerClient, [{
          key: "adListener",
          get:
          /**
           * @zh
           * Banner 的事件监听器，由多种监听器联合
           * @en
           * Union of all banner events listener
           */
          function get() {
            return this._adListener;
          }

          /**
           * @zh
           * Banner 的事件监听器，由多种监听器联合
           * @en
           * Union of all banner events listener
           */,
          set: function set(v) {
            if (this._adListener) {
              route.off(js.getClassName(BannerAdListenerNTF), this.onAdListenerEvent, this);
              route.off(js.getClassName(BannerPaidEventNTF), this.onPaidEvent, this);
            }
            this._adListener = v;
            if (this._adListener) {
              route.on(js.getClassName(BannerAdListenerNTF), this.onAdListenerEvent, this);
              route.on(js.getClassName(BannerPaidEventNTF), this.onPaidEvent, this);
            }
          }
        }]);
        return BannerClient;
      }(AdClient));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BannerSizeOption.ts", ['cc', './BannerAlignment.ts', './BannerSize.ts', './BannerSizeType.ts'], function (exports) {
  var cclegacy, BottomCenter, BannerSize, BannerSizeType;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BottomCenter = module.BottomCenter;
    }, function (module) {
      BannerSize = module.BannerSize;
    }, function (module) {
      BannerSizeType = module.BannerSizeType;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5616bT5rtJEcY/73XVD9E9f", "BannerSizeOption", undefined);

      /**
       * @cn
       * banner size 的创建选项
       * 如果 type 为  BannerSizeType.Builtin，则会使用 size 属性来创建banner， 否则走自适应创建banner。
       * 详情参考： https://developers.google.com/admob/android/banner/anchored-adaptive
       * @en
       * options of the banner size.
       * if the type attribute equals to BannerSizeType.Builtin, the size attribute will be used to create the banner.
       * Otherwise if the type equals to BannerSizeType.AnchoredAdaptive, an Anchored adaptive banner will be created.
       * For more details, please refer to https://developers.google.com/admob/android/banner/anchored-adaptive
       */
      var BannerSizeOption = exports('BannerSizeOption', function BannerSizeOption() {
        /**
         * @zh
         * banner size 的类型
         * @en
         * type of the banner size
         */
        this.type = BannerSizeType.Builtin;
        /**
         * @zh
         * 谷歌 Admob 库内预定义的 AdSize， 中转定义在 {BannerSizeType} 类中
         * @en
         * a serial of builtin banner size define in google admob.
         */
        this.size = BannerSize.BANNER;
        /**
         * @zh
         * 预定义少量可用的对齐用于创建 banner 的容器
         * @en
         * Predefined alignments for the container of the banner ad.
         */
        this.alignments = BottomCenter;
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BannerSize.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e3b6eOKvZVEtZgTOUkZOxTU", "BannerSize", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
        https://www.cocos.com/
        Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
        The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */

      /**
       * @en
       * Builtin BannerSize 
       * See https://developers.google.com/admob/android/banner?hl=zh-cn#banner_sizes for more details.
       * @zh
       * 内置的 Banner 的大小
       * 查看 https://developers.google.com/admob/android/banner?hl=zh-cn#banner_sizes 获取更多细节。、
       */
      var BannerSize = exports('BannerSize', /*#__PURE__*/function (BannerSize) {
        BannerSize["BANNER"] = "BANNER";
        BannerSize["LARGE_BANNER"] = "LARGE_BANNER";
        BannerSize["MEDIUM_RECTANGLE"] = "MEDIUM_RECTANGLE";
        BannerSize["FULL_BANNER"] = "FULL_BANNER";
        BannerSize["LEADERBOARD"] = "LEADERBOARD";
        BannerSize["SMART_BANNER"] = "SMART_BANNER";
        return BannerSize;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BannerSizeType.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "79ab0Av5oNO2r9VQTvixCOn", "BannerSizeType", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
        https://www.cocos.com/
        Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
        The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */

      /**
       * @zh
       * Banner 的大小类型 
       * @en
       * Banner Size Type 
       */
      var BannerSizeType = exports('BannerSizeType', /*#__PURE__*/function (BannerSizeType) {
        BannerSizeType["Builtin"] = "Builtin";
        BannerSizeType["Landscape"] = "Landscape";
        BannerSizeType["Portrait"] = "Portrait";
        BannerSizeType["Current"] = "Current";
        return BannerSizeType;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/base64.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7316bsXb+BNDb8Dd46pakRs", "base64", undefined);
      var base64 = exports('base64', /*#__PURE__*/function () {
        function base64() {}
        base64.encode = function encode(str) {
          // first we use encodeURIComponent to get percent-encoded UTF-8,
          // then we convert the percent encodings into raw bytes which
          // can be fed into btoa.
          return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
          // function toSolidBytes(match, p1) {
          function (match, p1) {
            // console.debug('match: ' + match);
            return String.fromCharCode("0x" + p1);
          }));
        };
        base64.decode = function decode(str) {
          // Going backwards: from bytestream, to percent-encoding, to original string.
          return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
        };
        return base64;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Base.ts", ['cc'], function (exports) {
  var cclegacy, _decorator;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "83981cFerZAEJC1MboCagJY", "Base", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Base = exports('Base', (_dec = ccclass("Base"), _dec(_class = function Base(unitId) {
        this.unitId = unitId;
      }) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BearPart.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      // import { _decorator, Collider2D, Color, Component, Contact2DType, EventMouse, EventTouch, find, input, Input, instantiate, IPhysics2DContact, Node, PhysicsSystem2D, PolygonCollider2D, RigidBody2D, Sprite, Vec3 } from 'cc';
      cclegacy._RF.push({}, "f4dc83V4gZE/IOrhWSM8UCi", "BearPart", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Bear.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      // import { _decorator, Collider2D, Color, Component, Node, RigidBody2D, Sprite, SpriteFrame, SpriteRenderer } from 'cc';
      cclegacy._RF.push({}, "ba98dr576xIGK4bmckgpFeg", "Bear", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoxManager.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      // import { _decorator, Button, Color, Component, instantiate, Node, EventHandler, Vec3 } from 'cc';
      cclegacy._RF.push({}, "59b71PE2QdI/Z6t/rmiZ6KT", "BoxManager", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoxModel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ce50f+7gWdADLY28j5htR+S", "BoxModel", undefined);
      var BoxModel = exports('BoxModel', /*#__PURE__*/function () {
        function BoxModel(characterCollected, characterPackId, serieNode) {
          this._characterCollected = [];
          this._characterPackId = [];
          this._serieView = void 0;
          this._characterCollected = characterCollected;
          this._characterPackId = characterPackId;
          this._serieView = serieNode;
        }
        _createClass(BoxModel, [{
          key: "characterCollected",
          get: function get() {
            return this._characterCollected;
          },
          set: function set(value) {
            this._characterCollected = value;
          }
        }, {
          key: "characterPackId",
          get: function get() {
            return this._characterPackId;
          },
          set: function set(value) {
            this._characterPackId = value;
          }
        }, {
          key: "serieView",
          get: function get() {
            return this._serieView;
          }
        }]);
        return BoxModel;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoxUtil.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, instantiate, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      instantiate = module.instantiate;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "6ee69HI6+5AuZGVcfFvk13g", "BoxUtil", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BoxUtil = exports('BoxUtil', (_dec = ccclass('BoxUtil'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BoxUtil, _Component);
        function BoxUtil() {
          return _Component.apply(this, arguments) || this;
        }
        BoxUtil.instantiatedBox = function instantiatedBox(prefab, parent, scale) {
          var box = instantiate(prefab);
          box.parent = parent;
          box.scale = scale;
          return box;
        };
        BoxUtil.convertIdToIndex = function convertIdToIndex(bearId) {
          var index = 0;
          switch (bearId) {
            case "A":
              {
                index = 0;
              }
              break;
            case "B":
              {
                index = 1;
              }
              break;
            case "C":
              {
                index = 2;
              }
              break;
            case "D":
              {
                index = 3;
              }
              break;
            case "E":
              {
                index = 4;
              }
              break;
            case "F":
              {
                index = 5;
              }
              break;
            case "G":
              {
                index = 6;
              }
              break;
          }

          // console.log(`Bear ID : ${bearId} == ${index}`);
          return index;
        };
        BoxUtil.convertIndexToId = function convertIndexToId(bearIndex) {
          var id = "";
          switch (bearIndex) {
            case 0:
              {
                id = "A";
              }
              break;
            case 1:
              {
                id = "B";
              }
              break;
            case 2:
              {
                id = "C";
              }
              break;
            case 3:
              {
                id = "D";
              }
              break;
            case 4:
              {
                id = "E";
              }
              break;
            case 5:
              {
                id = "F";
              }
              break;
            case 6:
              {
                id = "G";
              }
              break;
          }

          // console.log(`Bear Index : ${bearIndex} == ${id}`);
          return id;
        };
        return BoxUtil;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoxViewModel.ts", ['cc', './GameManager.ts', './BoxModel.ts', './CharacterStatus.ts', './BoxUtil.ts', './CharacterComponent.ts', './SharedService.ts', './GameStatus.ts', './CharacterUtil.ts'], function (exports) {
  var cclegacy, _decorator, Enum, sp, Vec3, GameManager, BoxModel, CharacterStatus, BoxUtil, CharacterComponent, SharedService, GameStatus, CharacterUtil;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Enum = module.Enum;
      sp = module.sp;
      Vec3 = module.Vec3;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      BoxModel = module.BoxModel;
    }, function (module) {
      CharacterStatus = module.CharacterStatus;
    }, function (module) {
      BoxUtil = module.BoxUtil;
    }, function (module) {
      CharacterComponent = module.CharacterComponent;
    }, function (module) {
      SharedService = module.SharedService;
    }, function (module) {
      GameStatus = module.GameStatus;
    }, function (module) {
      CharacterUtil = module.CharacterUtil;
    }],
    execute: function () {
      cclegacy._RF.push({}, "844582IyWNK4JoYNzqRfExO", "BoxViewModel", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BoxOpenState = exports('BoxOpenState', /*#__PURE__*/function (BoxOpenState) {
        BoxOpenState["Close"] = "Close";
        BoxOpenState["Peeling"] = "Peeling";
        BoxOpenState["Peeled"] = "Peeled";
        BoxOpenState["Opening"] = "Opening";
        BoxOpenState["Opened"] = "Opened";
        BoxOpenState["Selection"] = "Selection";
        return BoxOpenState;
      }({}));
      Enum(BoxOpenState);
      var BoxViewModel = exports('BoxViewModel', /*#__PURE__*/function () {
        function BoxViewModel(view) {
          this._model = void 0;
          this._view = void 0;
          this._boxOpenStatus = BoxOpenState.Close;
          this._fixTimeDelay = 150;
          this._defautCharacterScale = new Vec3(0.001, 0.001, 0.001);
          this._view = view;
          var serieRePository = GameManager.instance.serieRepository;
          this._model = new BoxModel(serieRePository.loadCurrentCharacterCollectedSerie(GameManager.instance.currentSerieId), serieRePository.loadCharacterPackIdPlayingSerie(), serieRePository.currentSerieView);
        }
        var _proto = BoxViewModel.prototype;
        _proto.changeBG = function changeBG(bgSprite) {
          bgSprite.spriteFrame = this._model.serieView.background[0];
        }

        // เปิด 1 กล่อง ได้จะมี 1 ตำแหน่ง เปิด 6 กล่อง จะมี 6 ตำแหน่ง
        ;

        _proto.initializeBoxes = function initializeBoxes() {
          var _this = this;
          console.log("----- " + this._model.characterPackId);
          var isCharacterCollected = true;
          if (this._model.characterPackId.length === 1) {
            isCharacterCollected = CharacterUtil.checkCharacterCollected(this._model.characterPackId[0], this._model.characterCollected);
            console.log("Is a Character Collected : " + isCharacterCollected);
          } else {
            isCharacterCollected = this._checkAllCharacterCollected();
            console.log("Is All Character Collected : " + isCharacterCollected);
          }
          var boxPrefab = this._model.serieView.box;
          for (var index = 0; index < this._model.characterPackId.length; index++) {
            var characterIndex = BoxUtil.convertIdToIndex(this._model.characterPackId[index]);
            var characterPrefab = this._model.serieView.characters[characterIndex];
            this._view.boxes[index] = BoxUtil.instantiatedBox(boxPrefab, this._view.boxesPosition[index], this._getDefaultBoxScale());
            this._view.characters[index] = CharacterUtil.instantiateCharacter(characterPrefab, this._view.boxesPosition[index], this._defautCharacterScale);
            var characterId = this._model.characterPackId[index];
            var isCollected = CharacterUtil.checkCharacterCollected(characterId, this._model.characterCollected);
            this._view.characters[index].getComponent(CharacterComponent)[isCollected ? "onDefaultColor" : "onShadowColor"]();
          }
          var characterLength = this._model.characterPackId.length;
          this._view.setSpineEventListener(this._view.boxes[characterLength - 1].getComponent(sp.Skeleton), this._boxOpenStatus, function (status) {
            if (status == null) {
              status = _this._boxOpenStatus;
            } else {
              _this._boxOpenStatus = status;
            }
            if (status === BoxOpenState.Opened) {
              _this._getCoinFromCollectedCharacter();
              _this._boxOpenStatus = BoxOpenState.Selection;
              SharedService.instance.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.OPEN_BOX_FINISHED, _this._model.characterPackId, isCharacterCollected);
            }
          });
        };
        _proto.handleBoxTouch = function handleBoxTouch(boxId) {
          if (boxId === void 0) {
            boxId = -1;
          }
          console.log("Status Change to == " + this._boxOpenStatus);
          switch (this._boxOpenStatus) {
            case BoxOpenState.Close:
              {
                this._boxOpenStatus = BoxOpenState.Peeling;
                this._peelCover();
              }
              break;
            case BoxOpenState.Peeled:
              {
                this._boxOpenStatus = BoxOpenState.Opening;
                this._boxOpen();
                this._boxMoveToBottom(1);
                this._characterAppear(1);
              }
              break;
            case BoxOpenState.Selection:
              {
                this._checkGameState(boxId);
              }
              break;
          }
        };
        _proto._getCoinFromCollectedCharacter = function _getCoinFromCollectedCharacter() {
          var _this2 = this;
          var coin = 0;
          var collectedCharacters = this._model.characterCollected.filter(function (character) {
            return character.status === CharacterStatus.COLLECTED;
          });
          var _loop = function _loop(index) {
            if (collectedCharacters.find(function (collectedCharacter) {
              return collectedCharacter.id === _this2._model.characterPackId[index];
            })) {
              coin += 8;
            }
          };
          for (var index = 0; index < this._model.characterPackId.length; index++) {
            _loop(index);
          }
          GameManager.instance.userComponent.onCoinIncreased(coin);
        };
        _proto._checkAllCharacterCollected = function _checkAllCharacterCollected() {
          var isCharacterCollected = true;
          for (var index = 0; index < this._model.characterPackId.length; index++) {
            if (CharacterUtil.checkCharacterCollected(this._model.characterPackId[index], this._model.characterCollected)) {
              isCharacterCollected = false;
              break;
            }
          }
          return isCharacterCollected;
        };
        _proto._checkGameState = function _checkGameState(boxId) {
          var index = boxId == 0 ? boxId : boxId - 1;
          var characterId = this._model.characterPackId[index];
          console.log("Id is ", boxId);

          // if (this._checkCharacterCollected(characterId)) {
          //     SharedService.instance.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.START);
          // } else {
          SharedService.instance.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.GUESS_BEAR, characterId, this._view.characters[index]);
          // }
        };

        _proto._peelCover = function _peelCover() {
          var _this3 = this;
          // console.log(`PeelOff`);
          this._view.boxes.forEach(function (box, index) {
            setTimeout(function () {
              return _this3._view.playSpineAnimation(box, 'PeelOff', false);
            }, _this3._fixTimeDelay * index);
          });
        };
        _proto._boxOpen = function _boxOpen() {
          var _this4 = this;
          // console.log(`BoxOpen`);
          this._view.boxes.forEach(function (box, index) {
            setTimeout(function () {
              return _this4._view.playSpineAnimation(box, 'BoxOpen', false);
            }, _this4._fixTimeDelay * index);
          });
        };
        _proto._boxMoveToBottom = function _boxMoveToBottom(time) {
          var _this5 = this;
          if (time === void 0) {
            time = 1;
          }
          for (var index = 0; index < this._view.boxes.length; index++) {
            this._view.boxes.forEach(function (box) {
              _this5._view.moveBoxToPosition(box, new Vec3(0, box.position.y, 0), _this5._getNewBoxScale(), time);
            });
          }
        };
        _proto._characterAppear = function _characterAppear(time) {
          var _this6 = this;
          if (time === void 0) {
            time = 1;
          }
          this._view.characters.forEach(function (character, index) {
            character.setPosition(new Vec3(0, _this6._view.boxes[index].position.y + 100, 0));
            _this6._view.animateCharacterAppearance(character, _this6._getNewCharacterScale(), time);
          });
        };
        _proto._getDefaultBoxScale = function _getDefaultBoxScale() {
          if (this._model.characterPackId.length > 1) {
            return new Vec3(0.3, 0.3, 0.3);
          } else return new Vec3(0.5, 0.5, 0.5);
        };
        _proto._getNewBoxScale = function _getNewBoxScale() {
          if (this._model.characterPackId.length > 1) {
            return new Vec3(0.15, 0.15, 0.15);
          } else return new Vec3(0.3, 0.3, 0.3);
        };
        _proto._getNewCharacterScale = function _getNewCharacterScale() {
          if (this._model.characterPackId.length > 1) {
            return new Vec3(0.4, 0.4, 0.4);
          } else return new Vec3(0.7, 0.7, 0.7);
        };
        return BoxViewModel;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoxView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BoxViewModel.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, sp, Node, Sprite, tween, input, Input, Component, BoxViewModel, BoxOpenState;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sp = module.sp;
      Node = module.Node;
      Sprite = module.Sprite;
      tween = module.tween;
      input = module.input;
      Input = module.Input;
      Component = module.Component;
    }, function (module) {
      BoxViewModel = module.BoxViewModel;
      BoxOpenState = module.BoxOpenState;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "a98a1ogld5Depiz08bVTb72", "BoxView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var spine = sp.spine;
      var TrackEntry = spine.TrackEntry;
      var BoxView = exports('BoxView', (_dec = ccclass('BoxView'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Sprite), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BoxView, _Component);
        function BoxView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "boxTouchArea", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "boxesPosition", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bg", _descriptor3, _assertThisInitialized(_this));
          _this.boxes = [];
          _this.characters = [];
          _this._viewModel = void 0;
          return _this;
        }
        var _proto = BoxView.prototype;
        _proto.start = function start() {
          this._init();
          this._setInputActive(true);
        };
        _proto._init = function _init() {
          this._viewModel = new BoxViewModel(this.getComponent(BoxView));
          this._viewModel.initializeBoxes();
          this._viewModel.changeBG(this.bg);
          console.log("BoxArea name = " + this.boxTouchArea.name);
        };
        _proto.playSpineAnimation = function playSpineAnimation(node, animationName, loop) {
          var spine = node.getComponent(sp.Skeleton);
          if (spine) {
            spine.setAnimation(0, animationName, loop);
          }
        };
        _proto.moveBoxToPosition = function moveBoxToPosition(box, position, scale, duration) {
          tween(box).to(duration, {
            position: position,
            scale: scale
          }, {
            easing: 'cubicOut'
          }).start();
        };
        _proto.animateCharacterAppearance = function animateCharacterAppearance(character, scale, duration) {
          tween(character).delay(0.8).to(duration, {
            scale: scale
          }, {
            easing: 'cubicOut'
            // onComplete: () => {
            //     console.log(`Bear info : position - (${character.position}, scale - (${character.scale}))`);
            // }
          }).start();
        };
        _proto.setSpineEventListener = function setSpineEventListener(spine, status, callback) {
          spine.setCompleteListener(function (trackEntry) {
            var state;
            if (trackEntry.animation.name == "PeelOff") {
              state = BoxOpenState.Peeled;
            } else if (trackEntry.animation.name == "BoxOpen") {
              state = BoxOpenState.Opened;
            }
            callback(state);
          });
        };
        _proto._setInputActive = function _setInputActive(active) {
          var _this2 = this;
          if (active) {
            // For PC
            input.on(Input.EventType.MOUSE_UP, this._onMouseUp, this);
            // For Mobile
            this.boxesPosition.forEach(function (box) {
              box.on(Input.EventType.TOUCH_START, _this2._onTouchStart, _this2);
            });
          } else {
            // For PC
            input.off(Input.EventType.MOUSE_UP, this._onMouseUp, this);
            // For Mobile

            this.boxesPosition.forEach(function (box) {
              box.off(Input.EventType.TOUCH_START, _this2._onTouchStart, _this2);
            });
          }
        };
        _proto._onMouseUp = function _onMouseUp(event) {
          var target = event.target;
          console.log("Click +++ " + (target == null ? void 0 : target.name));
          if (event.getButton() === 0 && target != null && target.name.includes("BoxGroup")) {
            var id = parseInt(target.name.substring(8, 9));
            this._viewModel.handleBoxTouch(id);
          }
        };
        _proto._onTouchStart = function _onTouchStart(event) {
          var target = event.target;
          if (target != null && target.name.includes("BoxGroup")) {
            var id = parseInt(target.name.substring(8, 10));
            // console.log(`Click +++ name: ${target?.name}, Id: ${id}`);
            this._viewModel.handleBoxTouch(id); // Get Array id from name ${BoxGroup1} // Single Box open id = -1
          }
        };

        return BoxView;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "boxTouchArea", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "boxesPosition", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "bg", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Bridge.ts", ['cc', './Route.ts', './Version.ts', './Version2.ts'], function (exports) {
  var cclegacy, log, js, route, VersionREQ, ExtensionVersion;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
      js = module.js;
    }, function (module) {
      route = module.route;
    }, function (module) {
      VersionREQ = module.VersionREQ;
    }, function (module) {
      ExtensionVersion = module.ExtensionVersion;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9fa2b+aj71GBKZ5Ae4Zxwy/", "Bridge", undefined);

      /**
       * @zh
       * 桥接原生和 TS 
       * @en
       * Bridge connect native to ts
       */
      var module$1 = "[Bridge]";
      var Bridge = exports('Bridge', /*#__PURE__*/function () {
        function Bridge() {
          this.onNative = function (arg0, arg1) {
            log(module$1, "onNative method: " + arg0 + " | content: " + arg1);
            //te.instance.dispatch(arg0, Route.instance.codec.decode(arg1));            
            var ack = route.codec.decode(arg1);
            route.dispatch(arg0, ack);
          };
        }
        var _proto = Bridge.prototype;
        _proto.init = function init() {
          log(module$1, "init");
          this.overwriteCallback();
          var engineVersion = "cocos-" + ExtensionVersion;
          console.log(module$1, "init", "report engineVersion: " + engineVersion + ".");
          this.sendToNative(js.getClassName(VersionREQ), new VersionREQ('', engineVersion), null, null);
          return this;
        };
        _proto.destroy = function destroy() {
          log(module$1, "destroy");
        };
        _proto.overwriteCallback = function overwriteCallback() {
          log(module$1, "overwriteCallback");
        };
        _proto.sendToNative = function sendToNative(arg0, req, responseMethod, onResponse, thisArg) {
          log(module$1, "sendToNative", "method = " + arg0 + ", req.unitId = " + req.unitId);
          if (onResponse) {
            route.once(responseMethod, onResponse, thisArg);
          }
        };
        return Bridge;
      }());
      var bridge = exports('bridge', new Bridge().init());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CharacterChanceCalculator.ts", ['cc'], function (exports) {
  var cclegacy, js, _decorator, randomRangeInt;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      js = module.js;
      _decorator = module._decorator;
      randomRangeInt = module.randomRangeInt;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "0fc8ecAvmlAIImiMhWPHWNb", "CharacterChanceCalculator", undefined);
      var array = js.array;
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CharacterChanceCalculator = exports('CharacterChanceCalculator', (_dec = ccclass('CharacterChanceCalculator'), _dec(_class = /*#__PURE__*/function () {
        function CharacterChanceCalculator() {}
        var _proto = CharacterChanceCalculator.prototype;
        _proto.singleBoxOpen = function singleBoxOpen(pack) {
          var randomBox = randomRangeInt(0, pack.length);
          return pack[randomBox];
        }

        /*
        public boxRandomOpen(openType: "single" | "pack"): string {
              // ถ้าเปิดทีละกล่อง ต้องให้สร้างใหม่ตลอด
            // แต่ถ้าเปิดทีละ 6 กล่อง ให้สร้างใหม่ เฉพาะเปิดกล่องที่ 1
            let boxes: string[]
            let randomId: string = "";
              switch (openType) {
                case "single": {
                    boxes = this._createArrayOfRandomBoxID("single");
                    const randomIndex = randomRangeInt(0, boxes.length);
                    randomId = boxes[randomIndex];
                      break;
                }
                case "pack": {
                    boxes = LocalStorage.loadData(StorageKey.GROUP_OF_BOX_ID)
                      if (boxes == null || boxes.length <= 10) {
                        boxes = this._createArrayOfRandomBoxID("pack");
                    }
                      const randomIndex = randomRangeInt(0, boxes.length);
                    randomId = boxes[randomIndex];
                      // Remove Index
                    for (let index = boxes.length; index >= 0; index--) {
                        if (boxes[index] == randomId) {
                            boxes.splice(index, 1);
                        }
                    }
                      LocalStorage.saveData(StorageKey.GROUP_OF_BOX_ID, boxes);
                      break;
                }
            }
              return randomId;
        }
          // เพิ่ม boxID โดยให้สลับตำแหน่งกัน 
        private _createArrayOfRandomBoxID(openType: "single" | "pack"): string[] {
              const boxes: string[] = [];
              // Calculate at 100 Boxs
            for (let index = 1; index <= 100; index++) {
                let random = Math.floor(Math.random() * index);
                let boxId = this._convertIndexRangeToBoxId(index, openType);
                boxes.splice(random, 0, boxId);
            }
              return boxes;
        }
          private _convertIndexRangeToBoxId(index: number, openType: "single" | "pack"): string {
              let rareRate: number = 0;
            const multiplier = (rateRate: number): number => { return Math.floor((100 - rateRate) / 5); }
              switch (openType) {
                case "single": {
                    rareRate = 5
                    break;
                }
                case "pack": {
                    rareRate = 8
                    break;
                }
            }
              const multiplyRate = multiplier(rareRate);
              if (1 <= index && index <= multiplyRate * 1) {
                return "A";
            }
            if ((multiplyRate * 1 + 1) <= index && index <= (multiplyRate * 2)) {
                return "B";
            }
            if ((multiplyRate * 2 + 1) <= index && index <= (multiplyRate * 3)) {
                return "C";
            }
            if ((multiplyRate * 3 + 1) <= index && index <= (multiplyRate * 4)) {
                return "D";
            }
            if ((multiplyRate * 4 + 1) <= index && index <= (multiplyRate * 5)) {
                return "E";
            }
            if ((multiplyRate * 5 + 1) <= index && index <= 100) {
                return "F";
            }
        }
            */;
        return CharacterChanceCalculator;
      }()) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CharacterChangePart.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, sp, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sp = module.sp;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "6a89dAlkxJGEIj0mH5AygXa", "CharacterChangePart", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CharacterChangePart = exports('CharacterChangePart', (_dec = ccclass('CharacterChangePart'), _dec2 = property({
        type: sp.Skeleton,
        tooltip: "KnightBlueSword"
      }), _dec3 = property({
        type: sp.Skeleton,
        tooltip: "KnightGreySword"
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CharacterChangePart, _Component);
        function CharacterChangePart() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "knightBlueSword", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "knightGreySword", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = CharacterChangePart.prototype;
        _proto.start = function start() {
          var parts = "sword";
          for (var i = 0; i < parts.length; i++) {
            var blueSword = this.knightBlueSword.findSlot(parts);
            var greySword = this.knightGreySword.findSlot(parts);
            var attachment = greySword.getAttachment();
            blueSword.setAttachment(attachment);
          }
        };
        _proto.update = function update(deltaTime) {};
        return CharacterChangePart;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "knightBlueSword", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "knightGreySword", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CharacterCollectedData.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "71e6fLkLlNKroJFt69l5itT", "CharacterCollectedData", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CharacterComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CharacterViewModel.ts', './CharacterModel.ts', './CharacterView.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, SpriteFrame, Material, Component, CharacterViewModel, CharacterModel, CharacterView;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      SpriteFrame = module.SpriteFrame;
      Material = module.Material;
      Component = module.Component;
    }, function (module) {
      CharacterViewModel = module.CharacterViewModel;
    }, function (module) {
      CharacterModel = module.CharacterModel;
    }, function (module) {
      CharacterView = module.CharacterView;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "1fd16wWuN5AjIdNv9wuhiVD", "CharacterComponent", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CharacterComponent = exports('CharacterComponent', (_dec = ccclass('CharacterComponent'), _dec2 = property(SpriteFrame), _dec3 = property(Material), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CharacterComponent, _Component);
        function CharacterComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "id", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "color", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "whiteMaterial", _descriptor3, _assertThisInitialized(_this));
          _this._viewModel = void 0;
          return _this;
        }
        var _proto = CharacterComponent.prototype;
        _proto.onLoad = function onLoad() {
          var model = new CharacterModel(this.id, this.color, this.whiteMaterial);
          var view = new CharacterView(this.node);
          this._viewModel = new CharacterViewModel(model, view);
        };
        _proto.onDefaultColor = function onDefaultColor() {
          this._viewModel.defaultAllPartColor();
        };
        _proto.onShadowColor = function onShadowColor() {
          this._viewModel.shadowAllPartColor();
        };
        _proto.onChangePartColor = function onChangePartColor(part) {
          this._viewModel.showPartColor(part);
        };
        _proto.onChangePartShadow = function onChangePartShadow(part) {
          this._viewModel.showPartShadow(part);
        };
        _proto.onHighLightPartColor = function onHighLightPartColor(part) {
          this._viewModel.highlightPartColor(part);
        };
        _proto.onToggleCollider2D = function onToggleCollider2D(part, enable) {
          this._viewModel.toggleCollider2D(part, enable);
        };
        _proto.onToggleRigidBody2D = function onToggleRigidBody2D(part, enable) {
          this._viewModel.toggleRigidBody2D(part, enable);
        };
        _proto.getPartSprite = function getPartSprite() {
          return this.color;
        };
        return CharacterComponent;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "color", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "whiteMaterial", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/characterController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, SkeletalAnimation, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      SkeletalAnimation = module.SkeletalAnimation;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3;
      cclegacy._RF.push({}, "2e7bdkaJERJtr2oPEPURlrG", "characterController", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var characterController = exports('characterController', (_dec = ccclass('characterController'), _dec2 = property(Node), _dec3 = property([Node]), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(characterController, _Component);
        function characterController() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "character", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "parts", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = characterController.prototype;
        _proto.start = function start() {
          var bearPart = this.character.getChildByPath("FArmature").children;
          for (var i = 0; i < bearPart.length; i++) {
            this.parts.push(bearPart[i]);
          }
        };
        _proto.ShowHideCharacter = function ShowHideCharacter() {
          this.character.active = !this.character.active;
        };
        _proto.PlayAnimation = function PlayAnimation() {
          var anim = this.character.getComponent(SkeletalAnimation);
          anim.play();
        };
        _proto.ShowHidePart = function ShowHidePart() {
          if (this.parts[0] != null) {
            this.parts.forEach(function (element) {
              element.active = true;
            });
            this.parts[characterController._partIndex].active = false;
            characterController._partIndex++;
            if (characterController._partIndex >= this.parts.length) {
              characterController._partIndex = 0;
            }
          } else {
            console.log("Parts are null");
          }
        };
        return characterController;
      }(Component), _class3._partIndex = 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "character", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "parts", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CharacterModel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9f8dfVMD3VBs6OmgX0orT7w", "CharacterModel", undefined);
      var CharacterModel = exports('CharacterModel', /*#__PURE__*/function () {
        function CharacterModel(id, color, material) {
          this._id = void 0;
          this._isCollected = false;
          this._isTargetShadow = false;
          this._color = [];
          this._material = null;
          this._id = id;
          this._color = color;
          this._material = material;
        }
        _createClass(CharacterModel, [{
          key: "isCollected",
          get: function get() {
            return this._isCollected;
          },
          set: function set(isCollected) {
            this._isCollected = isCollected;
          }
        }, {
          key: "isTargetShadow",
          get: function get() {
            return this._isTargetShadow;
          },
          set: function set(isShadow) {
            this._isTargetShadow = isShadow;
          }
        }, {
          key: "color",
          get: function get() {
            return this._color;
          }
        }, {
          key: "material",
          get: function get() {
            return this._material;
          }
        }]);
        return CharacterModel;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CharacterStatus.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2165esAJrRGsLxXBR/R910C", "CharacterStatus", undefined);
      var CharacterStatus = exports('CharacterStatus', /*#__PURE__*/function (CharacterStatus) {
        CharacterStatus["BOX"] = "box";
        CharacterStatus["PROGRESS"] = "progress";
        CharacterStatus["COLLECTED"] = "collected";
        return CharacterStatus;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CharacterUtil.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CharacterStatus.ts', './BoxUtil.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, instantiate, Component, CharacterStatus, BoxUtil;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      CharacterStatus = module.CharacterStatus;
    }, function (module) {
      BoxUtil = module.BoxUtil;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "22b445QdNJJUb4H1GSx7Rvs", "CharacterUtil", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CharacterUtil = exports('CharacterUtil', (_dec = ccclass('CharacterUtil'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CharacterUtil, _Component);
        function CharacterUtil() {
          return _Component.apply(this, arguments) || this;
        }
        CharacterUtil.getIndexFromBearPart = function getIndexFromBearPart(partName) {
          return parseInt(partName.substring(0, 2)) - 1;
        };
        CharacterUtil.checkCharacterCollected = function checkCharacterCollected(characterId, characterCollected) {
          var characterIndex = BoxUtil.convertIdToIndex(characterId);
          // console.log(`Character Id = ${characterCollected[characterIndex].id} /// Character Status = ${characterCollected[characterIndex].status}`);
          return characterCollected[characterIndex].status === CharacterStatus.COLLECTED;
        };
        CharacterUtil.instantiateCharacter = function instantiateCharacter(prefab, parent, scale) {
          var character = instantiate(prefab);
          character.parent = parent;
          character.scale = scale;
          console.log("Character Created");
          return character;
        };
        CharacterUtil.checkRareCharacter = function checkRareCharacter(selectedCharacterId) {
          return selectedCharacterId === "G";
        };
        return CharacterUtil;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CharacterViewModel.ts", ['cc'], function (exports) {
  var cclegacy, Color, Sprite;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
      Sprite = module.Sprite;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0f6a39IoYNOO7/rWUrtMW4B", "CharacterViewModel", undefined);
      var CharacterViewModel = exports('CharacterViewModel', /*#__PURE__*/function () {
        function CharacterViewModel(model, view) {
          this._model = void 0;
          this._view = void 0;
          this._model = model;
          this._view = view;
        }
        var _proto = CharacterViewModel.prototype;
        _proto.highlightPartColor = function highlightPartColor(part) {
          this._view.changePartColor(part, Color.CYAN);
        };
        _proto.shadowAllPartColor = function shadowAllPartColor() {
          var _this = this;
          this._view.node.children.forEach(function (part) {
            // const index = parseInt(part.getComponent(Sprite).spriteFrame.name.substring(0, 2)) - 1
            // const spriteFrame = this._model.white[index];
            // this._view.setPartSpriteFrame(part, spriteFrame);
            part.getComponent(Sprite).customMaterial = _this._model.material;
            _this.showPartShadow(part);
          });
        };
        _proto.defaultAllPartColor = function defaultAllPartColor() {
          var _this2 = this;
          this._view.node.children.forEach(function (part) {
            // const customMaterial = part.getComponent(Sprite).customMaterial;

            part.getComponent(Sprite).customMaterial = null;
            // part.getComponent(Sprite).customMaterial = this._model.material;
            // console.log(`Material Name = ${customMaterial.name}`);

            _this2.showPartColor(part);
          });
        };
        _proto.showPartShadow = function showPartShadow(part) {
          this._view.changePartColor(part, Color.BLACK);
        };
        _proto.showPartColor = function showPartColor(part) {
          try {
            // const index = parseInt(part.getComponent(Sprite).spriteFrame.name.substring(0, 2)) - 1
            // const spriteFrame = this._model.color[index];
            // this._view.setPartSpriteFrame(part, spriteFrame);
            part.getComponent(Sprite).customMaterial = null;
            this._view.changePartColor(part, Color.WHITE);
          } catch (error) {
            console.error("Part Name = " + part.name + ", error");
          }
        };
        _proto.toggleCollider2D = function toggleCollider2D(part, enable) {
          if (enable) {
            this._view.enableCollider2D(part);
          } else {
            this._view.disableCollider2D(part);
          }
        };
        _proto.toggleRigidBody2D = function toggleRigidBody2D(part, enable) {
          if (enable) {
            this._view.enableRigidBody2D(part);
          } else {
            this._view.disableRigidBody2D(part);
          }
        };
        return CharacterViewModel;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CharacterView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy, Sprite, Collider2D, RigidBody2D;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      Sprite = module.Sprite;
      Collider2D = module.Collider2D;
      RigidBody2D = module.RigidBody2D;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4875fFAoL1H6q4MPTLTrRgd", "CharacterView", undefined);
      var CharacterView = exports('CharacterView', /*#__PURE__*/function () {
        function CharacterView(node) {
          this._node = void 0;
          this._node = node;
        }
        var _proto = CharacterView.prototype;
        _proto.changePartColor = function changePartColor(part, color) {
          part.getComponent(Sprite).color = color;
        };
        _proto.setPartSpriteFrame = function setPartSpriteFrame(part, spriteFrame) {
          part.getComponent(Sprite).spriteFrame = spriteFrame;
        };
        _proto.enableCollider2D = function enableCollider2D(part) {
          part.getComponent(Collider2D).enabled = true;
        };
        _proto.disableCollider2D = function disableCollider2D(part) {
          part.getComponent(Collider2D).enabled = false;
        };
        _proto.enableRigidBody2D = function enableRigidBody2D(part) {
          part.getComponent(RigidBody2D).enabled = true;
        };
        _proto.disableRigidBody2D = function disableRigidBody2D(part) {
          part.getComponent(RigidBody2D).enabled = false;
        };
        _createClass(CharacterView, [{
          key: "node",
          get: function get() {
            return this._node;
          }
        }]);
        return CharacterView;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Codec.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5fc3csE8LBMtJ0kAlIAJVfi", "Codec", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
        https://www.cocos.com/
        Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
        The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @zh
       * 协议解析的接口
       * @en
       * Interface to parse protocols.
       */
      /**
       * @zh
       * 协议解析器
       * @en
       * codec to parse JSON
       */
      var Codec = exports('Codec', /*#__PURE__*/function () {
        function Codec() {}
        var _proto = Codec.prototype;
        _proto.decode = function decode(content) {
          return JSON.parse(content);
        };
        _proto.encode = function encode(t) {
          return JSON.stringify(t);
        };
        return Codec;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CountNumber.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "b5f61pB7tVDd5v/BS0FR4SW", "CountNumber", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CountNumber = exports('CountNumber', (_dec = ccclass('CountNumber'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CountNumber, _Component);
        function CountNumber() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = CountNumber.prototype;
        _proto.start = function start() {
          console.info("Count Start");
          this.schedule(function () {
            console.log("END");
            // UIManager.Instance.refresh();
            this.node.emit("game-state-change");
          }, 3);
        };
        return CountNumber;
      }(Component), _class2.count = 0, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CustomButton.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameManager.ts', './GameStatus.ts', './SharedService.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component, GameManager, GameStatus, SharedService;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      GameStatus = module.GameStatus;
    }, function (module) {
      SharedService = module.SharedService;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "03c6dj+1blKdoAvSt4OhPh2", "CustomButton", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CustomButton = exports('CustomButton', (_dec = ccclass('CustomButton'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CustomButton, _Component);
        function CustomButton() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._eventTarget = void 0;
          return _this;
        }
        var _proto = CustomButton.prototype;
        _proto.hideUi = function hideUi() {
          GameManager.instance.userComponent.activeLabel();
          // this.node.parent.active = false;
          this.node.parent.destroy();
        };
        _proto.gotoMatchUp = function gotoMatchUp() {
          SharedService.instance.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.GUESS_BEAR);
        };
        _proto.gotoGallery = function gotoGallery() {
          SharedService.instance.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.SHOW_Gallery);
        };
        _proto.gotoMain = function gotoMain() {
          SharedService.instance.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.START);
        };
        return CustomButton;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DefaultData.ts", ['cc', './CharacterStatus.ts', './SerieStatus.ts'], function (exports) {
  var cclegacy, CharacterStatus, SerieStatus;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      CharacterStatus = module.CharacterStatus;
    }, function (module) {
      SerieStatus = module.SerieStatus;
    }],
    execute: function () {
      cclegacy._RF.push({}, "01237NP5HFLI6T2qe5oXL92", "DefaultData", undefined);
      var DafaultData = exports('DafaultData', function DafaultData() {});
      DafaultData.serieCollected = [{
        serieId: 1,
        status: SerieStatus.PROGRESS
      }, {
        serieId: 2,
        status: SerieStatus.PROGRESS
      }, {
        serieId: 3,
        status: SerieStatus.PROGRESS
      }, {
        serieId: 4,
        status: SerieStatus.PROGRESS
      }, {
        serieId: 5,
        status: SerieStatus.PROGRESS
      }, {
        serieId: 6,
        status: SerieStatus.PROGRESS
      }, {
        serieId: 7,
        status: SerieStatus.PROGRESS
      }, {
        serieId: 8,
        status: SerieStatus.PROGRESS
      }, {
        serieId: 9,
        status: SerieStatus.PROGRESS
      }, {
        serieId: 10,
        status: SerieStatus.PROGRESS
      }];
      DafaultData.characterPackIdPlayingSerie03 = ["G", "F", "C", "D", "B", "E"];
      DafaultData.characterCollectedSerie01 = [{
        id: "A",
        status: CharacterStatus.COLLECTED
      }, {
        id: "B",
        status: CharacterStatus.BOX
      }, {
        id: "C",
        status: CharacterStatus.BOX
      }, {
        id: "D",
        status: CharacterStatus.COLLECTED
      }, {
        id: "E",
        status: CharacterStatus.COLLECTED
      }, {
        id: "F",
        status: CharacterStatus.COLLECTED
      }, {
        id: "G",
        status: CharacterStatus.BOX
      }];
      DafaultData.characterCollectedSerie02 = [{
        id: "A",
        status: CharacterStatus.COLLECTED
      }, {
        id: "B",
        status: CharacterStatus.COLLECTED
      }, {
        id: "C",
        status: CharacterStatus.BOX
      }, {
        id: "D",
        status: CharacterStatus.COLLECTED
      }, {
        id: "E",
        status: CharacterStatus.COLLECTED
      }, {
        id: "F",
        status: CharacterStatus.COLLECTED
      }, {
        id: "G",
        status: CharacterStatus.COLLECTED
      }];
      DafaultData.characterCollectedSerie03 = [{
        id: "A",
        status: CharacterStatus.COLLECTED
      }, {
        id: "B",
        status: CharacterStatus.BOX
      }, {
        id: "C",
        status: CharacterStatus.COLLECTED
      }, {
        id: "D",
        status: CharacterStatus.COLLECTED
      }, {
        id: "E",
        status: CharacterStatus.COLLECTED
      }, {
        id: "F",
        status: CharacterStatus.COLLECTED
      }, {
        id: "G",
        status: CharacterStatus.BOX
      }];
      DafaultData.characterCollectedSerie04 = [{
        id: "A",
        status: CharacterStatus.COLLECTED
      }, {
        id: "B",
        status: CharacterStatus.COLLECTED
      }, {
        id: "C",
        status: CharacterStatus.BOX
      }, {
        id: "D",
        status: CharacterStatus.COLLECTED
      }, {
        id: "E",
        status: CharacterStatus.COLLECTED
      }, {
        id: "F",
        status: CharacterStatus.BOX
      }, {
        id: "G",
        status: CharacterStatus.COLLECTED
      }];
      DafaultData.characterCollectedSerie05 = [{
        id: "A",
        status: CharacterStatus.COLLECTED
      }, {
        id: "F",
        status: CharacterStatus.BOX
      }, {
        id: "B",
        status: CharacterStatus.COLLECTED
      }, {
        id: "G",
        status: CharacterStatus.COLLECTED
      }, {
        id: "E",
        status: CharacterStatus.COLLECTED
      }, {
        id: "D",
        status: CharacterStatus.COLLECTED
      }, {
        id: "C",
        status: CharacterStatus.BOX
      }];
      DafaultData.characterCollectedSerie06 = [{
        id: "A",
        status: CharacterStatus.COLLECTED
      }, {
        id: "F",
        status: CharacterStatus.COLLECTED
      }, {
        id: "B",
        status: CharacterStatus.BOX
      }, {
        id: "G",
        status: CharacterStatus.BOX
      }, {
        id: "E",
        status: CharacterStatus.COLLECTED
      }, {
        id: "D",
        status: CharacterStatus.BOX
      }, {
        id: "C",
        status: CharacterStatus.COLLECTED
      }];
      DafaultData.characterCollectedSerie07 = [{
        id: "A",
        status: CharacterStatus.COLLECTED
      }, {
        id: "F",
        status: CharacterStatus.BOX
      }, {
        id: "B",
        status: CharacterStatus.COLLECTED
      }, {
        id: "G",
        status: CharacterStatus.BOX
      }, {
        id: "E",
        status: CharacterStatus.COLLECTED
      }, {
        id: "D",
        status: CharacterStatus.COLLECTED
      }, {
        id: "C",
        status: CharacterStatus.BOX
      }];
      DafaultData.characterCollectedSerie08 = [{
        id: "A",
        status: CharacterStatus.COLLECTED
      }, {
        id: "F",
        status: CharacterStatus.COLLECTED
      }, {
        id: "B",
        status: CharacterStatus.BOX
      }, {
        id: "G",
        status: CharacterStatus.COLLECTED
      }, {
        id: "E",
        status: CharacterStatus.BOX
      }, {
        id: "D",
        status: CharacterStatus.COLLECTED
      }, {
        id: "C",
        status: CharacterStatus.COLLECTED
      }];
      DafaultData.characterCollectedSerie09 = [{
        id: "A",
        status: CharacterStatus.COLLECTED
      }, {
        id: "F",
        status: CharacterStatus.COLLECTED
      }, {
        id: "B",
        status: CharacterStatus.BOX
      }, {
        id: "G",
        status: CharacterStatus.BOX
      }, {
        id: "E",
        status: CharacterStatus.COLLECTED
      }, {
        id: "D",
        status: CharacterStatus.COLLECTED
      }, {
        id: "C",
        status: CharacterStatus.BOX
      }];
      DafaultData.characterCollectedSerie10 = [{
        id: "A",
        status: CharacterStatus.COLLECTED
      }, {
        id: "F",
        status: CharacterStatus.COLLECTED
      }, {
        id: "B",
        status: CharacterStatus.BOX
      }, {
        id: "G",
        status: CharacterStatus.BOX
      }, {
        id: "E",
        status: CharacterStatus.COLLECTED
      }, {
        id: "D",
        status: CharacterStatus.BOX
      }, {
        id: "C",
        status: CharacterStatus.COLLECTED
      }];
      DafaultData.userData = {
        name: "UserTest",
        coin: 100,
        registerDate: 0
      };
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/disable-OldGameManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "90836emyBZBKpzT5uLzCPAW", "disable-OldGameManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var OldGameManager = exports('OldGameManager', (_dec = ccclass('OldGameManager'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(OldGameManager, _Component);
        function OldGameManager() {
          return _Component.apply(this, arguments) || this;
        }
        return OldGameManager;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FullScreenContentCallback.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "37fb7dk2tpKnKLMY9BVIgk4", "FullScreenContentCallback", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @zh
       * 转发原生 FullScreenContentCallback
       * @en
       * Transmit methods in the native FullScreenContentCallback
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GalleryManager.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      // import { _decorator, Component, director, instantiate, Node, Prefab, Sprite, Vec3 } from 'cc';
      cclegacy._RF.push({}, "47844/gYjpH35sVswKF9Iq6", "GalleryManager", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GalleryModel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy, _decorator;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "cc81fUPEGJESbXKaKSEgVIW", "GalleryModel", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GalleryModel = exports('GalleryModel', (_dec = ccclass('GalleryModel'), _dec(_class = /*#__PURE__*/function () {
        function GalleryModel(characterCollected, serieView, serieNodes) {
          this._characterCollected = [];
          this._serieView = void 0;
          this._serieNode = [];
          this._characterCollected = characterCollected;
          this._serieView = serieView;
          this._serieNode = serieNodes;
        }
        _createClass(GalleryModel, [{
          key: "characterCollected",
          get: function get() {
            return this._characterCollected;
          },
          set: function set(value) {
            this._characterCollected = value;
          }
        }, {
          key: "serieView",
          get: function get() {
            return this._serieView;
          },
          set: function set(value) {
            this._serieView = value;
          }
        }, {
          key: "serieNode",
          get: function get() {
            return this._serieNode;
          }
        }]);
        return GalleryModel;
      }()) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GalleryViewModel.ts", ['cc', './GameManager.ts', './GalleryModel.ts', './CharacterUtil.ts', './CharacterStatus.ts', './SerieView.ts'], function (exports) {
  var cclegacy, Vec3, GameManager, GalleryModel, CharacterUtil, CharacterStatus, SerieView;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      GalleryModel = module.GalleryModel;
    }, function (module) {
      CharacterUtil = module.CharacterUtil;
    }, function (module) {
      CharacterStatus = module.CharacterStatus;
    }, function (module) {
      SerieView = module.SerieView;
    }],
    execute: function () {
      cclegacy._RF.push({}, "50456TSM/tOTqJyZcSIVRW9", "GalleryViewModel", undefined);
      var GalleryViewModel = exports('GalleryViewModel', /*#__PURE__*/function () {
        function GalleryViewModel(view, serieNodes) {
          this._view = void 0;
          this._model = void 0;
          this._serieNodes = [];
          this._view = view;
          this._serieNodes = serieNodes;
          var serieRePository = GameManager.instance.serieRepository;
          this._model = new GalleryModel(serieRePository.loadCurrentCharacterCollectedSerie(GameManager.instance.currentSerieId), serieRePository.currentSerieView, this._serieNodes);
        }
        var _proto = GalleryViewModel.prototype;
        _proto.initializeCharacter = function initializeCharacter() {
          var defautCharacterScale = new Vec3(1, 1, 1);
          for (var index = 0; index < this._view.characterPositionNode.length; index++) {
            var characterPrefab = this._model.serieView.characters[index];
            if (this._view.characterPositionNode[index].children.length > 0) {
              this._view.characterPositionNode[index].removeAllChildren();
            }
            var character = CharacterUtil.instantiateCharacter(characterPrefab, this._view.characterPositionNode[index], defautCharacterScale);
            this._view.onSetupCharacterColor(character, this._model.characterCollected[index].status === CharacterStatus.COLLECTED);
          }
        };
        _proto.changeBG = function changeBG(bgSprite) {
          bgSprite.spriteFrame = this._model.serieView.background[3];
        };
        _proto.onSeriesSelection = function onSeriesSelection(bgSprite, serieId) {
          if (GameManager.instance.serieRepository.seriesData[serieId - 1]) {
            this._model.characterCollected = GameManager.instance.serieRepository.loadCurrentCharacterCollectedSerie(serieId);
            this._model.serieView = GameManager.instance.serieRepository.seriesData[serieId - 1].getComponent(SerieView);
            this.initializeCharacter();
            this.changeBG(bgSprite);
          } else {
            console.log("SerieView of Serie" + serieId + " not found");
          }
        };
        return GalleryViewModel;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GalleryView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CharacterComponent.ts', './GalleryViewModel.ts', './GameManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Sprite, ScrollView, Input, Component, CharacterComponent, GalleryViewModel, GameManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Sprite = module.Sprite;
      ScrollView = module.ScrollView;
      Input = module.Input;
      Component = module.Component;
    }, function (module) {
      CharacterComponent = module.CharacterComponent;
    }, function (module) {
      GalleryViewModel = module.GalleryViewModel;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "1c6f1eyx8pEq4j9GiMDwvGM", "GalleryView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GalleryView = exports('GalleryView', (_dec = ccclass('GalleryView'), _dec2 = property([Node]), _dec3 = property(Sprite), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GalleryView, _Component);
        function GalleryView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "characterPositionNode", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bg", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "serieSelectionArea", _descriptor3, _assertThisInitialized(_this));
          _this._viewModel = void 0;
          return _this;
        }
        var _proto = GalleryView.prototype;
        _proto.start = function start() {
          this._initialize();
          this.setInputActive(true);
        };
        _proto._initialize = function _initialize() {
          this._viewModel = new GalleryViewModel(this.getComponent(GalleryView), this.serieSelectionArea.getComponent(ScrollView).content.children);
          this._viewModel.onSeriesSelection(this.bg, GameManager.instance.currentSerieId);
          // this._viewModel.initializeCharacter();
          // this._viewModel.changeBG(this.bg);
        };

        _proto.onSetupCharacterColor = function onSetupCharacterColor(character, status) {
          if (status === void 0) {
            status = false;
          }
          var characterComp = character.getComponent(CharacterComponent);
          if (status) {
            characterComp.onDefaultColor();
          } else {
            characterComp.onShadowColor();
          }
        };
        _proto.setInputActive = function setInputActive(active) {
          var _this2 = this;
          if (active) {
            this.serieSelectionArea.getComponent(ScrollView).content.children.forEach(function (serie) {
              serie.on(Input.EventType.TOUCH_END, _this2._onTouchSerie, _this2);
            });
          } else {
            this.serieSelectionArea.getComponent(ScrollView).content.children.forEach(function (serie) {
              serie.off(Input.EventType.TOUCH_END, _this2._onTouchSerie, _this2);
            });
          }
        };
        _proto._onTouchSerie = function _onTouchSerie(event) {
          var target = event.target;
          var id = parseInt(target.name.substring(14, 16)); // Get ID from "SerieThumbnail1" Thumbnail name
          console.log("target.name = " + target.name + ", id = " + id);
          this._viewModel.onSeriesSelection(this.bg, id);
        };
        _proto.onDestroy = function onDestroy() {
          this.setInputActive(false);
        };
        return GalleryView;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "characterPositionNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bg", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "serieSelectionArea", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './SharedService.ts'], function (exports) {
  var _createClass, cclegacy, _decorator, EventTarget, director, SharedService;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      EventTarget = module.EventTarget;
      director = module.director;
    }, function (module) {
      SharedService = module.SharedService;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "522d1vVXORMdJ2epIFPrHwJ", "GameManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GameManager = exports('GameManager', (_dec = ccclass('GameManager'), _dec(_class = (_class2 = /*#__PURE__*/function () {
        function GameManager() {
          this.eventTarget = new EventTarget();
          this._userComponent = void 0;
          this._uiManager = void 0;
          this.serieRepository = void 0;
          // ใช้สำหรับเก็บข้อมูล Serie ที่มีทั้งหมด
          this.currentSerieId = 1;
          // ใช้สำหรับเก็บ Serie ที่กำลังเล่นอยู่
          this.currentCharacterPackId = [];
          this.selectedCharacterId = void 0;
          this.character = null;
          this.GAME_STATE_CHANGED = "game-state-changed";
          this.ACTIVE_USER_LABEL = "active-userComponent-label";
          director.on('applicationQuite', this._saveUserData, this);
        }
        var _proto = GameManager.prototype;
        _proto.initialize = function initialize(userComponent, uiManager, serieRepository) {
          SharedService.instance.on(this.GAME_STATE_CHANGED, this._updateGameState, this);
          this.eventTarget.on(this.ACTIVE_USER_LABEL, this._onActiveInfoPanel, this);
          this._userComponent = userComponent;
          this._uiManager = uiManager;
          this.serieRepository = serieRepository;
          this.serieRepository.setupDefaultCharacterCollectData();
          this._loadCollection();
          console.log("GameManager Initialize");
        };
        _proto.initCoin = function initCoin(coin) {
          this._userComponent.onCoinIncreased(coin);
        };
        _proto._updateGameState = function _updateGameState(status, eventData1, eventData2, eventData3) {
          this._uiManager.updateUI(status, eventData1, eventData2, eventData3);
        };
        _proto._onActiveInfoPanel = function _onActiveInfoPanel(active) {
          if (active === void 0) {
            active = true;
          }
          this._userComponent.activeLabel(active);
        };
        _proto.collectCharacter = function collectCharacter(characterId) {};
        _proto._saveCollection = function _saveCollection() {};
        _proto._loadCollection = function _loadCollection() {};
        _proto._saveUserData = function _saveUserData() {};
        _proto.onDestroy = function onDestroy() {
          this.eventTarget.off(this.GAME_STATE_CHANGED, this._updateGameState, this);
          this.eventTarget.off(this.ACTIVE_USER_LABEL, this._onActiveInfoPanel, this);
        };
        _createClass(GameManager, [{
          key: "userComponent",
          get: function get() {
            return this._userComponent;
          }
        }], [{
          key: "instance",
          get: function get() {
            if (!this._instance) {
              this._instance = new GameManager();
            }
            return this._instance;
          }
        }]);
        return GameManager;
      }(), _class2._instance = void 0, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameStatus.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5d3ac9SEPFGsKWHKLpocAZu", "GameStatus", undefined);
      var GameStatus = exports('GameStatus', /*#__PURE__*/function (GameStatus) {
        GameStatus["START"] = "start";
        GameStatus["SHOW_SERIE"] = "show-serie";
        GameStatus["SELECT_SERIE"] = "select-serie";
        GameStatus["SHOW_PACK"] = "show-pack";
        GameStatus["SELECT_PACK"] = "select-pack";
        GameStatus["BOX_SELECTION"] = "box-selection";
        GameStatus["SELECT_BOX"] = "select-box";
        GameStatus["SHOW_6_BOX"] = "show-6-box";
        GameStatus["SHOW_1_BOX"] = "show-1-box";
        GameStatus["OPEN_BOX_FINISHED"] = "open-box-finished";
        GameStatus["GUESS_BEAR"] = "guess-bear";
        GameStatus["COLLECT_CHATACTER"] = "collect-character";
        GameStatus["SHOW_Gallery"] = "show-gallery";
        GameStatus["SHOW_CHARACTER"] = "show-character";
        GameStatus["PITCH_AND_TOSS"] = "pitch-and-toss";
        GameStatus["SETTING"] = "setting";
        GameStatus["COIN_UPDATED"] = "coin-updated";
        return GameStatus;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameStatus.ts', './GameManager.ts', './UIManager.ts', './UserComponent.ts', './SharedService.ts', './SerieRepository.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, CCString, Component, GameStatus, GameManager, UIManager, UserComponent, SharedService, SerieRepository;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCString = module.CCString;
      Component = module.Component;
    }, function (module) {
      GameStatus = module.GameStatus;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      UserComponent = module.UserComponent;
    }, function (module) {
      SharedService = module.SharedService;
    }, function (module) {
      SerieRepository = module.SerieRepository;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "6063bpBOYBLValGWpzCkUeH", "Game", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Game = exports('Game', (_dec = ccclass('Game'), _dec2 = property(CCString), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Game, _Component);
        function Game() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._gameManager = void 0;
          _initializerDefineProperty(_this, "serieContentPath", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = Game.prototype;
        _proto.onLoad = function onLoad() {
          this._gameManager = GameManager.instance;
          this._gameManager.initialize(this.getComponent(UserComponent), this.getComponent(UIManager), this.getComponent(SerieRepository));
          this._setupSerieRepository();
          SharedService.instance.emit(this._gameManager.GAME_STATE_CHANGED, GameStatus.START);
        };
        _proto._setupSerieRepository = function _setupSerieRepository() {
          var serieRepository = this.getComponent(SerieRepository);
          var series = this.getComponent(UIManager).uiGroup.getChildByPath(this.serieContentPath).children;
          serieRepository.seriesData = series;
        };
        return Game;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "serieContentPath", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GuessCharacterModel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy, _decorator;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "e26359n/kdIaZcflPQHS4Bg", "GuessCharacterModel", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GuessCharacterModel = exports('GuessCharacterModel', (_dec = ccclass('GuessCharacterModel'), _dec(_class = /*#__PURE__*/function () {
        function GuessCharacterModel(serieView) {
          this._serieView = void 0;
          this._serieView = serieView;
        }
        _createClass(GuessCharacterModel, [{
          key: "serieView",
          get: function get() {
            return this._serieView;
          }
        }]);
        return GuessCharacterModel;
      }()) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GuessCharacterViewModel.ts", ['cc', './GuessCharacterModel.ts', './GameManager.ts', './SharedService.ts', './CharacterUtil.ts'], function (exports) {
  var cclegacy, GuessCharacterModel, GameManager, SharedService, CharacterUtil;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GuessCharacterModel = module.GuessCharacterModel;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      SharedService = module.SharedService;
    }, function (module) {
      CharacterUtil = module.CharacterUtil;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f52d1+nZ+FOSobK2g7RKDil", "GuessCharacterViewModel", undefined);
      var GuessCharacterViewModel = exports('GuessCharacterViewModel', /*#__PURE__*/function () {
        function GuessCharacterViewModel(view) {
          this._view = void 0;
          this._model = void 0;
          this.isColliderMatch = false;
          var serieRePository = GameManager.instance.serieRepository;
          this._model = new GuessCharacterModel(serieRePository.currentSerieView);
          this._view = view;
        }
        var _proto = GuessCharacterViewModel.prototype;
        _proto.changeBG = function changeBG(bgSprite) {
          var isRareCharacter = CharacterUtil.checkRareCharacter(GameManager.instance.selectedCharacterId);
          bgSprite.spriteFrame = isRareCharacter ? this._model.serieView.background[2] : this._model.serieView.background[1];
        };
        _proto.IsCharacterCollected = function IsCharacterCollected() {
          var characterCollected = GameManager.instance.serieRepository.loadCurrentCharacterCollectedSerie(GameManager.instance.currentSerieId);
          var isCharacterCollected = CharacterUtil.checkCharacterCollected(GameManager.instance.selectedCharacterId, characterCollected);
          // console.log(`Is a Character Collected : ${isCharacterCollected}`);
          return isCharacterCollected;
        };
        _proto.onSetupCharacter = function onSetupCharacter() {
          this._view.setupCharacter(GameManager.instance.character);
        };
        _proto.onInstantiatePart = function onInstantiatePart() {
          // console.log(`Index : ${index}, characterID : ${GameManager.instance.selectedCharacterId}`);
          this._view.instantiatePart(GameManager.instance.character);
        };
        _proto.onShareService = function onShareService(eventData1, eventData2) {
          SharedService.instance.emit("share-part-data", null, eventData1, eventData2);
          // console.log(`Share Service Emit : eventData1 = ${eventData1.name}, eventData2 = ${eventData2.name}`);
        };

        _proto.onSharePartsDataServiceListener = function onSharePartsDataServiceListener() {
          SharedService.instance.on("check-all-parts-completed", this._onAllPartsCompleted, this);
          console.log("Share Service Listener : check-all-parts-completed");
        };
        _proto._onAllPartsCompleted = function _onAllPartsCompleted() {
          console.log("All Parts Completed");
          var serieId = GameManager.instance.currentSerieId;
          // SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + serieId, //CharacterCollectedData//);
          this._view.onAllPartsCompleted();
        };
        return GuessCharacterViewModel;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GuessCharacterView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GuessCharacterViewModel.ts', './CharacterComponent.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Sprite, ScrollView, Layers, Layout, RigidBody2D, ERigidBody2DType, BoxCollider2D, Vec3, Widget, Component, GuessCharacterViewModel, CharacterComponent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Sprite = module.Sprite;
      ScrollView = module.ScrollView;
      Layers = module.Layers;
      Layout = module.Layout;
      RigidBody2D = module.RigidBody2D;
      ERigidBody2DType = module.ERigidBody2DType;
      BoxCollider2D = module.BoxCollider2D;
      Vec3 = module.Vec3;
      Widget = module.Widget;
      Component = module.Component;
    }, function (module) {
      GuessCharacterViewModel = module.GuessCharacterViewModel;
    }, function (module) {
      CharacterComponent = module.CharacterComponent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "40d26aVX19H2Y1GE41FLk9t", "GuessCharacterView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GuessCharacterView = exports('GuessCharacterView', (_dec = ccclass('GuessCharacterView'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Sprite), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GuessCharacterView, _Component);
        function GuessCharacterView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "partArea", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "mainMenuButton", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "playOtherCharacterButton", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bg", _descriptor4, _assertThisInitialized(_this));
          _this._character = void 0;
          _this._viewModel = void 0;
          _this._parts = [];
          return _this;
        }
        var _proto = GuessCharacterView.prototype;
        _proto.onLoad = function onLoad() {
          this._viewModel = new GuessCharacterViewModel(this.getComponent(GuessCharacterView));
        };
        _proto.start = function start() {
          this._initialize();
        };
        _proto._initialize = function _initialize() {
          this._viewModel.onSetupCharacter();
          if (this._viewModel.IsCharacterCollected()) {
            this._setButtonActive(true);
            this._setPartPanelActive(false);
          } else {
            this._setButtonActive(false);
            this._setPartPanelActive(true);
            this._viewModel.onInstantiatePart();
            this._viewModel.onShareService(this._parts, this._character);
          }
          this._viewModel.changeBG(this.bg);
          this._viewModel.onSharePartsDataServiceListener();
        };
        _proto.setupCharacter = function setupCharacter(character) {
          this._character = character;
          this._character.scale = new Node().scale.set(1, 1, 1);
          // console.log(`Character name = ${this._character.name}`);
        };

        _proto.instantiatePart = function instantiatePart(character) {
          var _this2 = this;
          var parts = this._createAllParts(character);
          parts.parent = this.partArea.children[0];
          this.partArea.getComponent(ScrollView).content = parts;
          parts.children.forEach(function (part, index) {
            _this2._parts[index] = part;
          });
          return parts;
        };
        _proto._createAllParts = function _createAllParts(character) {
          this._character = character;
          var partParent = new Node('Part');
          partParent.layer = Layers.Enum.UI_2D;
          partParent.addComponent(Layout);
          partParent.getComponent(Layout).type = Layout.Type.HORIZONTAL;
          partParent.getComponent(Layout).alignHorizontal = true;
          partParent.getComponent(Layout).resizeMode = Layout.ResizeMode.CONTAINER;
          partParent.getComponent(Layout).paddingLeft = 50;
          partParent.getComponent(Layout).paddingRight = 50;
          partParent.getComponent(Layout).spacingX = 100;
          partParent.getComponent(Layout).horizontalDirection = Layout.HorizontalDirection.LEFT_TO_RIGHT;
          partParent.getComponent(Layout).affectedByScale = true;
          var partSpriteFrames = this._character.getComponent(CharacterComponent).getPartSprite();
          partSpriteFrames.forEach(function (spriteFrame) {
            var part = new Node(spriteFrame.name);
            part.layer = Layers.Enum.UI_2D;
            part.addComponent(Sprite);
            part.getComponent(Sprite).spriteFrame = spriteFrame;
            part.addComponent(RigidBody2D);
            part.getComponent(RigidBody2D).enabled = false;
            part.getComponent(RigidBody2D).enabledContactListener = true;
            part.getComponent(RigidBody2D).type = ERigidBody2DType.Kinematic;
            part.addComponent(BoxCollider2D);
            part.getComponent(BoxCollider2D).enabled = false;
            part.scale = new Vec3(0.4, 0.4, 0.4);
            partParent.addChild(part);
          });
          partParent.addComponent(Widget);
          partParent.getComponent(Widget).isAlignLeft = true;
          partParent.getComponent(Widget).isAlignTop = true;
          partParent.getComponent(Widget).isAlignBottom = true;
          partParent.getComponent(Widget).left = 0;
          partParent.getComponent(Widget).top = 50;
          partParent.getComponent(Widget).bottom = 50;
          return partParent;
        };
        _proto._setPartPanelActive = function _setPartPanelActive(active) {
          this.partArea.active = active;
        };
        _proto._setButtonActive = function _setButtonActive(active) {
          this.mainMenuButton.active = active;
          this.playOtherCharacterButton.active = active;
        };
        _proto.onAllPartsCompleted = function onAllPartsCompleted() {
          this._setPartPanelActive(false);
          this._setButtonActive(true);
        };
        return GuessCharacterView;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "partArea", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "mainMenuButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "playOtherCharacterButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "bg", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ICallbackNTF.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6c8dadexLJGwqjGQ2usL63Y", "ICallbackNTF", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/INativeResponse.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "03548ZFhZZARbvS8YmyP/AH", "INativeResponse", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @zh
       * 原生回调
       * @en
       * interface for native response
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/InterstitailAd.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Base.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Base;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      Base = module.Base;
    }],
    execute: function () {
      var _dec, _class, _dec2, _class2, _dec3, _class3, _dec4, _class4, _dec5, _class5, _dec6, _class7;
      cclegacy._RF.push({}, "351a6cGhWdHlaZa5uq/AsZ8", "InterstitailAd", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var LoadInterstitialAdREQ = exports('LoadInterstitialAdREQ', (_dec = ccclass("LoadInterstitialAdREQ"), _dec(_class = /*#__PURE__*/function (_Base) {
        _inheritsLoose(LoadInterstitialAdREQ, _Base);
        function LoadInterstitialAdREQ() {
          return _Base.apply(this, arguments) || this;
        }
        return LoadInterstitialAdREQ;
      }(Base)) || _class));
      var LoadInterstitialAdACK = exports('LoadInterstitialAdACK', (_dec2 = ccclass("LoadInterstitialAdACK"), _dec2(_class2 = /*#__PURE__*/function (_Base2) {
        _inheritsLoose(LoadInterstitialAdACK, _Base2);
        function LoadInterstitialAdACK() {
          return _Base2.apply(this, arguments) || this;
        }
        return LoadInterstitialAdACK;
      }(Base)) || _class2));
      var ShowInterstitialAdREQ = exports('ShowInterstitialAdREQ', (_dec3 = ccclass("ShowInterstitialAdREQ"), _dec3(_class3 = /*#__PURE__*/function (_Base3) {
        _inheritsLoose(ShowInterstitialAdREQ, _Base3);
        function ShowInterstitialAdREQ() {
          return _Base3.apply(this, arguments) || this;
        }
        return ShowInterstitialAdREQ;
      }(Base)) || _class3));
      var ShowInterstitialAdACK = exports('ShowInterstitialAdACK', (_dec4 = ccclass("ShowInterstitialAdACK"), _dec4(_class4 = /*#__PURE__*/function (_Base4) {
        _inheritsLoose(ShowInterstitialAdACK, _Base4);
        function ShowInterstitialAdACK() {
          return _Base4.apply(this, arguments) || this;
        }
        return ShowInterstitialAdACK;
      }(Base)) || _class4));
      var InterstitialAdLoadCalLBackNTF = exports('InterstitialAdLoadCalLBackNTF', (_dec5 = ccclass("InterstitialAdLoadCalLBackNTF"), _dec5(_class5 = /*#__PURE__*/function (_Base5) {
        _inheritsLoose(InterstitialAdLoadCalLBackNTF, _Base5);
        function InterstitialAdLoadCalLBackNTF() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Base5.call.apply(_Base5, [this].concat(args)) || this;
          _this.method = void 0;
          _this.loadAdError = void 0;
          return _this;
        }
        return InterstitialAdLoadCalLBackNTF;
      }(Base)) || _class5));
      var InterstitialFullScreenContentCallbackNTF = exports('InterstitialFullScreenContentCallbackNTF', (_dec6 = ccclass("InterstitialFullScreenContentCallbackNTF"), _dec6(_class7 = /*#__PURE__*/function (_Base6) {
        _inheritsLoose(InterstitialFullScreenContentCallbackNTF, _Base6);
        function InterstitialFullScreenContentCallbackNTF() {
          var _this2;
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          _this2 = _Base6.call.apply(_Base6, [this].concat(args)) || this;
          _this2.method = void 0;
          _this2.loadAdError = void 0;
          return _this2;
        }
        return InterstitialFullScreenContentCallbackNTF;
      }(Base)) || _class7));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/InterstitialAdClient.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Bridge.ts', './Route.ts', './InterstitailAd.ts', './AdClient.ts', './PaidEventNTF.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, log, js, bridge, route, LoadInterstitialAdREQ, LoadInterstitialAdACK, ShowInterstitialAdREQ, ShowInterstitialAdACK, InterstitialFullScreenContentCallbackNTF, InterstitialAdLoadCalLBackNTF, AdClient, InterstitialPaidEventNTF;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
      js = module.js;
    }, function (module) {
      bridge = module.bridge;
    }, function (module) {
      route = module.route;
    }, function (module) {
      LoadInterstitialAdREQ = module.LoadInterstitialAdREQ;
      LoadInterstitialAdACK = module.LoadInterstitialAdACK;
      ShowInterstitialAdREQ = module.ShowInterstitialAdREQ;
      ShowInterstitialAdACK = module.ShowInterstitialAdACK;
      InterstitialFullScreenContentCallbackNTF = module.InterstitialFullScreenContentCallbackNTF;
      InterstitialAdLoadCalLBackNTF = module.InterstitialAdLoadCalLBackNTF;
    }, function (module) {
      AdClient = module.AdClient;
    }, function (module) {
      InterstitialPaidEventNTF = module.InterstitialPaidEventNTF;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0133a1I+utKjZdl7GATzhls", "InterstitialAdClient", undefined);

      /**
       * @zh
       * Interstitial 广告的客户端
       * @en
       * The client of Interstitial Ad.
       */
      var module$1 = "[InterstitialAdClient]";
      var InterstitialAdClient = exports('InterstitialAdClient', /*#__PURE__*/function (_AdClient) {
        _inheritsLoose(InterstitialAdClient, _AdClient);
        function InterstitialAdClient() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _AdClient.call.apply(_AdClient, [this].concat(args)) || this;
          /**
           * @zh
           * Interstitial 广告监听器，由多种类型联合
           * @en
           * Union of all the InterstitialAd listeners.
           */
          _this._interstitialListener = void 0;
          return _this;
        }
        var _proto = InterstitialAdClient.prototype;
        /**
         * @zh
         *  加载 Interstitial  广告
         * @en
         *  Load the Interstitial Ad
         * @param unitId  
         *  @zh 单元Id
         *  @en the unit id of Interstitial Ad.
         * @param interstitialListener 
         *  @zh Interstitial 监听器
         *  @en Listener for the Interstitial Ad.
         */
        _proto.load = function load(unitId, interstitialListener) {
          this.destroy();
          log(module$1, "load, unitId = " + unitId);
          this.unitId = unitId;
          this.interstitialListener = interstitialListener;
          bridge.sendToNative(js.getClassName(LoadInterstitialAdREQ), {
            unitId: unitId
          }, js.getClassName(LoadInterstitialAdACK), function (ack) {
            log(module$1, "load, LoadInterstitialAdACK, " + ack);
          });
        }

        /**
         * @zh
         * 销毁 Interstitial  的监听器
         * @en
         * Destroy the listener
         */;
        _proto.destroy = function destroy() {
          log(module$1, "destroy");
          this.interstitialListener = null;
        }

        /**
         * @zh
         * 展示 Interstitial 广告
         * 必须先 load 并且在成功后（onAdLoaded）后展示
         * @en
         * Show the Interstitial Ad.
         * Must be loaded first, and show in the onAdLoaded callback.
         * @param onComplete 
         */;
        _proto.show = function show(onComplete) {
          log(module$1, "show");
          bridge.sendToNative(js.getClassName(ShowInterstitialAdREQ), {
            unitId: this.unitId
          }, js.getClassName(ShowInterstitialAdACK), function (ack) {
            if (onComplete) {
              onComplete();
            }
          });
        };
        _proto.onInterstitialAdLoadCalLBackNTF = function onInterstitialAdLoadCalLBackNTF(ntf) {
          log(module$1, "onInterstitialAdLoadCalLBackNTF, " + ntf);
          if (this.interstitialListener) {
            var method = this.interstitialListener[ntf.method];
            if (method) {
              method(ntf.loadAdError);
            }
          }
        };
        _proto.onInterstitialFullScreenContentCallback = function onInterstitialFullScreenContentCallback(ntf) {
          log(module$1, "onInterstitialFullScreenContentCallback, " + ntf);
          var method = this.interstitialListener[ntf.method];
          if (method) {
            method();
          }
        };
        _proto.onPaidEvent = function onPaidEvent(ntf) {
          var listener = this.interstitialListener;
          if (listener && listener.onPaidEvent) {
            listener.onPaidEvent(ntf);
          }
        };
        _createClass(InterstitialAdClient, [{
          key: "interstitialListener",
          get:
          /**
           * @zh
           * Interstitial 广告监听器，由多种类型联合
           * @en
           * Union of all the InterstitialAd listeners.
           */
          function get() {
            return this._interstitialListener;
          }

          /**
           * @zh
           * Interstitial 广告监听器，由多种类型联合
           * @en
           * Union of all the InterstitialAd listeners.
           */,
          set: function set(value) {
            if (!value) {
              route.off(js.getClassName(InterstitialFullScreenContentCallbackNTF), this.onInterstitialFullScreenContentCallback, this);
              route.off(js.getClassName(InterstitialAdLoadCalLBackNTF), this.onInterstitialAdLoadCalLBackNTF, this);
              route.off(js.getClassName(InterstitialPaidEventNTF), this.onPaidEvent, this);
            }
            this._interstitialListener = value;
            if (value) {
              route.on(js.getClassName(InterstitialFullScreenContentCallbackNTF), this.onInterstitialFullScreenContentCallback, this);
              route.on(js.getClassName(InterstitialAdLoadCalLBackNTF), this.onInterstitialAdLoadCalLBackNTF, this);
              route.on(js.getClassName(InterstitialPaidEventNTF), this.onPaidEvent, this);
            }
          }
        }]);
        return InterstitialAdClient;
      }(AdClient));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/InterstitialAdListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4f5447hMxxIepLeOECu2PRF", "InterstitialAdListener", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @zh
       * 插页式广告回调的联合类型
       * @en
       * Union for the interstitial ad.
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/InterstitialAdLoadCallback.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "95c6biRenVPv70yEzTspX+h", "InterstitialAdLoadCallback", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @zh
       * 插页式广告的加载回调
       * @en
       * Load callback for interstitial ad
       * 
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/InterstitialFullScreenContentCallback.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "26862PsMLhAsYZJMHVxZiYj", "InterstitialFullScreenContentCallback", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @zh
       * 全屏回调的插页式激励广告的别名
       * @en
       * Alias of the FullScreenContentCallback
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/itemStatus.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d697a7gAYZBObTjgrQvBCxG", "itemStatus", undefined);
      var itemStatus = exports('itemStatus', /*#__PURE__*/function (itemStatus) {
        itemStatus["BOX"] = "box";
        itemStatus["BEAR"] = "bear";
        return itemStatus;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./CountNumber.ts', './CharacterComponent.ts', './UserComponent.ts', './Game.ts', './GameManager.ts', './UIManager.ts', './disable-OldGameManager.ts', './CharacterCollectedData.ts', './DefaultData.ts', './SerieData.ts', './CharacterStatus.ts', './GameStatus.ts', './SerieStatus.ts', './StorageKey.ts', './UserEvent.ts', './itemStatus.ts', './Bear.ts', './BearPart.ts', './Pack.ts', './Serie.ts', './SerieThumbnail.ts', './BoxManager.ts', './GalleryManager.ts', './PackChanceCalculator.ts', './PackManager.ts', './BoxModel.ts', './CharacterModel.ts', './GalleryModel.ts', './GuessCharacterModel.ts', './PackModel.ts', './PartModel.ts', './SerieModel.ts', './UserModel.ts', './PitchTossModel.ts', './PitchTossViewModel.ts', './PitchTossView.ts', './SerieRepository.ts', './SharedService.ts', './CharacterChangePart.ts', './backgroundManager.ts', './characterController.ts', './testColliderConcat.ts', './testCreateDestroy.ts', './CustomButton.ts', './ScrollViewSwipe.ts', './BoxUtil.ts', './CharacterChanceCalculator.ts', './CharacterUtil.ts', './SaveLoad.ts', './base64.ts', './BoxViewModel.ts', './CharacterViewModel.ts', './GalleryViewModel.ts', './GuessCharacterViewModel.ts', './OpenBoxSelectionViewModel.ts', './PackViewModel.ts', './PartViewModel.ts', './SerieViewModel.ts', './ShowCharacterPackViewModel.ts', './UserViewModel.ts', './BoxView.ts', './CharacterView.ts', './GalleryView.ts', './GuessCharacterView.ts', './OpenBoxSelectionView.ts', './PackView.ts', './PartView.ts', './SerieView.ts', './ShowCharacterPackView.ts', './UserView.ts', './TypeAlias.ts', './AdClient.ts', './AppOpenAdClient.ts', './BannerClient.ts', './InterstitialAdClient.ts', './NativeAdClient.ts', './RewardedAdClient.ts', './RewardedInterstitialAdClient.ts', './AdListener.ts', './AppOpenAdFullScreenContentCallback.ts', './AppOpenAdListener.ts', './AppOpenAdLoadCallback.ts', './BannerAdListener.ts', './FullScreenContentCallback.ts', './InterstitialAdListener.ts', './InterstitialAdLoadCallback.ts', './InterstitialFullScreenContentCallback.ts', './NativeAdListener.ts', './OnNativeAdLoadedListener.ts', './OnPaidEventListener.ts', './OnShowAdCompleteListener.ts', './OnUserEarnedRewardListener.ts', './RewardedAdFullScreenContentCallback.ts', './RewardedAdListener.ts', './RewardedAdLoadCallback.ts', './RewardedInterstitialAdLoadCallback.ts', './RewardedInterstitialFullScreenContentCallback.ts', './RewardedInterstitialListener.ts', './Bridge.ts', './Codec.ts', './INativeResponse.ts', './Route.ts', './Version2.ts', './BannerAlignment.ts', './BannerSize.ts', './BannerSizeOption.ts', './BannerSizeType.ts', './TestUnitId.ts', './AppOpenAd.ts', './BannerAd.ts', './Base.ts', './ICallbackNTF.ts', './InterstitailAd.ts', './NativeAd.ts', './PaidEventNTF.ts', './RewardedAd.ts', './RewardedInterstitialAd.ts', './Version.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/NativeAdClient.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Bridge.ts', './BannerAd.ts', './NativeAd.ts', './AdClient.ts', './Route.ts', './PaidEventNTF.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, log, js, bridge, DestroyBannerACK, LoadNativeAdREQ, LoadNativeAdACK, DestroyNativeAdREQ, NativeLoadedNTF, NativeAdListenerNTF, AdClient, route, NativePaidEventNTF;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
      js = module.js;
    }, function (module) {
      bridge = module.bridge;
    }, function (module) {
      DestroyBannerACK = module.DestroyBannerACK;
    }, function (module) {
      LoadNativeAdREQ = module.LoadNativeAdREQ;
      LoadNativeAdACK = module.LoadNativeAdACK;
      DestroyNativeAdREQ = module.DestroyNativeAdREQ;
      NativeLoadedNTF = module.NativeLoadedNTF;
      NativeAdListenerNTF = module.NativeAdListenerNTF;
    }, function (module) {
      AdClient = module.AdClient;
    }, function (module) {
      route = module.route;
    }, function (module) {
      NativePaidEventNTF = module.NativePaidEventNTF;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2051einid9F8YRS5orUMZnQ", "NativeAdClient", undefined);

      /**
       * @zh
       * 原生广告客户端
       * 由于不可销毁，通常来说游戏不会用到
       * 提供两种类型，请查看 NativeAdTemplateSize
       * @en
       * native ad client
       * Two types are supported, please check NativeAdTemplateSize for more details
       */
      var module$1 = "[NativeAdClient]";
      var NativeAdClient = exports('NativeAdClient', /*#__PURE__*/function (_AdClient) {
        _inheritsLoose(NativeAdClient, _AdClient);
        function NativeAdClient() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _AdClient.call.apply(_AdClient, [this].concat(args)) || this;
          /**
           * @zh
           * 原生广告的监听器
           * @en
           * Listener for the native ad
           */
          _this._nativeAdListener = void 0;
          return _this;
        }
        var _proto = NativeAdClient.prototype;
        /**
         * @zh
         * 加载原生广告
         * @en
         * Load native ad.
         * @param unitId 
         *  @zh 单元Id
         *  @en The unit id
         * @param size 
         *  @zh 广告的大小
         *  @en The ad size
         * @param nativeListener 
         *  @zh 监听器
         *  @en The listener
         */
        _proto.load = function load(unitId, size, nativeListener) {
          log(module$1, "load", "unitId = " + unitId);
          this.nativeAdListener = nativeListener;
          var req = new LoadNativeAdREQ(unitId);
          req.size = size;
          bridge.sendToNative(js.getClassName(LoadNativeAdREQ), req, js.getClassName(LoadNativeAdACK), function (ack) {
            log(module$1, "load", "LoadNativeAdACK: " + ack);
          }, this);
        }

        /**
         * @zh
         * 销毁原生广告
         * @en
         * Destroy the native ad
         */;
        _proto.destroy = function destroy() {
          log(module$1, "destroy");
          this.nativeAdListener = null;
          bridge.sendToNative(js.getClassName(DestroyNativeAdREQ), {
            unitId: this.unitId
          }, js.getClassName(DestroyBannerACK), function (ack) {
            log(module$1, "destroy", "DestroyNativeAdACK = " + ack);
          });
        };
        _proto.onNativeLoadedNTF = function onNativeLoadedNTF(ntf) {
          if (this.nativeAdListener) {
            var listener = this.nativeAdListener;
            if (listener && listener.onNativeAdLoaded) {
              listener.onNativeAdLoaded();
            }
          }
        };
        _proto.onNativeAdListenerNTF = function onNativeAdListenerNTF(ntf) {
          var method = this.nativeAdListener[ntf.method];
          if (method) {
            method(ntf.loadAdError);
          }
        };
        _proto.onPaidEvent = function onPaidEvent(ntf) {
          var paid = this.nativeAdListener;
          if (paid && paid.onPaidEvent) {
            paid.onPaidEvent(ntf);
          }
        };
        _createClass(NativeAdClient, [{
          key: "nativeAdListener",
          get:
          /**
           * @zh
           * 原生广告的监听器
           * @en
           * Listener for the native ad
           */
          function get() {
            return this._nativeAdListener;
          }

          /**
           * @zh
           * 原生广告的监听器
           * @en
           * Listener for the native ad
           */,
          set: function set(value) {
            if (this._nativeAdListener) {
              route.off(js.getClassName(NativeLoadedNTF), this.onNativeLoadedNTF, this);
              route.off(js.getClassName(NativeAdListenerNTF), this.onNativeAdListenerNTF, this);
              route.off(js.getClassName(NativePaidEventNTF), this.onPaidEvent, this);
            }
            this._nativeAdListener = value;
            if (this._nativeAdListener) {
              route.on(js.getClassName(NativeLoadedNTF), this.onNativeLoadedNTF, this);
              route.on(js.getClassName(NativeAdListenerNTF), this.onNativeAdListenerNTF, this);
              route.on(js.getClassName(NativePaidEventNTF), this.onPaidEvent, this);
            }
          }
        }]);
        return NativeAdClient;
      }(AdClient));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NativeAdListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "98273YC00NE6pnlSV02h9oy", "NativeAdListener", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @zh
       * 原生广告事件的监听
       * @en
       * The union of all native listener
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NativeAd.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Base.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Base;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      Base = module.Base;
    }],
    execute: function () {
      var _dec, _class, _dec2, _class3, _dec3, _class4, _dec4, _class5, _dec5, _class7, _dec6, _class8;
      cclegacy._RF.push({}, "7b7c2Gl5W9GoreLVP8oHwTY", "NativeAd", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var NativeAdTemplateSize = exports('NativeAdTemplateSize', /*#__PURE__*/function (NativeAdTemplateSize) {
        NativeAdTemplateSize["Small"] = "small";
        NativeAdTemplateSize["Medium"] = "medium";
        return NativeAdTemplateSize;
      }({}));
      var LoadNativeAdREQ = exports('LoadNativeAdREQ', (_dec = ccclass("LoadNativeAdREQ"), _dec(_class = /*#__PURE__*/function (_Base) {
        _inheritsLoose(LoadNativeAdREQ, _Base);
        function LoadNativeAdREQ() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Base.call.apply(_Base, [this].concat(args)) || this;
          _this.size = NativeAdTemplateSize.Small;
          return _this;
        }
        return LoadNativeAdREQ;
      }(Base)) || _class));
      var LoadNativeAdACK = exports('LoadNativeAdACK', (_dec2 = ccclass("LoadNativeAdACK"), _dec2(_class3 = /*#__PURE__*/function (_Base2) {
        _inheritsLoose(LoadNativeAdACK, _Base2);
        function LoadNativeAdACK() {
          return _Base2.apply(this, arguments) || this;
        }
        return LoadNativeAdACK;
      }(Base)) || _class3));
      var NativeLoadedNTF = exports('NativeLoadedNTF', (_dec3 = ccclass("NativeLoadedNTF"), _dec3(_class4 = /*#__PURE__*/function (_Base3) {
        _inheritsLoose(NativeLoadedNTF, _Base3);
        function NativeLoadedNTF() {
          return _Base3.apply(this, arguments) || this;
        }
        return NativeLoadedNTF;
      }(Base)) || _class4));
      var NativeAdListenerNTF = exports('NativeAdListenerNTF', (_dec4 = ccclass("NativeAdListenerNTF"), _dec4(_class5 = /*#__PURE__*/function (_Base4) {
        _inheritsLoose(NativeAdListenerNTF, _Base4);
        function NativeAdListenerNTF() {
          var _this2;
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          _this2 = _Base4.call.apply(_Base4, [this].concat(args)) || this;
          _this2.method = void 0;
          _this2.loadAdError = void 0;
          return _this2;
        }
        return NativeAdListenerNTF;
      }(Base)) || _class5));
      var DestroyNativeAdREQ = exports('DestroyNativeAdREQ', (_dec5 = ccclass("DestroyNativeAdREQ"), _dec5(_class7 = /*#__PURE__*/function (_Base5) {
        _inheritsLoose(DestroyNativeAdREQ, _Base5);
        function DestroyNativeAdREQ() {
          return _Base5.apply(this, arguments) || this;
        }
        return DestroyNativeAdREQ;
      }(Base)) || _class7));
      var DestroyNativeAdACK = exports('DestroyNativeAdACK', (_dec6 = ccclass("DestroyNativeAdACK"), _dec6(_class8 = /*#__PURE__*/function (_Base6) {
        _inheritsLoose(DestroyNativeAdACK, _Base6);
        function DestroyNativeAdACK() {
          return _Base6.apply(this, arguments) || this;
        }
        return DestroyNativeAdACK;
      }(Base)) || _class8));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OnNativeAdLoadedListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2a2e6fRYgBIe6tHmj67gL2S", "OnNativeAdLoadedListener", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @zh
       * 原生广告的加载回调
       * @en
       * Callbacks of native ad
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OnPaidEventListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0f711NbGkZBQ48WmxkneNNW", "OnPaidEventListener", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @zh
       * 任何支持 OnPaidEventListener 的广告回调
       * 调用 setOnPaidEventListener 就会支持。
       * @en
       * Paid event after the native ad has a paid listener by calling the `setOnPaidEventListener` method
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OnShowAdCompleteListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "62f0fffhWRH1rGcDJtj6FDT", "OnShowAdCompleteListener", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @zh
       * 广告展示完毕的回调
       * @en
       * Show Ad complete callback
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OnUserEarnedRewardListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6d0a2WiUoRBA455UFNYwzFU", "OnUserEarnedRewardListener", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @zh
       * 激励广告用户获得奖励的回调
       * @en
       * Listener for rewarded ad.
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OpenBoxSelectionViewModel.ts", ['cc', './SharedService.ts', './GameManager.ts', './GameStatus.ts', './CharacterChanceCalculator.ts'], function (exports) {
  var cclegacy, _decorator, SharedService, GameManager, GameStatus, CharacterChanceCalculator;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      SharedService = module.SharedService;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      GameStatus = module.GameStatus;
    }, function (module) {
      CharacterChanceCalculator = module.CharacterChanceCalculator;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "d84549NWz9CQIw54OTQB5Ts", "OpenBoxSelectionViewModel", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var OpenBoxSelectionViewModel = exports('OpenBoxSelectionViewModel', (_dec = ccclass('OpenBoxSelectionViewModel'), _dec(_class = /*#__PURE__*/function () {
        function OpenBoxSelectionViewModel() {}
        var _proto = OpenBoxSelectionViewModel.prototype;
        _proto.openBox = function openBox(boxAmount) {
          if (boxAmount == 1) {
            var boxChanceCalculator = new CharacterChanceCalculator();
            var boxId = boxChanceCalculator.singleBoxOpen(GameManager.instance.currentCharacterPackId);
            SharedService.instance.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.SHOW_1_BOX, boxId);
          } else {
            SharedService.instance.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.SHOW_6_BOX);
          }
        };
        return OpenBoxSelectionViewModel;
      }()) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OpenBoxSelectionView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameManager.ts', './OpenBoxSelectionViewModel.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Enum, Button, EventHandler, Component, GameManager, OpenBoxSelectionViewModel;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Enum = module.Enum;
      Button = module.Button;
      EventHandler = module.EventHandler;
      Component = module.Component;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      OpenBoxSelectionViewModel = module.OpenBoxSelectionViewModel;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "761d1aJgL5AtppM2jgt39Nm", "OpenBoxSelectionView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        requireComponent = _decorator.requireComponent;
      var PackType = /*#__PURE__*/function (PackType) {
        PackType[PackType["one"] = 0] = "one";
        PackType[PackType["six"] = 1] = "six";
        return PackType;
      }(PackType || {});
      Enum(PackType);
      var OpenBoxSelectionView = exports('OpenBoxSelectionView', (_dec = ccclass('OpenBoxSelectionView'), _dec2 = requireComponent(Button), _dec3 = property({
        type: PackType
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(OpenBoxSelectionView, _Component);
        function OpenBoxSelectionView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "packType", _descriptor, _assertThisInitialized(_this));
          _this._viewModel = void 0;
          return _this;
        }
        var _proto = OpenBoxSelectionView.prototype;
        _proto.onLoad = function onLoad() {
          this._viewModel = new OpenBoxSelectionViewModel();
          this._initButton();
        };
        _proto._initButton = function _initButton() {
          var clickEventHandler = new EventHandler();
          clickEventHandler.target = this.node;
          clickEventHandler.component = 'OpenBoxSelectionView';
          clickEventHandler.handler = this.packType === PackType.one ? '_openOneBox' : '_openPack';
          var button = this.node.getComponent(Button);
          button.clickEvents.push(clickEventHandler);
        };
        _proto._openOneBox = function _openOneBox() {
          console.log('Single');
          var userComponent = GameManager.instance.userComponent;
          if (userComponent.getCoin() >= 10) {
            userComponent.onCoinDecreased(10);
            this._viewModel.openBox(1);
          }
          console.log(userComponent.getCoin());
        };
        _proto._openPack = function _openPack() {
          console.log('Pack');
          var userComponent = GameManager.instance.userComponent;
          if (userComponent.getCoin() >= 60) {
            userComponent.onCoinDecreased(60);
            this._viewModel.openBox(6);
          }
        };
        return OpenBoxSelectionView;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "packType", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return PackType.one;
        }
      }), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PackChanceCalculator.ts", ['cc'], function (exports) {
  var cclegacy, randomRangeInt;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      randomRangeInt = module.randomRangeInt;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ebc07On/3RIkqNzoA7kzdil", "PackChanceCalculator", undefined);
      var PackChanceCalculator = exports('PackChanceCalculator', /*#__PURE__*/function () {
        function PackChanceCalculator() {
          // Default BoxID --- "G" is rare
          this.packId = ["A", "B", "C", "D", "E", "F"];
          this._maxBoxes = 6;
          this._rareBoxId = "G";
        }
        var _proto = PackChanceCalculator.prototype;
        _proto.createPack = function createPack() {
          var packs = [];
          var randomRarePack = randomRangeInt(0, this._maxBoxes);
          console.log("Rare Pack is " + (randomRarePack + 1));
          for (var index = 0; index < this._maxBoxes; index++) {
            var pack = this._createArrayOfRandomPack();

            // Remove 1 BoxID and Add "G" Rare
            if (index == randomRarePack) {
              pack.splice(randomRangeInt(0, this._maxBoxes), 1, this._rareBoxId);
            }
            // console.log(`Length : ${this.packId.length} --- ${pack}`);
            packs.push(pack);
          }
          console.log(packs);
          return packs;
        };
        _proto._createArrayOfRandomPack = function _createArrayOfRandomPack() {
          var newPack = [];
          for (var index = 1; index <= this.packId.length; index++) {
            var random = Math.floor(Math.random() * index);
            newPack.splice(random, 0, this.packId[index - 1]);
          }
          // console.log(`Length : ${this.newPack.length} --- ${newPack}`);

          return newPack;
        };
        return PackChanceCalculator;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PackManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PackChanceCalculator.ts', './Pack.ts', './GameStatus.ts', './GameManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Component, PackChanceCalculator, Pack, GameStatus, GameManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      PackChanceCalculator = module.PackChanceCalculator;
    }, function (module) {
      Pack = module.Pack;
    }, function (module) {
      GameStatus = module.GameStatus;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "ea08dWMMK1K1bphr4z++fY3", "PackManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        requireComponent = _decorator.requireComponent;

      //MVVM View
      var PackManager = exports('PackManager', (_dec = ccclass('PackManager'), _dec2 = requireComponent(PackChanceCalculator), _dec3 = property(Node), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PackManager, _Component);
        function PackManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.packGroupId = void 0;
          _this._packGroupSelected = [];
          _this.eventData = void 0;
          _initializerDefineProperty(_this, "packs", _descriptor, _assertThisInitialized(_this));
          _this.packChanceCalculator = void 0;
          return _this;
        }
        var _proto = PackManager.prototype;
        _proto.onEnable = function onEnable() {
          this._initPack();
          this.packChanceCalculator = new PackChanceCalculator();
          this.packGroupId = this.packChanceCalculator.createPack();
        };
        _proto._initPack = function _initPack() {
          var _this2 = this;
          this.packs.forEach(function (pack) {
            pack.getComponent(Pack).packManager = _this2.node;
          });
        };
        _proto.showBoxPreview = function showBoxPreview(eventData) {
          this.eventData = eventData;
          console.log(eventData);
          // console.log(this.packGroupId.length)

          switch (eventData) {
            case "Pack1<Pack>":
              {
                this._packGroupSelected = this.packGroupId[0];
                break;
              }
            case "Pack2<Pack>":
              {
                this._packGroupSelected = this.packGroupId[1];
                break;
              }
            case "Pack3<Pack>":
              {
                this._packGroupSelected = this.packGroupId[2];
                break;
              }
            case "Pack4<Pack>":
              {
                this._packGroupSelected = this.packGroupId[3];
                break;
              }
            case "Pack5<Pack>":
              {
                this._packGroupSelected = this.packGroupId[4];
                break;
              }
            case "Pack6<Pack>":
              {
                this._packGroupSelected = this.packGroupId[5];
                break;
              }
          }
          GameManager.instance.eventTarget.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.BOX_SELECTION, this._packGroupSelected);
        };
        return PackManager;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "packs", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PackModel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameManager.ts', './PackChanceCalculator.ts'], function (exports) {
  var _createClass, cclegacy, GameManager, PackChanceCalculator;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      PackChanceCalculator = module.PackChanceCalculator;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ac274r6pWtLqIRfg4z0DewK", "PackModel", undefined);
      var PackModel = exports('PackModel', /*#__PURE__*/function () {
        function PackModel() {
          this._characterGroupId = [];
          this._serieView = void 0;
          this._createPackGroup();
        }
        var _proto = PackModel.prototype;
        _proto._createPackGroup = function _createPackGroup() {
          this._characterGroupId = new PackChanceCalculator().createPack();
        };
        _createClass(PackModel, [{
          key: "characterGroupId",
          get: function get() {
            return this._characterGroupId;
          }
        }, {
          key: "serieView",
          get: function get() {
            this._serieView = GameManager.instance.serieRepository.currentSerieView;
            return this._serieView;
          }
        }]);
        return PackModel;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Pack.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PackManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, EventHandler, Button, Component, PackManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      EventHandler = module.EventHandler;
      Button = module.Button;
      Component = module.Component;
    }, function (module) {
      PackManager = module.PackManager;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "7e32fy8IFhK24Fg99BvKkPP", "Pack", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Pack = exports('Pack', (_dec = ccclass('Pack'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Pack, _Component);
        function Pack() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "id", _descriptor, _assertThisInitialized(_this));
          _this.packManager = null;
          return _this;
        }
        var _proto = Pack.prototype;
        _proto.start = function start() {
          this.id = this.name;
          this._initButton();
        };
        _proto._initButton = function _initButton() {
          var clickEventHandler = new EventHandler();
          clickEventHandler.target = this.node;
          clickEventHandler.component = 'Pack';
          clickEventHandler.handler = '_showBoxPreview';
          clickEventHandler.customEventData = this.name;
          var button = this.node.getComponent(Button);
          button.clickEvents.push(clickEventHandler);
        };
        _proto._showBoxPreview = function _showBoxPreview(event, customEventData) {
          console.log("BoxIds ::: " + customEventData);
          this.packManager.getComponent(PackManager).showBoxPreview(customEventData);
        };
        return Pack;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "-";
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PackViewModel.ts", ['cc', './PackModel.ts', './GameManager.ts', './GameStatus.ts', './SharedService.ts'], function (exports) {
  var cclegacy, Sprite, PackModel, GameManager, GameStatus, SharedService;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Sprite = module.Sprite;
    }, function (module) {
      PackModel = module.PackModel;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      GameStatus = module.GameStatus;
    }, function (module) {
      SharedService = module.SharedService;
    }],
    execute: function () {
      cclegacy._RF.push({}, "10241tFQWJM3Y65yFYhUVr1", "PackViewModel", undefined);
      var PackViewModel = exports('PackViewModel', /*#__PURE__*/function () {
        function PackViewModel() {
          this._model = void 0;
          this._model = new PackModel();
        }
        var _proto = PackViewModel.prototype;
        _proto.onPackSelected = function onPackSelected(eventData) {
          var packIndex = -1;
          switch (eventData) {
            case "Pack1":
              {
                packIndex = 1;
                break;
              }
            case "Pack2":
              {
                packIndex = 2;
                break;
              }
            case "Pack3":
              {
                packIndex = 3;
                break;
              }
            case "Pack4":
              {
                packIndex = 4;
                break;
              }
            case "Pack5":
              {
                packIndex = 5;
                break;
              }
            case "Pack6":
              {
                packIndex = 6;
                break;
              }
            case "Pack6":
              {
                packIndex = 6;
                break;
              }
          }
          if (packIndex >= 1) {
            this._showBoxPreview(this._model.characterGroupId[packIndex - 1]); // เพราะเป็น Array Index เลยให้ packIndex-1 
          }
        };

        _proto.changeBG = function changeBG(bgSprite) {
          bgSprite.spriteFrame = this._model.serieView.background[0];
        };
        _proto.changePackSprite = function changePackSprite(pack) {
          pack.getComponent(Sprite).spriteFrame = this._model.serieView.packSprite;
          console.log("Sprite Name = " + this._model.serieView.packSprite.name);
        };
        _proto._showBoxPreview = function _showBoxPreview(characterGroupId) {
          SharedService.instance.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.BOX_SELECTION, characterGroupId);
        };
        return PackViewModel;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PackView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PackViewModel.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Sprite, Button, EventHandler, Component, PackViewModel;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Sprite = module.Sprite;
      Button = module.Button;
      EventHandler = module.EventHandler;
      Component = module.Component;
    }, function (module) {
      PackViewModel = module.PackViewModel;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "df29463cQlCPZlO3SRjqd2e", "PackView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PackView = exports('PackView', (_dec = ccclass('PackView'), _dec2 = property(Node), _dec3 = property(Sprite), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PackView, _Component);
        function PackView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "packs", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bg", _descriptor2, _assertThisInitialized(_this));
          _this._viewModel = void 0;
          return _this;
        }
        var _proto = PackView.prototype;
        _proto.onLoad = function onLoad() {
          this._viewModel = new PackViewModel();
          console.log("Create PackView");
          this._initialize();
        };
        _proto.onEnable = function onEnable() {
          if (this._viewModel) {
            this._initialize();
          }
        };
        _proto._initialize = function _initialize() {
          var _this2 = this;
          this.packs.forEach(function (pack) {
            var component = pack.getComponent(Button);
            if (component) {
              _this2._initialButtonEvent(pack);
            }
            _this2._viewModel.changePackSprite(pack);
          });
          this._viewModel.changeBG(this.bg);
        };
        _proto._initialButtonEvent = function _initialButtonEvent(node) {
          var clickEventHandler = new EventHandler();
          clickEventHandler.target = this.node;
          clickEventHandler.component = 'PackView';
          clickEventHandler.handler = '_onPackSelected';
          clickEventHandler.customEventData = node.name;
          var button = node.getComponent(Button);
          button.clickEvents.push(clickEventHandler);
        };
        _proto._onPackSelected = function _onPackSelected(event, customEventData) {
          console.log("BoxIds ::: " + customEventData);
          this._viewModel.onPackSelected(customEventData);
        };
        return PackView;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "packs", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bg", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PaidEventNTF.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Base.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Base;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      Base = module.Base;
    }],
    execute: function () {
      var _dec, _class, _dec2, _class3, _dec3, _class4, _dec4, _class5, _dec5, _class6, _dec6, _class7, _dec7, _class8;
      cclegacy._RF.push({}, "e2d81qcvaVBva080tOWZBU/", "PaidEventNTF", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PaidEventNTF = exports('PaidEventNTF', (_dec = ccclass("PaidEventNTF"), _dec(_class = /*#__PURE__*/function (_Base) {
        _inheritsLoose(PaidEventNTF, _Base);
        function PaidEventNTF() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Base.call.apply(_Base, [this].concat(args)) || this;
          _this.valueMicros = void 0;
          _this.currencyCode = void 0;
          _this.precision = void 0;
          _this.adSourceName = void 0;
          _this.adSourceId = void 0;
          _this.adSourceInstanceName = void 0;
          _this.adSourceInstanceId = void 0;
          _this.mediationGroupName = void 0;
          _this.mediationABTestName = void 0;
          _this.mediationABTestVariant = void 0;
          return _this;
        }
        return PaidEventNTF;
      }(Base)) || _class));
      var BannerPaidEventNTF = exports('BannerPaidEventNTF', (_dec2 = ccclass("BannerPaidEventNTF"), _dec2(_class3 = /*#__PURE__*/function (_PaidEventNTF) {
        _inheritsLoose(BannerPaidEventNTF, _PaidEventNTF);
        function BannerPaidEventNTF() {
          return _PaidEventNTF.apply(this, arguments) || this;
        }
        return BannerPaidEventNTF;
      }(PaidEventNTF)) || _class3));
      var InterstitialPaidEventNTF = exports('InterstitialPaidEventNTF', (_dec3 = ccclass("InterstitialPaidEventNTF"), _dec3(_class4 = /*#__PURE__*/function (_PaidEventNTF2) {
        _inheritsLoose(InterstitialPaidEventNTF, _PaidEventNTF2);
        function InterstitialPaidEventNTF() {
          return _PaidEventNTF2.apply(this, arguments) || this;
        }
        return InterstitialPaidEventNTF;
      }(PaidEventNTF)) || _class4));
      var NativePaidEventNTF = exports('NativePaidEventNTF', (_dec4 = ccclass("NativePaidEventNTF"), _dec4(_class5 = /*#__PURE__*/function (_PaidEventNTF3) {
        _inheritsLoose(NativePaidEventNTF, _PaidEventNTF3);
        function NativePaidEventNTF() {
          return _PaidEventNTF3.apply(this, arguments) || this;
        }
        return NativePaidEventNTF;
      }(PaidEventNTF)) || _class5));
      var AppOpenPaidEventNTF = exports('AppOpenPaidEventNTF', (_dec5 = ccclass("AppOpenPaidEventNTF"), _dec5(_class6 = /*#__PURE__*/function (_PaidEventNTF4) {
        _inheritsLoose(AppOpenPaidEventNTF, _PaidEventNTF4);
        function AppOpenPaidEventNTF() {
          return _PaidEventNTF4.apply(this, arguments) || this;
        }
        return AppOpenPaidEventNTF;
      }(PaidEventNTF)) || _class6));
      var RewardedPaidEventNTF = exports('RewardedPaidEventNTF', (_dec6 = ccclass("RewardedPaidEventNTF"), _dec6(_class7 = /*#__PURE__*/function (_PaidEventNTF5) {
        _inheritsLoose(RewardedPaidEventNTF, _PaidEventNTF5);
        function RewardedPaidEventNTF() {
          return _PaidEventNTF5.apply(this, arguments) || this;
        }
        return RewardedPaidEventNTF;
      }(PaidEventNTF)) || _class7));
      var RewardedInterstitialPaidEventNTF = exports('RewardedInterstitialPaidEventNTF', (_dec7 = ccclass("RewardedInterstitialPaidEventNTF"), _dec7(_class8 = /*#__PURE__*/function (_PaidEventNTF6) {
        _inheritsLoose(RewardedInterstitialPaidEventNTF, _PaidEventNTF6);
        function RewardedInterstitialPaidEventNTF() {
          return _PaidEventNTF6.apply(this, arguments) || this;
        }
        return RewardedInterstitialPaidEventNTF;
      }(PaidEventNTF)) || _class8));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PartModel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1a33fujmGxFSrsxbrZ4kIVn", "PartModel", undefined);
      var PartModel = exports('PartModel', /*#__PURE__*/function () {
        function PartModel(id, shadowMatch, clonePart) {
          this._id = void 0;
          this._collider = void 0;
          this._rigid = void 0;
          this._shadowMatch = null;
          this._clonePart = null;
          this.character = null;
          this.parts = [];
          this._id = id;
          this._shadowMatch = shadowMatch;
          this._clonePart = clonePart;
        }
        _createClass(PartModel, [{
          key: "collider",
          get: function get() {
            return this._collider;
          },
          set: function set(enable) {
            this._collider.enabled = enable;
          }
        }, {
          key: "rigid",
          get: function get() {
            return this._rigid;
          },
          set: function set(enable) {
            this._rigid.enabled = enable;
          }
        }]);
        return PartModel;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PartViewModel.ts", ['cc', './SharedService.ts'], function (exports) {
  var cclegacy, _decorator, SharedService;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      SharedService = module.SharedService;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "1eb7eWPzB5ITJxKzmIkvj41", "PartViewModel", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PartViewModel = exports('PartViewModel', (_dec = ccclass('PartViewModel'), _dec(_class = /*#__PURE__*/function () {
        function PartViewModel(view) {
          this._model = void 0;
          this._view = void 0;
          this._view = view;
          // console.log(`PartViewModel Initialize`);
        }

        var _proto = PartViewModel.prototype;
        _proto.onShareServiceListener = function onShareServiceListener() {
          SharedService.instance.on("share-part-data", this._onShareService, this);
          // console.log(`Share Service Listener`);
        };

        _proto._onShareService = function _onShareService(status, eventData1, eventData2) {
          this._view.onSetupData(eventData1, eventData2);
          // console.log(`eventData1 : ${eventData1.name}, eventData2 : ${eventData2.name}`);
        };

        _proto.onAllPartsCompletedShareService = function onAllPartsCompletedShareService(eventData1) {
          SharedService.instance.emit("check-all-parts-completed", null, eventData1);
          // console.log(`Share Service Emit : eventData1 = ${eventData1.name}, eventData2 = ${eventData2.name}`);
        };

        return PartViewModel;
      }()) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PartView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PartViewModel.ts', './CharacterComponent.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Collider2D, RigidBody2D, Contact2DType, Input, instantiate, Sprite, Vec3, ScrollView, Component, PartViewModel, CharacterComponent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Collider2D = module.Collider2D;
      RigidBody2D = module.RigidBody2D;
      Contact2DType = module.Contact2DType;
      Input = module.Input;
      instantiate = module.instantiate;
      Sprite = module.Sprite;
      Vec3 = module.Vec3;
      ScrollView = module.ScrollView;
      Component = module.Component;
    }, function (module) {
      PartViewModel = module.PartViewModel;
    }, function (module) {
      CharacterComponent = module.CharacterComponent;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "3a071tQv+lNL6WCvk+zjiiA", "PartView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PartView = exports('PartView', (_dec = ccclass('PartView'), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PartView, _Component);
        function PartView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._viewModel = void 0;
          _this.partsId = [];
          _this.parts = [];
          _this.character = null;
          _initializerDefineProperty(_this, "partArea", _descriptor, _assertThisInitialized(_this));
          _this._isColliderMatch = false;
          _this._partTarget = void 0;
          _this._clonePart = null;
          return _this;
        }
        var _proto = PartView.prototype;
        _proto.onLoad = function onLoad() {
          // console.log('PartView onLoad');
          this._viewModel = new PartViewModel(this.getComponent(PartView));
          this._viewModel.onShareServiceListener();
        };
        _proto.start = function start() {
          // console.log('PartView start');
        };
        _proto._initialize = function _initialize() {
          var _this2 = this;
          this.parts.forEach(function (part, index) {
            _this2.partsId[index] = parseInt(part.name.substring(0, 1));
            part.getComponent(Collider2D).enabled = false;
            part.getComponent(RigidBody2D).enabled = false;
            part.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, _this2._onBeginContact, _this2);
            part.getComponent(Collider2D).on(Contact2DType.END_CONTACT, _this2._onEndContact, _this2);
            _this2._onInputActive(part);
          });
        }

        // ใช้หรับรับข้อมูล ShareService จาก GueassCharacterViewModel
        ;

        _proto.onSetupData = function onSetupData(parts, character) {
          this.parts = parts;
          this.character = character;
          this._initialize();
          // console.log(`PartView onSetupData : ${this.parts.length} + ${this.character.name}`);
        };

        _proto._onInputActive = function _onInputActive(part) {
          part.on(Input.EventType.TOUCH_START, this._onTouchStart, this);
          part.on(Input.EventType.TOUCH_MOVE, this._onTouchMove, this);
          part.on(Input.EventType.TOUCH_END, this._onTouchEnd, this);
          part.on(Input.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
        };
        _proto._offInputEvent = function _offInputEvent(part) {
          part.off(Input.EventType.TOUCH_START, this._onTouchStart, this);
          part.off(Input.EventType.TOUCH_MOVE, this._onTouchMove, this);
          part.off(Input.EventType.TOUCH_END, this._onTouchEnd, this);
          part.off(Input.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
          part.getComponent(Collider2D).off(Contact2DType.BEGIN_CONTACT, this._onBeginContact, this);
          part.getComponent(Collider2D).off(Contact2DType.END_CONTACT, this._onEndContact, this);
        };
        _proto._onTouchStart = function _onTouchStart(event) {
          console.log("Touch Start +++ " + event.target.name);
          this._clonePart = instantiate(event.target);
          this._clonePart.parent = event.target.parent;
          this._clonePart.setSiblingIndex(event.target.getSiblingIndex());
          this._clonePart.getComponent(Sprite).enabled = false;
          event.target.getComponent(Collider2D).enabled = true;
          event.target.getComponent(RigidBody2D).enabled = true;
          event.target.parent = this.node.parent;
          var pos = event.getLocation();
          event.target.setWorldPosition(new Vec3(pos.x, pos.y, 0));
          event.target.scale = new Vec3(1, 1, 1);
          this.partArea.getComponent(ScrollView).enabled = false;
          event.target.getComponent(Collider2D).enable = true;
          event.target.getComponent(RigidBody2D).enable = true;
          this._partTarget = this.character.children.find(function (child) {
            return event.target.name == child.name;
          });
          this.character.getComponent(CharacterComponent).onToggleCollider2D(this._partTarget, true);
          this.character.getComponent(CharacterComponent).onToggleRigidBody2D(this._partTarget, true);
        };
        _proto._onTouchMove = function _onTouchMove(event) {
          // console.log(`Touch Move +++ ${event.target.name}`);
          var pos = event.getLocation();
          event.target.setWorldPosition(new Vec3(pos.x, pos.y, 0));
        };
        _proto._onTouchEnd = function _onTouchEnd(event) {
          // console.log(`Touch End +++ ${event.target.name}`);
          this._onTouchEndOrCancel(event);
        };
        _proto._onTouchCancel = function _onTouchCancel(event) {
          // console.log(`Touch Cancel +++ ${event.target.name}`);
          this._onTouchEndOrCancel(event);
        };
        _proto._onTouchEndOrCancel = function _onTouchEndOrCancel(event) {
          event.target.parent = this.partArea.getChildByPath("Panel/Part");
          event.target.setSiblingIndex(this._clonePart.getSiblingIndex());
          var sprite = event.target.getComponent(Sprite);
          var collider2D = event.target.getComponent(Collider2D);
          var rb2D = event.target.getComponent(RigidBody2D);
          sprite.enabled = true;
          collider2D.enabled = false;
          rb2D.enabled = false;
          this.character.getComponent(CharacterComponent).onToggleCollider2D(this._partTarget, false);
          this.character.getComponent(CharacterComponent).onToggleRigidBody2D(this._partTarget, false);
          this._clonePart.destroy();
          event.target.scale = new Vec3(0.4, 0.4, 0.4);
          this.partArea.getComponent(ScrollView).enabled = true;
          if (this._isColliderMatch) {
            this.character.getComponent(CharacterComponent).onChangePartColor(this._partTarget);
            this._offInputEvent(event.target);
            event.target.destroy();
            console.log("End with Match");
            this._CheckCompletedAllParts();
          } else {
            console.log("End with Un-Match");
            this.character.getComponent(CharacterComponent).onChangePartShadow(this._partTarget);
          }
          this._isColliderMatch = false;
        };
        _proto._onBeginContact = function _onBeginContact(selfCollider, otherCollider, contact) {
          // // will be called once when two colliders begin to contact
          // console.log('onBeginContact');

          if (selfCollider.node.name == otherCollider.node.name) {
            this.character.getComponent(CharacterComponent).onHighLightPartColor(otherCollider.node);
            this._isColliderMatch = true;
            console.log("onBeginContact +++ Match " + otherCollider.node.name + " &&& ColliderMatch = " + this._isColliderMatch);
          } else {
            this._isColliderMatch = false;
            console.log("onBeginContact +++ Doesn't Match " + otherCollider.node.name + " &&& ColliderMatch = " + this._isColliderMatch);
          }
        };
        _proto._onEndContact = function _onEndContact(selfCollider, otherCollider, contact) {
          // will be called once when the contact between two colliders just about to end.
          // this._isColliderMatch = false;
          console.log("onEndContact +++ ColliderMatch = " + this._isColliderMatch);
        };
        _proto._onPreSolve = function _onPreSolve(selfCollider, otherCollider, contact) {
          // will be called every time collider contact should be resolved
          // console.log('onPreSolve');
        };
        _proto._onPostSolve = function _onPostSolve(selfCollider, otherCollider, contact) {
          // will be called every time collider contact should be resolved
          // console.log('onPostSolve');
        };
        _proto._CheckCompletedAllParts = function _CheckCompletedAllParts() {
          console.log("Part left : " + this.partArea.getComponent(ScrollView).content.children.length);

          // รวม Panel และ Part Node
          if (this.partArea.getComponent(ScrollView).content.children.length <= 2) {
            this._viewModel.onAllPartsCompletedShareService(true);
          }
        };
        return PartView;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "partArea", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PitchTossModel.ts", ['cc'], function (exports) {
  var cclegacy, _decorator;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "ac4f5WTsmpGPZA2T522HfW1", "PitchTossModel", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PitchTossModel = exports('PitchTossModel', (_dec = ccclass('PitchTossModel'), _dec(_class = /*#__PURE__*/function () {
        function PitchTossModel() {
          this.rewardSlots = void 0;
          this.rewardSlots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 60];
        }
        var _proto = PitchTossModel.prototype;
        _proto.getRewardForSlot = function getRewardForSlot(slotIndex) {
          return this.rewardSlots[slotIndex] || 0;
        };
        return PitchTossModel;
      }()) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PitchTossViewModel.ts", ['cc', './PitchTossModel.ts'], function (exports) {
  var cclegacy, _decorator, PitchTossModel;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      PitchTossModel = module.PitchTossModel;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "606b0jaeQJNn7+r3C7lvHB/", "PitchTossViewModel", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PitchTossViewModel = exports('PitchTossViewModel', (_dec = ccclass('PitchTossViewModel'), _dec(_class = /*#__PURE__*/function () {
        function PitchTossViewModel() {
          this.pitchTossModel = void 0;
          this.pitchTossModel = new PitchTossModel();
        }
        var _proto = PitchTossViewModel.prototype;
        _proto.calculateTossDistance = function calculateTossDistance(start, end) {
          var distance = end.subtract(start).length();
          var maxDistance = 500;
          var minDistance = 50;
          return Math.min(Math.max(distance, minDistance), maxDistance) * 5;
        };
        _proto.getReward = function getReward(slotIndex) {
          return this.pitchTossModel.getRewardForSlot(slotIndex);
        };
        return PitchTossViewModel;
      }()) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PitchTossView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PitchTossViewModel.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Vec3, tween, UITransform, Component, PitchTossViewModel;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Vec3 = module.Vec3;
      tween = module.tween;
      UITransform = module.UITransform;
      Component = module.Component;
    }, function (module) {
      PitchTossViewModel = module.PitchTossViewModel;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "1d773SdMDtKmKMakaPbJJYY", "PitchTossView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PitchTossView = exports('PitchTossView', (_dec = ccclass('PitchTossView'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property([Node]), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PitchTossView, _Component);
        function PitchTossView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "tossArea", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "coin", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "slots", _descriptor3, _assertThisInitialized(_this));
          _this._viewModel = void 0;
          _this._swipeStart = void 0;
          _this._isTossing = false;
          _this._initCoinPosition = void 0;
          return _this;
        }
        var _proto = PitchTossView.prototype;
        _proto.onLoad = function onLoad() {
          this._initCoinPosition = this.coin.getPosition();
          console.log(this._initCoinPosition);
          this._viewModel = new PitchTossViewModel();
          this.tossArea.on(Node.EventType.TOUCH_START, this._onTouchStart, this);
          this.tossArea.on(Node.EventType.TOUCH_END, this._onTouchEnd, this);
        };
        _proto._resetCoinPosition = function _resetCoinPosition() {
          this.coin.setPosition(this._initCoinPosition);
        };
        _proto._onTouchStart = function _onTouchStart(event) {
          if (this._isTossing) return;
          this._swipeStart = event.getLocation();
          console.log("Touch Coin Start");
        };
        _proto._onTouchEnd = function _onTouchEnd(event) {
          if (this._isTossing) return;
          this._resetCoinPosition();
          var swipeEnd = event.getLocation();
          if (this._swipeStart < swipeEnd) return;
          var tossDistance = this._viewModel.calculateTossDistance(this._swipeStart, swipeEnd);
          this._tossCoin(tossDistance);
          console.log("Touch Coin Ended --- Distance = " + tossDistance);
        };
        _proto._tossCoin = function _tossCoin(distance) {
          var _this2 = this;
          this._isTossing = true;
          var startPosition = new Vec3(0, -550, 0);
          var targetPosition = startPosition.add(new Vec3(0, distance, 0));
          tween(this.coin).to(0.6, {
            position: targetPosition
          }).call(function () {
            _this2._onCoinFall();
            _this2._isTossing = false;
          }).start();
          console.log("Toss Coin");
        };
        _proto._onCoinFall = function _onCoinFall() {
          console.log("Coin Fall");
          var landedSlot = this._detectSlot();
          if (landedSlot >= 0) {
            var reward = this._viewModel.getReward(landedSlot);
            console.log("You landed on slot " + landedSlot + " and won " + reward + " points!");
          } else {
            console.log("No reward, try again.");
          }
        };
        _proto._detectSlot = function _detectSlot() {
          for (var i = 0; i < this.slots.length; i++) {
            var slot = this.slots[i];
            if (this.coin.getComponent(UITransform).getBoundingBox().intersects(slot.getComponent(UITransform).getBoundingBox())) {
              return i;
            }
          }
          return -1;
        };
        return PitchTossView;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tossArea", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "coin", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "slots", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardedAdClient.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Bridge.ts', './RewardedAd.ts', './AdClient.ts', './Route.ts', './PaidEventNTF.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, log, js, bridge, LoadRewardedAdREQ, LoadRewardedAdACK, ShowRewardedAdREQ, ShowRewardedAdACK, RewardedAdLoadCallbackNTF, RewardedFullScreenContentCallbackNTF, OnUserEarnedRewardListenerNTF, AdClient, route, RewardedPaidEventNTF;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
      js = module.js;
    }, function (module) {
      bridge = module.bridge;
    }, function (module) {
      LoadRewardedAdREQ = module.LoadRewardedAdREQ;
      LoadRewardedAdACK = module.LoadRewardedAdACK;
      ShowRewardedAdREQ = module.ShowRewardedAdREQ;
      ShowRewardedAdACK = module.ShowRewardedAdACK;
      RewardedAdLoadCallbackNTF = module.RewardedAdLoadCallbackNTF;
      RewardedFullScreenContentCallbackNTF = module.RewardedFullScreenContentCallbackNTF;
      OnUserEarnedRewardListenerNTF = module.OnUserEarnedRewardListenerNTF;
    }, function (module) {
      AdClient = module.AdClient;
    }, function (module) {
      route = module.route;
    }, function (module) {
      RewardedPaidEventNTF = module.RewardedPaidEventNTF;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9c823kMEqhG354V3pAi+6bv", "RewardedAdClient", undefined);

      /**
       * @zh
       * 激励广告 Rewarded Ad 客户端
       * @en
       * The rewarded ad client
       */
      var module$1 = "[RewardedAdClient]";
      var RewardedAdClient = exports('RewardedAdClient', /*#__PURE__*/function (_AdClient) {
        _inheritsLoose(RewardedAdClient, _AdClient);
        function RewardedAdClient() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _AdClient.call.apply(_AdClient, [this].concat(args)) || this;
          /**
           * @zh
           * 激励广告监听器的联合类型
           * @en
           * Union of listeners for rewarded ad.
           */
          _this._rewardedListener = void 0;
          return _this;
        }
        var _proto = RewardedAdClient.prototype;
        /**
         * @zh
         * 加载记录广告
         * @en
         * Load the rewarded ad
         * @param unitId 
         *  @zh 单元 Id
         *  @en the unit id
         * @param rewardedListener 
         *  @zh 监听器
         *  @en The rewarded ad listener
         */
        _proto.load = function load(unitId, rewardedListener) {
          log(module$1, "load, unitId = " + unitId);
          this.unitId = unitId;
          this.rewardedListener = rewardedListener;
          bridge.sendToNative(js.getClassName(LoadRewardedAdREQ), {
            unitId: unitId
          }, js.getClassName(LoadRewardedAdACK), function (ack) {
            log(module$1, "LoadRewardedAdACK, " + ack);
          }, this);
        }

        /**
         * @zh
         * 销毁事件监听
         * @en
         * Deregister ad listener
         */;
        _proto.destroy = function destroy() {
          log(module$1, "destroy");
          this.rewardedListener = null;
        }

        /**
         * @zh
         * 展示激励广告
         * @en
         * Show the rewarded ad.
         */;
        _proto.show = function show() {
          log(module$1, "show");
          bridge.sendToNative(js.getClassName(ShowRewardedAdREQ), {
            unitId: this.unitId
          }, js.getClassName(ShowRewardedAdACK), function (ack) {
            log(module$1, "ShowRewardedAdREQ, " + ack);
          }, this);
        };
        _proto.onRewardedAdLoadCallbackNTF = function onRewardedAdLoadCallbackNTF(ntf) {
          log(module$1, "onRewardedAdLoadCallbackNTF");
          if (this.rewardedListener) {
            var method = this.rewardedListener[ntf.method];
            if (method) {
              method();
            }
          }
        };
        _proto.onFullScreenContentCallback = function onFullScreenContentCallback(ntf) {
          log(module$1, "onFullScreenContentCallback");
          if (this.rewardedListener) {
            var method = this.rewardedListener[ntf.method];
            if (method) {
              method(ntf.adError);
            }
          }
        };
        _proto.onOnUserEarnedRewardListenerNTF = function onOnUserEarnedRewardListenerNTF(ntf) {
          log(module$1, "onOnUserEarnedRewardListenerNTF");
          if (this.rewardedListener) {
            var onUserEarnedRewardListener = this.rewardedListener;
            if (onUserEarnedRewardListener && onUserEarnedRewardListener.onEarn) {
              onUserEarnedRewardListener.onEarn(ntf.rewardType, ntf.rewardAmount);
            }
          }
        };
        _proto.onPaidEvent = function onPaidEvent(ntf) {
          var paid = this.rewardedListener;
          if (paid && paid.onPaidEvent) {
            paid.onPaidEvent(ntf);
          }
        };
        _createClass(RewardedAdClient, [{
          key: "rewardedListener",
          get:
          /**
           * @zh
           * 激励广告监听器的联合类型
           * @en
           * Union of listeners for rewarded ad.
           */
          function get() {
            return this._rewardedListener;
          },
          set:
          /**
           * @zh
           * 激励广告监听器的联合类型
           * @en
           * Union of listeners for rewarded ad.
           */
          function set(value) {
            if (this._rewardedListener) {
              route.off(js.getClassName(RewardedAdLoadCallbackNTF), this.onRewardedAdLoadCallbackNTF, this);
              route.off(js.getClassName(RewardedFullScreenContentCallbackNTF), this.onFullScreenContentCallback, this);
              route.off(js.getClassName(OnUserEarnedRewardListenerNTF), this.onOnUserEarnedRewardListenerNTF, this);
              route.off(js.getClassName(RewardedPaidEventNTF), this.onPaidEvent, this);
            }
            this._rewardedListener = value;
            if (this._rewardedListener) {
              route.on(js.getClassName(RewardedAdLoadCallbackNTF), this.onRewardedAdLoadCallbackNTF, this);
              route.on(js.getClassName(RewardedFullScreenContentCallbackNTF), this.onFullScreenContentCallback, this);
              route.on(js.getClassName(OnUserEarnedRewardListenerNTF), this.onOnUserEarnedRewardListenerNTF, this);
              route.on(js.getClassName(RewardedPaidEventNTF), this.onPaidEvent, this);
            }
          }
        }]);
        return RewardedAdClient;
      }(AdClient));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardedAdFullScreenContentCallback.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ccbcclTM5BLeaQxYmDylXnq", "RewardedAdFullScreenContentCallback", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @zh
       * FullScreenContentCallback 在激励广告下的别名
       * @en
       * Alias of FullScreenContentCallback for Rewarded Ad.
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardedAdListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b10b1DUlehJBrliYcPlp/9I", "RewardedAdListener", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @zh
       * 激励广告的监听器
       * @en
       * Listener for rewarded ad.
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardedAdLoadCallback.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "59c6ayhqOxKuIKCFYiHSxfo", "RewardedAdLoadCallback", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @zh
       * 激励广告的加载回调
       * @en
       * Listener for rewarded ad.
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardedAd.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Base.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Base;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      Base = module.Base;
    }],
    execute: function () {
      var _dec, _class, _dec2, _class2, _dec3, _class4, _dec4, _class5, _dec5, _class6, _dec6, _class8, _dec7, _class10;
      cclegacy._RF.push({}, "a19d623UwdAurbcHSnuSt4c", "RewardedAd", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var LoadRewardedAdREQ = exports('LoadRewardedAdREQ', (_dec = ccclass("LoadRewardedAdREQ"), _dec(_class = /*#__PURE__*/function (_Base) {
        _inheritsLoose(LoadRewardedAdREQ, _Base);
        function LoadRewardedAdREQ() {
          return _Base.apply(this, arguments) || this;
        }
        return LoadRewardedAdREQ;
      }(Base)) || _class));
      var LoadRewardedAdACK = exports('LoadRewardedAdACK', (_dec2 = ccclass("LoadRewardedAdACK"), _dec2(_class2 = /*#__PURE__*/function (_Base2) {
        _inheritsLoose(LoadRewardedAdACK, _Base2);
        function LoadRewardedAdACK() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Base2.call.apply(_Base2, [this].concat(args)) || this;
          _this.method = void 0;
          _this.loadAdError = void 0;
          return _this;
        }
        return LoadRewardedAdACK;
      }(Base)) || _class2));
      var ShowRewardedAdREQ = exports('ShowRewardedAdREQ', (_dec3 = ccclass("ShowRewardedAdREQ"), _dec3(_class4 = /*#__PURE__*/function (_Base3) {
        _inheritsLoose(ShowRewardedAdREQ, _Base3);
        function ShowRewardedAdREQ() {
          return _Base3.apply(this, arguments) || this;
        }
        return ShowRewardedAdREQ;
      }(Base)) || _class4));
      var ShowRewardedAdACK = exports('ShowRewardedAdACK', (_dec4 = ccclass("ShowRewardedAdACK"), _dec4(_class5 = /*#__PURE__*/function (_Base4) {
        _inheritsLoose(ShowRewardedAdACK, _Base4);
        function ShowRewardedAdACK() {
          return _Base4.apply(this, arguments) || this;
        }
        return ShowRewardedAdACK;
      }(Base)) || _class5));
      var OnUserEarnedRewardListenerNTF = exports('OnUserEarnedRewardListenerNTF', (_dec5 = ccclass("OnUserEarnedRewardListenerNTF"), _dec5(_class6 = /*#__PURE__*/function (_Base5) {
        _inheritsLoose(OnUserEarnedRewardListenerNTF, _Base5);
        function OnUserEarnedRewardListenerNTF() {
          var _this2;
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          _this2 = _Base5.call.apply(_Base5, [this].concat(args)) || this;
          _this2.rewardType = void 0;
          _this2.rewardAmount = void 0;
          return _this2;
        }
        return OnUserEarnedRewardListenerNTF;
      }(Base)) || _class6));
      var RewardedAdLoadCallbackNTF = exports('RewardedAdLoadCallbackNTF', (_dec6 = ccclass("RewardedAdLoadCallbackNTF"), _dec6(_class8 = /*#__PURE__*/function (_Base6) {
        _inheritsLoose(RewardedAdLoadCallbackNTF, _Base6);
        function RewardedAdLoadCallbackNTF() {
          var _this3;
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }
          _this3 = _Base6.call.apply(_Base6, [this].concat(args)) || this;
          _this3.method = void 0;
          _this3.loadAdError = void 0;
          return _this3;
        }
        return RewardedAdLoadCallbackNTF;
      }(Base)) || _class8));
      var RewardedFullScreenContentCallbackNTF = exports('RewardedFullScreenContentCallbackNTF', (_dec7 = ccclass("RewardedFullScreenContentCallbackNTF"), _dec7(_class10 = /*#__PURE__*/function (_Base7) {
        _inheritsLoose(RewardedFullScreenContentCallbackNTF, _Base7);
        function RewardedFullScreenContentCallbackNTF() {
          var _this4;
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }
          _this4 = _Base7.call.apply(_Base7, [this].concat(args)) || this;
          _this4.method = void 0;
          _this4.adError = void 0;
          return _this4;
        }
        return RewardedFullScreenContentCallbackNTF;
      }(Base)) || _class10));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardedInterstitialAdClient.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AdClient.ts', './RewardedInterstitialAd.ts', './Bridge.ts', './Route.ts', './PaidEventNTF.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, js, log, AdClient, LoadRewardedInterstitialAdREQ, LoadRewardedInterstitialAdACK, ShowRewardedInterstitialAdREQ, ShowRewardedInterstitialAdACK, RewardedInterstitialAdLoadCallbackNTF, OnUserEarnedRewardedInterstitialListenerNTF, bridge, route, RewardedInterstitialPaidEventNTF;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      js = module.js;
      log = module.log;
    }, function (module) {
      AdClient = module.AdClient;
    }, function (module) {
      LoadRewardedInterstitialAdREQ = module.LoadRewardedInterstitialAdREQ;
      LoadRewardedInterstitialAdACK = module.LoadRewardedInterstitialAdACK;
      ShowRewardedInterstitialAdREQ = module.ShowRewardedInterstitialAdREQ;
      ShowRewardedInterstitialAdACK = module.ShowRewardedInterstitialAdACK;
      RewardedInterstitialAdLoadCallbackNTF = module.RewardedInterstitialAdLoadCallbackNTF;
      OnUserEarnedRewardedInterstitialListenerNTF = module.OnUserEarnedRewardedInterstitialListenerNTF;
    }, function (module) {
      bridge = module.bridge;
    }, function (module) {
      route = module.route;
    }, function (module) {
      RewardedInterstitialPaidEventNTF = module.RewardedInterstitialPaidEventNTF;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bcd464DuS9EHZFqL+Wv7Zc9", "RewardedInterstitialAdClient", undefined);

      /**
       * @zh
       * 插页式激励广告的广告客户端
       * https://developers.google.com/admob/android/rewarded-interstitial?hl=zh-cn
       * 
       * @en
       * The RewardedInterstitial Ad Client
       */
      var module$1 = "[RewardedInterstitialAdClient]";
      var RewardedInterstitialAdClient = exports('RewardedInterstitialAdClient', /*#__PURE__*/function (_AdClient) {
        _inheritsLoose(RewardedInterstitialAdClient, _AdClient);
        function RewardedInterstitialAdClient() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _AdClient.call.apply(_AdClient, [this].concat(args)) || this;
          /**
           * @zh
           * 监听器的联合
           * @en
           * The union of all listeners
           */
          _this._rewardedInterstitialListener = void 0;
          return _this;
        }
        var _proto = RewardedInterstitialAdClient.prototype;
        /**
         * @zh
         * 加载 
         * @param unitId 
         * @param listener 
         */
        _proto.load = function load(unitId, listener) {
          this.destroy();
          this.unitId = unitId;
          this.rewardedInterstitialListener = listener;
          bridge.sendToNative(js.getClassName(LoadRewardedInterstitialAdREQ), {
            unitId: unitId
          }, js.getClassName(LoadRewardedInterstitialAdACK), function (ack) {}, this);
        }

        /**
         * @zh
         * 销毁插页式激励广告注册的事件
         * @en
         * Deregister all registered event listeners
         */;
        _proto.destroy = function destroy() {
          this.rewardedInterstitialListener = null;
        }

        /**
         * @zh
         * 展示已加载插页式激励广告
         * @en
         * Show the loaded RewardedInterstitial Ad.
         */;
        _proto.show = function show() {
          bridge.sendToNative(js.getClassName(ShowRewardedInterstitialAdREQ), {
            unitId: this.unitId
          }, js.getClassName(ShowRewardedInterstitialAdACK), function (ack) {}, this);
        };
        _proto.onRewardedInterstitialAdLoadCallbackNTF = function onRewardedInterstitialAdLoadCallbackNTF(ntf) {
          log(module$1, "onRewardedInterstitialAdLoadCallbackNTF", ntf.method);
          var method = this.rewardedInterstitialListener[ntf.method];
          if (method) {
            method(ntf.loadAdError);
          }
        };
        _proto.onOnUserEarnedRewardListenerNTF = function onOnUserEarnedRewardListenerNTF(ntf) {
          log(module$1, "onOnUserEarnedRewardListenerNTF");
          if (this.rewardedInterstitialListener) {
            var onEarn = this.rewardedInterstitialListener;
            if (onEarn && onEarn.onEarn) {
              onEarn.onEarn(ntf.rewardType, ntf.rewardAmount);
            }
          }
        };
        _proto.onPaidEvent = function onPaidEvent(ntf) {
          var paid = this.rewardedInterstitialListener;
          if (paid && paid.onPaidEvent) {
            paid.onPaidEvent(ntf);
          }
        };
        _createClass(RewardedInterstitialAdClient, [{
          key: "rewardedInterstitialListener",
          get:
          /**
           * @zh
           * 监听器的联合
           * @en
           * The union of all listeners
           */
          function get() {
            return this._rewardedInterstitialListener;
          },
          set:
          /**
           * @zh
           * 监听器的联合
           * @en
           * The union of all listeners
           */
          function set(value) {
            if (this._rewardedInterstitialListener) {
              route.off(js.getClassName(RewardedInterstitialAdLoadCallbackNTF), this.onRewardedInterstitialAdLoadCallbackNTF, this);
              route.off(js.getClassName(OnUserEarnedRewardedInterstitialListenerNTF), this.onOnUserEarnedRewardListenerNTF, this);
              route.off(js.getClassName(RewardedInterstitialPaidEventNTF), this.onPaidEvent, this);
            }
            this._rewardedInterstitialListener = value;
            if (this._rewardedInterstitialListener) {
              route.on(js.getClassName(RewardedInterstitialAdLoadCallbackNTF), this.onRewardedInterstitialAdLoadCallbackNTF, this);
              route.on(js.getClassName(OnUserEarnedRewardedInterstitialListenerNTF), this.onOnUserEarnedRewardListenerNTF, this);
              route.on(js.getClassName(RewardedInterstitialPaidEventNTF), this.onPaidEvent, this);
            }
          }
        }]);
        return RewardedInterstitialAdClient;
      }(AdClient));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardedInterstitialAdLoadCallback.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "31b4agsy/RARJF/0v6HTKzC", "RewardedInterstitialAdLoadCallback", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
        https://www.cocos.com/
        Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
        The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @zh
       * 插页式激励广告的加载回调
       * @en
       * Listener for Rewarded interstitial ad
       */
      var RewardedInterstitialAdLoadCallback = exports('RewardedInterstitialAdLoadCallback', function RewardedInterstitialAdLoadCallback() {
        this.onAdLoaded = void 0;
        this.onAdFailedToLoad = void 0;
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardedInterstitialAd.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Base.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Base;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      Base = module.Base;
    }],
    execute: function () {
      var _dec, _class, _dec2, _class2, _dec3, _class3, _dec4, _class4, _dec5, _class5, _dec6, _class7;
      cclegacy._RF.push({}, "f35b0ZWnitHd4mL4VnNo7Th", "RewardedInterstitialAd", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var LoadRewardedInterstitialAdREQ = exports('LoadRewardedInterstitialAdREQ', (_dec = ccclass("LoadRewardedInterstitialAdREQ"), _dec(_class = /*#__PURE__*/function (_Base) {
        _inheritsLoose(LoadRewardedInterstitialAdREQ, _Base);
        function LoadRewardedInterstitialAdREQ() {
          return _Base.apply(this, arguments) || this;
        }
        return LoadRewardedInterstitialAdREQ;
      }(Base)) || _class));
      var LoadRewardedInterstitialAdACK = exports('LoadRewardedInterstitialAdACK', (_dec2 = ccclass("LoadRewardedInterstitialAdACK"), _dec2(_class2 = /*#__PURE__*/function (_Base2) {
        _inheritsLoose(LoadRewardedInterstitialAdACK, _Base2);
        function LoadRewardedInterstitialAdACK() {
          return _Base2.apply(this, arguments) || this;
        }
        return LoadRewardedInterstitialAdACK;
      }(Base)) || _class2));
      var ShowRewardedInterstitialAdREQ = exports('ShowRewardedInterstitialAdREQ', (_dec3 = ccclass("ShowRewardedInterstitialAdREQ"), _dec3(_class3 = /*#__PURE__*/function (_Base3) {
        _inheritsLoose(ShowRewardedInterstitialAdREQ, _Base3);
        function ShowRewardedInterstitialAdREQ() {
          return _Base3.apply(this, arguments) || this;
        }
        return ShowRewardedInterstitialAdREQ;
      }(Base)) || _class3));
      var ShowRewardedInterstitialAdACK = exports('ShowRewardedInterstitialAdACK', (_dec4 = ccclass("ShowRewardedInterstitialAdACK"), _dec4(_class4 = /*#__PURE__*/function (_Base4) {
        _inheritsLoose(ShowRewardedInterstitialAdACK, _Base4);
        function ShowRewardedInterstitialAdACK() {
          return _Base4.apply(this, arguments) || this;
        }
        return ShowRewardedInterstitialAdACK;
      }(Base)) || _class4));
      var RewardedInterstitialAdLoadCallbackNTF = exports('RewardedInterstitialAdLoadCallbackNTF', (_dec5 = ccclass("RewardedInterstitialAdLoadCallbackNTF"), _dec5(_class5 = /*#__PURE__*/function (_Base5) {
        _inheritsLoose(RewardedInterstitialAdLoadCallbackNTF, _Base5);
        function RewardedInterstitialAdLoadCallbackNTF() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Base5.call.apply(_Base5, [this].concat(args)) || this;
          _this.method = void 0;
          _this.loadAdError = void 0;
          return _this;
        }
        return RewardedInterstitialAdLoadCallbackNTF;
      }(Base)) || _class5));
      var OnUserEarnedRewardedInterstitialListenerNTF = exports('OnUserEarnedRewardedInterstitialListenerNTF', (_dec6 = ccclass("OnUserEarnedRewardedInterstitialListenerNTF"), _dec6(_class7 = /*#__PURE__*/function (_Base6) {
        _inheritsLoose(OnUserEarnedRewardedInterstitialListenerNTF, _Base6);
        function OnUserEarnedRewardedInterstitialListenerNTF() {
          var _this2;
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          _this2 = _Base6.call.apply(_Base6, [this].concat(args)) || this;
          _this2.rewardType = void 0;
          _this2.rewardAmount = void 0;
          return _this2;
        }
        return OnUserEarnedRewardedInterstitialListenerNTF;
      }(Base)) || _class7));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardedInterstitialFullScreenContentCallback.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "684a9OsAopPXKs/PNqQRKhv", "RewardedInterstitialFullScreenContentCallback", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @zh
       * 插页式激励广告的全屏回调的别名
       * @en
       * Alias of FullScreenContentCallback for rewarded interstitial ad.
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardedInterstitialListener.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2ce66tAXYJKTYcwXNbPTkD2", "RewardedInterstitialListener", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @zh
       * 插页式激励广告的监听器联合类型
       * @en
       * Union for all rewarded interstitial ad.
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Route.ts", ['cc', './Codec.ts'], function (exports) {
  var cclegacy, log, EventTarget, Codec;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
      EventTarget = module.EventTarget;
    }, function (module) {
      Codec = module.Codec;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d7d2caHkbhJx7OojQtGJlDF", "Route", undefined);

      /**
       * @zh
       * 封装 EventTarget，用于事件派发
       * @en
       * Encapsulate an event target to dispatch events from native.
       */
      var module$1 = "[Route]";
      var Route = exports('Route', /*#__PURE__*/function () {
        function Route() {
          this.codec = void 0;
          this._eventTarget = new EventTarget();
        }
        var _proto = Route.prototype;
        _proto.init = function init(codec) {
          log(module$1, "init");
          this.codec = codec;
          return this;
        };
        _proto.destroy = function destroy() {};
        _proto.once = function once(method, handler, thisArg) {
          log(module$1, "once", method);
          this._eventTarget.once(method, handler, thisArg);
        };
        _proto.off = function off(method, response, thisArg) {
          log(module$1, "off", method);
          this._eventTarget.off(method, response, thisArg);
        };
        _proto.on = function on(method, handler, thisArg) {
          log(module$1, "on", method);
          this._eventTarget.on(method, handler, thisArg);
        };
        _proto.dispatch = function dispatch(method, ack) {
          log(module$1, "dispatch", method);
          this._eventTarget.emit(method, ack);
        };
        return Route;
      }());
      var route = exports('route', new Route().init(new Codec()));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SaveLoad.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "85a6fFTysxJxI1px2FZWtfd", "SaveLoad", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SaveLoad = exports('SaveLoad', (_dec = ccclass('SaveLoad'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SaveLoad, _Component);
        function SaveLoad() {
          return _Component.apply(this, arguments) || this;
        }
        SaveLoad.SaveData = function SaveData(key, data) {
          // console.log(`Save Data ::: ${JSON.stringify(data)}`);
          localStorage.setItem(key, JSON.stringify(data));
        };
        SaveLoad.ReadData = function ReadData(key) {
          var data = JSON.parse(localStorage.getItem(key));
          // console.log(`Read Data ::: ${JSON.stringify(data)}`);
          return data;
        };
        return SaveLoad;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScrollViewSwipe.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameManager.ts', './SerieView.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, ScrollView, CCFloat, CCInteger, Node, Vec2, Input, Button, Layout, UITransform, tween, Vec3, Sprite, Color, Component, GameManager, SerieView;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ScrollView = module.ScrollView;
      CCFloat = module.CCFloat;
      CCInteger = module.CCInteger;
      Node = module.Node;
      Vec2 = module.Vec2;
      Input = module.Input;
      Button = module.Button;
      Layout = module.Layout;
      UITransform = module.UITransform;
      tween = module.tween;
      Vec3 = module.Vec3;
      Sprite = module.Sprite;
      Color = module.Color;
      Component = module.Component;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      SerieView = module.SerieView;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "00096WfsutKg6YPnSCv8C77", "ScrollViewSwipe", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        requireComponent = _decorator.requireComponent;
      var ScrollViewSwipe = exports('ScrollViewSwipe', (_dec = ccclass('ScrollViewSwipe'), _dec2 = requireComponent(ScrollView), _dec3 = property(CCFloat), _dec4 = property(CCInteger), _dec5 = property(Node), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ScrollViewSwipe, _Component);
        function ScrollViewSwipe() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "snapSpeed", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "swipeThreshold", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bg", _descriptor3, _assertThisInitialized(_this));
          _this._scrollView = void 0;
          _this._targetIndex = 0;
          _this._itemPositions = [];
          _this._spacing = void 0;
          _this._startTouch = new Vec2(0, 0);
          return _this;
        }
        var _proto = ScrollViewSwipe.prototype;
        _proto.start = function start() {
          this._addTouchListener();
          this._initializeSnapPositions();
        };
        _proto._addTouchListener = function _addTouchListener() {
          this.node.on(Input.EventType.TOUCH_START, this._onTouchStart, this);
          this.node.on(Input.EventType.TOUCH_END, this._onTouchEnd, this);
        };
        _proto._onTouchStart = function _onTouchStart(event) {
          console.log("----- " + event.target.name);
          this._startTouch = event.getLocation();
        };
        _proto._onTouchEnd = function _onTouchEnd(event) {
          var delta = event.getLocation().subtract(this._startTouch);
          this._scrollView.content.children.forEach(function (serie) {
            serie.getComponent(Button).enabled = true;
          });
          if (Math.abs(delta.x) > Math.abs(delta.y) && Math.abs(delta.x) > this.swipeThreshold) {
            delta.x > 0 ? this._onSwipeRight() : this._onSwipeLeft();
          }
          // else {
          //     this._snapToNearest();
          // }
        };

        _proto._onSwipeLeft = function _onSwipeLeft() {
          console.log('Swiped Left');
          this._snapToNearest(140);
        };
        _proto._onSwipeRight = function _onSwipeRight() {
          console.log('Swiped Right');
          this._snapToNearest(-140);
        };
        _proto.onNextButtonPressed = function onNextButtonPressed() {
          this._snapToItem(this._targetIndex + 1);
        };
        _proto.onPreviousButtonPressed = function onPreviousButtonPressed() {
          this._snapToItem(this._targetIndex - 1);
        };
        _proto._initializeSnapPositions = function _initializeSnapPositions() {
          this._scrollView = this.node.getComponent(ScrollView);
          var content = this._scrollView.content;
          var itemNodes = content.children;
          this._spacing = this.node.children[1].children[0].getComponent(Layout).spacingX;
          var itemWidth = 0;
          if (itemNodes.length > 0) {
            itemWidth = itemNodes[0].getComponent(UITransform).width * itemNodes[0].scale.x + this._spacing;
            this._itemPositions = itemNodes.map(function (_, index) {
              return -index * itemWidth + content.position.x;
            });
            console.log("Item width : " + itemWidth);
          }

          // this._itemPositions.forEach((item, index) => {
          //     console.log(`position: ${item}, (-index * itemWidth) + content.position.x = (${-index} * ${itemWidth}) -=+ ${content.position.x} = ${(-index * itemWidth) + content.position.x}`);
          // });

          // console.log(`Content PosX : ${this._scrollView.content!.position.x}`);
        };

        _proto._snapToNearest = function _snapToNearest(threshold) {
          var contentX = this._scrollView.content.position.x;
          console.log("contentX posX = " + contentX);
          var closestIndex = 0;
          var minDistance = Infinity;
          for (var i = 0; i < this._itemPositions.length; i++) {
            var distance = Math.abs(contentX - this._itemPositions[i] - threshold);
            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = i;
            }
          }
          // console.log(`minDistance : ${minDistance}`);

          // Snap to the closest item
          this._snapToItem(closestIndex);
        };
        _proto._snapToItem = function _snapToItem(index) {
          var _this2 = this;
          if (index < 0 || index >= this._itemPositions.length) return;
          this._targetIndex = index;
          var targetPosX = this._itemPositions[index] + this._spacing / 2;

          // this._scrollView.content.position = new Vec3(targetPosX, this._scrollView.content!.position.y, 0);

          tween(this._scrollView.content).to(this.snapSpeed, {
            position: new Vec3(targetPosX, this._scrollView.content.position.y, 0)
          }, {
            easing: 'smooth'
          }).call(function () {
            _this2._scrollView.content.setPosition(new Vec3(targetPosX, _this2._scrollView.content.position.y, 0));
            console.log("Snapped to index : " + _this2._targetIndex);
            console.log("Move to " + targetPosX);
            // currentSerieId เริ่มที่ 1 แต่ targetIndex เริ่มที่ 0
            GameManager.instance.currentSerieId = _this2._targetIndex + 1;
          }).start();
          this._transitionBackground(this._targetIndex);
        };
        _proto._transitionBackground = function _transitionBackground(index) {
          var sprite = this.node.getComponent(Sprite);
          var bgSprite = this.bg.getComponent(Sprite);
          sprite.spriteFrame = this.bg.getComponent(Sprite).spriteFrame;
          var targetSpriteFrame = GameManager.instance.serieRepository.seriesData[index].getComponent(SerieView).background[0];
          var BindTarget = function BindTarget() {
            this.color = void 0;
            this.alpha = void 0;
          };
          var bindTarget = new BindTarget();
          bindTarget.color = Color.WHITE;
          bindTarget.alpha = 255;
          tween(bindTarget).to(0.1, {
            color: Color.WHITE,
            alpha: 0
          }, {
            onUpdate: function onUpdate(tar) {
              bgSprite.color = new Color(tar.color.r, tar.color.g, tar.color.b, tar.alpha);
            }
          }).call(function () {
            // Change the SpriteFrame after the color transition to black
            bgSprite.spriteFrame = targetSpriteFrame;

            // Tween to change color from black to white
            tween(bindTarget).delay(0.05).to(0.1, {
              color: Color.WHITE,
              alpha: 255
            }, {
              onUpdate: function onUpdate(tar) {
                bgSprite.color = new Color(tar.color.r, tar.color.g, tar.color.b, tar.alpha); // Set the sprite to the color inside the 'BindTarget'
              }
            }).start();
          }).start();
        };
        return ScrollViewSwipe;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "snapSpeed", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.3;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "swipeThreshold", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "bg", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SerieData.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6cd641hA0xAWYr3oQtRunyY", "SerieData", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SerieModel.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e1417fJEd5DPI20kG2QAN7y", "SerieModel", undefined);
      var SerieModel = exports('SerieModel', function SerieModel(id, character) {
        this._id = void 0;
        this._box = void 0;
        this._packImage = void 0;
        this._characters = [];
        this._charactePart = [];
        this._id = id;
        this._characters = character;
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SerieRepository.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DefaultData.ts', './GameManager.ts', './SerieView.ts', './SaveLoad.ts', './StorageKey.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, Component, DafaultData, GameManager, SerieView, SaveLoad, StorageKey;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      DafaultData = module.DafaultData;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      SerieView = module.SerieView;
    }, function (module) {
      SaveLoad = module.SaveLoad;
    }, function (module) {
      StorageKey = module.StorageKey;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "eed1cgnv1FEVIPlhPUwWZU7", "SerieRepository", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SerieRepository = exports('SerieRepository', (_dec = ccclass('SerieRepository'), _dec2 = property([Node]), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SerieRepository, _Component);
        function SerieRepository() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "series", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = SerieRepository.prototype;
        // สำหรับแสดงข้อมูล Character Pack ที่กำลังเล่นค้างอยู่
        _proto.loadCharacterPackIdPlayingSerie = function loadCharacterPackIdPlayingSerie() {
          // ถ้ามี Chracter Pack ที่กำลังเล่นอยู่ ณ ปัจจุบัน
          if (GameManager.instance.currentCharacterPackId.length >= 0) {
            return GameManager.instance.currentCharacterPackId;
          }

          // ถ้าไม่มี ให้โหลดจาก Local Storage
          switch (GameManager.instance.currentSerieId) {
            case 3:
              {
                return DafaultData.characterPackIdPlayingSerie03;
              }
            default:
              return DafaultData.characterPackIdPlayingSerie03;
          }
        };
        _proto.setupDefaultCharacterCollectData = function setupDefaultCharacterCollectData() {
          SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + '1', DafaultData.characterCollectedSerie01);
          SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + '2', DafaultData.characterCollectedSerie02);
          SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + '3', DafaultData.characterCollectedSerie03);
          SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + '4', DafaultData.characterCollectedSerie04);
          SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + '5', DafaultData.characterCollectedSerie05);
          SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + '6', DafaultData.characterCollectedSerie06);
          SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + '7', DafaultData.characterCollectedSerie07);
          SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + '8', DafaultData.characterCollectedSerie08);
          SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + '9', DafaultData.characterCollectedSerie09);
          SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + '10', DafaultData.characterCollectedSerie10);
        };
        _proto.loadCurrentCharacterCollectedSerie = function loadCurrentCharacterCollectedSerie(serieId) {
          // switch (GameManager.instance.currentSerieId) {
          //     case 1: {
          //         return DafaultData.characterCollectedSerie01;
          //     }
          //     case 2: {
          //         return DafaultData.characterCollectedSerie02;
          //     }
          //     case 3: {
          //         return DafaultData.characterCollectedSerie03;
          //     }
          //     case 4: {
          //         return DafaultData.characterCollectedSerie04;
          //     }
          //     case 5: {
          //         return DafaultData.characterCollectedSerie05;
          //     }
          //     case 6: {
          //         return DafaultData.characterCollectedSerie06;
          //     }
          //     case 7: {
          //         return DafaultData.characterCollectedSerie07;
          //     }
          //     case 8: {
          //         return DafaultData.characterCollectedSerie08;
          //     }
          //     case 9: {
          //         return DafaultData.characterCollectedSerie09;
          //     }
          //     case 10: {
          //         return DafaultData.characterCollectedSerie10;
          //     }
          //     default:
          //         return DafaultData.characterCollectedSerie01;
          // }
          return SaveLoad.ReadData(StorageKey.CHARACTER_COLLECTED_SERIE + serieId);
        };
        _createClass(SerieRepository, [{
          key: "seriesData",
          get: function get() {
            return this.series;
          },
          set: function set(value) {
            this.series = value;
          }
        }, {
          key: "currentSerieView",
          get: function get() {
            // currectnSerieId จะเริ่มที่ 1 แต่ index ของ array จะเริ่มที่ 0
            return this.series[GameManager.instance.currentSerieId - 1].getComponent(SerieView);
          }
        }]);
        return SerieRepository;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "series", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SerieStatus.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "38ba0p6qXpMf45LZ0wjqUSm", "SerieStatus", undefined);
      var SerieStatus = exports('SerieStatus', /*#__PURE__*/function (SerieStatus) {
        SerieStatus["EMPTY"] = "empty";
        SerieStatus["PROGRESS"] = "progress";
        SerieStatus["COMPLETED"] = "completed";
        return SerieStatus;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SerieThumbnail.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "c3969odTpNJ+4qdXFyxeRw9", "SerieThumbnail", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SerieThumbnail = exports('SerieThumbnail', (_dec = ccclass('SerieThumbnail'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SerieThumbnail, _Component);
        function SerieThumbnail() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "id", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        return SerieThumbnail;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Serie.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      // import { _decorator, Button, CCInteger, CCString, Component, Enum, EventHandler, Node, Prefab, SpriteFrame } from 'cc';
      cclegacy._RF.push({}, "c2effdSkYRKX6RAal/F7OyJ", "Serie", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SerieViewModel.ts", ['cc', './SharedService.ts', './GameStatus.ts', './GameManager.ts'], function (exports) {
  var cclegacy, _decorator, SharedService, GameStatus, GameManager;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      SharedService = module.SharedService;
    }, function (module) {
      GameStatus = module.GameStatus;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "45a5b7F2ZBFkbSR71osDVfd", "SerieViewModel", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SerieViewModel = exports('SerieViewModel', (_dec = ccclass('SerieViewModel'), _dec(_class = /*#__PURE__*/function () {
        function SerieViewModel() {}
        var _proto = SerieViewModel.prototype;
        _proto.onSerieSelected = function onSerieSelected(id) {
          SharedService.instance.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.SHOW_PACK, id);
        };
        return SerieViewModel;
      }()) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SerieView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './SerieViewModel.ts', './SerieStatus.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Enum, Button, CCInteger, Prefab, SpriteFrame, EventHandler, Component, SerieViewModel, SerieStatus;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Enum = module.Enum;
      Button = module.Button;
      CCInteger = module.CCInteger;
      Prefab = module.Prefab;
      SpriteFrame = module.SpriteFrame;
      EventHandler = module.EventHandler;
      Component = module.Component;
    }, function (module) {
      SerieViewModel = module.SerieViewModel;
    }, function (module) {
      SerieStatus = module.SerieStatus;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "66e82dmfMRNUbmlfUtG/p+I", "SerieView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        requireComponent = _decorator.requireComponent;
      Enum(SerieStatus);
      var SerieView = exports('SerieView', (_dec = ccclass('SerieView'), _dec2 = requireComponent(Button), _dec3 = property(CCInteger), _dec4 = property(Prefab), _dec5 = property(SpriteFrame), _dec6 = property([SpriteFrame]), _dec7 = property({
        type: SerieStatus
      }), _dec8 = property(Prefab), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SerieView, _Component);
        function SerieView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "id", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "box", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "packSprite", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "background", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "status", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "characters", _descriptor6, _assertThisInitialized(_this));
          _this._viewModel = void 0;
          return _this;
        }
        var _proto = SerieView.prototype;
        _proto.onLoad = function onLoad() {
          this._viewModel = new SerieViewModel();
          this._initButton();
        };
        _proto._initButton = function _initButton() {
          var clickEventHandler = new EventHandler();
          clickEventHandler.target = this.node;
          clickEventHandler.component = 'SerieView';
          clickEventHandler.handler = '_showPack';
          clickEventHandler.customEventData = this.id.toString();
          var button = this.node.getComponent(Button);
          button.clickEvents.push(clickEventHandler);
        };
        _proto._showPack = function _showPack(event, customEventData) {
          this._viewModel.onSerieSelected(customEventData);
        };
        return SerieView;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "box", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "packSprite", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "background", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "status", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return SerieStatus.EMPTY;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "characters", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SharedService.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy, _decorator, EventTarget;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      EventTarget = module.EventTarget;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "4c3d4O8yDtOuLMSqo1jMLvO", "SharedService", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SharedService = exports('SharedService', (_dec = ccclass('SharedService'), _dec(_class = (_class2 = /*#__PURE__*/function () {
        function SharedService() {
          this.eventTarget = void 0;
          this.eventTarget = new EventTarget();
        }

        // Add Listener
        var _proto = SharedService.prototype;
        _proto.on = function on(event, callback, target) {
          this.eventTarget.on(event, callback, target);
        }

        // Emit Event
        ;

        _proto.emit = function emit(event, status, eventData1, eventData2, eventData3) {
          console.log("event : " + event + ", status: " + status);
          this.eventTarget.emit(event, status, eventData1, eventData2, eventData3);
        }

        // Remove Listener
        ;

        _proto.off = function off(event, callback, target) {
          this.eventTarget.off(event, callback, target);
        };
        _createClass(SharedService, null, [{
          key: "instance",
          get: function get() {
            if (!this._instance) {
              this._instance = new SharedService();
            }
            return this._instance;
          }
        }]);
        return SharedService;
      }(), _class2._instance = void 0, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShowCharacterPackViewModel.ts", ['cc'], function (exports) {
  var cclegacy, _decorator;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "5c5ca0c0RFJz48ZNqQqKdec", "ShowCharacterPackViewModel", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ShowCharacterPackViewModel = exports('ShowCharacterPackViewModel', (_dec = ccclass('ShowCharacterPackViewModel'), _dec(_class = /*#__PURE__*/function () {
        function ShowCharacterPackViewModel() {}
        var _proto = ShowCharacterPackViewModel.prototype;
        _proto._bearCollectedCompare = function _bearCollectedCompare(boxId, bearCollectedSerie) {
          var indexId = boxUtil.convertIdToIndex(boxId);
          if (bearCollectedSerie[indexId].status == BearStatus.COLLECTED) {
            return "bear";
          } else {
            return "box";
          }
        };
        _proto._getBearDataPreview = function _getBearDataPreview(bearsId) {
          var _this = this;
          var dataList = [];
          var index = 0;
          bearsId.forEach(function (bearId) {
            var data = _this._bearCollectedCompare(bearId, _this._serieCollected);
            dataList.push(data);
            console.log(bearId + " = Key : " + _this._serieCollected[index].id + " - Value:  " + _this._serieCollected[index].status + " ~~ " + dataList[index]);
            index++;
          });
          console.log(dataList);
          return dataList;
        };
        return ShowCharacterPackViewModel;
      }()) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShowCharacterPackView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, instantiate, Vec3, EventHandler, Button, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      instantiate = module.instantiate;
      Vec3 = module.Vec3;
      EventHandler = module.EventHandler;
      Button = module.Button;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "191fflFt0tA5ILYgPTb61T/", "ShowCharacterPackView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ShowCharacterPackView = exports('ShowCharacterPackView', (_dec = ccclass('ShowCharacterPackView'), _dec2 = property([Node]), _dec3 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ShowCharacterPackView, _Component);
        function ShowCharacterPackView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "boxes", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "mainMenuButton", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = ShowCharacterPackView.prototype;
        _proto._showHomeButton = function _showHomeButton(previews) {
          for (var index = 0; index < previews.length; index++) {
            if (previews[index] == "box") {
              this.mainMenuButton.active = false;
              break;
            }
          }
        };
        _proto._setupBoxSprite = function _setupBoxSprite(dataListPreview, packGroupSelected) {
          for (var index = 0; index < dataListPreview.length; index++) {
            if (dataListPreview[index] == "bear") {
              GameManager.instance.userComponent.onCoinIncreased(8);
              var bearIndex = boxUtil.convertIdToIndex(packGroupSelected[index]);
              var bear = instantiate(GameManager.instance.bears[bearIndex]);
              bear.parent = this.boxes[index];
              bear.setPosition(new Vec3(0, 40, 0));
              bear.setScale(new Vec3(0.5, 0.5, 0.5));
            } else {
              var box = instantiate(GameManager.instance.currentSerie.getComponent(Serie).box);
              box.parent = this.boxes[index];
              box.setPosition(new Vec3(0, 0, 0));
              box.setScale(new Vec3(0.36, 0.36, 0.36));
              this._initButton(box.parent, packGroupSelected[index]);
              console.log(box.parent.name);

              // box.getChildByName("Box").getComponent(Box).id = GameManager.instance.packGroupSelected[index];
            }
          }
        };

        _proto._initButton = function _initButton(boxNode, id) {
          var clickEventHandler = new EventHandler();
          clickEventHandler.target = this.node;
          clickEventHandler.component = 'BoxManager';
          clickEventHandler.handler = '_showOpenBox';
          clickEventHandler.customEventData = id;
          var button = boxNode.getComponent(Button);
          button.clickEvents.push(clickEventHandler);
        };
        _proto._showOpenBox = function _showOpenBox(event, customEventData) {
          GameManager.instance.eventTarget.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.SHOW_1_BOX, customEventData);
          console.log("Open 1 Box : " + customEventData);
        };
        return ShowCharacterPackView;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "boxes", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "mainMenuButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StorageKey.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "adae0FcDYpH5Z37rxwAxuGP", "StorageKey", undefined);
      var StorageKey = exports('StorageKey', /*#__PURE__*/function (StorageKey) {
        StorageKey["GROUP_OF_BOX_ID"] = "group-of-box-ID";
        StorageKey["USER_DATA"] = "user-data";
        StorageKey["SERIES_COLLECTED"] = "series-collected";
        StorageKey["CHARACTER_COLLECTED_SERIE"] = "character-collected-serie";
        return StorageKey;
      }({})); // BEAR_COLLECTED_SERIE + ${number} // ข้อมูล Character ที่ได้รับแล้ว ของแต่ละ Serie
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/testColliderConcat.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Input, Collider2D, Contact2DType, Vec3, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Input = module.Input;
      Collider2D = module.Collider2D;
      Contact2DType = module.Contact2DType;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "3fd88OeEeZJurAv3stQhG9d", "testColliderConcat", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var testColliderConcat = exports('testColliderConcat', (_dec = ccclass('testColliderConcat'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(testColliderConcat, _Component);
        function testColliderConcat() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = testColliderConcat.prototype;
        _proto.start = function start() {
          this.node.on(Input.EventType.TOUCH_START, this._onTouchStart, this);
          this.node.on(Input.EventType.TOUCH_MOVE, this._onTouchMove, this);
          this.node.on(Input.EventType.TOUCH_END, this._onTouchEnd, this);

          // Registering callback functions for a single collider
          var collider = this.getComponent(Collider2D);
          if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
          }

          // Registering global contact callback functions
          // if (PhysicsSystem2D.instance) {
          //     PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          //     PhysicsSystem2D.instance.on(Contact2DType.END_CONTACT, this.onEndContact, this);
          // }
        };

        _proto.onBeginContact = function onBeginContact(selfCollider, otherCollider, contact) {
          // will be called once when two colliders begin to contact
          console.log('onBeginContact');
        };
        _proto.onEndContact = function onEndContact(selfCollider, otherCollider, contact) {
          // will be called once when the contact between two colliders just about to end.
          console.log('onEndContact');
        };
        _proto.onPreSolve = function onPreSolve(selfCollider, otherCollider, contact) {
          // will be called every time collider contact should be resolved
          console.log('onPreSolve');
        };
        _proto.onPostSolve = function onPostSolve(selfCollider, otherCollider, contact) {
          // will be called every time collider contact should be resolved
          console.log('onPostSolve');
        };
        _proto._onTouchStart = function _onTouchStart(event) {};
        _proto._onTouchMove = function _onTouchMove(event) {
          var pos = event.getLocation();
          this.node.setWorldPosition(new Vec3(pos.x, pos.y, 0));
        };
        _proto._onTouchEnd = function _onTouchEnd(event) {};
        return testColliderConcat;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/testCreateDestroy.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Prefab, director, instantiate, Vec3, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Prefab = module.Prefab;
      director = module.director;
      instantiate = module.instantiate;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3;
      cclegacy._RF.push({}, "cbcc1CrzNlDA6/w7m1kSy6Z", "testCreateDestroy", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var testCreateDestroy = exports('testCreateDestroy', (_dec = ccclass('testCreateDestroy'), _dec2 = property(Node), _dec3 = property(Prefab), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(testCreateDestroy, _Component);
        function testCreateDestroy() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "canvas", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "prefab", _descriptor2, _assertThisInitialized(_this));
          _this._myNode = null;
          return _this;
        }
        var _proto = testCreateDestroy.prototype;
        _proto._createInstance = function _createInstance() {
          if (testCreateDestroy.Instace != null && testCreateDestroy.Instace != this) {
            this.node.destroy();
            return;
          }
          if (testCreateDestroy.Instace == null) {
            testCreateDestroy.Instace = this;
            director.addPersistRootNode(this.node);
          }
        };
        _proto.createNode = function createNode() {
          this._createInstance();
          console.log("1 Node == null ???  " + (this._myNode == null));
          if (this._myNode == null) {
            console.log("Create");
            this._myNode = instantiate(this.prefab);
            this._myNode.setPosition(new Vec3(200, 100, 0));
            this._myNode.parent = this.canvas;
          } else {
            console.log("2 Node == null ???  " + (this._myNode == null));
            // this._myNode = instantiate(this.prefab);
            // this._myNode.setPosition(new Vec3(200,100,0));
            // this._myNode.parent = this.canvas;
          }

          console.log("this._myNode == Instance._myNode ::: " + (this._myNode === testCreateDestroy.Instace._myNode));
        };
        _proto.destroyNode = function destroyNode() {
          if (this._myNode != null) {
            console.log("Destroy");
            this._myNode.destroy();
            this._myNode = null;
          }
        };
        return testCreateDestroy;
      }(Component), _class3.Instace = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "canvas", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "prefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TestUnitId.ts", ['cc'], function (exports) {
  var cclegacy, sys;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      sys = module.sys;
    }],
    execute: function () {
      exports('getTestAdUnitId', getTestAdUnitId);
      cclegacy._RF.push({}, "82ff3DgPcxO9pSnl1qmYr+u", "TestUnitId", undefined);
      var AdFormat = exports('AdFormat', /*#__PURE__*/function (AdFormat) {
        AdFormat[AdFormat["AppOpen"] = 0] = "AppOpen";
        AdFormat[AdFormat["Banner"] = 1] = "Banner";
        AdFormat[AdFormat["Interstitial"] = 2] = "Interstitial";
        AdFormat[AdFormat["Rewarded"] = 3] = "Rewarded";
        AdFormat[AdFormat["RewardedInterstitial"] = 4] = "RewardedInterstitial";
        AdFormat[AdFormat["Native"] = 5] = "Native";
        return AdFormat;
      }({}));
      function getTestAdUnitId(format) {
        switch (format) {
          case AdFormat.AppOpen:
            return isAndroid() ? "ca-app-pub-3940256099942544/9257395921" : "ca-app-pub-3940256099942544/5575463023";
          case AdFormat.Banner:
            return isAndroid() ? "ca-app-pub-3940256099942544/6300978111" : "ca-app-pub-3940256099942544/2934735716";
          case AdFormat.Interstitial:
            return isAndroid() ? "ca-app-pub-3940256099942544/1033173712" : "ca-app-pub-3940256099942544/4411468910";
          case AdFormat.Rewarded:
            return isAndroid() ? "ca-app-pub-3940256099942544/5224354917" : "ca-app-pub-3940256099942544/1712485313";
          case AdFormat.RewardedInterstitial:
            return isAndroid() ? "ca-app-pub-3940256099942544/5354046379" : "ca-app-pub-3940256099942544/6978759866";
          case AdFormat.Native:
            return isAndroid() ? "ca-app-pub-3940256099942544/2247696110" : "ca-app-pub-3940256099942544/3986624511";
          default:
            throw new Error("Unexpected format: " + format);
        }
      }
      function isAndroid() {
        return sys.os === sys.OS.ANDROID;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TypeAlias.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5738fx85WpMp6bb3Q7WK7YX", "TypeAlias", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
        https://www.cocos.com/
        Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
        The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      /**
       * @zh
       * 谷歌 LoadAdError，在 TS 中转化为了字符串
       * @en
       * Load Ad Error return by Google mobile ad SDK 
       */
      /**
       * @zh
       * Java 中的 AdError，在 TS 中为字符串
       * @en
       * AdError return by Googl Mobile Ad SDK
       * {
          "Code": 2,
          "Message": "Network error.",
          "Domain": "com.google.android.gms.ads",
          "Cause": "null",
          "Response Info": {
            "Response ID": "null",
            "Mediation Adapter Class Name": "",
            "Adapter Responses": [],
            "Response Extras": {}
          }
        }
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameStatus.ts', './GameManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Prefab, Vec3, Label, instantiate, Component, GameStatus, GameManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Prefab = module.Prefab;
      Vec3 = module.Vec3;
      Label = module.Label;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      GameStatus = module.GameStatus;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;
      cclegacy._RF.push({}, "764a6E5XmVBi4pzubv4wlXK", "UIManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var UIManager = exports('UIManager', (_dec = ccclass('UIManager'), _dec2 = property(Node), _dec3 = property(Prefab), _dec4 = property(Prefab), _dec5 = property(Prefab), _dec6 = property(Prefab), _dec7 = property(Prefab), _dec8 = property(Prefab), _dec9 = property(Prefab), _dec10 = property(Prefab), _dec11 = property(Prefab), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(UIManager, _Component);
        function UIManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "uiGroup", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "mainUI", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "packSelectionUI", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "boxSelectionUI", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "boxOpeningUI", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "show6BoxUI", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "textLabel", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "guessBearUI", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "galleryCollcetedUI", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "galleryCharacterUI", _descriptor10, _assertThisInitialized(_this));
          _this._mainUIInstance = null;
          _this._packUIInstance = null;
          _this._boxSelectUIInstance = null;
          _this._boxOpeningUIInstance = null;
          _this._show6BoxUIInstance = null;
          _this._textLabel = null;
          _this._guessBearUIInstance = null;
          _this._galleryCollectedUIInstance = null;
          _this._galleryCharacterUIInstance = null;
          return _this;
        }
        var _proto = UIManager.prototype;
        _proto.updateUI = function updateUI(status, eventData1, eventData2, eventData3) {
          console.log("Lisening ChangeMenu +++ State = " + status + ", data = " + eventData1);
          switch (status) {
            case GameStatus.START:
              {
                GameManager.instance.eventTarget.emit(GameManager.instance.ACTIVE_USER_LABEL, true);
                this._resetSceneUI();
                console.log("UI ::: Start Game");
              }
              break;
            case GameStatus.SHOW_SERIE:
              {
                console.log("UI ::: Main");
              }
              break;
            case GameStatus.SHOW_PACK:
              {
                GameManager.instance.currentSerieId = eventData1; // SerieID เริ่มที่ 1
                this._packUIInstance = this._showUI(this._packUIInstance, this.packSelectionUI, eventData1);
              }
              break;
            case GameStatus.BOX_SELECTION:
              {
                GameManager.instance.currentCharacterPackId = eventData1;
                this._boxSelectUIInstance = this._showUI(this._boxSelectUIInstance, this.boxSelectionUI, eventData1);
              }
              break;
            case GameStatus.SHOW_1_BOX:
              {
                GameManager.instance.currentCharacterPackId = eventData1;
                this._boxOpeningUIInstance = this._showUI(this._boxOpeningUIInstance, this.boxOpeningUI, eventData1);
              }
              break;
            case GameStatus.SHOW_6_BOX:
              {
                this._show6BoxUIInstance = this._showUI(this._show6BoxUIInstance, this.show6BoxUI, eventData1);
              }
              break;
            case GameStatus.OPEN_BOX_FINISHED:
              {
                // isCharacterCollected from BoxController
                // eventData2 สำหรับตรวจว่า เก็บตัวละครครบหรือยัง
                if (eventData1.length > 1) {
                  // แบบเปิด 6 กล่อง
                  this._textLabel = this._showUI(this._textLabel, this.textLabel, eventData1, this._show6BoxUIInstance);
                  this._textLabel.position = new Vec3(0, -100, 0);
                  this._textLabel.getComponent(Label).string = eventData2 ? "All Character Collected, tap to start again" : "Select one character to continue";
                } else {
                  // แบบเปิด 1 กล่อง
                  this._textLabel = this._showUI(this._textLabel, this.textLabel, eventData1, this._boxOpeningUIInstance);
                  this._textLabel.getComponent(Label).string = eventData2 ? "Character Collected, tap to start again" : "Tap anywhere to continue";
                }
                console.log("UI ::: Open Box");
              }
              break;
            case GameStatus.GUESS_BEAR:
              {
                GameManager.instance.eventTarget.emit(GameManager.instance.ACTIVE_USER_LABEL, false);
                GameManager.instance.selectedCharacterId = eventData1;
                this._guessBearUIInstance = this._showUI(this._guessBearUIInstance, this.guessBearUI, eventData1);

                // eventData2 = Character Node ที่เลือก ย้าย Canvas ใหม่
                GameManager.instance.character = eventData2;
                GameManager.instance.character.parent = this._guessBearUIInstance;
                console.log("UI ::: Guess Bear");
              }
              break;
            case GameStatus.SHOW_Gallery:
              {
                this._galleryCollectedUIInstance = this._showUI(this._galleryCollectedUIInstance, this.galleryCollcetedUI, eventData1);
                console.log("UI ::: Show Collection");
              }
              break;
            case GameStatus.SHOW_CHARACTER:
              {
                this._galleryCharacterUIInstance = this._showUI(this._galleryCharacterUIInstance, this.galleryCharacterUI, eventData1);
                console.log("UI ::: Show Character");
              }
              break;
            case GameStatus.PITCH_AND_TOSS:
              {
                console.log("UI ::: Pitch And Toss");
              }
              break;
            case GameStatus.SETTING:
              {
                console.log("UI ::: Setting");
              }
              break;
          }
        };
        _proto._showUI = function _showUI(uiNode, nodeToCreate, eventData, parent) {
          // console.log(`${uiNode} - IsNull - ${uiNode == null}`);
          if (uiNode) {
            uiNode.active = true;
            console.log(uiNode.name + " - active");
            if (!uiNode.isValid) {
              uiNode = instantiate(nodeToCreate);
              uiNode.parent = this.uiGroup;

              // console.log(`${uiNode.name} - instantiate again`);
            }
          } else {
            uiNode = instantiate(nodeToCreate);
            if (parent) {
              uiNode.parent = parent;
              // console.log(`Parent is --- ${parent.name}`);
            } else {
              uiNode.parent = this.uiGroup;
            }

            // console.log(`${uiNode.name} - instantiate`);
          }

          console.log("UI ::: Show " + uiNode.name + " +++ " + eventData);
          return uiNode;
        };
        _proto._releaseUiNode = function _releaseUiNode(uiNode) {
          if (uiNode) {
            uiNode.destroy();
            uiNode = null;
          }
          return uiNode;
        };
        _proto._resetSceneUI = function _resetSceneUI() {
          this._mainUIInstance = this._releaseUiNode(this._mainUIInstance);
          this._packUIInstance = this._releaseUiNode(this._packUIInstance);
          this._boxSelectUIInstance = this._releaseUiNode(this._boxSelectUIInstance);
          this._boxOpeningUIInstance = this._releaseUiNode(this._boxOpeningUIInstance);
          this._show6BoxUIInstance = this._releaseUiNode(this._show6BoxUIInstance);
          this._textLabel = this._releaseUiNode(this._textLabel);
          this._guessBearUIInstance = this._releaseUiNode(this._guessBearUIInstance);
          // this._galleryCollectedUIInstance = this._releaseUiNode(this._galleryCollectedUIInstance);
          this._galleryCharacterUIInstance = this._releaseUiNode(this._galleryCharacterUIInstance);
        };
        return UIManager;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "uiGroup", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "mainUI", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "packSelectionUI", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "boxSelectionUI", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "boxOpeningUI", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "show6BoxUI", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "textLabel", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "guessBearUI", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "galleryCollcetedUI", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "galleryCharacterUI", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UserComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UserViewModel.ts', './UserView.ts', './UserEvent.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Node, Component, UserViewModel, UserView, UserEvent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      UserViewModel = module.UserViewModel;
    }, function (module) {
      UserView = module.UserView;
    }, function (module) {
      UserEvent = module.UserEvent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "ef6d3uWgURMl7ZEH4wAwNud", "UserComponent", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var UserComponent = exports('UserComponent', (_dec = ccclass('UserComponent'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(UserComponent, _Component);
        function UserComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._userVM = void 0;
          _this._userView = void 0;
          _initializerDefineProperty(_this, "nameText", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "coinText", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "uiCanvas", _descriptor3, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = UserComponent.prototype;
        _proto.onLoad = function onLoad() {
          this._userVM = new UserViewModel('TestUser', 100);
          this._userView = new UserView(this.nameText, this.coinText);
          var eventTarget = this._userVM.eventTarget;
          eventTarget.on(UserEvent.NAME_CHANGE, this._onNameChanged, this);
          eventTarget.on(UserEvent.COIN_CHANGE, this._onCoinChanged, this);
          var userData = this._userVM.user;
          this._userView.initialize(userData.name, userData.coin);
          this.onCoinIncreased(60);
        };
        _proto.onDestroy = function onDestroy() {
          var eventTarget = this._userVM.eventTarget;
          eventTarget.off(UserEvent.NAME_CHANGE, this._onNameChanged, this);
          eventTarget.off(UserEvent.COIN_CHANGE, this._onCoinChanged, this);
        };
        _proto._onNameChanged = function _onNameChanged(newName) {
          this._userView.updateName(newName);
        };
        _proto.onNameUpdate = function onNameUpdate(newName) {
          this._userVM.setName = newName;
        };
        _proto._onCoinChanged = function _onCoinChanged(newCoin) {
          this._userView.updateCoin(newCoin);
        };
        _proto.onCoinUpdate = function onCoinUpdate(newCoinCount) {
          this._userVM.setCoin = newCoinCount;
        };
        _proto.onCoinIncreased = function onCoinIncreased(coind) {
          this._userVM.setCoin = this._userVM.coin + coind;
        };
        _proto.onCoinDecreased = function onCoinDecreased(coin) {
          this._userVM.setCoin = this._userVM.coin - coin;
        };
        _proto.activeLabel = function activeLabel(active) {
          if (active === void 0) {
            active = true;
          }
          this.uiCanvas.active = active;
        };
        _proto.getUser = function getUser() {
          return this._userVM.user;
        };
        _proto.getName = function getName() {
          return this._userVM.name;
        };
        _proto.getCoin = function getCoin() {
          return this._userVM.coin;
        };
        return UserComponent;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "nameText", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "coinText", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "uiCanvas", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UserEvent.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6e0baK5sylAt4KlcUSxlXVW", "UserEvent", undefined);
      var UserEvent = exports('UserEvent', /*#__PURE__*/function (UserEvent) {
        UserEvent["NAME_CHANGE"] = "user-name-changed";
        UserEvent["COIN_CHANGE"] = "user-coin-changed";
        UserEvent["SWITCH_PARENT"] = "user-coin-parent-changed";
        return UserEvent;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UserModel.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e94abdRj7NL36opcVJYa3NI", "UserModel", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UserViewModel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UserEvent.ts', './SaveLoad.ts', './StorageKey.ts'], function (exports) {
  var _createClass, cclegacy, _decorator, EventTarget, UserEvent, SaveLoad, StorageKey;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      EventTarget = module.EventTarget;
    }, function (module) {
      UserEvent = module.UserEvent;
    }, function (module) {
      SaveLoad = module.SaveLoad;
    }, function (module) {
      StorageKey = module.StorageKey;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "53069xHyvJAGbWM6bcUeNtu", "UserViewModel", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var UserViewModel = exports('UserViewModel', (_dec = ccclass('UserViewModel'), _dec(_class = /*#__PURE__*/function () {
        function UserViewModel(name, initialCoin) {
          this._user = void 0;
          this._eventTarget = void 0;
          this._user = {
            name: name,
            coin: initialCoin,
            registerDate: Date.now()
          };
          this._eventTarget = new EventTarget();
          this._user = SaveLoad.ReadData(StorageKey.USER_DATA);
        }
        _createClass(UserViewModel, [{
          key: "eventTarget",
          get: function get() {
            return this._eventTarget;
          }
        }, {
          key: "setName",
          set: function set(newName) {
            if (this._user.name !== newName) {
              this._user.name = newName;
              SaveLoad.SaveData(StorageKey.USER_DATA, this._user);
              this._eventTarget.emit(UserEvent.NAME_CHANGE, newName);
            }
          }
        }, {
          key: "setCoin",
          set: function set(newCoinCount) {
            if (this._user.coin !== newCoinCount) {
              this._user.coin = newCoinCount;
              SaveLoad.SaveData(StorageKey.USER_DATA, this._user);
              this._eventTarget.emit(UserEvent.COIN_CHANGE, newCoinCount);
            }
          }
        }, {
          key: "user",
          get: function get() {
            return this._user;
          }
        }, {
          key: "name",
          get: function get() {
            return this._user.name;
          }
        }, {
          key: "coin",
          get: function get() {
            return this._user.coin;
          }
        }]);
        return UserViewModel;
      }()) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UserView.ts", ['cc'], function (exports) {
  var cclegacy, _decorator;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "7a4deDCbqVJkYWJO8SPqKWu", "UserView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var UserView = exports('UserView', (_dec = ccclass('UserView'), _dec(_class = /*#__PURE__*/function () {
        function UserView(nameLabel, coinLabel) {
          this._nameLabel = void 0;
          this._coinLabel = void 0;
          this._nameLabel = nameLabel;
          this._coinLabel = coinLabel;
        }
        var _proto = UserView.prototype;
        _proto.initialize = function initialize(name, coin) {
          this.updateName(name);
          this.updateCoin(coin);
        };
        _proto.updateName = function updateName(newName) {
          this._nameLabel.string = "Name: " + newName;
        };
        _proto.updateCoin = function updateCoin(newCoin) {
          this._coinLabel.string = "" + newCoin;
        };
        return UserView;
      }()) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Version2.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "aca25+juFNMM5K8dGC0LPU/", "Version", undefined);
      /*
       Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
      	 https://www.cocos.com/
      	 Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      	 The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      var ExtensionVersion = exports('ExtensionVersion', "1.0.3");
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Version.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Base.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Base;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      Base = module.Base;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "54026AUb3NNTbcYO88Ecs9i", "Version", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var VersionREQ = exports('VersionREQ', (_dec = ccclass("VersionREQ"), _dec(_class = /*#__PURE__*/function (_Base) {
        _inheritsLoose(VersionREQ, _Base);
        function VersionREQ(unitId, engineVersion) {
          var _this;
          _this = _Base.call(this, unitId) || this;
          _this.engineVersion = engineVersion;
          return _this;
        }
        return VersionREQ;
      }(Base)) || _class));
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});