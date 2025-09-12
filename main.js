var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i6 = decorators.length - 1, decorator; i6 >= 0; i6--)
    if (decorator = decorators[i6])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});

// ../node_modules/@lit/reactive-element/css-tag.js
var t, e, s, o, n, r, i, S, c;
var init_css_tag = __esm({
  "../node_modules/@lit/reactive-element/css-tag.js"() {
    "use strict";
    t = globalThis;
    e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
    s = Symbol();
    o = /* @__PURE__ */ new WeakMap();
    n = class {
      constructor(t5, e8, o6) {
        if (this._$cssResult$ = true, o6 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t5, this.t = e8;
      }
      get styleSheet() {
        let t5 = this.o;
        const s7 = this.t;
        if (e && void 0 === t5) {
          const e8 = void 0 !== s7 && 1 === s7.length;
          e8 && (t5 = o.get(s7)), void 0 === t5 && ((this.o = t5 = new CSSStyleSheet()).replaceSync(this.cssText), e8 && o.set(s7, t5));
        }
        return t5;
      }
      toString() {
        return this.cssText;
      }
    };
    r = (t5) => new n("string" == typeof t5 ? t5 : t5 + "", void 0, s);
    i = (t5, ...e8) => {
      const o6 = 1 === t5.length ? t5[0] : e8.reduce(((e9, s7, o7) => e9 + ((t6) => {
        if (true === t6._$cssResult$) return t6.cssText;
        if ("number" == typeof t6) return t6;
        throw Error("Value passed to 'css' function must be a 'css' function result: " + t6 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
      })(s7) + t5[o7 + 1]), t5[0]);
      return new n(o6, t5, s);
    };
    S = (s7, o6) => {
      if (e) s7.adoptedStyleSheets = o6.map(((t5) => t5 instanceof CSSStyleSheet ? t5 : t5.styleSheet));
      else for (const e8 of o6) {
        const o7 = document.createElement("style"), n6 = t.litNonce;
        void 0 !== n6 && o7.setAttribute("nonce", n6), o7.textContent = e8.cssText, s7.appendChild(o7);
      }
    };
    c = e ? (t5) => t5 : (t5) => t5 instanceof CSSStyleSheet ? ((t6) => {
      let e8 = "";
      for (const s7 of t6.cssRules) e8 += s7.cssText;
      return r(e8);
    })(t5) : t5;
  }
});

// ../node_modules/@lit/reactive-element/reactive-element.js
var i2, e2, h, r2, o2, n2, a, c2, l, p, d, u, f, b, y;
var init_reactive_element = __esm({
  "../node_modules/@lit/reactive-element/reactive-element.js"() {
    "use strict";
    init_css_tag();
    init_css_tag();
    ({ is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object);
    a = globalThis;
    c2 = a.trustedTypes;
    l = c2 ? c2.emptyScript : "";
    p = a.reactiveElementPolyfillSupport;
    d = (t5, s7) => t5;
    u = { toAttribute(t5, s7) {
      switch (s7) {
        case Boolean:
          t5 = t5 ? l : null;
          break;
        case Object:
        case Array:
          t5 = null == t5 ? t5 : JSON.stringify(t5);
      }
      return t5;
    }, fromAttribute(t5, s7) {
      let i6 = t5;
      switch (s7) {
        case Boolean:
          i6 = null !== t5;
          break;
        case Number:
          i6 = null === t5 ? null : Number(t5);
          break;
        case Object:
        case Array:
          try {
            i6 = JSON.parse(t5);
          } catch (t6) {
            i6 = null;
          }
      }
      return i6;
    } };
    f = (t5, s7) => !i2(t5, s7);
    b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
    Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a.litPropertyMetadata ?? (a.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
    y = class extends HTMLElement {
      static addInitializer(t5) {
        this._$Ei(), (this.l ?? (this.l = [])).push(t5);
      }
      static get observedAttributes() {
        return this.finalize(), this._$Eh && [...this._$Eh.keys()];
      }
      static createProperty(t5, s7 = b) {
        if (s7.state && (s7.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t5) && ((s7 = Object.create(s7)).wrapped = true), this.elementProperties.set(t5, s7), !s7.noAccessor) {
          const i6 = Symbol(), h3 = this.getPropertyDescriptor(t5, i6, s7);
          void 0 !== h3 && e2(this.prototype, t5, h3);
        }
      }
      static getPropertyDescriptor(t5, s7, i6) {
        const { get: e8, set: r6 } = h(this.prototype, t5) ?? { get() {
          return this[s7];
        }, set(t6) {
          this[s7] = t6;
        } };
        return { get: e8, set(s8) {
          const h3 = e8?.call(this);
          r6?.call(this, s8), this.requestUpdate(t5, h3, i6);
        }, configurable: true, enumerable: true };
      }
      static getPropertyOptions(t5) {
        return this.elementProperties.get(t5) ?? b;
      }
      static _$Ei() {
        if (this.hasOwnProperty(d("elementProperties"))) return;
        const t5 = n2(this);
        t5.finalize(), void 0 !== t5.l && (this.l = [...t5.l]), this.elementProperties = new Map(t5.elementProperties);
      }
      static finalize() {
        if (this.hasOwnProperty(d("finalized"))) return;
        if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
          const t6 = this.properties, s7 = [...r2(t6), ...o2(t6)];
          for (const i6 of s7) this.createProperty(i6, t6[i6]);
        }
        const t5 = this[Symbol.metadata];
        if (null !== t5) {
          const s7 = litPropertyMetadata.get(t5);
          if (void 0 !== s7) for (const [t6, i6] of s7) this.elementProperties.set(t6, i6);
        }
        this._$Eh = /* @__PURE__ */ new Map();
        for (const [t6, s7] of this.elementProperties) {
          const i6 = this._$Eu(t6, s7);
          void 0 !== i6 && this._$Eh.set(i6, t6);
        }
        this.elementStyles = this.finalizeStyles(this.styles);
      }
      static finalizeStyles(s7) {
        const i6 = [];
        if (Array.isArray(s7)) {
          const e8 = new Set(s7.flat(1 / 0).reverse());
          for (const s8 of e8) i6.unshift(c(s8));
        } else void 0 !== s7 && i6.push(c(s7));
        return i6;
      }
      static _$Eu(t5, s7) {
        const i6 = s7.attribute;
        return false === i6 ? void 0 : "string" == typeof i6 ? i6 : "string" == typeof t5 ? t5.toLowerCase() : void 0;
      }
      constructor() {
        super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
      }
      _$Ev() {
        this._$ES = new Promise(((t5) => this.enableUpdating = t5)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(((t5) => t5(this)));
      }
      addController(t5) {
        (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t5), void 0 !== this.renderRoot && this.isConnected && t5.hostConnected?.();
      }
      removeController(t5) {
        this._$EO?.delete(t5);
      }
      _$E_() {
        const t5 = /* @__PURE__ */ new Map(), s7 = this.constructor.elementProperties;
        for (const i6 of s7.keys()) this.hasOwnProperty(i6) && (t5.set(i6, this[i6]), delete this[i6]);
        t5.size > 0 && (this._$Ep = t5);
      }
      createRenderRoot() {
        const t5 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
        return S(t5, this.constructor.elementStyles), t5;
      }
      connectedCallback() {
        this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), this._$EO?.forEach(((t5) => t5.hostConnected?.()));
      }
      enableUpdating(t5) {
      }
      disconnectedCallback() {
        this._$EO?.forEach(((t5) => t5.hostDisconnected?.()));
      }
      attributeChangedCallback(t5, s7, i6) {
        this._$AK(t5, i6);
      }
      _$ET(t5, s7) {
        const i6 = this.constructor.elementProperties.get(t5), e8 = this.constructor._$Eu(t5, i6);
        if (void 0 !== e8 && true === i6.reflect) {
          const h3 = (void 0 !== i6.converter?.toAttribute ? i6.converter : u).toAttribute(s7, i6.type);
          this._$Em = t5, null == h3 ? this.removeAttribute(e8) : this.setAttribute(e8, h3), this._$Em = null;
        }
      }
      _$AK(t5, s7) {
        const i6 = this.constructor, e8 = i6._$Eh.get(t5);
        if (void 0 !== e8 && this._$Em !== e8) {
          const t6 = i6.getPropertyOptions(e8), h3 = "function" == typeof t6.converter ? { fromAttribute: t6.converter } : void 0 !== t6.converter?.fromAttribute ? t6.converter : u;
          this._$Em = e8;
          const r6 = h3.fromAttribute(s7, t6.type);
          this[e8] = r6 ?? this._$Ej?.get(e8) ?? r6, this._$Em = null;
        }
      }
      requestUpdate(t5, s7, i6) {
        if (void 0 !== t5) {
          const e8 = this.constructor, h3 = this[t5];
          if (i6 ?? (i6 = e8.getPropertyOptions(t5)), !((i6.hasChanged ?? f)(h3, s7) || i6.useDefault && i6.reflect && h3 === this._$Ej?.get(t5) && !this.hasAttribute(e8._$Eu(t5, i6)))) return;
          this.C(t5, s7, i6);
        }
        false === this.isUpdatePending && (this._$ES = this._$EP());
      }
      C(t5, s7, { useDefault: i6, reflect: e8, wrapped: h3 }, r6) {
        i6 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t5) && (this._$Ej.set(t5, r6 ?? s7 ?? this[t5]), true !== h3 || void 0 !== r6) || (this._$AL.has(t5) || (this.hasUpdated || i6 || (s7 = void 0), this._$AL.set(t5, s7)), true === e8 && this._$Em !== t5 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t5));
      }
      async _$EP() {
        this.isUpdatePending = true;
        try {
          await this._$ES;
        } catch (t6) {
          Promise.reject(t6);
        }
        const t5 = this.scheduleUpdate();
        return null != t5 && await t5, !this.isUpdatePending;
      }
      scheduleUpdate() {
        return this.performUpdate();
      }
      performUpdate() {
        if (!this.isUpdatePending) return;
        if (!this.hasUpdated) {
          if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
            for (const [t7, s8] of this._$Ep) this[t7] = s8;
            this._$Ep = void 0;
          }
          const t6 = this.constructor.elementProperties;
          if (t6.size > 0) for (const [s8, i6] of t6) {
            const { wrapped: t7 } = i6, e8 = this[s8];
            true !== t7 || this._$AL.has(s8) || void 0 === e8 || this.C(s8, void 0, i6, e8);
          }
        }
        let t5 = false;
        const s7 = this._$AL;
        try {
          t5 = this.shouldUpdate(s7), t5 ? (this.willUpdate(s7), this._$EO?.forEach(((t6) => t6.hostUpdate?.())), this.update(s7)) : this._$EM();
        } catch (s8) {
          throw t5 = false, this._$EM(), s8;
        }
        t5 && this._$AE(s7);
      }
      willUpdate(t5) {
      }
      _$AE(t5) {
        this._$EO?.forEach(((t6) => t6.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t5)), this.updated(t5);
      }
      _$EM() {
        this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
      }
      get updateComplete() {
        return this.getUpdateComplete();
      }
      getUpdateComplete() {
        return this._$ES;
      }
      shouldUpdate(t5) {
        return true;
      }
      update(t5) {
        this._$Eq && (this._$Eq = this._$Eq.forEach(((t6) => this._$ET(t6, this[t6])))), this._$EM();
      }
      updated(t5) {
      }
      firstUpdated(t5) {
      }
    };
    y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ?? (a.reactiveElementVersions = [])).push("2.1.1");
  }
});

// ../node_modules/lit-html/lit-html.js
function P(t5, i6) {
  if (!a2(t5) || !t5.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s2 ? s2.createHTML(i6) : i6;
}
function S2(t5, i6, s7 = t5, e8) {
  if (i6 === T) return i6;
  let h3 = void 0 !== e8 ? s7._$Co?.[e8] : s7._$Cl;
  const o6 = c3(i6) ? void 0 : i6._$litDirective$;
  return h3?.constructor !== o6 && (h3?._$AO?.(false), void 0 === o6 ? h3 = void 0 : (h3 = new o6(t5), h3._$AT(t5, s7, e8)), void 0 !== e8 ? (s7._$Co ?? (s7._$Co = []))[e8] = h3 : s7._$Cl = h3), void 0 !== h3 && (i6 = S2(t5, h3._$AS(t5, i6.values), h3, e8)), i6;
}
var t2, i3, s2, e3, h2, o3, n3, r3, l2, c3, a2, u2, d2, f2, v, _, m, p2, g, $, y2, x, b2, w, T, E, A, C, V, N, M, R, k, H, I, L, z, j, B;
var init_lit_html = __esm({
  "../node_modules/lit-html/lit-html.js"() {
    "use strict";
    t2 = globalThis;
    i3 = t2.trustedTypes;
    s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t5) => t5 }) : void 0;
    e3 = "$lit$";
    h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
    o3 = "?" + h2;
    n3 = `<${o3}>`;
    r3 = document;
    l2 = () => r3.createComment("");
    c3 = (t5) => null === t5 || "object" != typeof t5 && "function" != typeof t5;
    a2 = Array.isArray;
    u2 = (t5) => a2(t5) || "function" == typeof t5?.[Symbol.iterator];
    d2 = "[ 	\n\f\r]";
    f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
    v = /-->/g;
    _ = />/g;
    m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
    p2 = /'/g;
    g = /"/g;
    $ = /^(?:script|style|textarea|title)$/i;
    y2 = (t5) => (i6, ...s7) => ({ _$litType$: t5, strings: i6, values: s7 });
    x = y2(1);
    b2 = y2(2);
    w = y2(3);
    T = Symbol.for("lit-noChange");
    E = Symbol.for("lit-nothing");
    A = /* @__PURE__ */ new WeakMap();
    C = r3.createTreeWalker(r3, 129);
    V = (t5, i6) => {
      const s7 = t5.length - 1, o6 = [];
      let r6, l3 = 2 === i6 ? "<svg>" : 3 === i6 ? "<math>" : "", c5 = f2;
      for (let i7 = 0; i7 < s7; i7++) {
        const s8 = t5[i7];
        let a3, u3, d3 = -1, y3 = 0;
        for (; y3 < s8.length && (c5.lastIndex = y3, u3 = c5.exec(s8), null !== u3); ) y3 = c5.lastIndex, c5 === f2 ? "!--" === u3[1] ? c5 = v : void 0 !== u3[1] ? c5 = _ : void 0 !== u3[2] ? ($.test(u3[2]) && (r6 = RegExp("</" + u3[2], "g")), c5 = m) : void 0 !== u3[3] && (c5 = m) : c5 === m ? ">" === u3[0] ? (c5 = r6 ?? f2, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c5.lastIndex - u3[2].length, a3 = u3[1], c5 = void 0 === u3[3] ? m : '"' === u3[3] ? g : p2) : c5 === g || c5 === p2 ? c5 = m : c5 === v || c5 === _ ? c5 = f2 : (c5 = m, r6 = void 0);
        const x3 = c5 === m && t5[i7 + 1].startsWith("/>") ? " " : "";
        l3 += c5 === f2 ? s8 + n3 : d3 >= 0 ? (o6.push(a3), s8.slice(0, d3) + e3 + s8.slice(d3) + h2 + x3) : s8 + h2 + (-2 === d3 ? i7 : x3);
      }
      return [P(t5, l3 + (t5[s7] || "<?>") + (2 === i6 ? "</svg>" : 3 === i6 ? "</math>" : "")), o6];
    };
    N = class _N {
      constructor({ strings: t5, _$litType$: s7 }, n6) {
        let r6;
        this.parts = [];
        let c5 = 0, a3 = 0;
        const u3 = t5.length - 1, d3 = this.parts, [f3, v2] = V(t5, s7);
        if (this.el = _N.createElement(f3, n6), C.currentNode = this.el.content, 2 === s7 || 3 === s7) {
          const t6 = this.el.content.firstChild;
          t6.replaceWith(...t6.childNodes);
        }
        for (; null !== (r6 = C.nextNode()) && d3.length < u3; ) {
          if (1 === r6.nodeType) {
            if (r6.hasAttributes()) for (const t6 of r6.getAttributeNames()) if (t6.endsWith(e3)) {
              const i6 = v2[a3++], s8 = r6.getAttribute(t6).split(h2), e8 = /([.?@])?(.*)/.exec(i6);
              d3.push({ type: 1, index: c5, name: e8[2], strings: s8, ctor: "." === e8[1] ? H : "?" === e8[1] ? I : "@" === e8[1] ? L : k }), r6.removeAttribute(t6);
            } else t6.startsWith(h2) && (d3.push({ type: 6, index: c5 }), r6.removeAttribute(t6));
            if ($.test(r6.tagName)) {
              const t6 = r6.textContent.split(h2), s8 = t6.length - 1;
              if (s8 > 0) {
                r6.textContent = i3 ? i3.emptyScript : "";
                for (let i6 = 0; i6 < s8; i6++) r6.append(t6[i6], l2()), C.nextNode(), d3.push({ type: 2, index: ++c5 });
                r6.append(t6[s8], l2());
              }
            }
          } else if (8 === r6.nodeType) if (r6.data === o3) d3.push({ type: 2, index: c5 });
          else {
            let t6 = -1;
            for (; -1 !== (t6 = r6.data.indexOf(h2, t6 + 1)); ) d3.push({ type: 7, index: c5 }), t6 += h2.length - 1;
          }
          c5++;
        }
      }
      static createElement(t5, i6) {
        const s7 = r3.createElement("template");
        return s7.innerHTML = t5, s7;
      }
    };
    M = class {
      constructor(t5, i6) {
        this._$AV = [], this._$AN = void 0, this._$AD = t5, this._$AM = i6;
      }
      get parentNode() {
        return this._$AM.parentNode;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      u(t5) {
        const { el: { content: i6 }, parts: s7 } = this._$AD, e8 = (t5?.creationScope ?? r3).importNode(i6, true);
        C.currentNode = e8;
        let h3 = C.nextNode(), o6 = 0, n6 = 0, l3 = s7[0];
        for (; void 0 !== l3; ) {
          if (o6 === l3.index) {
            let i7;
            2 === l3.type ? i7 = new R(h3, h3.nextSibling, this, t5) : 1 === l3.type ? i7 = new l3.ctor(h3, l3.name, l3.strings, this, t5) : 6 === l3.type && (i7 = new z(h3, this, t5)), this._$AV.push(i7), l3 = s7[++n6];
          }
          o6 !== l3?.index && (h3 = C.nextNode(), o6++);
        }
        return C.currentNode = r3, e8;
      }
      p(t5) {
        let i6 = 0;
        for (const s7 of this._$AV) void 0 !== s7 && (void 0 !== s7.strings ? (s7._$AI(t5, s7, i6), i6 += s7.strings.length - 2) : s7._$AI(t5[i6])), i6++;
      }
    };
    R = class _R {
      get _$AU() {
        return this._$AM?._$AU ?? this._$Cv;
      }
      constructor(t5, i6, s7, e8) {
        this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t5, this._$AB = i6, this._$AM = s7, this.options = e8, this._$Cv = e8?.isConnected ?? true;
      }
      get parentNode() {
        let t5 = this._$AA.parentNode;
        const i6 = this._$AM;
        return void 0 !== i6 && 11 === t5?.nodeType && (t5 = i6.parentNode), t5;
      }
      get startNode() {
        return this._$AA;
      }
      get endNode() {
        return this._$AB;
      }
      _$AI(t5, i6 = this) {
        t5 = S2(this, t5, i6), c3(t5) ? t5 === E || null == t5 || "" === t5 ? (this._$AH !== E && this._$AR(), this._$AH = E) : t5 !== this._$AH && t5 !== T && this._(t5) : void 0 !== t5._$litType$ ? this.$(t5) : void 0 !== t5.nodeType ? this.T(t5) : u2(t5) ? this.k(t5) : this._(t5);
      }
      O(t5) {
        return this._$AA.parentNode.insertBefore(t5, this._$AB);
      }
      T(t5) {
        this._$AH !== t5 && (this._$AR(), this._$AH = this.O(t5));
      }
      _(t5) {
        this._$AH !== E && c3(this._$AH) ? this._$AA.nextSibling.data = t5 : this.T(r3.createTextNode(t5)), this._$AH = t5;
      }
      $(t5) {
        const { values: i6, _$litType$: s7 } = t5, e8 = "number" == typeof s7 ? this._$AC(t5) : (void 0 === s7.el && (s7.el = N.createElement(P(s7.h, s7.h[0]), this.options)), s7);
        if (this._$AH?._$AD === e8) this._$AH.p(i6);
        else {
          const t6 = new M(e8, this), s8 = t6.u(this.options);
          t6.p(i6), this.T(s8), this._$AH = t6;
        }
      }
      _$AC(t5) {
        let i6 = A.get(t5.strings);
        return void 0 === i6 && A.set(t5.strings, i6 = new N(t5)), i6;
      }
      k(t5) {
        a2(this._$AH) || (this._$AH = [], this._$AR());
        const i6 = this._$AH;
        let s7, e8 = 0;
        for (const h3 of t5) e8 === i6.length ? i6.push(s7 = new _R(this.O(l2()), this.O(l2()), this, this.options)) : s7 = i6[e8], s7._$AI(h3), e8++;
        e8 < i6.length && (this._$AR(s7 && s7._$AB.nextSibling, e8), i6.length = e8);
      }
      _$AR(t5 = this._$AA.nextSibling, i6) {
        for (this._$AP?.(false, true, i6); t5 !== this._$AB; ) {
          const i7 = t5.nextSibling;
          t5.remove(), t5 = i7;
        }
      }
      setConnected(t5) {
        void 0 === this._$AM && (this._$Cv = t5, this._$AP?.(t5));
      }
    };
    k = class {
      get tagName() {
        return this.element.tagName;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      constructor(t5, i6, s7, e8, h3) {
        this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t5, this.name = i6, this._$AM = e8, this.options = h3, s7.length > 2 || "" !== s7[0] || "" !== s7[1] ? (this._$AH = Array(s7.length - 1).fill(new String()), this.strings = s7) : this._$AH = E;
      }
      _$AI(t5, i6 = this, s7, e8) {
        const h3 = this.strings;
        let o6 = false;
        if (void 0 === h3) t5 = S2(this, t5, i6, 0), o6 = !c3(t5) || t5 !== this._$AH && t5 !== T, o6 && (this._$AH = t5);
        else {
          const e9 = t5;
          let n6, r6;
          for (t5 = h3[0], n6 = 0; n6 < h3.length - 1; n6++) r6 = S2(this, e9[s7 + n6], i6, n6), r6 === T && (r6 = this._$AH[n6]), o6 || (o6 = !c3(r6) || r6 !== this._$AH[n6]), r6 === E ? t5 = E : t5 !== E && (t5 += (r6 ?? "") + h3[n6 + 1]), this._$AH[n6] = r6;
        }
        o6 && !e8 && this.j(t5);
      }
      j(t5) {
        t5 === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t5 ?? "");
      }
    };
    H = class extends k {
      constructor() {
        super(...arguments), this.type = 3;
      }
      j(t5) {
        this.element[this.name] = t5 === E ? void 0 : t5;
      }
    };
    I = class extends k {
      constructor() {
        super(...arguments), this.type = 4;
      }
      j(t5) {
        this.element.toggleAttribute(this.name, !!t5 && t5 !== E);
      }
    };
    L = class extends k {
      constructor(t5, i6, s7, e8, h3) {
        super(t5, i6, s7, e8, h3), this.type = 5;
      }
      _$AI(t5, i6 = this) {
        if ((t5 = S2(this, t5, i6, 0) ?? E) === T) return;
        const s7 = this._$AH, e8 = t5 === E && s7 !== E || t5.capture !== s7.capture || t5.once !== s7.once || t5.passive !== s7.passive, h3 = t5 !== E && (s7 === E || e8);
        e8 && this.element.removeEventListener(this.name, this, s7), h3 && this.element.addEventListener(this.name, this, t5), this._$AH = t5;
      }
      handleEvent(t5) {
        "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t5) : this._$AH.handleEvent(t5);
      }
    };
    z = class {
      constructor(t5, i6, s7) {
        this.element = t5, this.type = 6, this._$AN = void 0, this._$AM = i6, this.options = s7;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      _$AI(t5) {
        S2(this, t5);
      }
    };
    j = t2.litHtmlPolyfillSupport;
    j?.(N, R), (t2.litHtmlVersions ?? (t2.litHtmlVersions = [])).push("3.3.1");
    B = (t5, i6, s7) => {
      const e8 = s7?.renderBefore ?? i6;
      let h3 = e8._$litPart$;
      if (void 0 === h3) {
        const t6 = s7?.renderBefore ?? null;
        e8._$litPart$ = h3 = new R(i6.insertBefore(l2(), t6), t6, void 0, s7 ?? {});
      }
      return h3._$AI(t5), h3;
    };
  }
});

// ../node_modules/lit-element/lit-element.js
var s3, i4, o4;
var init_lit_element = __esm({
  "../node_modules/lit-element/lit-element.js"() {
    "use strict";
    init_reactive_element();
    init_reactive_element();
    init_lit_html();
    init_lit_html();
    s3 = globalThis;
    i4 = class extends y {
      constructor() {
        super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
      }
      createRenderRoot() {
        var _a;
        const t5 = super.createRenderRoot();
        return (_a = this.renderOptions).renderBefore ?? (_a.renderBefore = t5.firstChild), t5;
      }
      update(t5) {
        const r6 = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t5), this._$Do = B(r6, this.renderRoot, this.renderOptions);
      }
      connectedCallback() {
        super.connectedCallback(), this._$Do?.setConnected(true);
      }
      disconnectedCallback() {
        super.disconnectedCallback(), this._$Do?.setConnected(false);
      }
      render() {
        return T;
      }
    };
    i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
    o4 = s3.litElementPolyfillSupport;
    o4?.({ LitElement: i4 });
    (s3.litElementVersions ?? (s3.litElementVersions = [])).push("4.2.1");
  }
});

// ../node_modules/lit-html/is-server.js
var init_is_server = __esm({
  "../node_modules/lit-html/is-server.js"() {
    "use strict";
  }
});

// ../node_modules/lit/index.js
var init_lit = __esm({
  "../node_modules/lit/index.js"() {
    "use strict";
    init_reactive_element();
    init_lit_html();
    init_lit_element();
    init_is_server();
  }
});

// ../node_modules/@lit/reactive-element/decorators/custom-element.js
var t3;
var init_custom_element = __esm({
  "../node_modules/@lit/reactive-element/decorators/custom-element.js"() {
    "use strict";
    t3 = (t5) => (e8, o6) => {
      void 0 !== o6 ? o6.addInitializer((() => {
        customElements.define(t5, e8);
      })) : customElements.define(t5, e8);
    };
  }
});

// ../node_modules/@lit/reactive-element/decorators/property.js
function n4(t5) {
  return (e8, o6) => "object" == typeof o6 ? r4(t5, e8, o6) : ((t6, e9, o7) => {
    const r6 = e9.hasOwnProperty(o7);
    return e9.constructor.createProperty(o7, t6), r6 ? Object.getOwnPropertyDescriptor(e9, o7) : void 0;
  })(t5, e8, o6);
}
var o5, r4;
var init_property = __esm({
  "../node_modules/@lit/reactive-element/decorators/property.js"() {
    "use strict";
    init_reactive_element();
    o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
    r4 = (t5 = o5, e8, r6) => {
      const { kind: n6, metadata: i6 } = r6;
      let s7 = globalThis.litPropertyMetadata.get(i6);
      if (void 0 === s7 && globalThis.litPropertyMetadata.set(i6, s7 = /* @__PURE__ */ new Map()), "setter" === n6 && ((t5 = Object.create(t5)).wrapped = true), s7.set(r6.name, t5), "accessor" === n6) {
        const { name: o6 } = r6;
        return { set(r7) {
          const n7 = e8.get.call(this);
          e8.set.call(this, r7), this.requestUpdate(o6, n7, t5);
        }, init(e9) {
          return void 0 !== e9 && this.C(o6, void 0, t5, e9), e9;
        } };
      }
      if ("setter" === n6) {
        const { name: o6 } = r6;
        return function(r7) {
          const n7 = this[o6];
          e8.call(this, r7), this.requestUpdate(o6, n7, t5);
        };
      }
      throw Error("Unsupported decorator location: " + n6);
    };
  }
});

// ../node_modules/@lit/reactive-element/decorators/state.js
function r5(r6) {
  return n4({ ...r6, state: true, attribute: false });
}
var init_state = __esm({
  "../node_modules/@lit/reactive-element/decorators/state.js"() {
    "use strict";
    init_property();
  }
});

// ../node_modules/@lit/reactive-element/decorators/event-options.js
var init_event_options = __esm({
  "../node_modules/@lit/reactive-element/decorators/event-options.js"() {
    "use strict";
  }
});

// ../node_modules/@lit/reactive-element/decorators/base.js
var e4;
var init_base = __esm({
  "../node_modules/@lit/reactive-element/decorators/base.js"() {
    "use strict";
    e4 = (e8, t5, c5) => (c5.configurable = true, c5.enumerable = true, Reflect.decorate && "object" != typeof t5 && Object.defineProperty(e8, t5, c5), c5);
  }
});

// ../node_modules/@lit/reactive-element/decorators/query.js
function e5(e8, r6) {
  return (n6, s7, i6) => {
    const o6 = (t5) => t5.renderRoot?.querySelector(e8) ?? null;
    if (r6) {
      const { get: e9, set: r7 } = "object" == typeof s7 ? n6 : i6 ?? (() => {
        const t5 = Symbol();
        return { get() {
          return this[t5];
        }, set(e10) {
          this[t5] = e10;
        } };
      })();
      return e4(n6, s7, { get() {
        let t5 = e9.call(this);
        return void 0 === t5 && (t5 = o6(this), (null !== t5 || this.hasUpdated) && r7.call(this, t5)), t5;
      } });
    }
    return e4(n6, s7, { get() {
      return o6(this);
    } });
  };
}
var init_query = __esm({
  "../node_modules/@lit/reactive-element/decorators/query.js"() {
    "use strict";
    init_base();
  }
});

// ../node_modules/@lit/reactive-element/decorators/query-all.js
var init_query_all = __esm({
  "../node_modules/@lit/reactive-element/decorators/query-all.js"() {
    "use strict";
    init_base();
  }
});

// ../node_modules/@lit/reactive-element/decorators/query-async.js
var init_query_async = __esm({
  "../node_modules/@lit/reactive-element/decorators/query-async.js"() {
    "use strict";
    init_base();
  }
});

// ../node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
var init_query_assigned_elements = __esm({
  "../node_modules/@lit/reactive-element/decorators/query-assigned-elements.js"() {
    "use strict";
    init_base();
  }
});

// ../node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js
var init_query_assigned_nodes = __esm({
  "../node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js"() {
    "use strict";
    init_base();
  }
});

// ../node_modules/lit/decorators.js
var init_decorators = __esm({
  "../node_modules/lit/decorators.js"() {
    "use strict";
    init_custom_element();
    init_property();
    init_state();
    init_event_options();
    init_query();
    init_query_all();
    init_query_async();
    init_query_assigned_elements();
    init_query_assigned_nodes();
  }
});

// ../node_modules/@lit/context/lib/context-request-event.js
var s4;
var init_context_request_event = __esm({
  "../node_modules/@lit/context/lib/context-request-event.js"() {
    "use strict";
    s4 = class extends Event {
      constructor(s7, t5, e8, o6) {
        super("context-request", { bubbles: true, composed: true }), this.context = s7, this.contextTarget = t5, this.callback = e8, this.subscribe = o6 ?? false;
      }
    };
  }
});

// ../node_modules/@lit/context/lib/create-context.js
function n5(n6) {
  return n6;
}
var init_create_context = __esm({
  "../node_modules/@lit/context/lib/create-context.js"() {
    "use strict";
  }
});

// ../node_modules/@lit/context/lib/controllers/context-consumer.js
var s5;
var init_context_consumer = __esm({
  "../node_modules/@lit/context/lib/controllers/context-consumer.js"() {
    "use strict";
    init_context_request_event();
    s5 = class {
      constructor(t5, s7, i6, h3) {
        if (this.subscribe = false, this.provided = false, this.value = void 0, this.t = (t6, s8) => {
          this.unsubscribe && (this.unsubscribe !== s8 && (this.provided = false, this.unsubscribe()), this.subscribe || this.unsubscribe()), this.value = t6, this.host.requestUpdate(), this.provided && !this.subscribe || (this.provided = true, this.callback && this.callback(t6, s8)), this.unsubscribe = s8;
        }, this.host = t5, void 0 !== s7.context) {
          const t6 = s7;
          this.context = t6.context, this.callback = t6.callback, this.subscribe = t6.subscribe ?? false;
        } else this.context = s7, this.callback = i6, this.subscribe = h3 ?? false;
        this.host.addController(this);
      }
      hostConnected() {
        this.dispatchRequest();
      }
      hostDisconnected() {
        this.unsubscribe && (this.unsubscribe(), this.unsubscribe = void 0);
      }
      dispatchRequest() {
        this.host.dispatchEvent(new s4(this.context, this.host, this.t, this.subscribe));
      }
    };
  }
});

// ../node_modules/@lit/context/lib/value-notifier.js
var s6;
var init_value_notifier = __esm({
  "../node_modules/@lit/context/lib/value-notifier.js"() {
    "use strict";
    s6 = class {
      get value() {
        return this.o;
      }
      set value(s7) {
        this.setValue(s7);
      }
      setValue(s7, t5 = false) {
        const i6 = t5 || !Object.is(s7, this.o);
        this.o = s7, i6 && this.updateObservers();
      }
      constructor(s7) {
        this.subscriptions = /* @__PURE__ */ new Map(), this.updateObservers = () => {
          for (const [s8, { disposer: t5 }] of this.subscriptions) s8(this.o, t5);
        }, void 0 !== s7 && (this.value = s7);
      }
      addCallback(s7, t5, i6) {
        if (!i6) return void s7(this.value);
        this.subscriptions.has(s7) || this.subscriptions.set(s7, { disposer: () => {
          this.subscriptions.delete(s7);
        }, consumerHost: t5 });
        const { disposer: h3 } = this.subscriptions.get(s7);
        s7(this.value, h3);
      }
      clearCallbacks() {
        this.subscriptions.clear();
      }
    };
  }
});

// ../node_modules/@lit/context/lib/controllers/context-provider.js
var e6, i5;
var init_context_provider = __esm({
  "../node_modules/@lit/context/lib/controllers/context-provider.js"() {
    "use strict";
    init_context_request_event();
    init_value_notifier();
    e6 = class extends Event {
      constructor(t5, s7) {
        super("context-provider", { bubbles: true, composed: true }), this.context = t5, this.contextTarget = s7;
      }
    };
    i5 = class extends s6 {
      constructor(s7, e8, i6) {
        super(void 0 !== e8.context ? e8.initialValue : i6), this.onContextRequest = (t5) => {
          if (t5.context !== this.context) return;
          const s8 = t5.contextTarget ?? t5.composedPath()[0];
          s8 !== this.host && (t5.stopPropagation(), this.addCallback(t5.callback, s8, t5.subscribe));
        }, this.onProviderRequest = (s8) => {
          if (s8.context !== this.context) return;
          if ((s8.contextTarget ?? s8.composedPath()[0]) === this.host) return;
          const e9 = /* @__PURE__ */ new Set();
          for (const [s9, { consumerHost: i7 }] of this.subscriptions) e9.has(s9) || (e9.add(s9), i7.dispatchEvent(new s4(this.context, i7, s9, true)));
          s8.stopPropagation();
        }, this.host = s7, void 0 !== e8.context ? this.context = e8.context : this.context = e8, this.attachListeners(), this.host.addController?.(this);
      }
      attachListeners() {
        this.host.addEventListener("context-request", this.onContextRequest), this.host.addEventListener("context-provider", this.onProviderRequest);
      }
      hostConnected() {
        this.host.dispatchEvent(new e6(this.context, this.host));
      }
    };
  }
});

// ../node_modules/@lit/context/lib/context-root.js
var init_context_root = __esm({
  "../node_modules/@lit/context/lib/context-root.js"() {
    "use strict";
    init_context_request_event();
  }
});

// ../node_modules/@lit/context/lib/decorators/provide.js
function e7({ context: e8 }) {
  return (n6, i6) => {
    const r6 = /* @__PURE__ */ new WeakMap();
    if ("object" == typeof i6) return { get() {
      return n6.get.call(this);
    }, set(t5) {
      return r6.get(this).setValue(t5), n6.set.call(this, t5);
    }, init(n7) {
      return r6.set(this, new i5(this, { context: e8, initialValue: n7 })), n7;
    } };
    {
      n6.constructor.addInitializer(((n7) => {
        r6.set(n7, new i5(n7, { context: e8 }));
      }));
      const o6 = Object.getOwnPropertyDescriptor(n6, i6);
      let s7;
      if (void 0 === o6) {
        const t5 = /* @__PURE__ */ new WeakMap();
        s7 = { get() {
          return t5.get(this);
        }, set(e9) {
          r6.get(this).setValue(e9), t5.set(this, e9);
        }, configurable: true, enumerable: true };
      } else {
        const t5 = o6.set;
        s7 = { ...o6, set(e9) {
          r6.get(this).setValue(e9), t5?.call(this, e9);
        } };
      }
      return void Object.defineProperty(n6, i6, s7);
    }
  };
}
var init_provide = __esm({
  "../node_modules/@lit/context/lib/decorators/provide.js"() {
    "use strict";
    init_context_provider();
  }
});

// ../node_modules/@lit/context/lib/decorators/consume.js
function c4({ context: c5, subscribe: e8 }) {
  return (o6, n6) => {
    "object" == typeof n6 ? n6.addInitializer((function() {
      new s5(this, { context: c5, callback: (t5) => {
        o6.set.call(this, t5);
      }, subscribe: e8 });
    })) : o6.constructor.addInitializer(((o7) => {
      new s5(o7, { context: c5, callback: (t5) => {
        o7[n6] = t5;
      }, subscribe: e8 });
    }));
  };
}
var init_consume = __esm({
  "../node_modules/@lit/context/lib/decorators/consume.js"() {
    "use strict";
    init_context_consumer();
  }
});

// ../node_modules/@lit/context/index.js
var init_context = __esm({
  "../node_modules/@lit/context/index.js"() {
    "use strict";
    init_context_request_event();
    init_create_context();
    init_context_consumer();
    init_context_provider();
    init_context_root();
    init_provide();
    init_consume();
  }
});

// src/components/roles.ts
function roleGte(a3, b3) {
  return ROLE_ORDER.indexOf(a3) >= ROLE_ORDER.indexOf(b3);
}
var ROLE_ORDER, PERMS, ROLE_PERMS;
var init_roles = __esm({
  "src/components/roles.ts"() {
    "use strict";
    ROLE_ORDER = ["guest", "operator", "engineer", "admin"];
    PERMS = {
      VIEW_DASHBOARD: "view_dashboard",
      VIEW_HISTORY: "view_history",
      OPERATE_EQUIPMENT: "operate_equipment",
      // nyalakan/matikan peralatan
      CONFIGURE: "configure",
      // akses halaman konfigurasi
      MANAGE_DEVICES: "manage_devices"
      // tambah/hapus device/sensor
    };
    ROLE_PERMS = {
      guest: [PERMS.VIEW_DASHBOARD],
      operator: [PERMS.VIEW_DASHBOARD, PERMS.VIEW_HISTORY, PERMS.OPERATE_EQUIPMENT],
      engineer: [
        PERMS.VIEW_DASHBOARD,
        PERMS.VIEW_HISTORY,
        PERMS.OPERATE_EQUIPMENT,
        PERMS.CONFIGURE,
        PERMS.MANAGE_DEVICES
      ],
      admin: Object.values(PERMS)
      // semua
    };
  }
});

// src/config/api-base.ts
var API_BASE;
var init_api_base = __esm({
  "src/config/api-base.ts"() {
    "use strict";
    API_BASE = window.__API_BASE__ || "http://127.0.0.1:8080";
  }
});

// src/services/auth-service.ts
var USER_MOCK, AuthService;
var init_auth_service = __esm({
  "src/services/auth-service.ts"() {
    "use strict";
    init_roles();
    init_api_base();
    USER_MOCK = false;
    AuthService = class {
      static async login(username, password) {
        if (USER_MOCK) {
          const list = await this._readMockUsers();
          const found = list.find(
            (u3) => String(u3.username).toLowerCase() === username.toLowerCase() && String(u3.password) === String(password)
          );
          await new Promise((r6) => setTimeout(r6, 300));
          if (!found)
            throw new Error("Login gagal (MOCK): username/password salah.");
          const token2 = `mock-${found.username}-${Date.now()}`;
          const role2 = (found.role ?? "guest").toString().toLowerCase();
          const user2 = {
            username: found.username,
            avatarUrl: found.avatarUrl ?? "",
            role: role2
          };
          localStorage.setItem(this.KEY, token2);
          localStorage.setItem(this.USER, JSON.stringify(user2));
          const fullUser = { ...user2, token: token2 };
          window.dispatchEvent(new Event("auth:changed"));
          return fullUser;
        }
        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });
        if (!res.ok) {
          let msg = "Login gagal. Periksa kredensial Anda.";
          try {
            const j2 = await res.json();
            if (j2?.message) msg = j2.message;
          } catch {
          }
          throw new Error(msg);
        }
        const data = await res.json();
        const role = data.role ?? "guest";
        const token = `session-${data.username}-${Date.now()}`;
        const user = {
          username: data.username,
          avatarUrl: data.avatarUrl ?? "",
          role,
          token
        };
        localStorage.setItem(this.KEY, token);
        localStorage.setItem(
          this.USER,
          JSON.stringify({
            username: user.username,
            avatarUrl: user.avatarUrl,
            role: user.role
          })
        );
        window.dispatchEvent(new Event("auth:changed"));
        return user;
      }
      static logout() {
        localStorage.removeItem(this.KEY);
        localStorage.removeItem(this.USER);
        window.dispatchEvent(new Event("auth:changed"));
      }
      static getToken() {
        return localStorage.getItem(this.KEY);
      }
      static getUser() {
        const raw = localStorage.getItem(this.USER);
        if (!raw) return null;
        try {
          const j2 = JSON.parse(raw);
          const role = j2.role ? String(j2.role).toLowerCase() : void 0;
          return {
            username: j2.username ?? "Guest",
            avatarUrl: j2.avatarUrl ?? "",
            role
          };
        } catch {
          return null;
        }
      }
      /**
       * Mengembalikan user lengkap beserta token untuk context
       */
      static getUserWithToken() {
        const user = this.getUser();
        const token = this.getToken();
        return user && token ? { ...user, token } : null;
      }
      static isLoggedIn() {
        return !!this.getToken();
      }
      // === RBAC helpers ===
      static hasRole(role) {
        const u3 = this.getUser();
        return !!u3?.role && u3.role === role;
      }
      static hasRoleAtLeast(minRole) {
        const u3 = this.getUser();
        if (!u3?.role) return false;
        return roleGte(u3.role, minRole);
      }
      static can(perm) {
        const u3 = this.getUser();
        if (!u3?.role) return false;
        if (u3.role === "admin") return true;
        return ROLE_PERMS[u3.role].includes(perm);
      }
      // ===== helpers =====
      static async _readMockUsers() {
        const ENV = "pre-release";
        const BASE = ENV === "pre-release" ? "/taniverse/" : ENV === "production" ? "" : "/";
        const candidates = [
          `${BASE}assets/mock/users.json`,
          `${BASE}src/assets/mock/users.json`,
          `${BASE}assets/mock/user.json`,
          `${BASE}src/assets/mock/user.json`
        ];
        for (const url of candidates) {
          try {
            const res = await fetch(url, { cache: "no-cache" });
            if (!res.ok) continue;
            const data = await res.json();
            const list = Array.isArray(data) ? data : Array.isArray(data?.users) ? data.users : [];
            if (Array.isArray(list)) return list;
          } catch {
          }
        }
        console.warn(
          "[AuthService] users.json tidak ditemukan, pakai data embedded."
        );
        return [
          {
            username: "admin",
            password: "admin123",
            role: "admin",
            avatarUrl: "https://i.pravatar.cc/100?img=1"
          },
          {
            username: "engineer",
            password: "engineer123",
            role: "engineer",
            avatarUrl: "https://i.pravatar.cc/100?img=3"
          },
          {
            username: "operator",
            password: "operator123",
            role: "operator",
            avatarUrl: "https://i.pravatar.cc/100?img=2"
          },
          {
            username: "guest",
            password: "guest123",
            role: "guest",
            avatarUrl: "https://i.pravatar.cc/100?img=4"
          }
        ];
      }
    };
    AuthService.KEY = "auth_token_v1";
    AuthService.USER = "auth_user_v1";
  }
});

// src/pages/login.ts
var login_exports = {};
__export(login_exports, {
  PageLogin: () => PageLogin
});
var PageLogin;
var init_login = __esm({
  "src/pages/login.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_auth_service();
    init_api_base();
    PageLogin = class extends i4 {
      constructor() {
        super(...arguments);
        this.username = "";
        this.password = "";
        this.loading = false;
        this.error = "";
        this.showPwd = false;
        this.remember = true;
        this.showRegister = false;
        this.regUsername = "";
        this.regPwd1 = "";
        this.regPwd2 = "";
        this.regRole = "guest";
        this.regError = "";
        this.togglePwd = () => this.showPwd = !this.showPwd;
      }
      createRenderRoot() {
        return this;
      }
      firstUpdated() {
        this.username = "admin";
        this.password = "admin123";
      }
      async onSubmit(e8) {
        e8.preventDefault();
        if (this.loading) return;
        this.error = "";
        this.loading = true;
        try {
          await AuthService.login(this.username.trim(), this.password);
          const next = sessionStorage.getItem("next_path") || "/";
          if (this.remember) {
            localStorage.setItem("last_username", this.username.trim());
          } else {
            localStorage.removeItem("last_username");
          }
          sessionStorage.removeItem("next_path");
          this.dispatchEvent(
            new CustomEvent("navigate-to", {
              detail: { path: next },
              bubbles: true,
              composed: true
            })
          );
        } catch (err) {
          this.error = err?.message ?? "Login gagal.";
        } finally {
          this.loading = false;
        }
      }
      async registerUser() {
        this.regError = "";
        if (!this.regUsername || !this.regPwd1 || !this.regPwd2) {
          this.regError = "Semua field harus diisi.";
          return;
        }
        if (this.regPwd1 !== this.regPwd2) {
          this.regError = "Password tidak cocok.";
          return;
        }
        const payload = {
          username: this.regUsername.trim(),
          password: this.regPwd1,
          role: this.regRole,
          avatarUrl: `https://i.pravatar.cc/100?u=${this.regUsername.trim()}`
        };
        try {
          const res = await fetch(`${API_BASE}/api/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          if (res.status === 201) {
            this.showRegister = false;
            this.username = this.regUsername;
            this.password = this.regPwd1;
          } else {
            const body = await res.text();
            throw new Error(`Registrasi gagal. Status: ${res.status}
${body}`);
          }
        } catch (err) {
          this.regError = err.message;
        }
      }
      cancelRegister() {
        this.showRegister = false;
        this.regUsername = "";
        this.regPwd1 = "";
        this.regPwd2 = "";
        this.regRole = "guest";
        this.regError = "";
      }
      render() {
        return x`
      <!-- Background -->
      <section
        class="relative min-h-[90vh] flex items-center justify-center overflow-hidden
               bg-gradient-to-br from-emerald-50 via-white to-sky-50
               dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
      >
        <!-- dekorasi blob -->
        <div
          class="pointer-events-none absolute -top-10 -left-10 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl"
        ></div>
        <div
          class="pointer-events-none absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-sky-300/30 blur-3xl"
        ></div>

        <!-- Card -->
        <div
          class="relative z-10 w-full max-w-md mx-4
                 rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl
                 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.35)]
                 dark:bg-white/10 dark:border-white/10"
        >
          <!-- Header -->
          <div class="px-8 pt-8 text-center">
            <div
              class="mx-auto mb-4 grid place-items-center h-16 w-16 rounded-2xl
                     bg-gradient-to-br from-emerald-500 to-sky-500 text-white shadow-lg shadow-emerald-500/30"
            >
              <!-- user icon -->
              <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="white" stroke-width="2" />
                <path
                  d="M4 19c1.8-3 5-5 8-5s6.2 2 8 5"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <h1
              class="text-2xl md:text-3xl font-extrabold
                       bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent
                       dark:from-emerald-400 dark:to-sky-400"
            >
              Selamat Datang Kembali 👋
            </h1>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Masuk untuk lanjut. Make it vibes, stay productive ✨
            </p>
          </div>

          <!-- Form -->
          <form class="px-8 pt-6 pb-8" @submit=${this.onSubmit} novalidate>
            ${this.error ? x`
                  <div
                    class="mb-4 text-sm text-red-700 bg-red-50/90 border border-red-200 rounded-xl px-4 py-3
                       dark:bg-red-400/10 dark:border-red-300/20 dark:text-red-200"
                  >
                    ${this.error}
                  </div>
                ` : null}

            <!-- Username -->
            <label
              class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200"
              >Username</label
            >
            <div class="relative mb-4">
              <input
                class="w-full px-3 py-2.5 pr-10 rounded-xl border border-slate-200/80 bg-white/80
                       focus:outline-none focus:ring-2 focus:ring-emerald-400
                       dark:bg-white/10 dark:border-white/10 dark:text-slate-100"
                placeholder="yourname"
                autocomplete="username"
                .value=${this.username}
                @input=${(e8) => this.username = e8.target.value}
              />
              <span
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                <!-- at icon -->
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 4a8 8 0 108 8"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                  />
                  <path
                    d="M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
              </span>
            </div>

            <!-- Password -->
            <label
              class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200"
              >Password</label
            >
            <div class="relative mb-2">
              <input
                class="w-full px-3 py-2.5 pr-12 rounded-xl border border-slate-200/80 bg-white/80
                       focus:outline-none focus:ring-2 focus:ring-emerald-400
                       dark:bg-white/10 dark:border-white/10 dark:text-slate-100"
                placeholder="••••••••"
                .type=${this.showPwd ? "text" : "password"}
                autocomplete="current-password"
                .value=${this.password}
                @input=${(e8) => this.password = e8.target.value}
              />
              <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-slate-400 hover:text-slate-600
                       dark:hover:text-slate-200"
                @click=${this.togglePwd}
                aria-label="Toggle password"
                tabindex="-1"
              >
                ${this.showPwd ? x`
                      <!-- eye-off -->
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M3 3l18 18"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          d="M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-1.24"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          d="M9.88 5.09A9.76 9.76 0 0112 5c5 0 9 4 10 7-0.37 1.04-1.06 2.19-2.07 3.25M6.64 6.64C4.16 8.1 2.61 10.1 2 12c0.37 1.04 1.06 2.19 2.07 3.25A13.1 13.1 0 0012 19c1.14 0 2.25-.16 3.31-.47"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          fill="none"
                        />
                      </svg>
                    ` : x`
                      <!-- eye -->
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="currentColor"
                          stroke-width="2"
                        />
                      </svg>
                    `}
              </button>
            </div>

            <!-- Row: remember & forgot -->
            <div class="mb-5 flex items-center justify-between text-sm">
              <label
                class="inline-flex items-center gap-2 select-none text-slate-600 dark:text-slate-300"
              >
                <input
                  type="checkbox"
                  class="rounded-md border-slate-300 text-emerald-600 focus:ring-emerald-400"
                  .checked=${this.remember}
                  @change=${(e8) => this.remember = !!e8.target.checked}
                />
                Ingat saya
              </label>
              <a
                class="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                href="#"
                @click=${(e8) => e8.preventDefault()}
              >
                Lupa password?
              </a>
            </div>

            <!-- Submit -->
            <button
              class="w-full inline-flex items-center justify-center gap-2
                     py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700
                     disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]
                     transition"
              ?disabled=${this.loading || !this.username || !this.password}
              type="submit"
            >
              ${this.loading ? x`
                    <svg
                      class="w-5 h-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="white"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="white"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    <span>Memproses…</span>
                  ` : x`<span>Masuk</span>`}
            </button>

            <!-- Divider -->
            <div class="flex items-center gap-3 my-6">
              <div class="h-px flex-1 bg-slate-200 dark:bg-white/10"></div>
              <span class="text-[11px] uppercase tracking-wider text-slate-400"
                >atau</span
              >
              <div class="h-px flex-1 bg-slate-200 dark:bg-white/10"></div>
            </div>

            <!-- Register button -->
            <button
              type="button"
              class="w-full inline-flex items-center justify-center gap-2
                     py-2.5 rounded-xl border border-blue-600 bg-white hover:bg-slate-100
                     text-slate-700 dark:text-slate-100 dark:bg-transparent dark:border-white/20"
              @click=${() => this.showRegister = true}
            >
              🧪 Belum punya akun? Daftar di sini
            </button>
          </form>

          <!-- Footer -->
          <div class="px-8 pb-8">
            <p
              class="text-[11px] text-center text-slate-500 dark:text-slate-400"
            >
              Dengan masuk, kamu setuju pada ketentuan & privasi kami.
            </p>
          </div>
        </div>
        ${this.showRegister ? x`
              <div
                class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
              >
                <div
                  class="bg-white dark:bg-slate-800 p-6 rounded-2xl w-full max-w-md shadow-xl border border-slate-200 dark:border-slate-700"
                >
                  <h2
                    class="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100"
                  >
                    Registrasi Pengguna
                  </h2>

                  ${this.regError ? x`<div class="text-sm text-red-500 mb-2">
                        ${this.regError}
                      </div>` : null}

                  <div class="space-y-4">
                    <input
                      class="w-full p-2 rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                      placeholder="Username"
                      .value=${this.regUsername}
                      @input=${(e8) => this.regUsername = e8.target.value}
                    />
                    <input
                      class="w-full p-2 rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                      type="password"
                      placeholder="Password"
                      .value=${this.regPwd1}
                      @input=${(e8) => this.regPwd1 = e8.target.value}
                    />
                    <input
                      class="w-full p-2 rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                      type="password"
                      placeholder="Ulangi Password"
                      .value=${this.regPwd2}
                      @input=${(e8) => this.regPwd2 = e8.target.value}
                    />
                    <select
                      class="w-full p-2 rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                      .value=${this.regRole}
                      @change=${(e8) => this.regRole = e8.target.value}
                    >
                      <option value="guest">Guest</option>
                      <option value="operator">Operator</option>
                      <option value="engineer">Engineer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div class="mt-6 flex justify-end gap-3">
                    <button
                      @click=${this.cancelRegister}
                      class="px-4 py-2 rounded border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      Batal
                    </button>
                    <button
                      @click=${this.registerUser}
                      class="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            ` : null}
      </section>
    `;
      }
    };
    PageLogin.styles = i`
    :host {
      display: block;
    }
  `;
    __decorateClass([
      r5()
    ], PageLogin.prototype, "username", 2);
    __decorateClass([
      r5()
    ], PageLogin.prototype, "password", 2);
    __decorateClass([
      r5()
    ], PageLogin.prototype, "loading", 2);
    __decorateClass([
      r5()
    ], PageLogin.prototype, "error", 2);
    __decorateClass([
      r5()
    ], PageLogin.prototype, "showPwd", 2);
    __decorateClass([
      r5()
    ], PageLogin.prototype, "remember", 2);
    __decorateClass([
      r5()
    ], PageLogin.prototype, "showRegister", 2);
    __decorateClass([
      r5()
    ], PageLogin.prototype, "regUsername", 2);
    __decorateClass([
      r5()
    ], PageLogin.prototype, "regPwd1", 2);
    __decorateClass([
      r5()
    ], PageLogin.prototype, "regPwd2", 2);
    __decorateClass([
      r5()
    ], PageLogin.prototype, "regRole", 2);
    __decorateClass([
      r5()
    ], PageLogin.prototype, "regError", 2);
    PageLogin = __decorateClass([
      t3("page-login")
    ], PageLogin);
  }
});

// src/components/ui/ui-tabs.ts
var UiTabs;
var init_ui_tabs = __esm({
  "src/components/ui/ui-tabs.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    UiTabs = class extends i4 {
      constructor() {
        super(...arguments);
        this.tabs = [];
        this.active = "";
        this.badges = {};
      }
      createRenderRoot() {
        return this;
      }
      onClick(id) {
        this.dispatchEvent(
          new CustomEvent("dev-tab-change", {
            detail: { id },
            bubbles: true,
            composed: true
          })
        );
      }
      render() {
        return x`
      <nav class="border-b border-slate-200 bg-white rounded-t-md">
        <ul class="flex flex-row items-center gap-2 -mb-px px-2 list-none">
          ${this.tabs.map((t5) => {
          const isActive = t5.id === this.active;
          const badge = this.badges[t5.id] ?? 0;
          return x`
              <li>
                <button
                  class="${[
            "px-4 py-2 text-sm rounded-t-md border transition",
            "inline-flex items-center gap-2",
            isActive ? "bg-slate-100 text-slate-900 border-slate-300 border-b-white" : "border-transparent text-slate-500 hover:bg-slate-50"
          ].join(" ")}"
                  @click=${() => this.onClick(t5.id)}
                >
                  ${t5.icon ? x`<span>${t5.icon}</span>` : null}
                  <span>${t5.label}</span>
                  ${badge > 0 ? x`
                        <span
                          class="ml-1 grid place-items-center w-5 h-5 rounded-full bg-red-500 text-white text-xs"
                          >${badge}</span
                        >
                      ` : null}
                </button>
              </li>
            `;
        })}
        </ul>
      </nav>
    `;
      }
    };
    __decorateClass([
      n4({ type: Array })
    ], UiTabs.prototype, "tabs", 2);
    __decorateClass([
      n4({ attribute: false })
    ], UiTabs.prototype, "active", 2);
    __decorateClass([
      n4({ attribute: false })
    ], UiTabs.prototype, "badges", 2);
    UiTabs = __decorateClass([
      t3("ui-tabs")
    ], UiTabs);
  }
});

// src/services/mode.ts
function hasCapability(capability) {
  const mode = getMode();
  return modeCapabilities[mode]?.includes(capability) ?? false;
}
function getMode() {
  const raw = localStorage.getItem(KEY);
  return VALID_MODES.includes(raw) ? raw : "mock";
}
function setMode(mode) {
  if (VALID_MODES.includes(mode)) {
    localStorage.setItem(KEY, mode);
  } else {
    console.warn(`[mode] Invalid mode "${mode}", ignoring`);
  }
}
function isMockMode() {
  return hasCapability("mock");
}
var KEY, VALID_MODES, modeCapabilities;
var init_mode = __esm({
  "src/services/mode.ts"() {
    "use strict";
    KEY = "device.mode";
    VALID_MODES = ["mock", "mqtt", "sim"];
    modeCapabilities = {
      mock: ["mock"],
      mqtt: ["mqtt"],
      sim: ["mock", "simulator"]
    };
  }
});

// src/services/mock-data.service.ts
async function fetchMockData(filename) {
  const path = `./assets/mock/${filename}`;
  console.log(`\u{1F4E5} [fetchMockData] Fetching mock data: ${path}`);
  try {
    const res = await fetch(path);
    console.log(`[fetchMockData] Response status: ${res.status}`);
    if (!res.ok) {
      throw new Error(
        `\u274C Gagal fetch mock data: ${path} \u2192 ${res.status} ${res.statusText}`
      );
    }
    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await res.text();
      console.warn(`\u26A0\uFE0F Bukan response JSON:
${text.substring(0, 100)}...`);
      throw new Error(`Respon bukan JSON: ${path}`);
    }
    const data = await res.json();
    console.log(`\u2705 [fetchMockData] Sukses load ${filename}:`, data);
    return data;
  } catch (err) {
    console.error(`\u274C [fetchMockData] Gagal memuat file ${filename}:`, err);
    throw err;
  }
}
var init_mock_data_service = __esm({
  "src/services/mock-data.service.ts"() {
    "use strict";
  }
});

// src/repositories/mock/MockDeviceRepository.ts
var MockDeviceRepository;
var init_MockDeviceRepository = __esm({
  "src/repositories/mock/MockDeviceRepository.ts"() {
    "use strict";
    init_mock_data_service();
    MockDeviceRepository = class {
      constructor() {
        this.cache = null;
      }
      async getAll() {
        if (!this.cache) {
          this.cache = await fetchMockData("devices.json");
        }
        return this.cache;
      }
      async getByTag(tag) {
        const all = await this.getAll();
        return all.find((device) => device.tagNumber === tag) ?? null;
      }
    };
  }
});

// src/repositories/api/ApiDeviceRepository.ts
var ApiDeviceRepository;
var init_ApiDeviceRepository = __esm({
  "src/repositories/api/ApiDeviceRepository.ts"() {
    "use strict";
    ApiDeviceRepository = class {
      constructor() {
        this.baseUrl = "/api/devices";
      }
      async getAll() {
        const res = await fetch(this.baseUrl);
        if (!res.ok) {
          throw new Error(
            `[ApiDeviceRepository] Failed to fetch devices: ${res.status}`
          );
        }
        return await res.json();
      }
      async getByTag(tag) {
        const res = await fetch(`${this.baseUrl}/${encodeURIComponent(tag)}`);
        if (!res.ok) {
          if (res.status === 404) return null;
          throw new Error(
            `[ApiDeviceRepository] Failed to fetch device: ${res.status}`
          );
        }
        return await res.json();
      }
    };
  }
});

// src/repositories/mock/MockPlantRepository.ts
var MockPlantRepository;
var init_MockPlantRepository = __esm({
  "src/repositories/mock/MockPlantRepository.ts"() {
    "use strict";
    init_mock_data_service();
    MockPlantRepository = class {
      constructor() {
        this.cache = null;
      }
      async getAll() {
        if (!this.cache) {
          this.cache = await fetchMockData("plants.json");
        }
        return this.cache;
      }
      async getById(id) {
        const all = await this.getAll();
        return all.find((p3) => p3.id === id) ?? null;
      }
    };
  }
});

// src/repositories/api/ApiPlantRepository.ts
var ApiPlantRepository;
var init_ApiPlantRepository = __esm({
  "src/repositories/api/ApiPlantRepository.ts"() {
    "use strict";
    ApiPlantRepository = class {
      constructor() {
        this.baseUrl = "/api/plants";
      }
      async getAll() {
        const res = await fetch(this.baseUrl);
        if (!res.ok) throw new Error(`[ApiPlantRepository] Failed to fetch list`);
        return await res.json();
      }
      async getById(id) {
        const res = await fetch(`${this.baseUrl}/${encodeURIComponent(id)}`);
        if (!res.ok) return null;
        return await res.json();
      }
    };
  }
});

// src/repositories/mock/MockEventRepository.ts
var MockEventRepository;
var init_MockEventRepository = __esm({
  "src/repositories/mock/MockEventRepository.ts"() {
    "use strict";
    init_mock_data_service();
    MockEventRepository = class {
      async getAll() {
        return await fetchMockData("event.json");
      }
      async getById(id) {
        const all = await this.getAll();
        return all.find((e8) => e8.id === id) ?? null;
      }
    };
  }
});

// src/repositories/api/ApiEventRepository.ts
var ApiEventRepository;
var init_ApiEventRepository = __esm({
  "src/repositories/api/ApiEventRepository.ts"() {
    "use strict";
    ApiEventRepository = class {
      async getAll() {
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("API fetch failed");
        return await res.json();
      }
      async getById(id) {
        const res = await fetch(`/api/events/${id}`);
        if (!res.ok) throw new Error("Event not found");
        return await res.json();
      }
    };
  }
});

// src/repositories/mock/MockAquaticSpeciesRepository.ts
var MockAquaticSpeciesRepository;
var init_MockAquaticSpeciesRepository = __esm({
  "src/repositories/mock/MockAquaticSpeciesRepository.ts"() {
    "use strict";
    MockAquaticSpeciesRepository = class {
      async getAll() {
        const res = await fetch("./assets/mock/species.json");
        if (!res.ok) throw new Error("Gagal load species mock");
        return await res.json();
      }
      async getById(id) {
        const all = await this.getAll();
        return all.find((s7) => s7.id === id) ?? null;
      }
    };
  }
});

// src/repositories/api/ApiAquaticSpeciesRepository.ts
var ApiAquaticSpeciesRepository;
var init_ApiAquaticSpeciesRepository = __esm({
  "src/repositories/api/ApiAquaticSpeciesRepository.ts"() {
    "use strict";
    ApiAquaticSpeciesRepository = class {
      async getAll() {
        const res = await fetch("/api/aquatic-species");
        if (!res.ok) throw new Error("Failed to fetch aquatic species");
        return await res.json();
      }
      async getById(id) {
        const all = await this.getAll();
        return all.find((s7) => s7.id === id) ?? null;
      }
    };
  }
});

// src/repositories/mock/MockLivestockRepository.ts
var MockLivestockRepository;
var init_MockLivestockRepository = __esm({
  "src/repositories/mock/MockLivestockRepository.ts"() {
    "use strict";
    init_mock_data_service();
    MockLivestockRepository = class {
      constructor() {
        this.cache = null;
      }
      async getAll() {
        if (!this.cache) {
          this.cache = await fetchMockData("livestock.json");
        }
        return this.cache;
      }
      async getById(id) {
        const all = await this.getAll();
        return all.find((s7) => s7.id === id) ?? null;
      }
    };
  }
});

// src/repositories/api/ApiLivestockRepository.ts
var ApiLivestockRepository;
var init_ApiLivestockRepository = __esm({
  "src/repositories/api/ApiLivestockRepository.ts"() {
    "use strict";
    ApiLivestockRepository = class {
      async getAll() {
        const res = await fetch("/api/livestock");
        if (!res.ok) throw new Error("Failed to fetch livestock data");
        return await res.json();
      }
      async getById(id) {
        const all = await this.getAll();
        return all.find((s7) => s7.id === id) ?? null;
      }
    };
  }
});

// src/repositories/mock/MockAquaticBatchRepository.ts
var MockAquaticBatchRepository;
var init_MockAquaticBatchRepository = __esm({
  "src/repositories/mock/MockAquaticBatchRepository.ts"() {
    "use strict";
    init_mock_data_service();
    MockAquaticBatchRepository = class {
      constructor() {
        this.cache = null;
      }
      async getAll() {
        if (!this.cache) {
          this.cache = await fetchMockData("aquatic-batches.json");
        }
        return this.cache;
      }
      async getById(id) {
        const all = await this.getAll();
        return all.find((batch) => batch.id === id);
      }
      async create(batch) {
        const all = await this.getAll();
        all.push(batch);
      }
      async update(id, batch) {
        const all = await this.getAll();
        const index = all.findIndex((b3) => b3.id === id);
        if (index !== -1) {
          all[index] = { ...all[index], ...batch };
        }
      }
      async delete(id) {
        const all = await this.getAll();
        this.cache = all.filter((b3) => b3.id !== id);
      }
    };
  }
});

// src/repositories/api/ApiAquaticBatchRepository.ts
var ApiAquaticBatchRepository;
var init_ApiAquaticBatchRepository = __esm({
  "src/repositories/api/ApiAquaticBatchRepository.ts"() {
    "use strict";
    ApiAquaticBatchRepository = class {
      constructor() {
        this.baseUrl = "/api/aquatic-batches";
      }
      // sesuaikan endpoint API kamu
      async getAll() {
        const res = await fetch(this.baseUrl);
        if (!res.ok) throw new Error("Failed to fetch aquatic batches");
        return await res.json();
      }
      async getById(id) {
        const res = await fetch(`${this.baseUrl}/${id}`);
        if (!res.ok) return void 0;
        return await res.json();
      }
      async create(batch) {
        const res = await fetch(this.baseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(batch)
        });
        if (!res.ok) throw new Error("Failed to create batch");
      }
      async update(id, batch) {
        const res = await fetch(`${this.baseUrl}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(batch)
        });
        if (!res.ok) throw new Error("Failed to update batch");
      }
      async delete(id) {
        const res = await fetch(`${this.baseUrl}/${id}`, {
          method: "DELETE"
        });
        if (!res.ok) throw new Error("Failed to delete batch");
      }
    };
  }
});

// src/repositories/mock/MockLivestockBatchRepository.ts
var MockLivestockBatchRepository;
var init_MockLivestockBatchRepository = __esm({
  "src/repositories/mock/MockLivestockBatchRepository.ts"() {
    "use strict";
    init_mock_data_service();
    MockLivestockBatchRepository = class {
      constructor() {
        this.cache = null;
      }
      async getAll() {
        if (!this.cache) {
          this.cache = await fetchMockData(
            "livestock-batches.json"
          );
        }
        return this.cache;
      }
      async getById(id) {
        const all = await this.getAll();
        return all.find((b3) => b3.id === id);
      }
      async create(batch) {
        const all = await this.getAll();
        all.push(batch);
      }
      async update(id, batch) {
        const all = await this.getAll();
        const index = all.findIndex((b3) => b3.id === id);
        if (index !== -1) {
          all[index] = { ...all[index], ...batch };
        }
      }
      async delete(id) {
        const all = await this.getAll();
        this.cache = all.filter((b3) => b3.id !== id);
      }
    };
  }
});

// src/repositories/api/ApiLivestockBatchRepository.ts
var ApiLivestockBatchRepository;
var init_ApiLivestockBatchRepository = __esm({
  "src/repositories/api/ApiLivestockBatchRepository.ts"() {
    "use strict";
    ApiLivestockBatchRepository = class {
      constructor() {
        this.baseUrl = "/api/livestock-batches";
      }
      async getAll() {
        const res = await fetch(this.baseUrl);
        if (!res.ok) throw new Error("Failed to fetch livestock batches");
        return await res.json();
      }
      async getById(id) {
        const res = await fetch(`${this.baseUrl}/${id}`);
        if (!res.ok) return void 0;
        return await res.json();
      }
      async create(batch) {
        const res = await fetch(this.baseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(batch)
        });
        if (!res.ok) throw new Error("Failed to create batch");
      }
      async update(id, batch) {
        const res = await fetch(`${this.baseUrl}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(batch)
        });
        if (!res.ok) throw new Error("Failed to update batch");
      }
      async delete(id) {
        const res = await fetch(`${this.baseUrl}/${id}`, {
          method: "DELETE"
        });
        if (!res.ok) throw new Error("Failed to delete batch");
      }
    };
  }
});

// src/repositories/mock/MockHortiBatchRepository.ts
var MockHortiBatchRepository;
var init_MockHortiBatchRepository = __esm({
  "src/repositories/mock/MockHortiBatchRepository.ts"() {
    "use strict";
    init_mock_data_service();
    MockHortiBatchRepository = class {
      constructor() {
        this.cache = null;
      }
      async getAll() {
        if (!this.cache) {
          this.cache = await fetchMockData("horti-batches.json");
        }
        return this.cache;
      }
      async getById(id) {
        const all = await this.getAll();
        return all.find((b3) => b3.id === id);
      }
      async create(batch) {
        const all = await this.getAll();
        all.push(batch);
      }
      async update(id, batch) {
        const all = await this.getAll();
        const index = all.findIndex((b3) => b3.id === id);
        if (index !== -1) {
          all[index] = { ...all[index], ...batch };
        }
      }
      async delete(id) {
        const all = await this.getAll();
        this.cache = all.filter((b3) => b3.id !== id);
      }
    };
  }
});

// src/repositories/api/ApiHortiBatchRepository.ts
var ApiHortiBatchRepository;
var init_ApiHortiBatchRepository = __esm({
  "src/repositories/api/ApiHortiBatchRepository.ts"() {
    "use strict";
    ApiHortiBatchRepository = class {
      constructor() {
        this.baseUrl = "/api/planting-batches";
      }
      async getAll() {
        const res = await fetch(this.baseUrl);
        if (!res.ok) throw new Error("Failed to fetch planting batches");
        return await res.json();
      }
      async getById(id) {
        const res = await fetch(`${this.baseUrl}/${id}`);
        if (!res.ok) return void 0;
        return await res.json();
      }
      async create(batch) {
        const res = await fetch(this.baseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(batch)
        });
        if (!res.ok) throw new Error("Failed to create planting batch");
      }
      async update(id, batch) {
        const res = await fetch(`${this.baseUrl}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(batch)
        });
        if (!res.ok) throw new Error("Failed to update planting batch");
      }
      async delete(id) {
        const res = await fetch(`${this.baseUrl}/${id}`, {
          method: "DELETE"
        });
        if (!res.ok) throw new Error("Failed to delete planting batch");
      }
    };
  }
});

// src/repositories/mock/MockHydroponicBatchRepository.ts
var MockHydroponicBatchRepository;
var init_MockHydroponicBatchRepository = __esm({
  "src/repositories/mock/MockHydroponicBatchRepository.ts"() {
    "use strict";
    init_mock_data_service();
    MockHydroponicBatchRepository = class {
      constructor() {
        this.cache = null;
      }
      async getAll() {
        if (!this.cache) {
          this.cache = await fetchMockData("hydro-batches.json");
        }
        return this.cache;
      }
      async getById(id) {
        const all = await this.getAll();
        return all.find((b3) => b3.id === id);
      }
      async create(batch) {
        const all = await this.getAll();
        all.push(batch);
      }
      async update(id, batch) {
        const all = await this.getAll();
        const index = all.findIndex((b3) => b3.id === id);
        if (index !== -1) {
          all[index] = { ...all[index], ...batch };
        }
      }
      async delete(id) {
        const all = await this.getAll();
        this.cache = all.filter((b3) => b3.id !== id);
      }
    };
  }
});

// src/repositories/api/ApiHydroponicBatchRepository.ts
var ApiHydroponicBatchRepository;
var init_ApiHydroponicBatchRepository = __esm({
  "src/repositories/api/ApiHydroponicBatchRepository.ts"() {
    "use strict";
    ApiHydroponicBatchRepository = class {
      constructor() {
        this.baseUrl = "/api/hydroponic-batches";
      }
      async getAll() {
        const res = await fetch(this.baseUrl);
        if (!res.ok) throw new Error("Failed to fetch hydroponic batches");
        return await res.json();
      }
      async getById(id) {
        const res = await fetch(`${this.baseUrl}/${id}`);
        if (!res.ok) return void 0;
        return await res.json();
      }
      async create(batch) {
        const res = await fetch(this.baseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(batch)
        });
        if (!res.ok) throw new Error("Failed to create batch");
      }
      async update(id, batch) {
        const res = await fetch(`${this.baseUrl}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(batch)
        });
        if (!res.ok) throw new Error("Failed to update batch");
      }
      async delete(id) {
        const res = await fetch(`${this.baseUrl}/${id}`, {
          method: "DELETE"
        });
        if (!res.ok) throw new Error("Failed to delete batch");
      }
    };
  }
});

// src/repositories/repository-factory.ts
function getDeviceRepository() {
  return isMockMode() ? new MockDeviceRepository() : new ApiDeviceRepository();
}
function getPlantRepository() {
  return isMockMode() ? new MockPlantRepository() : new ApiPlantRepository();
}
function getEventRepository() {
  return isMockMode() ? new MockEventRepository() : new ApiEventRepository();
}
function getAquaticSpeciesRepository() {
  return isMockMode() ? new MockAquaticSpeciesRepository() : new ApiAquaticSpeciesRepository();
}
function getLivestockRepository() {
  return isMockMode() ? new MockLivestockRepository() : new ApiLivestockRepository();
}
function getAquaticBatchRepository() {
  return isMockMode() ? new MockAquaticBatchRepository() : new ApiAquaticBatchRepository();
}
function getLivestockBatchRepository() {
  return isMockMode() ? new MockLivestockBatchRepository() : new ApiLivestockBatchRepository();
}
function getHortiBatchRepository() {
  return isMockMode() ? new MockHortiBatchRepository() : new ApiHortiBatchRepository();
}
function getHydroponicBatchRepository() {
  return isMockMode() ? new MockHydroponicBatchRepository() : new ApiHydroponicBatchRepository();
}
var init_repository_factory = __esm({
  "src/repositories/repository-factory.ts"() {
    "use strict";
    init_mode();
    init_MockDeviceRepository();
    init_ApiDeviceRepository();
    init_MockPlantRepository();
    init_ApiPlantRepository();
    init_MockEventRepository();
    init_ApiEventRepository();
    init_MockAquaticSpeciesRepository();
    init_ApiAquaticSpeciesRepository();
    init_MockLivestockRepository();
    init_ApiLivestockRepository();
    init_MockAquaticBatchRepository();
    init_ApiAquaticBatchRepository();
    init_MockLivestockBatchRepository();
    init_ApiLivestockBatchRepository();
    init_MockHortiBatchRepository();
    init_ApiHortiBatchRepository();
    init_MockHydroponicBatchRepository();
    init_ApiHydroponicBatchRepository();
  }
});

// src/services/device.service.ts
var repo, fetchAllDevices;
var init_device_service = __esm({
  "src/services/device.service.ts"() {
    "use strict";
    init_repository_factory();
    repo = getDeviceRepository();
    fetchAllDevices = () => repo.getAll();
  }
});

// ../node_modules/mqtt/dist/mqtt.esm.js
function cs(t5) {
  throw new Error("Node.js process " + t5 + " is not supported by JSPM core outside of Node.js");
}
function ew() {
  !Qr || !wr || (Qr = false, wr.length ? Mt = wr.concat(Mt) : Pi = -1, Mt.length && ic());
}
function ic() {
  if (!Qr) {
    var t5 = setTimeout(ew, 0);
    Qr = true;
    for (var e8 = Mt.length; e8; ) {
      for (wr = Mt, Mt = []; ++Pi < e8; ) wr && wr[Pi].run();
      Pi = -1, e8 = Mt.length;
    }
    wr = null, Qr = false, clearTimeout(t5);
  }
}
function oc(t5) {
  var e8 = new Array(arguments.length - 1);
  if (arguments.length > 1) for (var r6 = 1; r6 < arguments.length; r6++) e8[r6 - 1] = arguments[r6];
  Mt.push(new sc(t5, e8)), Mt.length === 1 && !Qr && setTimeout(ic, 0);
}
function sc(t5, e8) {
  this.fun = t5, this.array = e8;
}
function Ue() {
}
function Ac(t5) {
  cs("_linkedBinding");
}
function Pc(t5) {
  cs("dlopen");
}
function Oc() {
  return [];
}
function Rc() {
  return [];
}
function Dc(t5, e8) {
  if (!t5) throw new Error(e8 || "assertion error");
}
function $c() {
  return false;
}
function af() {
  return Jt.now() / 1e3;
}
function Oi(t5) {
  var e8 = Math.floor((Date.now() - Jt.now()) * 1e-3), r6 = Jt.now() * 1e-3, n6 = Math.floor(r6) + e8, i6 = Math.floor(r6 % 1 * 1e9);
  return t5 && (n6 = n6 - t5[0], i6 = i6 - t5[1], i6 < 0 && (n6--, i6 += ls)), [n6, i6];
}
function Nt() {
  return _f;
}
function mf(t5) {
  return [];
}
function tw() {
  if (Sf) return On;
  Sf = true, On.byteLength = a3, On.toByteArray = f3, On.fromByteArray = w2;
  for (var t5 = [], e8 = [], r6 = typeof Uint8Array < "u" ? Uint8Array : Array, n6 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i6 = 0, s7 = n6.length; i6 < s7; ++i6) t5[i6] = n6[i6], e8[n6.charCodeAt(i6)] = i6;
  e8[45] = 62, e8[95] = 63;
  function o6(y3) {
    var P2 = y3.length;
    if (P2 % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var E2 = y3.indexOf("=");
    E2 === -1 && (E2 = P2);
    var b3 = E2 === P2 ? 0 : 4 - E2 % 4;
    return [E2, b3];
  }
  function a3(y3) {
    var P2 = o6(y3), E2 = P2[0], b3 = P2[1];
    return (E2 + b3) * 3 / 4 - b3;
  }
  function c5(y3, P2, E2) {
    return (P2 + E2) * 3 / 4 - E2;
  }
  function f3(y3) {
    var P2, E2 = o6(y3), b3 = E2[0], m2 = E2[1], v2 = new r6(c5(y3, b3, m2)), R2 = 0, T2 = m2 > 0 ? b3 - 4 : b3, g2;
    for (g2 = 0; g2 < T2; g2 += 4) P2 = e8[y3.charCodeAt(g2)] << 18 | e8[y3.charCodeAt(g2 + 1)] << 12 | e8[y3.charCodeAt(g2 + 2)] << 6 | e8[y3.charCodeAt(g2 + 3)], v2[R2++] = P2 >> 16 & 255, v2[R2++] = P2 >> 8 & 255, v2[R2++] = P2 & 255;
    return m2 === 2 && (P2 = e8[y3.charCodeAt(g2)] << 2 | e8[y3.charCodeAt(g2 + 1)] >> 4, v2[R2++] = P2 & 255), m2 === 1 && (P2 = e8[y3.charCodeAt(g2)] << 10 | e8[y3.charCodeAt(g2 + 1)] << 4 | e8[y3.charCodeAt(g2 + 2)] >> 2, v2[R2++] = P2 >> 8 & 255, v2[R2++] = P2 & 255), v2;
  }
  function h3(y3) {
    return t5[y3 >> 18 & 63] + t5[y3 >> 12 & 63] + t5[y3 >> 6 & 63] + t5[y3 & 63];
  }
  function d3(y3, P2, E2) {
    for (var b3, m2 = [], v2 = P2; v2 < E2; v2 += 3) b3 = (y3[v2] << 16 & 16711680) + (y3[v2 + 1] << 8 & 65280) + (y3[v2 + 2] & 255), m2.push(h3(b3));
    return m2.join("");
  }
  function w2(y3) {
    for (var P2, E2 = y3.length, b3 = E2 % 3, m2 = [], v2 = 16383, R2 = 0, T2 = E2 - b3; R2 < T2; R2 += v2) m2.push(d3(y3, R2, R2 + v2 > T2 ? T2 : R2 + v2));
    return b3 === 1 ? (P2 = y3[E2 - 1], m2.push(t5[P2 >> 2] + t5[P2 << 4 & 63] + "==")) : b3 === 2 && (P2 = (y3[E2 - 2] << 8) + y3[E2 - 1], m2.push(t5[P2 >> 10] + t5[P2 >> 4 & 63] + t5[P2 << 2 & 63] + "=")), m2.join("");
  }
  return On;
}
function rw() {
  if (Ef) return ki;
  Ef = true;
  return ki.read = function(t5, e8, r6, n6, i6) {
    var s7, o6, a3 = i6 * 8 - n6 - 1, c5 = (1 << a3) - 1, f3 = c5 >> 1, h3 = -7, d3 = r6 ? i6 - 1 : 0, w2 = r6 ? -1 : 1, y3 = t5[e8 + d3];
    for (d3 += w2, s7 = y3 & (1 << -h3) - 1, y3 >>= -h3, h3 += a3; h3 > 0; s7 = s7 * 256 + t5[e8 + d3], d3 += w2, h3 -= 8) ;
    for (o6 = s7 & (1 << -h3) - 1, s7 >>= -h3, h3 += n6; h3 > 0; o6 = o6 * 256 + t5[e8 + d3], d3 += w2, h3 -= 8) ;
    if (s7 === 0) s7 = 1 - f3;
    else {
      if (s7 === c5) return o6 ? NaN : (y3 ? -1 : 1) * (1 / 0);
      o6 = o6 + Math.pow(2, n6), s7 = s7 - f3;
    }
    return (y3 ? -1 : 1) * o6 * Math.pow(2, s7 - n6);
  }, ki.write = function(t5, e8, r6, n6, i6, s7) {
    var o6, a3, c5, f3 = s7 * 8 - i6 - 1, h3 = (1 << f3) - 1, d3 = h3 >> 1, w2 = i6 === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, y3 = n6 ? 0 : s7 - 1, P2 = n6 ? 1 : -1, E2 = e8 < 0 || e8 === 0 && 1 / e8 < 0 ? 1 : 0;
    for (e8 = Math.abs(e8), isNaN(e8) || e8 === 1 / 0 ? (a3 = isNaN(e8) ? 1 : 0, o6 = h3) : (o6 = Math.floor(Math.log(e8) / Math.LN2), e8 * (c5 = Math.pow(2, -o6)) < 1 && (o6--, c5 *= 2), o6 + d3 >= 1 ? e8 += w2 / c5 : e8 += w2 * Math.pow(2, 1 - d3), e8 * c5 >= 2 && (o6++, c5 /= 2), o6 + d3 >= h3 ? (a3 = 0, o6 = h3) : o6 + d3 >= 1 ? (a3 = (e8 * c5 - 1) * Math.pow(2, i6), o6 = o6 + d3) : (a3 = e8 * Math.pow(2, d3 - 1) * Math.pow(2, i6), o6 = 0)); i6 >= 8; t5[r6 + y3] = a3 & 255, y3 += P2, a3 /= 256, i6 -= 8) ;
    for (o6 = o6 << i6 | a3, f3 += i6; f3 > 0; t5[r6 + y3] = o6 & 255, y3 += P2, o6 /= 256, f3 -= 8) ;
    t5[r6 + y3 - P2] |= E2 * 128;
  }, ki;
}
function If() {
  if (Af) return mr;
  Af = true;
  let t5 = tw(), e8 = rw(), r6 = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  mr.Buffer = o6, mr.SlowBuffer = m2, mr.INSPECT_MAX_BYTES = 50;
  let n6 = 2147483647;
  mr.kMaxLength = n6, o6.TYPED_ARRAY_SUPPORT = i6(), !o6.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function i6() {
    try {
      let p3 = new Uint8Array(1), u3 = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(u3, Uint8Array.prototype), Object.setPrototypeOf(p3, u3), p3.foo() === 42;
    } catch {
      return false;
    }
  }
  Object.defineProperty(o6.prototype, "parent", { enumerable: true, get: function() {
    if (o6.isBuffer(this)) return this.buffer;
  } }), Object.defineProperty(o6.prototype, "offset", { enumerable: true, get: function() {
    if (o6.isBuffer(this)) return this.byteOffset;
  } });
  function s7(p3) {
    if (p3 > n6) throw new RangeError('The value "' + p3 + '" is invalid for option "size"');
    let u3 = new Uint8Array(p3);
    return Object.setPrototypeOf(u3, o6.prototype), u3;
  }
  function o6(p3, u3, l3) {
    if (typeof p3 == "number") {
      if (typeof u3 == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
      return h3(p3);
    }
    return a3(p3, u3, l3);
  }
  o6.poolSize = 8192;
  function a3(p3, u3, l3) {
    if (typeof p3 == "string") return d3(p3, u3);
    if (ArrayBuffer.isView(p3)) return y3(p3);
    if (p3 == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof p3);
    if (Ze(p3, ArrayBuffer) || p3 && Ze(p3.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (Ze(p3, SharedArrayBuffer) || p3 && Ze(p3.buffer, SharedArrayBuffer))) return P2(p3, u3, l3);
    if (typeof p3 == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    let S3 = p3.valueOf && p3.valueOf();
    if (S3 != null && S3 !== p3) return o6.from(S3, u3, l3);
    let C2 = E2(p3);
    if (C2) return C2;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof p3[Symbol.toPrimitive] == "function") return o6.from(p3[Symbol.toPrimitive]("string"), u3, l3);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof p3);
  }
  o6.from = function(p3, u3, l3) {
    return a3(p3, u3, l3);
  }, Object.setPrototypeOf(o6.prototype, Uint8Array.prototype), Object.setPrototypeOf(o6, Uint8Array);
  function c5(p3) {
    if (typeof p3 != "number") throw new TypeError('"size" argument must be of type number');
    if (p3 < 0) throw new RangeError('The value "' + p3 + '" is invalid for option "size"');
  }
  function f3(p3, u3, l3) {
    return c5(p3), p3 <= 0 ? s7(p3) : u3 !== void 0 ? typeof l3 == "string" ? s7(p3).fill(u3, l3) : s7(p3).fill(u3) : s7(p3);
  }
  o6.alloc = function(p3, u3, l3) {
    return f3(p3, u3, l3);
  };
  function h3(p3) {
    return c5(p3), s7(p3 < 0 ? 0 : b3(p3) | 0);
  }
  o6.allocUnsafe = function(p3) {
    return h3(p3);
  }, o6.allocUnsafeSlow = function(p3) {
    return h3(p3);
  };
  function d3(p3, u3) {
    if ((typeof u3 != "string" || u3 === "") && (u3 = "utf8"), !o6.isEncoding(u3)) throw new TypeError("Unknown encoding: " + u3);
    let l3 = v2(p3, u3) | 0, S3 = s7(l3), C2 = S3.write(p3, u3);
    return C2 !== l3 && (S3 = S3.slice(0, C2)), S3;
  }
  function w2(p3) {
    let u3 = p3.length < 0 ? 0 : b3(p3.length) | 0, l3 = s7(u3);
    for (let S3 = 0; S3 < u3; S3 += 1) l3[S3] = p3[S3] & 255;
    return l3;
  }
  function y3(p3) {
    if (Ze(p3, Uint8Array)) {
      let u3 = new Uint8Array(p3);
      return P2(u3.buffer, u3.byteOffset, u3.byteLength);
    }
    return w2(p3);
  }
  function P2(p3, u3, l3) {
    if (u3 < 0 || p3.byteLength < u3) throw new RangeError('"offset" is outside of buffer bounds');
    if (p3.byteLength < u3 + (l3 || 0)) throw new RangeError('"length" is outside of buffer bounds');
    let S3;
    return u3 === void 0 && l3 === void 0 ? S3 = new Uint8Array(p3) : l3 === void 0 ? S3 = new Uint8Array(p3, u3) : S3 = new Uint8Array(p3, u3, l3), Object.setPrototypeOf(S3, o6.prototype), S3;
  }
  function E2(p3) {
    if (o6.isBuffer(p3)) {
      let u3 = b3(p3.length) | 0, l3 = s7(u3);
      return l3.length === 0 || p3.copy(l3, 0, 0, u3), l3;
    }
    if (p3.length !== void 0) return typeof p3.length != "number" || Tn(p3.length) ? s7(0) : w2(p3);
    if (p3.type === "Buffer" && Array.isArray(p3.data)) return w2(p3.data);
  }
  function b3(p3) {
    if (p3 >= n6) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + n6.toString(16) + " bytes");
    return p3 | 0;
  }
  function m2(p3) {
    return +p3 != p3 && (p3 = 0), o6.alloc(+p3);
  }
  o6.isBuffer = function(u3) {
    return u3 != null && u3._isBuffer === true && u3 !== o6.prototype;
  }, o6.compare = function(u3, l3) {
    if (Ze(u3, Uint8Array) && (u3 = o6.from(u3, u3.offset, u3.byteLength)), Ze(l3, Uint8Array) && (l3 = o6.from(l3, l3.offset, l3.byteLength)), !o6.isBuffer(u3) || !o6.isBuffer(l3)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (u3 === l3) return 0;
    let S3 = u3.length, C2 = l3.length;
    for (let N2 = 0, F = Math.min(S3, C2); N2 < F; ++N2) if (u3[N2] !== l3[N2]) {
      S3 = u3[N2], C2 = l3[N2];
      break;
    }
    return S3 < C2 ? -1 : C2 < S3 ? 1 : 0;
  }, o6.isEncoding = function(u3) {
    switch (String(u3).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  }, o6.concat = function(u3, l3) {
    if (!Array.isArray(u3)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (u3.length === 0) return o6.alloc(0);
    let S3;
    if (l3 === void 0) for (l3 = 0, S3 = 0; S3 < u3.length; ++S3) l3 += u3[S3].length;
    let C2 = o6.allocUnsafe(l3), N2 = 0;
    for (S3 = 0; S3 < u3.length; ++S3) {
      let F = u3[S3];
      if (Ze(F, Uint8Array)) N2 + F.length > C2.length ? (o6.isBuffer(F) || (F = o6.from(F)), F.copy(C2, N2)) : Uint8Array.prototype.set.call(C2, F, N2);
      else if (o6.isBuffer(F)) F.copy(C2, N2);
      else throw new TypeError('"list" argument must be an Array of Buffers');
      N2 += F.length;
    }
    return C2;
  };
  function v2(p3, u3) {
    if (o6.isBuffer(p3)) return p3.length;
    if (ArrayBuffer.isView(p3) || Ze(p3, ArrayBuffer)) return p3.byteLength;
    if (typeof p3 != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof p3);
    let l3 = p3.length, S3 = arguments.length > 2 && arguments[2] === true;
    if (!S3 && l3 === 0) return 0;
    let C2 = false;
    for (; ; ) switch (u3) {
      case "ascii":
      case "latin1":
      case "binary":
        return l3;
      case "utf8":
      case "utf-8":
        return Ct(p3).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return l3 * 2;
      case "hex":
        return l3 >>> 1;
      case "base64":
        return Ii(p3).length;
      default:
        if (C2) return S3 ? -1 : Ct(p3).length;
        u3 = ("" + u3).toLowerCase(), C2 = true;
    }
  }
  o6.byteLength = v2;
  function R2(p3, u3, l3) {
    let S3 = false;
    if ((u3 === void 0 || u3 < 0) && (u3 = 0), u3 > this.length || ((l3 === void 0 || l3 > this.length) && (l3 = this.length), l3 <= 0) || (l3 >>>= 0, u3 >>>= 0, l3 <= u3)) return "";
    for (p3 || (p3 = "utf8"); ; ) switch (p3) {
      case "hex":
        return V2(this, u3, l3);
      case "utf8":
      case "utf-8":
        return H2(this, u3, l3);
      case "ascii":
        return X(this, u3, l3);
      case "latin1":
      case "binary":
        return Q(this, u3, l3);
      case "base64":
        return W(this, u3, l3);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return te(this, u3, l3);
      default:
        if (S3) throw new TypeError("Unknown encoding: " + p3);
        p3 = (p3 + "").toLowerCase(), S3 = true;
    }
  }
  o6.prototype._isBuffer = true;
  function T2(p3, u3, l3) {
    let S3 = p3[u3];
    p3[u3] = p3[l3], p3[l3] = S3;
  }
  o6.prototype.swap16 = function() {
    let u3 = this.length;
    if (u3 % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let l3 = 0; l3 < u3; l3 += 2) T2(this, l3, l3 + 1);
    return this;
  }, o6.prototype.swap32 = function() {
    let u3 = this.length;
    if (u3 % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let l3 = 0; l3 < u3; l3 += 4) T2(this, l3, l3 + 3), T2(this, l3 + 1, l3 + 2);
    return this;
  }, o6.prototype.swap64 = function() {
    let u3 = this.length;
    if (u3 % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let l3 = 0; l3 < u3; l3 += 8) T2(this, l3, l3 + 7), T2(this, l3 + 1, l3 + 6), T2(this, l3 + 2, l3 + 5), T2(this, l3 + 3, l3 + 4);
    return this;
  }, o6.prototype.toString = function() {
    let u3 = this.length;
    return u3 === 0 ? "" : arguments.length === 0 ? H2(this, 0, u3) : R2.apply(this, arguments);
  }, o6.prototype.toLocaleString = o6.prototype.toString, o6.prototype.equals = function(u3) {
    if (!o6.isBuffer(u3)) throw new TypeError("Argument must be a Buffer");
    return this === u3 ? true : o6.compare(this, u3) === 0;
  }, o6.prototype.inspect = function() {
    let u3 = "", l3 = mr.INSPECT_MAX_BYTES;
    return u3 = this.toString("hex", 0, l3).replace(/(.{2})/g, "$1 ").trim(), this.length > l3 && (u3 += " ... "), "<Buffer " + u3 + ">";
  }, r6 && (o6.prototype[r6] = o6.prototype.inspect), o6.prototype.compare = function(u3, l3, S3, C2, N2) {
    if (Ze(u3, Uint8Array) && (u3 = o6.from(u3, u3.offset, u3.byteLength)), !o6.isBuffer(u3)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof u3);
    if (l3 === void 0 && (l3 = 0), S3 === void 0 && (S3 = u3 ? u3.length : 0), C2 === void 0 && (C2 = 0), N2 === void 0 && (N2 = this.length), l3 < 0 || S3 > u3.length || C2 < 0 || N2 > this.length) throw new RangeError("out of range index");
    if (C2 >= N2 && l3 >= S3) return 0;
    if (C2 >= N2) return -1;
    if (l3 >= S3) return 1;
    if (l3 >>>= 0, S3 >>>= 0, C2 >>>= 0, N2 >>>= 0, this === u3) return 0;
    let F = N2 - C2, k2 = S3 - l3, B2 = Math.min(F, k2), re = this.slice(C2, N2), ie = u3.slice(l3, S3);
    for (let oe = 0; oe < B2; ++oe) if (re[oe] !== ie[oe]) {
      F = re[oe], k2 = ie[oe];
      break;
    }
    return F < k2 ? -1 : k2 < F ? 1 : 0;
  };
  function g2(p3, u3, l3, S3, C2) {
    if (p3.length === 0) return -1;
    if (typeof l3 == "string" ? (S3 = l3, l3 = 0) : l3 > 2147483647 ? l3 = 2147483647 : l3 < -2147483648 && (l3 = -2147483648), l3 = +l3, Tn(l3) && (l3 = C2 ? 0 : p3.length - 1), l3 < 0 && (l3 = p3.length + l3), l3 >= p3.length) {
      if (C2) return -1;
      l3 = p3.length - 1;
    } else if (l3 < 0) if (C2) l3 = 0;
    else return -1;
    if (typeof u3 == "string" && (u3 = o6.from(u3, S3)), o6.isBuffer(u3)) return u3.length === 0 ? -1 : O(p3, u3, l3, S3, C2);
    if (typeof u3 == "number") return u3 = u3 & 255, typeof Uint8Array.prototype.indexOf == "function" ? C2 ? Uint8Array.prototype.indexOf.call(p3, u3, l3) : Uint8Array.prototype.lastIndexOf.call(p3, u3, l3) : O(p3, [u3], l3, S3, C2);
    throw new TypeError("val must be string, number or Buffer");
  }
  function O(p3, u3, l3, S3, C2) {
    let N2 = 1, F = p3.length, k2 = u3.length;
    if (S3 !== void 0 && (S3 = String(S3).toLowerCase(), S3 === "ucs2" || S3 === "ucs-2" || S3 === "utf16le" || S3 === "utf-16le")) {
      if (p3.length < 2 || u3.length < 2) return -1;
      N2 = 2, F /= 2, k2 /= 2, l3 /= 2;
    }
    function B2(ie, oe) {
      return N2 === 1 ? ie[oe] : ie.readUInt16BE(oe * N2);
    }
    let re;
    if (C2) {
      let ie = -1;
      for (re = l3; re < F; re++) if (B2(p3, re) === B2(u3, ie === -1 ? 0 : re - ie)) {
        if (ie === -1 && (ie = re), re - ie + 1 === k2) return ie * N2;
      } else ie !== -1 && (re -= re - ie), ie = -1;
    } else for (l3 + k2 > F && (l3 = F - k2), re = l3; re >= 0; re--) {
      let ie = true;
      for (let oe = 0; oe < k2; oe++) if (B2(p3, re + oe) !== B2(u3, oe)) {
        ie = false;
        break;
      }
      if (ie) return re;
    }
    return -1;
  }
  o6.prototype.includes = function(u3, l3, S3) {
    return this.indexOf(u3, l3, S3) !== -1;
  }, o6.prototype.indexOf = function(u3, l3, S3) {
    return g2(this, u3, l3, S3, true);
  }, o6.prototype.lastIndexOf = function(u3, l3, S3) {
    return g2(this, u3, l3, S3, false);
  };
  function _2(p3, u3, l3, S3) {
    l3 = Number(l3) || 0;
    let C2 = p3.length - l3;
    S3 ? (S3 = Number(S3), S3 > C2 && (S3 = C2)) : S3 = C2;
    let N2 = u3.length;
    S3 > N2 / 2 && (S3 = N2 / 2);
    let F;
    for (F = 0; F < S3; ++F) {
      let k2 = parseInt(u3.substr(F * 2, 2), 16);
      if (Tn(k2)) return F;
      p3[l3 + F] = k2;
    }
    return F;
  }
  function q(p3, u3, l3, S3) {
    return Vr(Ct(u3, p3.length - l3), p3, l3, S3);
  }
  function $2(p3, u3, l3, S3) {
    return Vr(Bt(u3), p3, l3, S3);
  }
  function j2(p3, u3, l3, S3) {
    return Vr(Ii(u3), p3, l3, S3);
  }
  function J(p3, u3, l3, S3) {
    return Vr(xn(u3, p3.length - l3), p3, l3, S3);
  }
  o6.prototype.write = function(u3, l3, S3, C2) {
    if (l3 === void 0) C2 = "utf8", S3 = this.length, l3 = 0;
    else if (S3 === void 0 && typeof l3 == "string") C2 = l3, S3 = this.length, l3 = 0;
    else if (isFinite(l3)) l3 = l3 >>> 0, isFinite(S3) ? (S3 = S3 >>> 0, C2 === void 0 && (C2 = "utf8")) : (C2 = S3, S3 = void 0);
    else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    let N2 = this.length - l3;
    if ((S3 === void 0 || S3 > N2) && (S3 = N2), u3.length > 0 && (S3 < 0 || l3 < 0) || l3 > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    C2 || (C2 = "utf8");
    let F = false;
    for (; ; ) switch (C2) {
      case "hex":
        return _2(this, u3, l3, S3);
      case "utf8":
      case "utf-8":
        return q(this, u3, l3, S3);
      case "ascii":
      case "latin1":
      case "binary":
        return $2(this, u3, l3, S3);
      case "base64":
        return j2(this, u3, l3, S3);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return J(this, u3, l3, S3);
      default:
        if (F) throw new TypeError("Unknown encoding: " + C2);
        C2 = ("" + C2).toLowerCase(), F = true;
    }
  }, o6.prototype.toJSON = function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  };
  function W(p3, u3, l3) {
    return u3 === 0 && l3 === p3.length ? t5.fromByteArray(p3) : t5.fromByteArray(p3.slice(u3, l3));
  }
  function H2(p3, u3, l3) {
    l3 = Math.min(p3.length, l3);
    let S3 = [], C2 = u3;
    for (; C2 < l3; ) {
      let N2 = p3[C2], F = null, k2 = N2 > 239 ? 4 : N2 > 223 ? 3 : N2 > 191 ? 2 : 1;
      if (C2 + k2 <= l3) {
        let B2, re, ie, oe;
        switch (k2) {
          case 1:
            N2 < 128 && (F = N2);
            break;
          case 2:
            B2 = p3[C2 + 1], (B2 & 192) === 128 && (oe = (N2 & 31) << 6 | B2 & 63, oe > 127 && (F = oe));
            break;
          case 3:
            B2 = p3[C2 + 1], re = p3[C2 + 2], (B2 & 192) === 128 && (re & 192) === 128 && (oe = (N2 & 15) << 12 | (B2 & 63) << 6 | re & 63, oe > 2047 && (oe < 55296 || oe > 57343) && (F = oe));
            break;
          case 4:
            B2 = p3[C2 + 1], re = p3[C2 + 2], ie = p3[C2 + 3], (B2 & 192) === 128 && (re & 192) === 128 && (ie & 192) === 128 && (oe = (N2 & 15) << 18 | (B2 & 63) << 12 | (re & 63) << 6 | ie & 63, oe > 65535 && oe < 1114112 && (F = oe));
        }
      }
      F === null ? (F = 65533, k2 = 1) : F > 65535 && (F -= 65536, S3.push(F >>> 10 & 1023 | 55296), F = 56320 | F & 1023), S3.push(F), C2 += k2;
    }
    return K(S3);
  }
  let G = 4096;
  function K(p3) {
    let u3 = p3.length;
    if (u3 <= G) return String.fromCharCode.apply(String, p3);
    let l3 = "", S3 = 0;
    for (; S3 < u3; ) l3 += String.fromCharCode.apply(String, p3.slice(S3, S3 += G));
    return l3;
  }
  function X(p3, u3, l3) {
    let S3 = "";
    l3 = Math.min(p3.length, l3);
    for (let C2 = u3; C2 < l3; ++C2) S3 += String.fromCharCode(p3[C2] & 127);
    return S3;
  }
  function Q(p3, u3, l3) {
    let S3 = "";
    l3 = Math.min(p3.length, l3);
    for (let C2 = u3; C2 < l3; ++C2) S3 += String.fromCharCode(p3[C2]);
    return S3;
  }
  function V2(p3, u3, l3) {
    let S3 = p3.length;
    (!u3 || u3 < 0) && (u3 = 0), (!l3 || l3 < 0 || l3 > S3) && (l3 = S3);
    let C2 = "";
    for (let N2 = u3; N2 < l3; ++N2) C2 += Xo[p3[N2]];
    return C2;
  }
  function te(p3, u3, l3) {
    let S3 = p3.slice(u3, l3), C2 = "";
    for (let N2 = 0; N2 < S3.length - 1; N2 += 2) C2 += String.fromCharCode(S3[N2] + S3[N2 + 1] * 256);
    return C2;
  }
  o6.prototype.slice = function(u3, l3) {
    let S3 = this.length;
    u3 = ~~u3, l3 = l3 === void 0 ? S3 : ~~l3, u3 < 0 ? (u3 += S3, u3 < 0 && (u3 = 0)) : u3 > S3 && (u3 = S3), l3 < 0 ? (l3 += S3, l3 < 0 && (l3 = 0)) : l3 > S3 && (l3 = S3), l3 < u3 && (l3 = u3);
    let C2 = this.subarray(u3, l3);
    return Object.setPrototypeOf(C2, o6.prototype), C2;
  };
  function Y(p3, u3, l3) {
    if (p3 % 1 !== 0 || p3 < 0) throw new RangeError("offset is not uint");
    if (p3 + u3 > l3) throw new RangeError("Trying to access beyond buffer length");
  }
  o6.prototype.readUintLE = o6.prototype.readUIntLE = function(u3, l3, S3) {
    u3 = u3 >>> 0, l3 = l3 >>> 0, S3 || Y(u3, l3, this.length);
    let C2 = this[u3], N2 = 1, F = 0;
    for (; ++F < l3 && (N2 *= 256); ) C2 += this[u3 + F] * N2;
    return C2;
  }, o6.prototype.readUintBE = o6.prototype.readUIntBE = function(u3, l3, S3) {
    u3 = u3 >>> 0, l3 = l3 >>> 0, S3 || Y(u3, l3, this.length);
    let C2 = this[u3 + --l3], N2 = 1;
    for (; l3 > 0 && (N2 *= 256); ) C2 += this[u3 + --l3] * N2;
    return C2;
  }, o6.prototype.readUint8 = o6.prototype.readUInt8 = function(u3, l3) {
    return u3 = u3 >>> 0, l3 || Y(u3, 1, this.length), this[u3];
  }, o6.prototype.readUint16LE = o6.prototype.readUInt16LE = function(u3, l3) {
    return u3 = u3 >>> 0, l3 || Y(u3, 2, this.length), this[u3] | this[u3 + 1] << 8;
  }, o6.prototype.readUint16BE = o6.prototype.readUInt16BE = function(u3, l3) {
    return u3 = u3 >>> 0, l3 || Y(u3, 2, this.length), this[u3] << 8 | this[u3 + 1];
  }, o6.prototype.readUint32LE = o6.prototype.readUInt32LE = function(u3, l3) {
    return u3 = u3 >>> 0, l3 || Y(u3, 4, this.length), (this[u3] | this[u3 + 1] << 8 | this[u3 + 2] << 16) + this[u3 + 3] * 16777216;
  }, o6.prototype.readUint32BE = o6.prototype.readUInt32BE = function(u3, l3) {
    return u3 = u3 >>> 0, l3 || Y(u3, 4, this.length), this[u3] * 16777216 + (this[u3 + 1] << 16 | this[u3 + 2] << 8 | this[u3 + 3]);
  }, o6.prototype.readBigUInt64LE = at(function(u3) {
    u3 = u3 >>> 0, xe(u3, "offset");
    let l3 = this[u3], S3 = this[u3 + 7];
    (l3 === void 0 || S3 === void 0) && st(u3, this.length - 8);
    let C2 = l3 + this[++u3] * 2 ** 8 + this[++u3] * 2 ** 16 + this[++u3] * 2 ** 24, N2 = this[++u3] + this[++u3] * 2 ** 8 + this[++u3] * 2 ** 16 + S3 * 2 ** 24;
    return BigInt(C2) + (BigInt(N2) << BigInt(32));
  }), o6.prototype.readBigUInt64BE = at(function(u3) {
    u3 = u3 >>> 0, xe(u3, "offset");
    let l3 = this[u3], S3 = this[u3 + 7];
    (l3 === void 0 || S3 === void 0) && st(u3, this.length - 8);
    let C2 = l3 * 2 ** 24 + this[++u3] * 2 ** 16 + this[++u3] * 2 ** 8 + this[++u3], N2 = this[++u3] * 2 ** 24 + this[++u3] * 2 ** 16 + this[++u3] * 2 ** 8 + S3;
    return (BigInt(C2) << BigInt(32)) + BigInt(N2);
  }), o6.prototype.readIntLE = function(u3, l3, S3) {
    u3 = u3 >>> 0, l3 = l3 >>> 0, S3 || Y(u3, l3, this.length);
    let C2 = this[u3], N2 = 1, F = 0;
    for (; ++F < l3 && (N2 *= 256); ) C2 += this[u3 + F] * N2;
    return N2 *= 128, C2 >= N2 && (C2 -= Math.pow(2, 8 * l3)), C2;
  }, o6.prototype.readIntBE = function(u3, l3, S3) {
    u3 = u3 >>> 0, l3 = l3 >>> 0, S3 || Y(u3, l3, this.length);
    let C2 = l3, N2 = 1, F = this[u3 + --C2];
    for (; C2 > 0 && (N2 *= 256); ) F += this[u3 + --C2] * N2;
    return N2 *= 128, F >= N2 && (F -= Math.pow(2, 8 * l3)), F;
  }, o6.prototype.readInt8 = function(u3, l3) {
    return u3 = u3 >>> 0, l3 || Y(u3, 1, this.length), this[u3] & 128 ? (255 - this[u3] + 1) * -1 : this[u3];
  }, o6.prototype.readInt16LE = function(u3, l3) {
    u3 = u3 >>> 0, l3 || Y(u3, 2, this.length);
    let S3 = this[u3] | this[u3 + 1] << 8;
    return S3 & 32768 ? S3 | 4294901760 : S3;
  }, o6.prototype.readInt16BE = function(u3, l3) {
    u3 = u3 >>> 0, l3 || Y(u3, 2, this.length);
    let S3 = this[u3 + 1] | this[u3] << 8;
    return S3 & 32768 ? S3 | 4294901760 : S3;
  }, o6.prototype.readInt32LE = function(u3, l3) {
    return u3 = u3 >>> 0, l3 || Y(u3, 4, this.length), this[u3] | this[u3 + 1] << 8 | this[u3 + 2] << 16 | this[u3 + 3] << 24;
  }, o6.prototype.readInt32BE = function(u3, l3) {
    return u3 = u3 >>> 0, l3 || Y(u3, 4, this.length), this[u3] << 24 | this[u3 + 1] << 16 | this[u3 + 2] << 8 | this[u3 + 3];
  }, o6.prototype.readBigInt64LE = at(function(u3) {
    u3 = u3 >>> 0, xe(u3, "offset");
    let l3 = this[u3], S3 = this[u3 + 7];
    (l3 === void 0 || S3 === void 0) && st(u3, this.length - 8);
    let C2 = this[u3 + 4] + this[u3 + 5] * 2 ** 8 + this[u3 + 6] * 2 ** 16 + (S3 << 24);
    return (BigInt(C2) << BigInt(32)) + BigInt(l3 + this[++u3] * 2 ** 8 + this[++u3] * 2 ** 16 + this[++u3] * 2 ** 24);
  }), o6.prototype.readBigInt64BE = at(function(u3) {
    u3 = u3 >>> 0, xe(u3, "offset");
    let l3 = this[u3], S3 = this[u3 + 7];
    (l3 === void 0 || S3 === void 0) && st(u3, this.length - 8);
    let C2 = (l3 << 24) + this[++u3] * 2 ** 16 + this[++u3] * 2 ** 8 + this[++u3];
    return (BigInt(C2) << BigInt(32)) + BigInt(this[++u3] * 2 ** 24 + this[++u3] * 2 ** 16 + this[++u3] * 2 ** 8 + S3);
  }), o6.prototype.readFloatLE = function(u3, l3) {
    return u3 = u3 >>> 0, l3 || Y(u3, 4, this.length), e8.read(this, u3, true, 23, 4);
  }, o6.prototype.readFloatBE = function(u3, l3) {
    return u3 = u3 >>> 0, l3 || Y(u3, 4, this.length), e8.read(this, u3, false, 23, 4);
  }, o6.prototype.readDoubleLE = function(u3, l3) {
    return u3 = u3 >>> 0, l3 || Y(u3, 8, this.length), e8.read(this, u3, true, 52, 8);
  }, o6.prototype.readDoubleBE = function(u3, l3) {
    return u3 = u3 >>> 0, l3 || Y(u3, 8, this.length), e8.read(this, u3, false, 52, 8);
  };
  function ee(p3, u3, l3, S3, C2, N2) {
    if (!o6.isBuffer(p3)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (u3 > C2 || u3 < N2) throw new RangeError('"value" argument is out of bounds');
    if (l3 + S3 > p3.length) throw new RangeError("Index out of range");
  }
  o6.prototype.writeUintLE = o6.prototype.writeUIntLE = function(u3, l3, S3, C2) {
    if (u3 = +u3, l3 = l3 >>> 0, S3 = S3 >>> 0, !C2) {
      let k2 = Math.pow(2, 8 * S3) - 1;
      ee(this, u3, l3, S3, k2, 0);
    }
    let N2 = 1, F = 0;
    for (this[l3] = u3 & 255; ++F < S3 && (N2 *= 256); ) this[l3 + F] = u3 / N2 & 255;
    return l3 + S3;
  }, o6.prototype.writeUintBE = o6.prototype.writeUIntBE = function(u3, l3, S3, C2) {
    if (u3 = +u3, l3 = l3 >>> 0, S3 = S3 >>> 0, !C2) {
      let k2 = Math.pow(2, 8 * S3) - 1;
      ee(this, u3, l3, S3, k2, 0);
    }
    let N2 = S3 - 1, F = 1;
    for (this[l3 + N2] = u3 & 255; --N2 >= 0 && (F *= 256); ) this[l3 + N2] = u3 / F & 255;
    return l3 + S3;
  }, o6.prototype.writeUint8 = o6.prototype.writeUInt8 = function(u3, l3, S3) {
    return u3 = +u3, l3 = l3 >>> 0, S3 || ee(this, u3, l3, 1, 255, 0), this[l3] = u3 & 255, l3 + 1;
  }, o6.prototype.writeUint16LE = o6.prototype.writeUInt16LE = function(u3, l3, S3) {
    return u3 = +u3, l3 = l3 >>> 0, S3 || ee(this, u3, l3, 2, 65535, 0), this[l3] = u3 & 255, this[l3 + 1] = u3 >>> 8, l3 + 2;
  }, o6.prototype.writeUint16BE = o6.prototype.writeUInt16BE = function(u3, l3, S3) {
    return u3 = +u3, l3 = l3 >>> 0, S3 || ee(this, u3, l3, 2, 65535, 0), this[l3] = u3 >>> 8, this[l3 + 1] = u3 & 255, l3 + 2;
  }, o6.prototype.writeUint32LE = o6.prototype.writeUInt32LE = function(u3, l3, S3) {
    return u3 = +u3, l3 = l3 >>> 0, S3 || ee(this, u3, l3, 4, 4294967295, 0), this[l3 + 3] = u3 >>> 24, this[l3 + 2] = u3 >>> 16, this[l3 + 1] = u3 >>> 8, this[l3] = u3 & 255, l3 + 4;
  }, o6.prototype.writeUint32BE = o6.prototype.writeUInt32BE = function(u3, l3, S3) {
    return u3 = +u3, l3 = l3 >>> 0, S3 || ee(this, u3, l3, 4, 4294967295, 0), this[l3] = u3 >>> 24, this[l3 + 1] = u3 >>> 16, this[l3 + 2] = u3 >>> 8, this[l3 + 3] = u3 & 255, l3 + 4;
  };
  function pe(p3, u3, l3, S3, C2) {
    Oe(u3, S3, C2, p3, l3, 7);
    let N2 = Number(u3 & BigInt(4294967295));
    p3[l3++] = N2, N2 = N2 >> 8, p3[l3++] = N2, N2 = N2 >> 8, p3[l3++] = N2, N2 = N2 >> 8, p3[l3++] = N2;
    let F = Number(u3 >> BigInt(32) & BigInt(4294967295));
    return p3[l3++] = F, F = F >> 8, p3[l3++] = F, F = F >> 8, p3[l3++] = F, F = F >> 8, p3[l3++] = F, l3;
  }
  function Z(p3, u3, l3, S3, C2) {
    Oe(u3, S3, C2, p3, l3, 7);
    let N2 = Number(u3 & BigInt(4294967295));
    p3[l3 + 7] = N2, N2 = N2 >> 8, p3[l3 + 6] = N2, N2 = N2 >> 8, p3[l3 + 5] = N2, N2 = N2 >> 8, p3[l3 + 4] = N2;
    let F = Number(u3 >> BigInt(32) & BigInt(4294967295));
    return p3[l3 + 3] = F, F = F >> 8, p3[l3 + 2] = F, F = F >> 8, p3[l3 + 1] = F, F = F >> 8, p3[l3] = F, l3 + 8;
  }
  o6.prototype.writeBigUInt64LE = at(function(u3, l3 = 0) {
    return pe(this, u3, l3, BigInt(0), BigInt("0xffffffffffffffff"));
  }), o6.prototype.writeBigUInt64BE = at(function(u3, l3 = 0) {
    return Z(this, u3, l3, BigInt(0), BigInt("0xffffffffffffffff"));
  }), o6.prototype.writeIntLE = function(u3, l3, S3, C2) {
    if (u3 = +u3, l3 = l3 >>> 0, !C2) {
      let B2 = Math.pow(2, 8 * S3 - 1);
      ee(this, u3, l3, S3, B2 - 1, -B2);
    }
    let N2 = 0, F = 1, k2 = 0;
    for (this[l3] = u3 & 255; ++N2 < S3 && (F *= 256); ) u3 < 0 && k2 === 0 && this[l3 + N2 - 1] !== 0 && (k2 = 1), this[l3 + N2] = (u3 / F >> 0) - k2 & 255;
    return l3 + S3;
  }, o6.prototype.writeIntBE = function(u3, l3, S3, C2) {
    if (u3 = +u3, l3 = l3 >>> 0, !C2) {
      let B2 = Math.pow(2, 8 * S3 - 1);
      ee(this, u3, l3, S3, B2 - 1, -B2);
    }
    let N2 = S3 - 1, F = 1, k2 = 0;
    for (this[l3 + N2] = u3 & 255; --N2 >= 0 && (F *= 256); ) u3 < 0 && k2 === 0 && this[l3 + N2 + 1] !== 0 && (k2 = 1), this[l3 + N2] = (u3 / F >> 0) - k2 & 255;
    return l3 + S3;
  }, o6.prototype.writeInt8 = function(u3, l3, S3) {
    return u3 = +u3, l3 = l3 >>> 0, S3 || ee(this, u3, l3, 1, 127, -128), u3 < 0 && (u3 = 255 + u3 + 1), this[l3] = u3 & 255, l3 + 1;
  }, o6.prototype.writeInt16LE = function(u3, l3, S3) {
    return u3 = +u3, l3 = l3 >>> 0, S3 || ee(this, u3, l3, 2, 32767, -32768), this[l3] = u3 & 255, this[l3 + 1] = u3 >>> 8, l3 + 2;
  }, o6.prototype.writeInt16BE = function(u3, l3, S3) {
    return u3 = +u3, l3 = l3 >>> 0, S3 || ee(this, u3, l3, 2, 32767, -32768), this[l3] = u3 >>> 8, this[l3 + 1] = u3 & 255, l3 + 2;
  }, o6.prototype.writeInt32LE = function(u3, l3, S3) {
    return u3 = +u3, l3 = l3 >>> 0, S3 || ee(this, u3, l3, 4, 2147483647, -2147483648), this[l3] = u3 & 255, this[l3 + 1] = u3 >>> 8, this[l3 + 2] = u3 >>> 16, this[l3 + 3] = u3 >>> 24, l3 + 4;
  }, o6.prototype.writeInt32BE = function(u3, l3, S3) {
    return u3 = +u3, l3 = l3 >>> 0, S3 || ee(this, u3, l3, 4, 2147483647, -2147483648), u3 < 0 && (u3 = 4294967295 + u3 + 1), this[l3] = u3 >>> 24, this[l3 + 1] = u3 >>> 16, this[l3 + 2] = u3 >>> 8, this[l3 + 3] = u3 & 255, l3 + 4;
  }, o6.prototype.writeBigInt64LE = at(function(u3, l3 = 0) {
    return pe(this, u3, l3, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), o6.prototype.writeBigInt64BE = at(function(u3, l3 = 0) {
    return Z(this, u3, l3, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function ne(p3, u3, l3, S3, C2, N2) {
    if (l3 + S3 > p3.length) throw new RangeError("Index out of range");
    if (l3 < 0) throw new RangeError("Index out of range");
  }
  function fe(p3, u3, l3, S3, C2) {
    return u3 = +u3, l3 = l3 >>> 0, C2 || ne(p3, u3, l3, 4), e8.write(p3, u3, l3, S3, 23, 4), l3 + 4;
  }
  o6.prototype.writeFloatLE = function(u3, l3, S3) {
    return fe(this, u3, l3, true, S3);
  }, o6.prototype.writeFloatBE = function(u3, l3, S3) {
    return fe(this, u3, l3, false, S3);
  };
  function ge(p3, u3, l3, S3, C2) {
    return u3 = +u3, l3 = l3 >>> 0, C2 || ne(p3, u3, l3, 8), e8.write(p3, u3, l3, S3, 52, 8), l3 + 8;
  }
  o6.prototype.writeDoubleLE = function(u3, l3, S3) {
    return ge(this, u3, l3, true, S3);
  }, o6.prototype.writeDoubleBE = function(u3, l3, S3) {
    return ge(this, u3, l3, false, S3);
  }, o6.prototype.copy = function(u3, l3, S3, C2) {
    if (!o6.isBuffer(u3)) throw new TypeError("argument should be a Buffer");
    if (S3 || (S3 = 0), !C2 && C2 !== 0 && (C2 = this.length), l3 >= u3.length && (l3 = u3.length), l3 || (l3 = 0), C2 > 0 && C2 < S3 && (C2 = S3), C2 === S3 || u3.length === 0 || this.length === 0) return 0;
    if (l3 < 0) throw new RangeError("targetStart out of bounds");
    if (S3 < 0 || S3 >= this.length) throw new RangeError("Index out of range");
    if (C2 < 0) throw new RangeError("sourceEnd out of bounds");
    C2 > this.length && (C2 = this.length), u3.length - l3 < C2 - S3 && (C2 = u3.length - l3 + S3);
    let N2 = C2 - S3;
    return this === u3 && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(l3, S3, C2) : Uint8Array.prototype.set.call(u3, this.subarray(S3, C2), l3), N2;
  }, o6.prototype.fill = function(u3, l3, S3, C2) {
    if (typeof u3 == "string") {
      if (typeof l3 == "string" ? (C2 = l3, l3 = 0, S3 = this.length) : typeof S3 == "string" && (C2 = S3, S3 = this.length), C2 !== void 0 && typeof C2 != "string") throw new TypeError("encoding must be a string");
      if (typeof C2 == "string" && !o6.isEncoding(C2)) throw new TypeError("Unknown encoding: " + C2);
      if (u3.length === 1) {
        let F = u3.charCodeAt(0);
        (C2 === "utf8" && F < 128 || C2 === "latin1") && (u3 = F);
      }
    } else typeof u3 == "number" ? u3 = u3 & 255 : typeof u3 == "boolean" && (u3 = Number(u3));
    if (l3 < 0 || this.length < l3 || this.length < S3) throw new RangeError("Out of range index");
    if (S3 <= l3) return this;
    l3 = l3 >>> 0, S3 = S3 === void 0 ? this.length : S3 >>> 0, u3 || (u3 = 0);
    let N2;
    if (typeof u3 == "number") for (N2 = l3; N2 < S3; ++N2) this[N2] = u3;
    else {
      let F = o6.isBuffer(u3) ? u3 : o6.from(u3, C2), k2 = F.length;
      if (k2 === 0) throw new TypeError('The value "' + u3 + '" is invalid for argument "value"');
      for (N2 = 0; N2 < S3 - l3; ++N2) this[N2 + l3] = F[N2 % k2];
    }
    return this;
  };
  let ye = {};
  function Ae(p3, u3, l3) {
    ye[p3] = class extends l3 {
      constructor() {
        super(), Object.defineProperty(this, "message", { value: u3.apply(this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${p3}]`, this.stack, delete this.name;
      }
      get code() {
        return p3;
      }
      set code(C2) {
        Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: C2, writable: true });
      }
      toString() {
        return `${this.name} [${p3}]: ${this.message}`;
      }
    };
  }
  Ae("ERR_BUFFER_OUT_OF_BOUNDS", function(p3) {
    return p3 ? `${p3} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
  }, RangeError), Ae("ERR_INVALID_ARG_TYPE", function(p3, u3) {
    return `The "${p3}" argument must be of type number. Received type ${typeof u3}`;
  }, TypeError), Ae("ERR_OUT_OF_RANGE", function(p3, u3, l3) {
    let S3 = `The value of "${p3}" is out of range.`, C2 = l3;
    return Number.isInteger(l3) && Math.abs(l3) > 2 ** 32 ? C2 = _e(String(l3)) : typeof l3 == "bigint" && (C2 = String(l3), (l3 > BigInt(2) ** BigInt(32) || l3 < -(BigInt(2) ** BigInt(32))) && (C2 = _e(C2)), C2 += "n"), S3 += ` It must be ${u3}. Received ${C2}`, S3;
  }, RangeError);
  function _e(p3) {
    let u3 = "", l3 = p3.length, S3 = p3[0] === "-" ? 1 : 0;
    for (; l3 >= S3 + 4; l3 -= 3) u3 = `_${p3.slice(l3 - 3, l3)}${u3}`;
    return `${p3.slice(0, l3)}${u3}`;
  }
  function ve(p3, u3, l3) {
    xe(u3, "offset"), (p3[u3] === void 0 || p3[u3 + l3] === void 0) && st(u3, p3.length - (l3 + 1));
  }
  function Oe(p3, u3, l3, S3, C2, N2) {
    if (p3 > l3 || p3 < u3) {
      let F = typeof u3 == "bigint" ? "n" : "", k2;
      throw u3 === 0 || u3 === BigInt(0) ? k2 = `>= 0${F} and < 2${F} ** ${(N2 + 1) * 8}${F}` : k2 = `>= -(2${F} ** ${(N2 + 1) * 8 - 1}${F}) and < 2 ** ${(N2 + 1) * 8 - 1}${F}`, new ye.ERR_OUT_OF_RANGE("value", k2, p3);
    }
    ve(S3, C2, N2);
  }
  function xe(p3, u3) {
    if (typeof p3 != "number") throw new ye.ERR_INVALID_ARG_TYPE(u3, "number", p3);
  }
  function st(p3, u3, l3) {
    throw Math.floor(p3) !== p3 ? (xe(p3, l3), new ye.ERR_OUT_OF_RANGE("offset", "an integer", p3)) : u3 < 0 ? new ye.ERR_BUFFER_OUT_OF_BOUNDS() : new ye.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${u3}`, p3);
  }
  let Re = /[^+/0-9A-Za-z-_]/g;
  function Ne(p3) {
    if (p3 = p3.split("=")[0], p3 = p3.trim().replace(Re, ""), p3.length < 2) return "";
    for (; p3.length % 4 !== 0; ) p3 = p3 + "=";
    return p3;
  }
  function Ct(p3, u3) {
    u3 = u3 || 1 / 0;
    let l3, S3 = p3.length, C2 = null, N2 = [];
    for (let F = 0; F < S3; ++F) {
      if (l3 = p3.charCodeAt(F), l3 > 55295 && l3 < 57344) {
        if (!C2) {
          if (l3 > 56319) {
            (u3 -= 3) > -1 && N2.push(239, 191, 189);
            continue;
          } else if (F + 1 === S3) {
            (u3 -= 3) > -1 && N2.push(239, 191, 189);
            continue;
          }
          C2 = l3;
          continue;
        }
        if (l3 < 56320) {
          (u3 -= 3) > -1 && N2.push(239, 191, 189), C2 = l3;
          continue;
        }
        l3 = (C2 - 55296 << 10 | l3 - 56320) + 65536;
      } else C2 && (u3 -= 3) > -1 && N2.push(239, 191, 189);
      if (C2 = null, l3 < 128) {
        if ((u3 -= 1) < 0) break;
        N2.push(l3);
      } else if (l3 < 2048) {
        if ((u3 -= 2) < 0) break;
        N2.push(l3 >> 6 | 192, l3 & 63 | 128);
      } else if (l3 < 65536) {
        if ((u3 -= 3) < 0) break;
        N2.push(l3 >> 12 | 224, l3 >> 6 & 63 | 128, l3 & 63 | 128);
      } else if (l3 < 1114112) {
        if ((u3 -= 4) < 0) break;
        N2.push(l3 >> 18 | 240, l3 >> 12 & 63 | 128, l3 >> 6 & 63 | 128, l3 & 63 | 128);
      } else throw new Error("Invalid code point");
    }
    return N2;
  }
  function Bt(p3) {
    let u3 = [];
    for (let l3 = 0; l3 < p3.length; ++l3) u3.push(p3.charCodeAt(l3) & 255);
    return u3;
  }
  function xn(p3, u3) {
    let l3, S3, C2, N2 = [];
    for (let F = 0; F < p3.length && !((u3 -= 2) < 0); ++F) l3 = p3.charCodeAt(F), S3 = l3 >> 8, C2 = l3 % 256, N2.push(C2), N2.push(S3);
    return N2;
  }
  function Ii(p3) {
    return t5.toByteArray(Ne(p3));
  }
  function Vr(p3, u3, l3, S3) {
    let C2;
    for (C2 = 0; C2 < S3 && !(C2 + l3 >= u3.length || C2 >= p3.length); ++C2) u3[C2 + l3] = p3[C2];
    return C2;
  }
  function Ze(p3, u3) {
    return p3 instanceof u3 || p3 != null && p3.constructor != null && p3.constructor.name != null && p3.constructor.name === u3.name;
  }
  function Tn(p3) {
    return p3 !== p3;
  }
  let Xo = (function() {
    let p3 = "0123456789abcdef", u3 = new Array(256);
    for (let l3 = 0; l3 < 16; ++l3) {
      let S3 = l3 * 16;
      for (let C2 = 0; C2 < 16; ++C2) u3[S3 + C2] = p3[l3] + p3[C2];
    }
    return u3;
  })();
  function at(p3) {
    return typeof BigInt > "u" ? Zo : p3;
  }
  function Zo() {
    throw new Error("BigInt not supported");
  }
  return mr;
}
function yw() {
  if (Bf) return Ni;
  Bf = true;
  var t5 = typeof Reflect == "object" ? Reflect : null, e8 = t5 && typeof t5.apply == "function" ? t5.apply : function(g2, O, _2) {
    return Function.prototype.apply.call(g2, O, _2);
  }, r6;
  t5 && typeof t5.ownKeys == "function" ? r6 = t5.ownKeys : Object.getOwnPropertySymbols ? r6 = function(g2) {
    return Object.getOwnPropertyNames(g2).concat(Object.getOwnPropertySymbols(g2));
  } : r6 = function(g2) {
    return Object.getOwnPropertyNames(g2);
  };
  function n6(T2) {
    console && console.warn && console.warn(T2);
  }
  var i6 = Number.isNaN || function(g2) {
    return g2 !== g2;
  };
  function s7() {
    s7.init.call(this);
  }
  Ni = s7, Ni.once = m2, s7.EventEmitter = s7, s7.prototype._events = void 0, s7.prototype._eventsCount = 0, s7.prototype._maxListeners = void 0;
  var o6 = 10;
  function a3(T2) {
    if (typeof T2 != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof T2);
  }
  Object.defineProperty(s7, "defaultMaxListeners", { enumerable: true, get: function() {
    return o6;
  }, set: function(T2) {
    if (typeof T2 != "number" || T2 < 0 || i6(T2)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + T2 + ".");
    o6 = T2;
  } }), s7.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, s7.prototype.setMaxListeners = function(g2) {
    if (typeof g2 != "number" || g2 < 0 || i6(g2)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + g2 + ".");
    return this._maxListeners = g2, this;
  };
  function c5(T2) {
    return T2._maxListeners === void 0 ? s7.defaultMaxListeners : T2._maxListeners;
  }
  s7.prototype.getMaxListeners = function() {
    return c5(this);
  }, s7.prototype.emit = function(g2) {
    for (var O = [], _2 = 1; _2 < arguments.length; _2++) O.push(arguments[_2]);
    var q = g2 === "error", $2 = this._events;
    if ($2 !== void 0) q = q && $2.error === void 0;
    else if (!q) return false;
    if (q) {
      var j2;
      if (O.length > 0 && (j2 = O[0]), j2 instanceof Error) throw j2;
      var J = new Error("Unhandled error." + (j2 ? " (" + j2.message + ")" : ""));
      throw J.context = j2, J;
    }
    var W = $2[g2];
    if (W === void 0) return false;
    if (typeof W == "function") e8(W, this, O);
    else for (var H2 = W.length, G = P2(W, H2), _2 = 0; _2 < H2; ++_2) e8(G[_2], this, O);
    return true;
  };
  function f3(T2, g2, O, _2) {
    var q, $2, j2;
    if (a3(O), $2 = T2._events, $2 === void 0 ? ($2 = T2._events = /* @__PURE__ */ Object.create(null), T2._eventsCount = 0) : ($2.newListener !== void 0 && (T2.emit("newListener", g2, O.listener ? O.listener : O), $2 = T2._events), j2 = $2[g2]), j2 === void 0) j2 = $2[g2] = O, ++T2._eventsCount;
    else if (typeof j2 == "function" ? j2 = $2[g2] = _2 ? [O, j2] : [j2, O] : _2 ? j2.unshift(O) : j2.push(O), q = c5(T2), q > 0 && j2.length > q && !j2.warned) {
      j2.warned = true;
      var J = new Error("Possible EventEmitter memory leak detected. " + j2.length + " " + String(g2) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      J.name = "MaxListenersExceededWarning", J.emitter = T2, J.type = g2, J.count = j2.length, n6(J);
    }
    return T2;
  }
  s7.prototype.addListener = function(g2, O) {
    return f3(this, g2, O, false);
  }, s7.prototype.on = s7.prototype.addListener, s7.prototype.prependListener = function(g2, O) {
    return f3(this, g2, O, true);
  };
  function h3() {
    if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function d3(T2, g2, O) {
    var _2 = { fired: false, wrapFn: void 0, target: T2, type: g2, listener: O }, q = h3.bind(_2);
    return q.listener = O, _2.wrapFn = q, q;
  }
  s7.prototype.once = function(g2, O) {
    return a3(O), this.on(g2, d3(this, g2, O)), this;
  }, s7.prototype.prependOnceListener = function(g2, O) {
    return a3(O), this.prependListener(g2, d3(this, g2, O)), this;
  }, s7.prototype.removeListener = function(g2, O) {
    var _2, q, $2, j2, J;
    if (a3(O), q = this._events, q === void 0) return this;
    if (_2 = q[g2], _2 === void 0) return this;
    if (_2 === O || _2.listener === O) --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete q[g2], q.removeListener && this.emit("removeListener", g2, _2.listener || O));
    else if (typeof _2 != "function") {
      for ($2 = -1, j2 = _2.length - 1; j2 >= 0; j2--) if (_2[j2] === O || _2[j2].listener === O) {
        J = _2[j2].listener, $2 = j2;
        break;
      }
      if ($2 < 0) return this;
      $2 === 0 ? _2.shift() : E2(_2, $2), _2.length === 1 && (q[g2] = _2[0]), q.removeListener !== void 0 && this.emit("removeListener", g2, J || O);
    }
    return this;
  }, s7.prototype.off = s7.prototype.removeListener, s7.prototype.removeAllListeners = function(g2) {
    var O, _2, q;
    if (_2 = this._events, _2 === void 0) return this;
    if (_2.removeListener === void 0) return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : _2[g2] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete _2[g2]), this;
    if (arguments.length === 0) {
      var $2 = Object.keys(_2), j2;
      for (q = 0; q < $2.length; ++q) j2 = $2[q], j2 !== "removeListener" && this.removeAllListeners(j2);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (O = _2[g2], typeof O == "function") this.removeListener(g2, O);
    else if (O !== void 0) for (q = O.length - 1; q >= 0; q--) this.removeListener(g2, O[q]);
    return this;
  };
  function w2(T2, g2, O) {
    var _2 = T2._events;
    if (_2 === void 0) return [];
    var q = _2[g2];
    return q === void 0 ? [] : typeof q == "function" ? O ? [q.listener || q] : [q] : O ? b3(q) : P2(q, q.length);
  }
  s7.prototype.listeners = function(g2) {
    return w2(this, g2, true);
  }, s7.prototype.rawListeners = function(g2) {
    return w2(this, g2, false);
  }, s7.listenerCount = function(T2, g2) {
    return typeof T2.listenerCount == "function" ? T2.listenerCount(g2) : y3.call(T2, g2);
  }, s7.prototype.listenerCount = y3;
  function y3(T2) {
    var g2 = this._events;
    if (g2 !== void 0) {
      var O = g2[T2];
      if (typeof O == "function") return 1;
      if (O !== void 0) return O.length;
    }
    return 0;
  }
  s7.prototype.eventNames = function() {
    return this._eventsCount > 0 ? r6(this._events) : [];
  };
  function P2(T2, g2) {
    for (var O = new Array(g2), _2 = 0; _2 < g2; ++_2) O[_2] = T2[_2];
    return O;
  }
  function E2(T2, g2) {
    for (; g2 + 1 < T2.length; g2++) T2[g2] = T2[g2 + 1];
    T2.pop();
  }
  function b3(T2) {
    for (var g2 = new Array(T2.length), O = 0; O < g2.length; ++O) g2[O] = T2[O].listener || T2[O];
    return g2;
  }
  function m2(T2, g2) {
    return new Promise(function(O, _2) {
      function q(j2) {
        T2.removeListener(g2, $2), _2(j2);
      }
      function $2() {
        typeof T2.removeListener == "function" && T2.removeListener("error", q), O([].slice.call(arguments));
      }
      R2(T2, g2, $2, { once: true }), g2 !== "error" && v2(T2, q, { once: true });
    });
  }
  function v2(T2, g2, O) {
    typeof T2.on == "function" && R2(T2, "error", g2, O);
  }
  function R2(T2, g2, O, _2) {
    if (typeof T2.on == "function") _2.once ? T2.once(g2, O) : T2.on(g2, O);
    else if (typeof T2.addEventListener == "function") T2.addEventListener(g2, function q($2) {
      _2.once && T2.removeEventListener(g2, q), O($2);
    });
    else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof T2);
  }
  return Ni;
}
function JA() {
  if (qg) return Vu;
  qg = true;
  let t5 = 2147483647, e8 = 36, r6 = 1, n6 = 26, i6 = 38, s7 = 700, o6 = 72, a3 = 128, c5 = "-", f3 = /^xn--/, h3 = /[^\0-\x7F]/, d3 = /[\x2E\u3002\uFF0E\uFF61]/g, w2 = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" }, y3 = e8 - r6, P2 = Math.floor, E2 = String.fromCharCode;
  function b3(H2) {
    throw new RangeError(w2[H2]);
  }
  function m2(H2, G) {
    let K = [], X = H2.length;
    for (; X--; ) K[X] = G(H2[X]);
    return K;
  }
  function v2(H2, G) {
    let K = H2.split("@"), X = "";
    K.length > 1 && (X = K[0] + "@", H2 = K[1]), H2 = H2.replace(d3, ".");
    let Q = H2.split("."), V2 = m2(Q, G).join(".");
    return X + V2;
  }
  function R2(H2) {
    let G = [], K = 0, X = H2.length;
    for (; K < X; ) {
      let Q = H2.charCodeAt(K++);
      if (Q >= 55296 && Q <= 56319 && K < X) {
        let V2 = H2.charCodeAt(K++);
        (V2 & 64512) == 56320 ? G.push(((Q & 1023) << 10) + (V2 & 1023) + 65536) : (G.push(Q), K--);
      } else G.push(Q);
    }
    return G;
  }
  let T2 = (H2) => String.fromCodePoint(...H2), g2 = function(H2) {
    return H2 >= 48 && H2 < 58 ? 26 + (H2 - 48) : H2 >= 65 && H2 < 91 ? H2 - 65 : H2 >= 97 && H2 < 123 ? H2 - 97 : e8;
  }, O = function(H2, G) {
    return H2 + 22 + 75 * (H2 < 26) - ((G != 0) << 5);
  }, _2 = function(H2, G, K) {
    let X = 0;
    for (H2 = K ? P2(H2 / s7) : H2 >> 1, H2 += P2(H2 / G); H2 > y3 * n6 >> 1; X += e8) H2 = P2(H2 / y3);
    return P2(X + (y3 + 1) * H2 / (H2 + i6));
  }, q = function(H2) {
    let G = [], K = H2.length, X = 0, Q = a3, V2 = o6, te = H2.lastIndexOf(c5);
    te < 0 && (te = 0);
    for (let Y = 0; Y < te; ++Y) H2.charCodeAt(Y) >= 128 && b3("not-basic"), G.push(H2.charCodeAt(Y));
    for (let Y = te > 0 ? te + 1 : 0; Y < K; ) {
      let ee = X;
      for (let Z = 1, ne = e8; ; ne += e8) {
        Y >= K && b3("invalid-input");
        let fe = g2(H2.charCodeAt(Y++));
        fe >= e8 && b3("invalid-input"), fe > P2((t5 - X) / Z) && b3("overflow"), X += fe * Z;
        let ge = ne <= V2 ? r6 : ne >= V2 + n6 ? n6 : ne - V2;
        if (fe < ge) break;
        let ye = e8 - ge;
        Z > P2(t5 / ye) && b3("overflow"), Z *= ye;
      }
      let pe = G.length + 1;
      V2 = _2(X - ee, pe, ee == 0), P2(X / pe) > t5 - Q && b3("overflow"), Q += P2(X / pe), X %= pe, G.splice(X++, 0, Q);
    }
    return String.fromCodePoint(...G);
  }, $2 = function(H2) {
    let G = [];
    H2 = R2(H2);
    let K = H2.length, X = a3, Q = 0, V2 = o6;
    for (let ee of H2) ee < 128 && G.push(E2(ee));
    let te = G.length, Y = te;
    for (te && G.push(c5); Y < K; ) {
      let ee = t5;
      for (let Z of H2) Z >= X && Z < ee && (ee = Z);
      let pe = Y + 1;
      ee - X > P2((t5 - Q) / pe) && b3("overflow"), Q += (ee - X) * pe, X = ee;
      for (let Z of H2) if (Z < X && ++Q > t5 && b3("overflow"), Z === X) {
        let ne = Q;
        for (let fe = e8; ; fe += e8) {
          let ge = fe <= V2 ? r6 : fe >= V2 + n6 ? n6 : fe - V2;
          if (ne < ge) break;
          let ye = ne - ge, Ae = e8 - ge;
          G.push(E2(O(ge + ye % Ae, 0))), ne = P2(ye / Ae);
        }
        G.push(E2(O(ne, 0))), V2 = _2(Q, pe, Y === te), Q = 0, ++Y;
      }
      ++Q, ++X;
    }
    return G.join("");
  };
  return Vu = { version: "2.3.1", ucs2: { decode: R2, encode: T2 }, decode: q, encode: $2, toASCII: function(H2) {
    return v2(H2, function(G) {
      return h3.test(G) ? "xn--" + $2(G) : G;
    });
  }, toUnicode: function(H2) {
    return v2(H2, function(G) {
      return f3.test(G) ? q(G.slice(4).toLowerCase()) : G;
    });
  } }, Vu;
}
function XA() {
  return Ug || (Ug = true, Gu = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function") return false;
    if (typeof Symbol.iterator == "symbol") return true;
    var e8 = {}, r6 = Symbol("test"), n6 = Object(r6);
    if (typeof r6 == "string" || Object.prototype.toString.call(r6) !== "[object Symbol]" || Object.prototype.toString.call(n6) !== "[object Symbol]") return false;
    var i6 = 42;
    e8[r6] = i6;
    for (r6 in e8) return false;
    if (typeof Object.keys == "function" && Object.keys(e8).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e8).length !== 0) return false;
    var s7 = Object.getOwnPropertySymbols(e8);
    if (s7.length !== 1 || s7[0] !== r6 || !Object.prototype.propertyIsEnumerable.call(e8, r6)) return false;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var o6 = Object.getOwnPropertyDescriptor(e8, r6);
      if (o6.value !== i6 || o6.enumerable !== true) return false;
    }
    return true;
  }), Gu;
}
function ZA() {
  return Dg || (Dg = true, zu = Error), zu;
}
function eI() {
  return jg || (jg = true, Ku = EvalError), Ku;
}
function tI() {
  return Fg || (Fg = true, Qu = RangeError), Qu;
}
function rI() {
  return Wg || (Wg = true, Yu = ReferenceError), Yu;
}
function ob() {
  return $g || ($g = true, Ju = SyntaxError), Ju;
}
function Sn() {
  return Hg || (Hg = true, Xu = TypeError), Xu;
}
function nI() {
  return Vg || (Vg = true, Zu = URIError), Zu;
}
function iI() {
  if (Gg) return el;
  Gg = true;
  var t5 = typeof Symbol < "u" && Symbol, e8 = XA();
  return el = function() {
    return typeof t5 != "function" || typeof Symbol != "function" || typeof t5("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? false : e8();
  }, el;
}
function oI() {
  if (zg) return tl;
  zg = true;
  var t5 = { __proto__: null, foo: {} }, e8 = Object;
  return tl = function() {
    return { __proto__: t5 }.foo === t5.foo && !(t5 instanceof e8);
  }, tl;
}
function sI() {
  if (Kg) return rl;
  Kg = true;
  var t5 = "Function.prototype.bind called on incompatible ", e8 = Object.prototype.toString, r6 = Math.max, n6 = "[object Function]", i6 = function(c5, f3) {
    for (var h3 = [], d3 = 0; d3 < c5.length; d3 += 1) h3[d3] = c5[d3];
    for (var w2 = 0; w2 < f3.length; w2 += 1) h3[w2 + c5.length] = f3[w2];
    return h3;
  }, s7 = function(c5, f3) {
    for (var h3 = [], d3 = f3, w2 = 0; d3 < c5.length; d3 += 1, w2 += 1) h3[w2] = c5[d3];
    return h3;
  }, o6 = function(a3, c5) {
    for (var f3 = "", h3 = 0; h3 < a3.length; h3 += 1) f3 += a3[h3], h3 + 1 < a3.length && (f3 += c5);
    return f3;
  };
  return rl = function(c5) {
    var f3 = this;
    if (typeof f3 != "function" || e8.apply(f3) !== n6) throw new TypeError(t5 + f3);
    for (var h3 = s7(arguments, 1), d3, w2 = function() {
      if (this instanceof d3) {
        var m2 = f3.apply(this, i6(h3, arguments));
        return Object(m2) === m2 ? m2 : this;
      }
      return f3.apply(c5, i6(h3, arguments));
    }, y3 = r6(0, f3.length - h3.length), P2 = [], E2 = 0; E2 < y3; E2++) P2[E2] = "$" + E2;
    if (d3 = Function("binder", "return function (" + o6(P2, ",") + "){ return binder.apply(this,arguments); }")(w2), f3.prototype) {
      var b3 = function() {
      };
      b3.prototype = f3.prototype, d3.prototype = new b3(), b3.prototype = null;
    }
    return d3;
  }, rl;
}
function hl() {
  if (Qg) return nl;
  Qg = true;
  var t5 = sI();
  return nl = Function.prototype.bind || t5, nl;
}
function aI() {
  if (Yg) return il;
  Yg = true;
  var t5 = Function.prototype.call, e8 = Object.prototype.hasOwnProperty, r6 = hl();
  return il = r6.call(t5, e8), il;
}
function Wr() {
  if (Jg) return ol;
  Jg = true;
  var t5, e8 = ZA(), r6 = eI(), n6 = tI(), i6 = rI(), s7 = ob(), o6 = Sn(), a3 = nI(), c5 = Function, f3 = function(Q) {
    try {
      return c5('"use strict"; return (' + Q + ").constructor;")();
    } catch {
    }
  }, h3 = Object.getOwnPropertyDescriptor;
  if (h3) try {
    h3({}, "");
  } catch {
    h3 = null;
  }
  var d3 = function() {
    throw new o6();
  }, w2 = h3 ? (function() {
    try {
      return arguments.callee, d3;
    } catch {
      try {
        return h3(arguments, "callee").get;
      } catch {
        return d3;
      }
    }
  })() : d3, y3 = iI()(), P2 = oI()(), E2 = Object.getPrototypeOf || (P2 ? function(Q) {
    return Q.__proto__;
  } : null), b3 = {}, m2 = typeof Uint8Array > "u" || !E2 ? t5 : E2(Uint8Array), v2 = { __proto__: null, "%AggregateError%": typeof AggregateError > "u" ? t5 : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer > "u" ? t5 : ArrayBuffer, "%ArrayIteratorPrototype%": y3 && E2 ? E2([][Symbol.iterator]()) : t5, "%AsyncFromSyncIteratorPrototype%": t5, "%AsyncFunction%": b3, "%AsyncGenerator%": b3, "%AsyncGeneratorFunction%": b3, "%AsyncIteratorPrototype%": b3, "%Atomics%": typeof Atomics > "u" ? t5 : Atomics, "%BigInt%": typeof BigInt > "u" ? t5 : BigInt, "%BigInt64Array%": typeof BigInt64Array > "u" ? t5 : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array > "u" ? t5 : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView > "u" ? t5 : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": e8, "%eval%": eval, "%EvalError%": r6, "%Float32Array%": typeof Float32Array > "u" ? t5 : Float32Array, "%Float64Array%": typeof Float64Array > "u" ? t5 : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? t5 : FinalizationRegistry, "%Function%": c5, "%GeneratorFunction%": b3, "%Int8Array%": typeof Int8Array > "u" ? t5 : Int8Array, "%Int16Array%": typeof Int16Array > "u" ? t5 : Int16Array, "%Int32Array%": typeof Int32Array > "u" ? t5 : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": y3 && E2 ? E2(E2([][Symbol.iterator]())) : t5, "%JSON%": typeof JSON == "object" ? JSON : t5, "%Map%": typeof Map > "u" ? t5 : Map, "%MapIteratorPrototype%": typeof Map > "u" || !y3 || !E2 ? t5 : E2((/* @__PURE__ */ new Map())[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise > "u" ? t5 : Promise, "%Proxy%": typeof Proxy > "u" ? t5 : Proxy, "%RangeError%": n6, "%ReferenceError%": i6, "%Reflect%": typeof Reflect > "u" ? t5 : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set > "u" ? t5 : Set, "%SetIteratorPrototype%": typeof Set > "u" || !y3 || !E2 ? t5 : E2((/* @__PURE__ */ new Set())[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? t5 : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": y3 && E2 ? E2(""[Symbol.iterator]()) : t5, "%Symbol%": y3 ? Symbol : t5, "%SyntaxError%": s7, "%ThrowTypeError%": w2, "%TypedArray%": m2, "%TypeError%": o6, "%Uint8Array%": typeof Uint8Array > "u" ? t5 : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? t5 : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array > "u" ? t5 : Uint16Array, "%Uint32Array%": typeof Uint32Array > "u" ? t5 : Uint32Array, "%URIError%": a3, "%WeakMap%": typeof WeakMap > "u" ? t5 : WeakMap, "%WeakRef%": typeof WeakRef > "u" ? t5 : WeakRef, "%WeakSet%": typeof WeakSet > "u" ? t5 : WeakSet };
  if (E2) try {
    null.error;
  } catch (Q) {
    var R2 = E2(E2(Q));
    v2["%Error.prototype%"] = R2;
  }
  var T2 = function Q(V2) {
    var te;
    if (V2 === "%AsyncFunction%") te = f3("async function () {}");
    else if (V2 === "%GeneratorFunction%") te = f3("function* () {}");
    else if (V2 === "%AsyncGeneratorFunction%") te = f3("async function* () {}");
    else if (V2 === "%AsyncGenerator%") {
      var Y = Q("%AsyncGeneratorFunction%");
      Y && (te = Y.prototype);
    } else if (V2 === "%AsyncIteratorPrototype%") {
      var ee = Q("%AsyncGenerator%");
      ee && E2 && (te = E2(ee.prototype));
    }
    return v2[V2] = te, te;
  }, g2 = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, O = hl(), _2 = aI(), q = O.call(Function.call, Array.prototype.concat), $2 = O.call(Function.apply, Array.prototype.splice), j2 = O.call(Function.call, String.prototype.replace), J = O.call(Function.call, String.prototype.slice), W = O.call(Function.call, RegExp.prototype.exec), H2 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, G = /\\(\\)?/g, K = function(V2) {
    var te = J(V2, 0, 1), Y = J(V2, -1);
    if (te === "%" && Y !== "%") throw new s7("invalid intrinsic syntax, expected closing `%`");
    if (Y === "%" && te !== "%") throw new s7("invalid intrinsic syntax, expected opening `%`");
    var ee = [];
    return j2(V2, H2, function(pe, Z, ne, fe) {
      ee[ee.length] = ne ? j2(fe, G, "$1") : Z || pe;
    }), ee;
  }, X = function(V2, te) {
    var Y = V2, ee;
    if (_2(g2, Y) && (ee = g2[Y], Y = "%" + ee[0] + "%"), _2(v2, Y)) {
      var pe = v2[Y];
      if (pe === b3 && (pe = T2(Y)), typeof pe > "u" && !te) throw new o6("intrinsic " + V2 + " exists, but is not available. Please file an issue!");
      return { alias: ee, name: Y, value: pe };
    }
    throw new s7("intrinsic " + V2 + " does not exist!");
  };
  return ol = function(V2, te) {
    if (typeof V2 != "string" || V2.length === 0) throw new o6("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof te != "boolean") throw new o6('"allowMissing" argument must be a boolean');
    if (W(/^%?[^%]*%?$/, V2) === null) throw new s7("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var Y = K(V2), ee = Y.length > 0 ? Y[0] : "", pe = X("%" + ee + "%", te), Z = pe.name, ne = pe.value, fe = false, ge = pe.alias;
    ge && (ee = ge[0], $2(Y, q([0, 1], ge)));
    for (var ye = 1, Ae = true; ye < Y.length; ye += 1) {
      var _e = Y[ye], ve = J(_e, 0, 1), Oe = J(_e, -1);
      if ((ve === '"' || ve === "'" || ve === "`" || Oe === '"' || Oe === "'" || Oe === "`") && ve !== Oe) throw new s7("property names with quotes must have matching quotes");
      if ((_e === "constructor" || !Ae) && (fe = true), ee += "." + _e, Z = "%" + ee + "%", _2(v2, Z)) ne = v2[Z];
      else if (ne != null) {
        if (!(_e in ne)) {
          if (!te) throw new o6("base intrinsic for " + V2 + " exists, but the property is not available.");
          return;
        }
        if (h3 && ye + 1 >= Y.length) {
          var xe = h3(ne, _e);
          Ae = !!xe, Ae && "get" in xe && !("originalValue" in xe.get) ? ne = xe.get : ne = ne[_e];
        } else Ae = _2(ne, _e), ne = ne[_e];
        Ae && !fe && (v2[Z] = ne);
      }
    }
    return ne;
  }, ol;
}
function dl() {
  if (Xg) return sl;
  Xg = true;
  var t5 = Wr(), e8 = t5("%Object.defineProperty%", true) || false;
  if (e8) try {
    e8({}, "a", { value: 1 });
  } catch {
    e8 = false;
  }
  return sl = e8, sl;
}
function sb() {
  if (Zg) return al;
  Zg = true;
  var t5 = Wr(), e8 = t5("%Object.getOwnPropertyDescriptor%", true);
  if (e8) try {
    e8([], "length");
  } catch {
    e8 = null;
  }
  return al = e8, al;
}
function uI() {
  if (eb) return ul;
  eb = true;
  var t5 = dl(), e8 = ob(), r6 = Sn(), n6 = sb();
  return ul = function(s7, o6, a3) {
    if (!s7 || typeof s7 != "object" && typeof s7 != "function") throw new r6("`obj` must be an object or a function`");
    if (typeof o6 != "string" && typeof o6 != "symbol") throw new r6("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null) throw new r6("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null) throw new r6("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null) throw new r6("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean") throw new r6("`loose`, if provided, must be a boolean");
    var c5 = arguments.length > 3 ? arguments[3] : null, f3 = arguments.length > 4 ? arguments[4] : null, h3 = arguments.length > 5 ? arguments[5] : null, d3 = arguments.length > 6 ? arguments[6] : false, w2 = !!n6 && n6(s7, o6);
    if (t5) t5(s7, o6, { configurable: h3 === null && w2 ? w2.configurable : !h3, enumerable: c5 === null && w2 ? w2.enumerable : !c5, value: a3, writable: f3 === null && w2 ? w2.writable : !f3 });
    else if (d3 || !c5 && !f3 && !h3) s7[o6] = a3;
    else throw new e8("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, ul;
}
function lI() {
  if (tb) return ll;
  tb = true;
  var t5 = dl(), e8 = function() {
    return !!t5;
  };
  return e8.hasArrayLengthDefineBug = function() {
    if (!t5) return null;
    try {
      return t5([], "length", { value: 1 }).length !== 1;
    } catch {
      return true;
    }
  }, ll = e8, ll;
}
function cI() {
  if (rb) return cl;
  rb = true;
  var t5 = Wr(), e8 = uI(), r6 = lI()(), n6 = sb(), i6 = Sn(), s7 = t5("%Math.floor%");
  return cl = function(a3, c5) {
    if (typeof a3 != "function") throw new i6("`fn` is not a function");
    if (typeof c5 != "number" || c5 < 0 || c5 > 4294967295 || s7(c5) !== c5) throw new i6("`length` must be a positive 32-bit integer");
    var f3 = arguments.length > 2 && !!arguments[2], h3 = true, d3 = true;
    if ("length" in a3 && n6) {
      var w2 = n6(a3, "length");
      w2 && !w2.configurable && (h3 = false), w2 && !w2.writable && (d3 = false);
    }
    return (h3 || d3 || !f3) && (r6 ? e8(a3, "length", c5, true, true) : e8(a3, "length", c5)), a3;
  }, cl;
}
function fI() {
  if (nb) return wi;
  nb = true;
  var t5 = hl(), e8 = Wr(), r6 = cI(), n6 = Sn(), i6 = e8("%Function.prototype.apply%"), s7 = e8("%Function.prototype.call%"), o6 = e8("%Reflect.apply%", true) || t5.call(s7, i6), a3 = dl(), c5 = e8("%Math.max%");
  wi = function(d3) {
    if (typeof d3 != "function") throw new n6("a function is required");
    var w2 = o6(t5, s7, arguments);
    return r6(w2, 1 + c5(0, d3.length - (arguments.length - 1)), true);
  };
  var f3 = function() {
    return o6(t5, i6, arguments);
  };
  return a3 ? a3(wi, "apply", { value: f3 }) : wi.apply = f3, wi;
}
function ab() {
  if (ib) return fl;
  ib = true;
  var t5 = Wr(), e8 = fI(), r6 = e8(t5("String.prototype.indexOf"));
  return fl = function(i6, s7) {
    var o6 = t5(i6, !!s7);
    return typeof o6 == "function" && r6(i6, ".prototype.") > -1 ? e8(o6) : o6;
  }, fl;
}
function bl(t5) {
  throw new Error("Node.js process " + t5 + " is not supported by JSPM core outside of Node.js");
}
function hI() {
  !En || !$r || (En = false, $r.length ? zt = $r.concat(zt) : Ko = -1, zt.length && lb());
}
function lb() {
  if (!En) {
    var t5 = setTimeout(hI, 0);
    En = true;
    for (var e8 = zt.length; e8; ) {
      for ($r = zt, zt = []; ++Ko < e8; ) $r && $r[Ko].run();
      Ko = -1, e8 = zt.length;
    }
    $r = null, En = false, clearTimeout(t5);
  }
}
function dI(t5) {
  var e8 = new Array(arguments.length - 1);
  if (arguments.length > 1) for (var r6 = 1; r6 < arguments.length; r6++) e8[r6 - 1] = arguments[r6];
  zt.push(new cb(t5, e8)), zt.length === 1 && !En && setTimeout(lb, 0);
}
function cb(t5, e8) {
  this.fun = t5, this.array = e8;
}
function We() {
}
function RI(t5) {
  bl("_linkedBinding");
}
function MI(t5) {
  bl("dlopen");
}
function NI() {
  return [];
}
function qI() {
  return [];
}
function VI(t5, e8) {
  if (!t5) throw new Error(e8 || "assertion error");
}
function QI() {
  return false;
}
function hx() {
  return dr.now() / 1e3;
}
function gl(t5) {
  var e8 = Math.floor((Date.now() - dr.now()) * 1e-3), r6 = dr.now() * 1e-3, n6 = Math.floor(r6) + e8, i6 = Math.floor(r6 % 1 * 1e9);
  return t5 && (n6 = n6 - t5[0], i6 = i6 - t5[1], i6 < 0 && (n6--, i6 += yl)), [n6, i6];
}
function pr() {
  return ml;
}
function Ix(t5) {
  return [];
}
function xx() {
  if (fb) return vl;
  fb = true;
  var t5 = ml;
  function e8(s7) {
    if (typeof s7 != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(s7));
  }
  function r6(s7, o6) {
    for (var a3 = "", c5 = 0, f3 = -1, h3 = 0, d3, w2 = 0; w2 <= s7.length; ++w2) {
      if (w2 < s7.length) d3 = s7.charCodeAt(w2);
      else {
        if (d3 === 47) break;
        d3 = 47;
      }
      if (d3 === 47) {
        if (!(f3 === w2 - 1 || h3 === 1)) if (f3 !== w2 - 1 && h3 === 2) {
          if (a3.length < 2 || c5 !== 2 || a3.charCodeAt(a3.length - 1) !== 46 || a3.charCodeAt(a3.length - 2) !== 46) {
            if (a3.length > 2) {
              var y3 = a3.lastIndexOf("/");
              if (y3 !== a3.length - 1) {
                y3 === -1 ? (a3 = "", c5 = 0) : (a3 = a3.slice(0, y3), c5 = a3.length - 1 - a3.lastIndexOf("/")), f3 = w2, h3 = 0;
                continue;
              }
            } else if (a3.length === 2 || a3.length === 1) {
              a3 = "", c5 = 0, f3 = w2, h3 = 0;
              continue;
            }
          }
          o6 && (a3.length > 0 ? a3 += "/.." : a3 = "..", c5 = 2);
        } else a3.length > 0 ? a3 += "/" + s7.slice(f3 + 1, w2) : a3 = s7.slice(f3 + 1, w2), c5 = w2 - f3 - 1;
        f3 = w2, h3 = 0;
      } else d3 === 46 && h3 !== -1 ? ++h3 : h3 = -1;
    }
    return a3;
  }
  function n6(s7, o6) {
    var a3 = o6.dir || o6.root, c5 = o6.base || (o6.name || "") + (o6.ext || "");
    return a3 ? a3 === o6.root ? a3 + c5 : a3 + s7 + c5 : c5;
  }
  var i6 = { resolve: function() {
    for (var o6 = "", a3 = false, c5, f3 = arguments.length - 1; f3 >= -1 && !a3; f3--) {
      var h3;
      f3 >= 0 ? h3 = arguments[f3] : (c5 === void 0 && (c5 = t5.cwd()), h3 = c5), e8(h3), h3.length !== 0 && (o6 = h3 + "/" + o6, a3 = h3.charCodeAt(0) === 47);
    }
    return o6 = r6(o6, !a3), a3 ? o6.length > 0 ? "/" + o6 : "/" : o6.length > 0 ? o6 : ".";
  }, normalize: function(o6) {
    if (e8(o6), o6.length === 0) return ".";
    var a3 = o6.charCodeAt(0) === 47, c5 = o6.charCodeAt(o6.length - 1) === 47;
    return o6 = r6(o6, !a3), o6.length === 0 && !a3 && (o6 = "."), o6.length > 0 && c5 && (o6 += "/"), a3 ? "/" + o6 : o6;
  }, isAbsolute: function(o6) {
    return e8(o6), o6.length > 0 && o6.charCodeAt(0) === 47;
  }, join: function() {
    if (arguments.length === 0) return ".";
    for (var o6, a3 = 0; a3 < arguments.length; ++a3) {
      var c5 = arguments[a3];
      e8(c5), c5.length > 0 && (o6 === void 0 ? o6 = c5 : o6 += "/" + c5);
    }
    return o6 === void 0 ? "." : i6.normalize(o6);
  }, relative: function(o6, a3) {
    if (e8(o6), e8(a3), o6 === a3 || (o6 = i6.resolve(o6), a3 = i6.resolve(a3), o6 === a3)) return "";
    for (var c5 = 1; c5 < o6.length && o6.charCodeAt(c5) === 47; ++c5) ;
    for (var f3 = o6.length, h3 = f3 - c5, d3 = 1; d3 < a3.length && a3.charCodeAt(d3) === 47; ++d3) ;
    for (var w2 = a3.length, y3 = w2 - d3, P2 = h3 < y3 ? h3 : y3, E2 = -1, b3 = 0; b3 <= P2; ++b3) {
      if (b3 === P2) {
        if (y3 > P2) {
          if (a3.charCodeAt(d3 + b3) === 47) return a3.slice(d3 + b3 + 1);
          if (b3 === 0) return a3.slice(d3 + b3);
        } else h3 > P2 && (o6.charCodeAt(c5 + b3) === 47 ? E2 = b3 : b3 === 0 && (E2 = 0));
        break;
      }
      var m2 = o6.charCodeAt(c5 + b3), v2 = a3.charCodeAt(d3 + b3);
      if (m2 !== v2) break;
      m2 === 47 && (E2 = b3);
    }
    var R2 = "";
    for (b3 = c5 + E2 + 1; b3 <= f3; ++b3) (b3 === f3 || o6.charCodeAt(b3) === 47) && (R2.length === 0 ? R2 += ".." : R2 += "/..");
    return R2.length > 0 ? R2 + a3.slice(d3 + E2) : (d3 += E2, a3.charCodeAt(d3) === 47 && ++d3, a3.slice(d3));
  }, _makeLong: function(o6) {
    return o6;
  }, dirname: function(o6) {
    if (e8(o6), o6.length === 0) return ".";
    for (var a3 = o6.charCodeAt(0), c5 = a3 === 47, f3 = -1, h3 = true, d3 = o6.length - 1; d3 >= 1; --d3) if (a3 = o6.charCodeAt(d3), a3 === 47) {
      if (!h3) {
        f3 = d3;
        break;
      }
    } else h3 = false;
    return f3 === -1 ? c5 ? "/" : "." : c5 && f3 === 1 ? "//" : o6.slice(0, f3);
  }, basename: function(o6, a3) {
    if (a3 !== void 0 && typeof a3 != "string") throw new TypeError('"ext" argument must be a string');
    e8(o6);
    var c5 = 0, f3 = -1, h3 = true, d3;
    if (a3 !== void 0 && a3.length > 0 && a3.length <= o6.length) {
      if (a3.length === o6.length && a3 === o6) return "";
      var w2 = a3.length - 1, y3 = -1;
      for (d3 = o6.length - 1; d3 >= 0; --d3) {
        var P2 = o6.charCodeAt(d3);
        if (P2 === 47) {
          if (!h3) {
            c5 = d3 + 1;
            break;
          }
        } else y3 === -1 && (h3 = false, y3 = d3 + 1), w2 >= 0 && (P2 === a3.charCodeAt(w2) ? --w2 === -1 && (f3 = d3) : (w2 = -1, f3 = y3));
      }
      return c5 === f3 ? f3 = y3 : f3 === -1 && (f3 = o6.length), o6.slice(c5, f3);
    } else {
      for (d3 = o6.length - 1; d3 >= 0; --d3) if (o6.charCodeAt(d3) === 47) {
        if (!h3) {
          c5 = d3 + 1;
          break;
        }
      } else f3 === -1 && (h3 = false, f3 = d3 + 1);
      return f3 === -1 ? "" : o6.slice(c5, f3);
    }
  }, extname: function(o6) {
    e8(o6);
    for (var a3 = -1, c5 = 0, f3 = -1, h3 = true, d3 = 0, w2 = o6.length - 1; w2 >= 0; --w2) {
      var y3 = o6.charCodeAt(w2);
      if (y3 === 47) {
        if (!h3) {
          c5 = w2 + 1;
          break;
        }
        continue;
      }
      f3 === -1 && (h3 = false, f3 = w2 + 1), y3 === 46 ? a3 === -1 ? a3 = w2 : d3 !== 1 && (d3 = 1) : a3 !== -1 && (d3 = -1);
    }
    return a3 === -1 || f3 === -1 || d3 === 0 || d3 === 1 && a3 === f3 - 1 && a3 === c5 + 1 ? "" : o6.slice(a3, f3);
  }, format: function(o6) {
    if (o6 === null || typeof o6 != "object") throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof o6);
    return n6("/", o6);
  }, parse: function(o6) {
    e8(o6);
    var a3 = { root: "", dir: "", base: "", ext: "", name: "" };
    if (o6.length === 0) return a3;
    var c5 = o6.charCodeAt(0), f3 = c5 === 47, h3;
    f3 ? (a3.root = "/", h3 = 1) : h3 = 0;
    for (var d3 = -1, w2 = 0, y3 = -1, P2 = true, E2 = o6.length - 1, b3 = 0; E2 >= h3; --E2) {
      if (c5 = o6.charCodeAt(E2), c5 === 47) {
        if (!P2) {
          w2 = E2 + 1;
          break;
        }
        continue;
      }
      y3 === -1 && (P2 = false, y3 = E2 + 1), c5 === 46 ? d3 === -1 ? d3 = E2 : b3 !== 1 && (b3 = 1) : d3 !== -1 && (b3 = -1);
    }
    return d3 === -1 || y3 === -1 || b3 === 0 || b3 === 1 && d3 === y3 - 1 && d3 === w2 + 1 ? y3 !== -1 && (w2 === 0 && f3 ? a3.base = a3.name = o6.slice(1, y3) : a3.base = a3.name = o6.slice(w2, y3)) : (w2 === 0 && f3 ? (a3.name = o6.slice(1, d3), a3.base = o6.slice(1, y3)) : (a3.name = o6.slice(w2, d3), a3.base = o6.slice(w2, y3)), a3.ext = o6.slice(d3, y3)), w2 > 0 ? a3.dir = o6.slice(0, w2 - 1) : f3 && (a3.dir = "/"), a3;
  }, sep: "/", delimiter: ":", win32: null, posix: null };
  return i6.posix = i6, vl = i6, vl;
}
function Px() {
  if (db) return El;
  db = true;
  var t5 = typeof Map == "function" && Map.prototype, e8 = Object.getOwnPropertyDescriptor && t5 ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, r6 = t5 && e8 && typeof e8.get == "function" ? e8.get : null, n6 = t5 && Map.prototype.forEach, i6 = typeof Set == "function" && Set.prototype, s7 = Object.getOwnPropertyDescriptor && i6 ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, o6 = i6 && s7 && typeof s7.get == "function" ? s7.get : null, a3 = i6 && Set.prototype.forEach, c5 = typeof WeakMap == "function" && WeakMap.prototype, f3 = c5 ? WeakMap.prototype.has : null, h3 = typeof WeakSet == "function" && WeakSet.prototype, d3 = h3 ? WeakSet.prototype.has : null, w2 = typeof WeakRef == "function" && WeakRef.prototype, y3 = w2 ? WeakRef.prototype.deref : null, P2 = Boolean.prototype.valueOf, E2 = Object.prototype.toString, b3 = Function.prototype.toString, m2 = String.prototype.match, v2 = String.prototype.slice, R2 = String.prototype.replace, T2 = String.prototype.toUpperCase, g2 = String.prototype.toLowerCase, O = RegExp.prototype.test, _2 = Array.prototype.concat, q = Array.prototype.join, $2 = Array.prototype.slice, j2 = Math.floor, J = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, W = Object.getOwnPropertySymbols, H2 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, G = typeof Symbol == "function" && typeof Symbol.iterator == "object", K = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === G || true) ? Symbol.toStringTag : null, X = Object.prototype.propertyIsEnumerable, Q = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(k2) {
    return k2.__proto__;
  } : null);
  function V2(k2, B2) {
    if (k2 === 1 / 0 || k2 === -1 / 0 || k2 !== k2 || k2 && k2 > -1e3 && k2 < 1e3 || O.call(/e/, B2)) return B2;
    var re = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof k2 == "number") {
      var ie = k2 < 0 ? -j2(-k2) : j2(k2);
      if (ie !== k2) {
        var oe = String(ie), ce = v2.call(B2, oe.length + 1);
        return R2.call(oe, re, "$&_") + "." + R2.call(R2.call(ce, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return R2.call(B2, re, "$&_");
  }
  var te = Tx, Y = te.custom, ee = Oe(Y) ? Y : null;
  El = function k2(B2, re, ie, oe) {
    var ce = re || {};
    if (Re(ce, "quoteStyle") && ce.quoteStyle !== "single" && ce.quoteStyle !== "double") throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (Re(ce, "maxStringLength") && (typeof ce.maxStringLength == "number" ? ce.maxStringLength < 0 && ce.maxStringLength !== 1 / 0 : ce.maxStringLength !== null)) throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var Qt = Re(ce, "customInspect") ? ce.customInspect : true;
    if (typeof Qt != "boolean" && Qt !== "symbol") throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (Re(ce, "indent") && ce.indent !== null && ce.indent !== "	" && !(parseInt(ce.indent, 10) === ce.indent && ce.indent > 0)) throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (Re(ce, "numericSeparator") && typeof ce.numericSeparator != "boolean") throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var br = ce.numericSeparator;
    if (typeof B2 > "u") return "undefined";
    if (B2 === null) return "null";
    if (typeof B2 == "boolean") return B2 ? "true" : "false";
    if (typeof B2 == "string") return at(B2, ce);
    if (typeof B2 == "number") {
      if (B2 === 0) return 1 / 0 / B2 > 0 ? "0" : "-0";
      var Ye = String(B2);
      return br ? V2(B2, Ye) : Ye;
    }
    if (typeof B2 == "bigint") {
      var Yt = String(B2) + "n";
      return br ? V2(B2, Yt) : Yt;
    }
    var es = typeof ce.depth > "u" ? 5 : ce.depth;
    if (typeof ie > "u" && (ie = 0), ie >= es && es > 0 && typeof B2 == "object") return ne(B2) ? "[Array]" : "[Object]";
    var Gr = C2(ce, ie);
    if (typeof oe > "u") oe = [];
    else if (Bt(oe, B2) >= 0) return "[Circular]";
    function ut(zr, Ti, Qb) {
      if (Ti && (oe = $2.call(oe), oe.push(Ti)), Qb) {
        var nc = { depth: ce.depth };
        return Re(ce, "quoteStyle") && (nc.quoteStyle = ce.quoteStyle), k2(zr, nc, ie + 1, oe);
      }
      return k2(zr, ce, ie + 1, oe);
    }
    if (typeof B2 == "function" && !ge(B2)) {
      var Yl = Ct(B2), Jl = F(B2, ut);
      return "[Function" + (Yl ? ": " + Yl : " (anonymous)") + "]" + (Jl.length > 0 ? " { " + q.call(Jl, ", ") + " }" : "");
    }
    if (Oe(B2)) {
      var Xl = G ? R2.call(String(B2), /^(Symbol\(.*\))_[^)]*$/, "$1") : H2.call(B2);
      return typeof B2 == "object" && !G ? p3(Xl) : Xl;
    }
    if (Xo(B2)) {
      for (var Pn = "<" + g2.call(String(B2.nodeName)), ts = B2.attributes || [], xi = 0; xi < ts.length; xi++) Pn += " " + ts[xi].name + "=" + pe(Z(ts[xi].value), "double", ce);
      return Pn += ">", B2.childNodes && B2.childNodes.length && (Pn += "..."), Pn += "</" + g2.call(String(B2.nodeName)) + ">", Pn;
    }
    if (ne(B2)) {
      if (B2.length === 0) return "[]";
      var rs = F(B2, ut);
      return Gr && !S3(rs) ? "[" + N2(rs, Gr) + "]" : "[ " + q.call(rs, ", ") + " ]";
    }
    if (ye(B2)) {
      var ns = F(B2, ut);
      return !("cause" in Error.prototype) && "cause" in B2 && !X.call(B2, "cause") ? "{ [" + String(B2) + "] " + q.call(_2.call("[cause]: " + ut(B2.cause), ns), ", ") + " }" : ns.length === 0 ? "[" + String(B2) + "]" : "{ [" + String(B2) + "] " + q.call(ns, ", ") + " }";
    }
    if (typeof B2 == "object" && Qt) {
      if (ee && typeof B2[ee] == "function" && te) return te(B2, { depth: es - ie });
      if (Qt !== "symbol" && typeof B2.inspect == "function") return B2.inspect();
    }
    if (xn(B2)) {
      var Zl = [];
      return n6 && n6.call(B2, function(zr, Ti) {
        Zl.push(ut(Ti, B2, true) + " => " + ut(zr, B2));
      }), l3("Map", r6.call(B2), Zl, Gr);
    }
    if (Ze(B2)) {
      var ec = [];
      return a3 && a3.call(B2, function(zr) {
        ec.push(ut(zr, B2));
      }), l3("Set", o6.call(B2), ec, Gr);
    }
    if (Ii(B2)) return u3("WeakMap");
    if (Tn(B2)) return u3("WeakSet");
    if (Vr(B2)) return u3("WeakRef");
    if (_e(B2)) return p3(ut(Number(B2)));
    if (xe(B2)) return p3(ut(J.call(B2)));
    if (ve(B2)) return p3(P2.call(B2));
    if (Ae(B2)) return p3(ut(String(B2)));
    if (typeof window < "u" && B2 === window) return "{ [object Window] }";
    if (typeof globalThis < "u" && B2 === globalThis || typeof Al < "u" && B2 === Al) return "{ [object globalThis] }";
    if (!fe(B2) && !ge(B2)) {
      var is = F(B2, ut), tc = Q ? Q(B2) === Object.prototype : B2 instanceof Object || B2.constructor === Object, os = B2 instanceof Object ? "" : "null prototype", rc = !tc && K && Object(B2) === B2 && K in B2 ? v2.call(Ne(B2), 8, -1) : os ? "Object" : "", Kb = tc || typeof B2.constructor != "function" ? "" : B2.constructor.name ? B2.constructor.name + " " : "", ss = Kb + (rc || os ? "[" + q.call(_2.call([], rc || [], os || []), ": ") + "] " : "");
      return is.length === 0 ? ss + "{}" : Gr ? ss + "{" + N2(is, Gr) + "}" : ss + "{ " + q.call(is, ", ") + " }";
    }
    return String(B2);
  };
  function pe(k2, B2, re) {
    var ie = (re.quoteStyle || B2) === "double" ? '"' : "'";
    return ie + k2 + ie;
  }
  function Z(k2) {
    return R2.call(String(k2), /"/g, "&quot;");
  }
  function ne(k2) {
    return Ne(k2) === "[object Array]" && (!K || !(typeof k2 == "object" && K in k2));
  }
  function fe(k2) {
    return Ne(k2) === "[object Date]" && (!K || !(typeof k2 == "object" && K in k2));
  }
  function ge(k2) {
    return Ne(k2) === "[object RegExp]" && (!K || !(typeof k2 == "object" && K in k2));
  }
  function ye(k2) {
    return Ne(k2) === "[object Error]" && (!K || !(typeof k2 == "object" && K in k2));
  }
  function Ae(k2) {
    return Ne(k2) === "[object String]" && (!K || !(typeof k2 == "object" && K in k2));
  }
  function _e(k2) {
    return Ne(k2) === "[object Number]" && (!K || !(typeof k2 == "object" && K in k2));
  }
  function ve(k2) {
    return Ne(k2) === "[object Boolean]" && (!K || !(typeof k2 == "object" && K in k2));
  }
  function Oe(k2) {
    if (G) return k2 && typeof k2 == "object" && k2 instanceof Symbol;
    if (typeof k2 == "symbol") return true;
    if (!k2 || typeof k2 != "object" || !H2) return false;
    try {
      return H2.call(k2), true;
    } catch {
    }
    return false;
  }
  function xe(k2) {
    if (!k2 || typeof k2 != "object" || !J) return false;
    try {
      return J.call(k2), true;
    } catch {
    }
    return false;
  }
  var st = Object.prototype.hasOwnProperty || function(k2) {
    return k2 in (this || Al);
  };
  function Re(k2, B2) {
    return st.call(k2, B2);
  }
  function Ne(k2) {
    return E2.call(k2);
  }
  function Ct(k2) {
    if (k2.name) return k2.name;
    var B2 = m2.call(b3.call(k2), /^function\s*([\w$]+)/);
    return B2 ? B2[1] : null;
  }
  function Bt(k2, B2) {
    if (k2.indexOf) return k2.indexOf(B2);
    for (var re = 0, ie = k2.length; re < ie; re++) if (k2[re] === B2) return re;
    return -1;
  }
  function xn(k2) {
    if (!r6 || !k2 || typeof k2 != "object") return false;
    try {
      r6.call(k2);
      try {
        o6.call(k2);
      } catch {
        return true;
      }
      return k2 instanceof Map;
    } catch {
    }
    return false;
  }
  function Ii(k2) {
    if (!f3 || !k2 || typeof k2 != "object") return false;
    try {
      f3.call(k2, f3);
      try {
        d3.call(k2, d3);
      } catch {
        return true;
      }
      return k2 instanceof WeakMap;
    } catch {
    }
    return false;
  }
  function Vr(k2) {
    if (!y3 || !k2 || typeof k2 != "object") return false;
    try {
      return y3.call(k2), true;
    } catch {
    }
    return false;
  }
  function Ze(k2) {
    if (!o6 || !k2 || typeof k2 != "object") return false;
    try {
      o6.call(k2);
      try {
        r6.call(k2);
      } catch {
        return true;
      }
      return k2 instanceof Set;
    } catch {
    }
    return false;
  }
  function Tn(k2) {
    if (!d3 || !k2 || typeof k2 != "object") return false;
    try {
      d3.call(k2, d3);
      try {
        f3.call(k2, f3);
      } catch {
        return true;
      }
      return k2 instanceof WeakSet;
    } catch {
    }
    return false;
  }
  function Xo(k2) {
    return !k2 || typeof k2 != "object" ? false : typeof HTMLElement < "u" && k2 instanceof HTMLElement ? true : typeof k2.nodeName == "string" && typeof k2.getAttribute == "function";
  }
  function at(k2, B2) {
    if (k2.length > B2.maxStringLength) {
      var re = k2.length - B2.maxStringLength, ie = "... " + re + " more character" + (re > 1 ? "s" : "");
      return at(v2.call(k2, 0, B2.maxStringLength), B2) + ie;
    }
    var oe = R2.call(R2.call(k2, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, Zo);
    return pe(oe, "single", B2);
  }
  function Zo(k2) {
    var B2 = k2.charCodeAt(0), re = { 8: "b", 9: "t", 10: "n", 12: "f", 13: "r" }[B2];
    return re ? "\\" + re : "\\x" + (B2 < 16 ? "0" : "") + T2.call(B2.toString(16));
  }
  function p3(k2) {
    return "Object(" + k2 + ")";
  }
  function u3(k2) {
    return k2 + " { ? }";
  }
  function l3(k2, B2, re, ie) {
    var oe = ie ? N2(re, ie) : q.call(re, ", ");
    return k2 + " (" + B2 + ") {" + oe + "}";
  }
  function S3(k2) {
    for (var B2 = 0; B2 < k2.length; B2++) if (Bt(k2[B2], `
`) >= 0) return false;
    return true;
  }
  function C2(k2, B2) {
    var re;
    if (k2.indent === "	") re = "	";
    else if (typeof k2.indent == "number" && k2.indent > 0) re = q.call(Array(k2.indent + 1), " ");
    else return null;
    return { base: re, prev: q.call(Array(B2 + 1), re) };
  }
  function N2(k2, B2) {
    if (k2.length === 0) return "";
    var re = `
` + B2.prev + B2.base;
    return re + q.call(k2, "," + re) + `
` + B2.prev;
  }
  function F(k2, B2) {
    var re = ne(k2), ie = [];
    if (re) {
      ie.length = k2.length;
      for (var oe = 0; oe < k2.length; oe++) ie[oe] = Re(k2, oe) ? B2(k2[oe], k2) : "";
    }
    var ce = typeof W == "function" ? W(k2) : [], Qt;
    if (G) {
      Qt = {};
      for (var br = 0; br < ce.length; br++) Qt["$" + ce[br]] = ce[br];
    }
    for (var Ye in k2) Re(k2, Ye) && (re && String(Number(Ye)) === Ye && Ye < k2.length || G && Qt["$" + Ye] instanceof Symbol || (O.call(/[^\w$]/, Ye) ? ie.push(B2(Ye, k2) + ": " + B2(k2[Ye], k2)) : ie.push(Ye + ": " + B2(k2[Ye], k2))));
    if (typeof W == "function") for (var Yt = 0; Yt < ce.length; Yt++) X.call(k2, ce[Yt]) && ie.push("[" + B2(ce[Yt]) + "]: " + B2(k2[ce[Yt]], k2));
    return ie;
  }
  return El;
}
function Ox() {
  if (pb) return Il;
  pb = true;
  var t5 = Wr(), e8 = ab(), r6 = Px(), n6 = Sn(), i6 = t5("%WeakMap%", true), s7 = t5("%Map%", true), o6 = e8("WeakMap.prototype.get", true), a3 = e8("WeakMap.prototype.set", true), c5 = e8("WeakMap.prototype.has", true), f3 = e8("Map.prototype.get", true), h3 = e8("Map.prototype.set", true), d3 = e8("Map.prototype.has", true), w2 = function(b3, m2) {
    for (var v2 = b3, R2; (R2 = v2.next) !== null; v2 = R2) if (R2.key === m2) return v2.next = R2.next, R2.next = b3.next, b3.next = R2, R2;
  }, y3 = function(b3, m2) {
    var v2 = w2(b3, m2);
    return v2 && v2.value;
  }, P2 = function(b3, m2, v2) {
    var R2 = w2(b3, m2);
    R2 ? R2.value = v2 : b3.next = { key: m2, next: b3.next, value: v2 };
  }, E2 = function(b3, m2) {
    return !!w2(b3, m2);
  };
  return Il = function() {
    var m2, v2, R2, T2 = { assert: function(g2) {
      if (!T2.has(g2)) throw new n6("Side channel does not contain " + r6(g2));
    }, get: function(g2) {
      if (i6 && g2 && (typeof g2 == "object" || typeof g2 == "function")) {
        if (m2) return o6(m2, g2);
      } else if (s7) {
        if (v2) return f3(v2, g2);
      } else if (R2) return y3(R2, g2);
    }, has: function(g2) {
      if (i6 && g2 && (typeof g2 == "object" || typeof g2 == "function")) {
        if (m2) return c5(m2, g2);
      } else if (s7) {
        if (v2) return d3(v2, g2);
      } else if (R2) return E2(R2, g2);
      return false;
    }, set: function(g2, O) {
      i6 && g2 && (typeof g2 == "object" || typeof g2 == "function") ? (m2 || (m2 = new i6()), a3(m2, g2, O)) : s7 ? (v2 || (v2 = new s7()), h3(v2, g2, O)) : (R2 || (R2 = { key: {}, next: null }), P2(R2, g2, O));
    } };
    return T2;
  }, Il;
}
function Cl() {
  if (yb) return xl;
  yb = true;
  var t5 = String.prototype.replace, e8 = /%20/g, r6 = { RFC1738: "RFC1738", RFC3986: "RFC3986" };
  return xl = { default: r6.RFC3986, formatters: { RFC1738: function(n6) {
    return t5.call(n6, e8, "+");
  }, RFC3986: function(n6) {
    return String(n6);
  } }, RFC1738: r6.RFC1738, RFC3986: r6.RFC3986 }, xl;
}
function vb() {
  if (gb) return Tl;
  gb = true;
  var t5 = Cl(), e8 = Object.prototype.hasOwnProperty, r6 = Array.isArray, n6 = (function() {
    for (var b3 = [], m2 = 0; m2 < 256; ++m2) b3.push("%" + ((m2 < 16 ? "0" : "") + m2.toString(16)).toUpperCase());
    return b3;
  })(), i6 = function(m2) {
    for (; m2.length > 1; ) {
      var v2 = m2.pop(), R2 = v2.obj[v2.prop];
      if (r6(R2)) {
        for (var T2 = [], g2 = 0; g2 < R2.length; ++g2) typeof R2[g2] < "u" && T2.push(R2[g2]);
        v2.obj[v2.prop] = T2;
      }
    }
  }, s7 = function(m2, v2) {
    for (var R2 = v2 && v2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, T2 = 0; T2 < m2.length; ++T2) typeof m2[T2] < "u" && (R2[T2] = m2[T2]);
    return R2;
  }, o6 = function b3(m2, v2, R2) {
    if (!v2) return m2;
    if (typeof v2 != "object") {
      if (r6(m2)) m2.push(v2);
      else if (m2 && typeof m2 == "object") (R2 && (R2.plainObjects || R2.allowPrototypes) || !e8.call(Object.prototype, v2)) && (m2[v2] = true);
      else return [m2, v2];
      return m2;
    }
    if (!m2 || typeof m2 != "object") return [m2].concat(v2);
    var T2 = m2;
    return r6(m2) && !r6(v2) && (T2 = s7(m2, R2)), r6(m2) && r6(v2) ? (v2.forEach(function(g2, O) {
      if (e8.call(m2, O)) {
        var _2 = m2[O];
        _2 && typeof _2 == "object" && g2 && typeof g2 == "object" ? m2[O] = b3(_2, g2, R2) : m2.push(g2);
      } else m2[O] = g2;
    }), m2) : Object.keys(v2).reduce(function(g2, O) {
      var _2 = v2[O];
      return e8.call(g2, O) ? g2[O] = b3(g2[O], _2, R2) : g2[O] = _2, g2;
    }, T2);
  }, a3 = function(m2, v2) {
    return Object.keys(v2).reduce(function(R2, T2) {
      return R2[T2] = v2[T2], R2;
    }, m2);
  }, c5 = function(b3, m2, v2) {
    var R2 = b3.replace(/\+/g, " ");
    if (v2 === "iso-8859-1") return R2.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
      return decodeURIComponent(R2);
    } catch {
      return R2;
    }
  }, f3 = 1024, h3 = function(m2, v2, R2, T2, g2) {
    if (m2.length === 0) return m2;
    var O = m2;
    if (typeof m2 == "symbol" ? O = Symbol.prototype.toString.call(m2) : typeof m2 != "string" && (O = String(m2)), R2 === "iso-8859-1") return escape(O).replace(/%u[0-9a-f]{4}/gi, function(H2) {
      return "%26%23" + parseInt(H2.slice(2), 16) + "%3B";
    });
    for (var _2 = "", q = 0; q < O.length; q += f3) {
      for (var $2 = O.length >= f3 ? O.slice(q, q + f3) : O, j2 = [], J = 0; J < $2.length; ++J) {
        var W = $2.charCodeAt(J);
        if (W === 45 || W === 46 || W === 95 || W === 126 || W >= 48 && W <= 57 || W >= 65 && W <= 90 || W >= 97 && W <= 122 || g2 === t5.RFC1738 && (W === 40 || W === 41)) {
          j2[j2.length] = $2.charAt(J);
          continue;
        }
        if (W < 128) {
          j2[j2.length] = n6[W];
          continue;
        }
        if (W < 2048) {
          j2[j2.length] = n6[192 | W >> 6] + n6[128 | W & 63];
          continue;
        }
        if (W < 55296 || W >= 57344) {
          j2[j2.length] = n6[224 | W >> 12] + n6[128 | W >> 6 & 63] + n6[128 | W & 63];
          continue;
        }
        J += 1, W = 65536 + ((W & 1023) << 10 | $2.charCodeAt(J) & 1023), j2[j2.length] = n6[240 | W >> 18] + n6[128 | W >> 12 & 63] + n6[128 | W >> 6 & 63] + n6[128 | W & 63];
      }
      _2 += j2.join("");
    }
    return _2;
  }, d3 = function(m2) {
    for (var v2 = [{ obj: { o: m2 }, prop: "o" }], R2 = [], T2 = 0; T2 < v2.length; ++T2) for (var g2 = v2[T2], O = g2.obj[g2.prop], _2 = Object.keys(O), q = 0; q < _2.length; ++q) {
      var $2 = _2[q], j2 = O[$2];
      typeof j2 == "object" && j2 !== null && R2.indexOf(j2) === -1 && (v2.push({ obj: O, prop: $2 }), R2.push(j2));
    }
    return i6(v2), m2;
  }, w2 = function(m2) {
    return Object.prototype.toString.call(m2) === "[object RegExp]";
  }, y3 = function(m2) {
    return !m2 || typeof m2 != "object" ? false : !!(m2.constructor && m2.constructor.isBuffer && m2.constructor.isBuffer(m2));
  }, P2 = function(m2, v2) {
    return [].concat(m2, v2);
  }, E2 = function(m2, v2) {
    if (r6(m2)) {
      for (var R2 = [], T2 = 0; T2 < m2.length; T2 += 1) R2.push(v2(m2[T2]));
      return R2;
    }
    return v2(m2);
  };
  return Tl = { arrayToObject: s7, assign: a3, combine: P2, compact: d3, decode: c5, encode: h3, isBuffer: y3, isRegExp: w2, maybeMap: E2, merge: o6 }, Tl;
}
function Rx() {
  if (bb) return Pl;
  bb = true;
  var t5 = Ox(), e8 = vb(), r6 = Cl(), n6 = Object.prototype.hasOwnProperty, i6 = { brackets: function(b3) {
    return b3 + "[]";
  }, comma: "comma", indices: function(b3, m2) {
    return b3 + "[" + m2 + "]";
  }, repeat: function(b3) {
    return b3;
  } }, s7 = Array.isArray, o6 = Array.prototype.push, a3 = function(E2, b3) {
    o6.apply(E2, s7(b3) ? b3 : [b3]);
  }, c5 = Date.prototype.toISOString, f3 = r6.default, h3 = { addQueryPrefix: false, allowDots: false, allowEmptyArrays: false, arrayFormat: "indices", charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encodeDotInKeys: false, encoder: e8.encode, encodeValuesOnly: false, format: f3, formatter: r6.formatters[f3], indices: false, serializeDate: function(b3) {
    return c5.call(b3);
  }, skipNulls: false, strictNullHandling: false }, d3 = function(b3) {
    return typeof b3 == "string" || typeof b3 == "number" || typeof b3 == "boolean" || typeof b3 == "symbol" || typeof b3 == "bigint";
  }, w2 = {}, y3 = function E2(b3, m2, v2, R2, T2, g2, O, _2, q, $2, j2, J, W, H2, G, K, X, Q) {
    for (var V2 = b3, te = Q, Y = 0, ee = false; (te = te.get(w2)) !== void 0 && !ee; ) {
      var pe = te.get(b3);
      if (Y += 1, typeof pe < "u") {
        if (pe === Y) throw new RangeError("Cyclic object value");
        ee = true;
      }
      typeof te.get(w2) > "u" && (Y = 0);
    }
    if (typeof $2 == "function" ? V2 = $2(m2, V2) : V2 instanceof Date ? V2 = W(V2) : v2 === "comma" && s7(V2) && (V2 = e8.maybeMap(V2, function(Ne) {
      return Ne instanceof Date ? W(Ne) : Ne;
    })), V2 === null) {
      if (g2) return q && !K ? q(m2, h3.encoder, X, "key", H2) : m2;
      V2 = "";
    }
    if (d3(V2) || e8.isBuffer(V2)) {
      if (q) {
        var Z = K ? m2 : q(m2, h3.encoder, X, "key", H2);
        return [G(Z) + "=" + G(q(V2, h3.encoder, X, "value", H2))];
      }
      return [G(m2) + "=" + G(String(V2))];
    }
    var ne = [];
    if (typeof V2 > "u") return ne;
    var fe;
    if (v2 === "comma" && s7(V2)) K && q && (V2 = e8.maybeMap(V2, q)), fe = [{ value: V2.length > 0 ? V2.join(",") || null : void 0 }];
    else if (s7($2)) fe = $2;
    else {
      var ge = Object.keys(V2);
      fe = j2 ? ge.sort(j2) : ge;
    }
    var ye = _2 ? m2.replace(/\./g, "%2E") : m2, Ae = R2 && s7(V2) && V2.length === 1 ? ye + "[]" : ye;
    if (T2 && s7(V2) && V2.length === 0) return Ae + "[]";
    for (var _e = 0; _e < fe.length; ++_e) {
      var ve = fe[_e], Oe = typeof ve == "object" && typeof ve.value < "u" ? ve.value : V2[ve];
      if (!(O && Oe === null)) {
        var xe = J && _2 ? ve.replace(/\./g, "%2E") : ve, st = s7(V2) ? typeof v2 == "function" ? v2(Ae, xe) : Ae : Ae + (J ? "." + xe : "[" + xe + "]");
        Q.set(b3, Y);
        var Re = t5();
        Re.set(w2, Q), a3(ne, E2(Oe, st, v2, R2, T2, g2, O, _2, v2 === "comma" && K && s7(V2) ? null : q, $2, j2, J, W, H2, G, K, X, Re));
      }
    }
    return ne;
  }, P2 = function(b3) {
    if (!b3) return h3;
    if (typeof b3.allowEmptyArrays < "u" && typeof b3.allowEmptyArrays != "boolean") throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
    if (typeof b3.encodeDotInKeys < "u" && typeof b3.encodeDotInKeys != "boolean") throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
    if (b3.encoder !== null && typeof b3.encoder < "u" && typeof b3.encoder != "function") throw new TypeError("Encoder has to be a function.");
    var m2 = b3.charset || h3.charset;
    if (typeof b3.charset < "u" && b3.charset !== "utf-8" && b3.charset !== "iso-8859-1") throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var v2 = r6.default;
    if (typeof b3.format < "u") {
      if (!n6.call(r6.formatters, b3.format)) throw new TypeError("Unknown format option provided.");
      v2 = b3.format;
    }
    var R2 = r6.formatters[v2], T2 = h3.filter;
    (typeof b3.filter == "function" || s7(b3.filter)) && (T2 = b3.filter);
    var g2;
    if (b3.arrayFormat in i6 ? g2 = b3.arrayFormat : "indices" in b3 ? g2 = b3.indices ? "indices" : "repeat" : g2 = h3.arrayFormat, "commaRoundTrip" in b3 && typeof b3.commaRoundTrip != "boolean") throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
    var O = typeof b3.allowDots > "u" ? b3.encodeDotInKeys === true ? true : h3.allowDots : !!b3.allowDots;
    return { addQueryPrefix: typeof b3.addQueryPrefix == "boolean" ? b3.addQueryPrefix : h3.addQueryPrefix, allowDots: O, allowEmptyArrays: typeof b3.allowEmptyArrays == "boolean" ? !!b3.allowEmptyArrays : h3.allowEmptyArrays, arrayFormat: g2, charset: m2, charsetSentinel: typeof b3.charsetSentinel == "boolean" ? b3.charsetSentinel : h3.charsetSentinel, commaRoundTrip: b3.commaRoundTrip, delimiter: typeof b3.delimiter > "u" ? h3.delimiter : b3.delimiter, encode: typeof b3.encode == "boolean" ? b3.encode : h3.encode, encodeDotInKeys: typeof b3.encodeDotInKeys == "boolean" ? b3.encodeDotInKeys : h3.encodeDotInKeys, encoder: typeof b3.encoder == "function" ? b3.encoder : h3.encoder, encodeValuesOnly: typeof b3.encodeValuesOnly == "boolean" ? b3.encodeValuesOnly : h3.encodeValuesOnly, filter: T2, format: v2, formatter: R2, serializeDate: typeof b3.serializeDate == "function" ? b3.serializeDate : h3.serializeDate, skipNulls: typeof b3.skipNulls == "boolean" ? b3.skipNulls : h3.skipNulls, sort: typeof b3.sort == "function" ? b3.sort : null, strictNullHandling: typeof b3.strictNullHandling == "boolean" ? b3.strictNullHandling : h3.strictNullHandling };
  };
  return Pl = function(E2, b3) {
    var m2 = E2, v2 = P2(b3), R2, T2;
    typeof v2.filter == "function" ? (T2 = v2.filter, m2 = T2("", m2)) : s7(v2.filter) && (T2 = v2.filter, R2 = T2);
    var g2 = [];
    if (typeof m2 != "object" || m2 === null) return "";
    var O = i6[v2.arrayFormat], _2 = O === "comma" && v2.commaRoundTrip;
    R2 || (R2 = Object.keys(m2)), v2.sort && R2.sort(v2.sort);
    for (var q = t5(), $2 = 0; $2 < R2.length; ++$2) {
      var j2 = R2[$2];
      v2.skipNulls && m2[j2] === null || a3(g2, y3(m2[j2], j2, O, _2, v2.allowEmptyArrays, v2.strictNullHandling, v2.skipNulls, v2.encodeDotInKeys, v2.encode ? v2.encoder : null, v2.filter, v2.sort, v2.allowDots, v2.serializeDate, v2.format, v2.formatter, v2.encodeValuesOnly, v2.charset, q));
    }
    var J = g2.join(v2.delimiter), W = v2.addQueryPrefix === true ? "?" : "";
    return v2.charsetSentinel && (v2.charset === "iso-8859-1" ? W += "utf8=%26%2310003%3B&" : W += "utf8=%E2%9C%93&"), J.length > 0 ? W + J : "";
  }, Pl;
}
function kx() {
  if (wb) return Ol;
  wb = true;
  var t5 = vb(), e8 = Object.prototype.hasOwnProperty, r6 = Array.isArray, n6 = { allowDots: false, allowEmptyArrays: false, allowPrototypes: false, allowSparse: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decodeDotInKeys: false, decoder: t5.decode, delimiter: "&", depth: 5, duplicates: "combine", ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictDepth: false, strictNullHandling: false }, i6 = function(w2) {
    return w2.replace(/&#(\d+);/g, function(y3, P2) {
      return String.fromCharCode(parseInt(P2, 10));
    });
  }, s7 = function(w2, y3) {
    return w2 && typeof w2 == "string" && y3.comma && w2.indexOf(",") > -1 ? w2.split(",") : w2;
  }, o6 = "utf8=%26%2310003%3B", a3 = "utf8=%E2%9C%93", c5 = function(y3, P2) {
    var E2 = { __proto__: null }, b3 = P2.ignoreQueryPrefix ? y3.replace(/^\?/, "") : y3;
    b3 = b3.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    var m2 = P2.parameterLimit === 1 / 0 ? void 0 : P2.parameterLimit, v2 = b3.split(P2.delimiter, m2), R2 = -1, T2, g2 = P2.charset;
    if (P2.charsetSentinel) for (T2 = 0; T2 < v2.length; ++T2) v2[T2].indexOf("utf8=") === 0 && (v2[T2] === a3 ? g2 = "utf-8" : v2[T2] === o6 && (g2 = "iso-8859-1"), R2 = T2, T2 = v2.length);
    for (T2 = 0; T2 < v2.length; ++T2) if (T2 !== R2) {
      var O = v2[T2], _2 = O.indexOf("]="), q = _2 === -1 ? O.indexOf("=") : _2 + 1, $2, j2;
      q === -1 ? ($2 = P2.decoder(O, n6.decoder, g2, "key"), j2 = P2.strictNullHandling ? null : "") : ($2 = P2.decoder(O.slice(0, q), n6.decoder, g2, "key"), j2 = t5.maybeMap(s7(O.slice(q + 1), P2), function(W) {
        return P2.decoder(W, n6.decoder, g2, "value");
      })), j2 && P2.interpretNumericEntities && g2 === "iso-8859-1" && (j2 = i6(j2)), O.indexOf("[]=") > -1 && (j2 = r6(j2) ? [j2] : j2);
      var J = e8.call(E2, $2);
      J && P2.duplicates === "combine" ? E2[$2] = t5.combine(E2[$2], j2) : (!J || P2.duplicates === "last") && (E2[$2] = j2);
    }
    return E2;
  }, f3 = function(w2, y3, P2, E2) {
    for (var b3 = E2 ? y3 : s7(y3, P2), m2 = w2.length - 1; m2 >= 0; --m2) {
      var v2, R2 = w2[m2];
      if (R2 === "[]" && P2.parseArrays) v2 = P2.allowEmptyArrays && (b3 === "" || P2.strictNullHandling && b3 === null) ? [] : [].concat(b3);
      else {
        v2 = P2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        var T2 = R2.charAt(0) === "[" && R2.charAt(R2.length - 1) === "]" ? R2.slice(1, -1) : R2, g2 = P2.decodeDotInKeys ? T2.replace(/%2E/g, ".") : T2, O = parseInt(g2, 10);
        !P2.parseArrays && g2 === "" ? v2 = { 0: b3 } : !isNaN(O) && R2 !== g2 && String(O) === g2 && O >= 0 && P2.parseArrays && O <= P2.arrayLimit ? (v2 = [], v2[O] = b3) : g2 !== "__proto__" && (v2[g2] = b3);
      }
      b3 = v2;
    }
    return b3;
  }, h3 = function(y3, P2, E2, b3) {
    if (y3) {
      var m2 = E2.allowDots ? y3.replace(/\.([^.[]+)/g, "[$1]") : y3, v2 = /(\[[^[\]]*])/, R2 = /(\[[^[\]]*])/g, T2 = E2.depth > 0 && v2.exec(m2), g2 = T2 ? m2.slice(0, T2.index) : m2, O = [];
      if (g2) {
        if (!E2.plainObjects && e8.call(Object.prototype, g2) && !E2.allowPrototypes) return;
        O.push(g2);
      }
      for (var _2 = 0; E2.depth > 0 && (T2 = R2.exec(m2)) !== null && _2 < E2.depth; ) {
        if (_2 += 1, !E2.plainObjects && e8.call(Object.prototype, T2[1].slice(1, -1)) && !E2.allowPrototypes) return;
        O.push(T2[1]);
      }
      if (T2) {
        if (E2.strictDepth === true) throw new RangeError("Input depth exceeded depth option of " + E2.depth + " and strictDepth is true");
        O.push("[" + m2.slice(T2.index) + "]");
      }
      return f3(O, P2, E2, b3);
    }
  }, d3 = function(y3) {
    if (!y3) return n6;
    if (typeof y3.allowEmptyArrays < "u" && typeof y3.allowEmptyArrays != "boolean") throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
    if (typeof y3.decodeDotInKeys < "u" && typeof y3.decodeDotInKeys != "boolean") throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
    if (y3.decoder !== null && typeof y3.decoder < "u" && typeof y3.decoder != "function") throw new TypeError("Decoder has to be a function.");
    if (typeof y3.charset < "u" && y3.charset !== "utf-8" && y3.charset !== "iso-8859-1") throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var P2 = typeof y3.charset > "u" ? n6.charset : y3.charset, E2 = typeof y3.duplicates > "u" ? n6.duplicates : y3.duplicates;
    if (E2 !== "combine" && E2 !== "first" && E2 !== "last") throw new TypeError("The duplicates option must be either combine, first, or last");
    var b3 = typeof y3.allowDots > "u" ? y3.decodeDotInKeys === true ? true : n6.allowDots : !!y3.allowDots;
    return { allowDots: b3, allowEmptyArrays: typeof y3.allowEmptyArrays == "boolean" ? !!y3.allowEmptyArrays : n6.allowEmptyArrays, allowPrototypes: typeof y3.allowPrototypes == "boolean" ? y3.allowPrototypes : n6.allowPrototypes, allowSparse: typeof y3.allowSparse == "boolean" ? y3.allowSparse : n6.allowSparse, arrayLimit: typeof y3.arrayLimit == "number" ? y3.arrayLimit : n6.arrayLimit, charset: P2, charsetSentinel: typeof y3.charsetSentinel == "boolean" ? y3.charsetSentinel : n6.charsetSentinel, comma: typeof y3.comma == "boolean" ? y3.comma : n6.comma, decodeDotInKeys: typeof y3.decodeDotInKeys == "boolean" ? y3.decodeDotInKeys : n6.decodeDotInKeys, decoder: typeof y3.decoder == "function" ? y3.decoder : n6.decoder, delimiter: typeof y3.delimiter == "string" || t5.isRegExp(y3.delimiter) ? y3.delimiter : n6.delimiter, depth: typeof y3.depth == "number" || y3.depth === false ? +y3.depth : n6.depth, duplicates: E2, ignoreQueryPrefix: y3.ignoreQueryPrefix === true, interpretNumericEntities: typeof y3.interpretNumericEntities == "boolean" ? y3.interpretNumericEntities : n6.interpretNumericEntities, parameterLimit: typeof y3.parameterLimit == "number" ? y3.parameterLimit : n6.parameterLimit, parseArrays: y3.parseArrays !== false, plainObjects: typeof y3.plainObjects == "boolean" ? y3.plainObjects : n6.plainObjects, strictDepth: typeof y3.strictDepth == "boolean" ? !!y3.strictDepth : n6.strictDepth, strictNullHandling: typeof y3.strictNullHandling == "boolean" ? y3.strictNullHandling : n6.strictNullHandling };
  };
  return Ol = function(w2, y3) {
    var P2 = d3(y3);
    if (w2 === "" || w2 === null || typeof w2 > "u") return P2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
    for (var E2 = typeof w2 == "string" ? c5(w2, P2) : w2, b3 = P2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, m2 = Object.keys(E2), v2 = 0; v2 < m2.length; ++v2) {
      var R2 = m2[v2], T2 = h3(R2, E2[R2], P2, typeof w2 == "string");
      b3 = t5.merge(b3, T2, P2);
    }
    return P2.allowSparse === true ? b3 : t5.compact(b3);
  }, Ol;
}
function Cx() {
  if (mb) return Rl;
  mb = true;
  var t5 = Rx(), e8 = kx(), r6 = Cl();
  return Rl = { formats: r6, parse: e8, stringify: t5 }, Rl;
}
function Bx() {
  if (_b) return Hr;
  _b = true;
  var t5 = hr;
  function e8() {
    this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
  }
  var r6 = /^([a-z0-9.+-]+:)/i, n6 = /:[0-9]*$/, i6 = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/, s7 = ["<", ">", '"', "`", " ", "\r", `
`, "	"], o6 = ["{", "}", "|", "\\", "^", "`"].concat(s7), a3 = ["'"].concat(o6), c5 = ["%", "/", "?", ";", "#"].concat(a3), f3 = ["/", "?", "#"], h3 = 255, d3 = /^[+a-z0-9A-Z_-]{0,63}$/, w2 = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, y3 = { javascript: true, "javascript:": true }, P2 = { javascript: true, "javascript:": true }, E2 = { http: true, https: true, ftp: true, gopher: true, file: true, "http:": true, "https:": true, "ftp:": true, "gopher:": true, "file:": true }, b3 = Cx();
  function m2(g2, O, _2) {
    if (g2 && typeof g2 == "object" && g2 instanceof e8) return g2;
    var q = new e8();
    return q.parse(g2, O, _2), q;
  }
  e8.prototype.parse = function(g2, O, _2) {
    if (typeof g2 != "string") throw new TypeError("Parameter 'url' must be a string, not " + typeof g2);
    var q = g2.indexOf("?"), $2 = q !== -1 && q < g2.indexOf("#") ? "?" : "#", j2 = g2.split($2), J = /\\/g;
    j2[0] = j2[0].replace(J, "/"), g2 = j2.join($2);
    var W = g2;
    if (W = W.trim(), !_2 && g2.split("#").length === 1) {
      var H2 = i6.exec(W);
      if (H2) return this.path = W, this.href = W, this.pathname = H2[1], H2[2] ? (this.search = H2[2], O ? this.query = b3.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : O && (this.search = "", this.query = {}), this;
    }
    var G = r6.exec(W);
    if (G) {
      G = G[0];
      var K = G.toLowerCase();
      this.protocol = K, W = W.substr(G.length);
    }
    if (_2 || G || W.match(/^\/\/[^@/]+@[^@/]+/)) {
      var X = W.substr(0, 2) === "//";
      X && !(G && P2[G]) && (W = W.substr(2), this.slashes = true);
    }
    if (!P2[G] && (X || G && !E2[G])) {
      for (var Q = -1, V2 = 0; V2 < f3.length; V2++) {
        var te = W.indexOf(f3[V2]);
        te !== -1 && (Q === -1 || te < Q) && (Q = te);
      }
      var Y, ee;
      Q === -1 ? ee = W.lastIndexOf("@") : ee = W.lastIndexOf("@", Q), ee !== -1 && (Y = W.slice(0, ee), W = W.slice(ee + 1), this.auth = decodeURIComponent(Y)), Q = -1;
      for (var V2 = 0; V2 < c5.length; V2++) {
        var te = W.indexOf(c5[V2]);
        te !== -1 && (Q === -1 || te < Q) && (Q = te);
      }
      Q === -1 && (Q = W.length), this.host = W.slice(0, Q), W = W.slice(Q), this.parseHost(), this.hostname = this.hostname || "";
      var pe = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
      if (!pe) for (var Z = this.hostname.split(/\./), V2 = 0, ne = Z.length; V2 < ne; V2++) {
        var fe = Z[V2];
        if (fe && !fe.match(d3)) {
          for (var ge = "", ye = 0, Ae = fe.length; ye < Ae; ye++) fe.charCodeAt(ye) > 127 ? ge += "x" : ge += fe[ye];
          if (!ge.match(d3)) {
            var _e = Z.slice(0, V2), ve = Z.slice(V2 + 1), Oe = fe.match(w2);
            Oe && (_e.push(Oe[1]), ve.unshift(Oe[2])), ve.length && (W = "/" + ve.join(".") + W), this.hostname = _e.join(".");
            break;
          }
        }
      }
      this.hostname.length > h3 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), pe || (this.hostname = t5.toASCII(this.hostname));
      var xe = this.port ? ":" + this.port : "", st = this.hostname || "";
      this.host = st + xe, this.href += this.host, pe && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), W[0] !== "/" && (W = "/" + W));
    }
    if (!y3[K]) for (var V2 = 0, ne = a3.length; V2 < ne; V2++) {
      var Re = a3[V2];
      if (W.indexOf(Re) !== -1) {
        var Ne = encodeURIComponent(Re);
        Ne === Re && (Ne = escape(Re)), W = W.split(Re).join(Ne);
      }
    }
    var Ct = W.indexOf("#");
    Ct !== -1 && (this.hash = W.substr(Ct), W = W.slice(0, Ct));
    var Bt = W.indexOf("?");
    if (Bt !== -1 ? (this.search = W.substr(Bt), this.query = W.substr(Bt + 1), O && (this.query = b3.parse(this.query)), W = W.slice(0, Bt)) : O && (this.search = "", this.query = {}), W && (this.pathname = W), E2[K] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
      var xe = this.pathname || "", xn = this.search || "";
      this.path = xe + xn;
    }
    return this.href = this.format(), this;
  };
  function v2(g2) {
    return typeof g2 == "string" && (g2 = m2(g2)), g2 instanceof e8 ? g2.format() : e8.prototype.format.call(g2);
  }
  e8.prototype.format = function() {
    var g2 = this.auth || "";
    g2 && (g2 = encodeURIComponent(g2), g2 = g2.replace(/%3A/i, ":"), g2 += "@");
    var O = this.protocol || "", _2 = this.pathname || "", q = this.hash || "", $2 = false, j2 = "";
    this.host ? $2 = g2 + this.host : this.hostname && ($2 = g2 + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && ($2 += ":" + this.port)), this.query && typeof this.query == "object" && Object.keys(this.query).length && (j2 = b3.stringify(this.query, { arrayFormat: "repeat", addQueryPrefix: false }));
    var J = this.search || j2 && "?" + j2 || "";
    return O && O.substr(-1) !== ":" && (O += ":"), this.slashes || (!O || E2[O]) && $2 !== false ? ($2 = "//" + ($2 || ""), _2 && _2.charAt(0) !== "/" && (_2 = "/" + _2)) : $2 || ($2 = ""), q && q.charAt(0) !== "#" && (q = "#" + q), J && J.charAt(0) !== "?" && (J = "?" + J), _2 = _2.replace(/[?#]/g, function(W) {
      return encodeURIComponent(W);
    }), J = J.replace("#", "%23"), O + $2 + _2 + J + q;
  };
  function R2(g2, O) {
    return m2(g2, false, true).resolve(O);
  }
  e8.prototype.resolve = function(g2) {
    return this.resolveObject(m2(g2, false, true)).format();
  };
  function T2(g2, O) {
    return g2 ? m2(g2, false, true).resolveObject(O) : O;
  }
  return e8.prototype.resolveObject = function(g2) {
    if (typeof g2 == "string") {
      var O = new e8();
      O.parse(g2, false, true), g2 = O;
    }
    for (var _2 = new e8(), q = Object.keys(this), $2 = 0; $2 < q.length; $2++) {
      var j2 = q[$2];
      _2[j2] = this[j2];
    }
    if (_2.hash = g2.hash, g2.href === "") return _2.href = _2.format(), _2;
    if (g2.slashes && !g2.protocol) {
      for (var J = Object.keys(g2), W = 0; W < J.length; W++) {
        var H2 = J[W];
        H2 !== "protocol" && (_2[H2] = g2[H2]);
      }
      return E2[_2.protocol] && _2.hostname && !_2.pathname && (_2.pathname = "/", _2.path = _2.pathname), _2.href = _2.format(), _2;
    }
    if (g2.protocol && g2.protocol !== _2.protocol) {
      if (!E2[g2.protocol]) {
        for (var G = Object.keys(g2), K = 0; K < G.length; K++) {
          var X = G[K];
          _2[X] = g2[X];
        }
        return _2.href = _2.format(), _2;
      }
      if (_2.protocol = g2.protocol, !g2.host && !P2[g2.protocol]) {
        for (var ne = (g2.pathname || "").split("/"); ne.length && !(g2.host = ne.shift()); ) ;
        g2.host || (g2.host = ""), g2.hostname || (g2.hostname = ""), ne[0] !== "" && ne.unshift(""), ne.length < 2 && ne.unshift(""), _2.pathname = ne.join("/");
      } else _2.pathname = g2.pathname;
      if (_2.search = g2.search, _2.query = g2.query, _2.host = g2.host || "", _2.auth = g2.auth, _2.hostname = g2.hostname || g2.host, _2.port = g2.port, _2.pathname || _2.search) {
        var Q = _2.pathname || "", V2 = _2.search || "";
        _2.path = Q + V2;
      }
      return _2.slashes = _2.slashes || g2.slashes, _2.href = _2.format(), _2;
    }
    var te = _2.pathname && _2.pathname.charAt(0) === "/", Y = g2.host || g2.pathname && g2.pathname.charAt(0) === "/", ee = Y || te || _2.host && g2.pathname, pe = ee, Z = _2.pathname && _2.pathname.split("/") || [], ne = g2.pathname && g2.pathname.split("/") || [], fe = _2.protocol && !E2[_2.protocol];
    if (fe && (_2.hostname = "", _2.port = null, _2.host && (Z[0] === "" ? Z[0] = _2.host : Z.unshift(_2.host)), _2.host = "", g2.protocol && (g2.hostname = null, g2.port = null, g2.host && (ne[0] === "" ? ne[0] = g2.host : ne.unshift(g2.host)), g2.host = null), ee = ee && (ne[0] === "" || Z[0] === "")), Y) _2.host = g2.host || g2.host === "" ? g2.host : _2.host, _2.hostname = g2.hostname || g2.hostname === "" ? g2.hostname : _2.hostname, _2.search = g2.search, _2.query = g2.query, Z = ne;
    else if (ne.length) Z || (Z = []), Z.pop(), Z = Z.concat(ne), _2.search = g2.search, _2.query = g2.query;
    else if (g2.search != null) {
      if (fe) {
        _2.host = Z.shift(), _2.hostname = _2.host;
        var ge = _2.host && _2.host.indexOf("@") > 0 ? _2.host.split("@") : false;
        ge && (_2.auth = ge.shift(), _2.hostname = ge.shift(), _2.host = _2.hostname);
      }
      return _2.search = g2.search, _2.query = g2.query, (_2.pathname !== null || _2.search !== null) && (_2.path = (_2.pathname ? _2.pathname : "") + (_2.search ? _2.search : "")), _2.href = _2.format(), _2;
    }
    if (!Z.length) return _2.pathname = null, _2.search ? _2.path = "/" + _2.search : _2.path = null, _2.href = _2.format(), _2;
    for (var ye = Z.slice(-1)[0], Ae = (_2.host || g2.host || Z.length > 1) && (ye === "." || ye === "..") || ye === "", _e = 0, ve = Z.length; ve >= 0; ve--) ye = Z[ve], ye === "." ? Z.splice(ve, 1) : ye === ".." ? (Z.splice(ve, 1), _e++) : _e && (Z.splice(ve, 1), _e--);
    if (!ee && !pe) for (; _e--; _e) Z.unshift("..");
    ee && Z[0] !== "" && (!Z[0] || Z[0].charAt(0) !== "/") && Z.unshift(""), Ae && Z.join("/").substr(-1) !== "/" && Z.push("");
    var Oe = Z[0] === "" || Z[0] && Z[0].charAt(0) === "/";
    if (fe) {
      _2.hostname = Oe ? "" : Z.length ? Z.shift() : "", _2.host = _2.hostname;
      var ge = _2.host && _2.host.indexOf("@") > 0 ? _2.host.split("@") : false;
      ge && (_2.auth = ge.shift(), _2.hostname = ge.shift(), _2.host = _2.hostname);
    }
    return ee = ee || _2.host && Z.length, ee && !Oe && Z.unshift(""), Z.length > 0 ? _2.pathname = Z.join("/") : (_2.pathname = null, _2.path = null), (_2.pathname !== null || _2.search !== null) && (_2.path = (_2.pathname ? _2.pathname : "") + (_2.search ? _2.search : "")), _2.auth = g2.auth || _2.auth, _2.slashes = _2.slashes || g2.slashes, _2.href = _2.format(), _2;
  }, e8.prototype.parseHost = function() {
    var g2 = this.host, O = n6.exec(g2);
    O && (O = O[0], O !== ":" && (this.port = O.substr(1)), g2 = g2.substr(0, g2.length - O.length)), g2 && (this.hostname = g2);
  }, Hr.parse = m2, Hr.resolve = R2, Hr.resolveObject = T2, Hr.format = v2, Hr.Url = e8, Hr;
}
function Sb(t5) {
  if (typeof t5 == "string") t5 = new URL(t5);
  else if (!(t5 instanceof URL)) throw new Deno.errors.InvalidData("invalid argument path , must be a string or URL");
  if (t5.protocol !== "file:") throw new Deno.errors.InvalidData("invalid url scheme");
  return kl ? Jx(t5) : Xx(t5);
}
function Jx(t5) {
  let e8 = t5.hostname, r6 = t5.pathname;
  for (let n6 = 0; n6 < r6.length; n6++) if (r6[n6] === "%") {
    let i6 = r6.codePointAt(n6 + 2) || 32;
    if (r6[n6 + 1] === "2" && i6 === 102 || r6[n6 + 1] === "5" && i6 === 99) throw new Deno.errors.InvalidData("must not include encoded \\ or / characters");
  }
  if (r6 = r6.replace(Vx, "\\"), r6 = decodeURIComponent(r6), e8 !== "") return `\\\\${e8}${r6}`;
  {
    let n6 = r6.codePointAt(1) | 32, i6 = r6[2];
    if (n6 < $x || n6 > Hx || i6 !== ":") throw new Deno.errors.InvalidData("file url path must be absolute");
    return r6.slice(1);
  }
}
function Xx(t5) {
  if (t5.hostname !== "") throw new Deno.errors.InvalidData("invalid file url hostname");
  let e8 = t5.pathname;
  for (let r6 = 0; r6 < e8.length; r6++) if (e8[r6] === "%") {
    let n6 = e8.codePointAt(r6 + 2) || 32;
    if (e8[r6 + 1] === "2" && n6 === 102) throw new Deno.errors.InvalidData("must not include encoded / characters");
  }
  return decodeURIComponent(e8);
}
function Eb(t5) {
  let e8 = Sl.resolve(t5), r6 = t5.charCodeAt(t5.length - 1);
  (r6 === Wx || kl && r6 === Fx) && e8[e8.length - 1] !== Sl.sep && (e8 += "/");
  let n6 = new URL("file://");
  return e8.includes("%") && (e8 = e8.replace(Gx, "%25")), !kl && e8.includes("\\") && (e8 = e8.replace(zx, "%5C")), e8.includes(`
`) && (e8 = e8.replace(Kx, "%0A")), e8.includes("\r") && (e8 = e8.replace(Qx, "%0D")), e8.includes("	") && (e8 = e8.replace(Yx, "%09")), n6.pathname = e8, n6;
}
function Je() {
  throw new Error("Node.js net module is not supported by JSPM core outside of Node.js");
}
var as, Yb, Jb, Xb, ze, D, Kr, Zb, me, A2, M2, Mt, Qr, wr, Pi, ac, uc, lc, cc, fc, hc, dc, pc, yc, gc, bc, wc, mc, _c, vc, Sc, Ec, Ic, xc, Tc, kc, Cc, Ri, Bc, Mc, Nc, qc, Lc, Uc, jc, Fc, Wc, Hc, Vc, Gc, zc, Kc, Qc, Yc, Jc, Xc, Zc, ef, tf, rf, nf, of, sf, Jt, us, ls, uf, lf, cf, ff, hf, df, pf, yf, gf, bf, wf, _f, vf, I2, On, Sf, ki, Ef, mr, Af, xf, qe, Xt, U, nw, iw, ke, x2, Ee, hs, De, Yr, Zt, Ni, Bf, Rn, gw, bw, ww, mw, _w, vw, er, $e, Xr, tr, mt, Ut, Ar, $i, kn, Lh, Cn, Hh, zh, Us, Nn, ro, Wd, St, oa, aa, so, wa, gp, Sa, Ea, or, Tp, Rp, kp, Bp, Pa, qp, Up, At, Fp, Vp, Gp, Ba, ny, iy, sy, uy, cy, La, hy, dy, Mr, zn, gy, vy, It, Sy, Ey, Ay, xo, xt, Za, Iy, xy, Ty, Py, ou, au, Cy, My, fu, yu, Ly, Dy, jy, Wy, wu, Hy, Vy, Gy, zy, Au, Ky, Qy, Xn, Jy, Xy, Zy, eg, tg, rg, ig, og, sg, Pu, lg, Ou, Ru, ku, Mu, Nu, fg, hg, dg, yg, bg, mg, vg, Eg, yi, Og, Du, zo, Ng, Vu, qg, hr, w5, m5, _5, v5, S5, E5, Lg, Gu, Ug, zu, Dg, Ku, jg, Qu, Fg, Yu, Wg, Ju, $g, Xu, Hg, Zu, Vg, el, Gg, tl, zg, rl, Kg, nl, Qg, il, Yg, ol, Jg, sl, Xg, al, Zg, ul, eb, ll, tb, cl, rb, wi, nb, fl, ib, ub, zt, En, $r, Ko, pI, yI, gI, bI, wI, mI, _I, vI, SI, EI, AI, II, xI, TI, PI, OI, kI, CI, BI, LI, UI, wl, DI, jI, FI, WI, $I, HI, GI, zI, KI, YI, JI, XI, ZI, ex, tx, rx, nx, ix, ox, sx, ax, ux, lx, cx, fx, dr, pl, yl, dx, px, yx, gx, bx, mx, _x, vx, Sx, Ex, Ax, ml, _l, vl, fb, Sl, hb, Ab, Tx, El, db, Al, Il, pb, xl, yb, Tl, gb, Pl, bb, Ol, wb, Rl, mb, Hr, _b, Ge, Mx, Nx, qx, Lx, Ux, Dx, jx, Fx, Wx, $x, Hx, kl, Vx, Gx, zx, Kx, Qx, Yx, Ib, Tb, Qo, _i, ql, lT, Ll, Ul, jl, Mb, yT, Nb, Wl, Vl, Kl, Wb, Ql, XT, mqtt_esm_default;
var init_mqtt_esm = __esm({
  "../node_modules/mqtt/dist/mqtt.esm.js"() {
    "use strict";
    as = Object.defineProperty;
    Yb = Object.getOwnPropertyDescriptor;
    Jb = Object.getOwnPropertyNames;
    Xb = Object.prototype.hasOwnProperty;
    ze = (t5, e8) => () => (t5 && (e8 = t5(t5 = 0)), e8);
    D = (t5, e8) => () => (e8 || t5((e8 = { exports: {} }).exports, e8), e8.exports);
    Kr = (t5, e8) => {
      for (var r6 in e8) as(t5, r6, { get: e8[r6], enumerable: true });
    };
    Zb = (t5, e8, r6, n6) => {
      if (e8 && typeof e8 == "object" || typeof e8 == "function") for (let i6 of Jb(e8)) !Xb.call(t5, i6) && i6 !== r6 && as(t5, i6, { get: () => e8[i6], enumerable: !(n6 = Yb(e8, i6)) || n6.enumerable });
      return t5;
    };
    me = (t5) => Zb(as({}, "__esModule", { value: true }), t5);
    A2 = ze(() => {
    });
    M2 = {};
    Kr(M2, { _debugEnd: () => Gc, _debugProcess: () => Vc, _events: () => lf, _eventsCount: () => cf, _exiting: () => xc, _fatalExceptions: () => Fc, _getActiveHandles: () => Rc, _getActiveRequests: () => Oc, _kill: () => Cc, _linkedBinding: () => Ac, _maxListeners: () => uf, _preload_modules: () => of, _rawDebug: () => Sc, _startProfilerIdleNotifier: () => zc, _stopProfilerIdleNotifier: () => Kc, _tickCallback: () => Hc, abort: () => Xc, addListener: () => ff, allowedNodeEnvironmentFlags: () => Uc, arch: () => uc, argv: () => fc, argv0: () => nf, assert: () => Dc, binding: () => gc, browser: () => vc, chdir: () => mc, config: () => Tc, cpuUsage: () => Ri, cwd: () => wc, debugPort: () => rf, default: () => _f, dlopen: () => Pc, domain: () => Ic, emit: () => gf, emitWarning: () => yc, env: () => cc, execArgv: () => hc, execPath: () => tf, exit: () => qc, features: () => jc, hasUncaughtExceptionCaptureCallback: () => $c, hrtime: () => Oi, kill: () => Nc, listeners: () => mf, memoryUsage: () => Mc, moduleLoadList: () => Ec, nextTick: () => oc, off: () => df, on: () => Nt, once: () => hf, openStdin: () => Lc, pid: () => Zc, platform: () => lc, ppid: () => ef, prependListener: () => bf, prependOnceListener: () => wf, reallyExit: () => kc, release: () => _c, removeAllListeners: () => yf, removeListener: () => pf, resourceUsage: () => Bc, setSourceMapsEnabled: () => sf, setUncaughtExceptionCaptureCallback: () => Wc, stderr: () => Yc, stdin: () => Jc, stdout: () => Qc, title: () => ac, umask: () => bc, uptime: () => af, version: () => dc, versions: () => pc });
    vf = ze(() => {
      A2();
      x2();
      I2();
      Mt = [], Qr = false, Pi = -1;
      sc.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      ac = "browser", uc = "x64", lc = "browser", cc = { PATH: "/usr/bin", LANG: typeof navigator < "u" ? navigator.language + ".UTF-8" : void 0, PWD: "/", HOME: "/home", TMP: "/tmp" }, fc = ["/usr/bin/node"], hc = [], dc = "v16.8.0", pc = {}, yc = function(t5, e8) {
        console.warn((e8 ? e8 + ": " : "") + t5);
      }, gc = function(t5) {
        cs("binding");
      }, bc = function(t5) {
        return 0;
      }, wc = function() {
        return "/";
      }, mc = function(t5) {
      }, _c = { name: "node", sourceUrl: "", headersUrl: "", libUrl: "" };
      vc = true, Sc = Ue, Ec = [];
      Ic = {}, xc = false, Tc = {};
      kc = Ue, Cc = Ue, Ri = function() {
        return {};
      }, Bc = Ri, Mc = Ri, Nc = Ue, qc = Ue, Lc = Ue, Uc = {};
      jc = { inspector: false, debug: false, uv: false, ipv6: false, tls_alpn: false, tls_sni: false, tls_ocsp: false, tls: false, cached_builtins: true }, Fc = Ue, Wc = Ue;
      Hc = Ue, Vc = Ue, Gc = Ue, zc = Ue, Kc = Ue, Qc = void 0, Yc = void 0, Jc = void 0, Xc = Ue, Zc = 2, ef = 1, tf = "/bin/usr/node", rf = 9229, nf = "node", of = [], sf = Ue, Jt = { now: typeof performance < "u" ? performance.now.bind(performance) : void 0, timing: typeof performance < "u" ? performance.timing : void 0 };
      Jt.now === void 0 && (us = Date.now(), Jt.timing && Jt.timing.navigationStart && (us = Jt.timing.navigationStart), Jt.now = () => Date.now() - us);
      ls = 1e9;
      Oi.bigint = function(t5) {
        var e8 = Oi(t5);
        return typeof BigInt > "u" ? e8[0] * ls + e8[1] : BigInt(e8[0] * ls) + BigInt(e8[1]);
      };
      uf = 10, lf = {}, cf = 0;
      ff = Nt, hf = Nt, df = Nt, pf = Nt, yf = Nt, gf = Ue, bf = Nt, wf = Nt;
      _f = { version: dc, versions: pc, arch: uc, platform: lc, browser: vc, release: _c, _rawDebug: Sc, moduleLoadList: Ec, binding: gc, _linkedBinding: Ac, _events: lf, _eventsCount: cf, _maxListeners: uf, on: Nt, addListener: ff, once: hf, off: df, removeListener: pf, removeAllListeners: yf, emit: gf, prependListener: bf, prependOnceListener: wf, listeners: mf, domain: Ic, _exiting: xc, config: Tc, dlopen: Pc, uptime: af, _getActiveRequests: Oc, _getActiveHandles: Rc, reallyExit: kc, _kill: Cc, cpuUsage: Ri, resourceUsage: Bc, memoryUsage: Mc, kill: Nc, exit: qc, openStdin: Lc, allowedNodeEnvironmentFlags: Uc, assert: Dc, features: jc, _fatalExceptions: Fc, setUncaughtExceptionCaptureCallback: Wc, hasUncaughtExceptionCaptureCallback: $c, emitWarning: yc, nextTick: oc, _tickCallback: Hc, _debugProcess: Vc, _debugEnd: Gc, _startProfilerIdleNotifier: zc, _stopProfilerIdleNotifier: Kc, stdout: Qc, stdin: Jc, stderr: Yc, abort: Xc, umask: bc, chdir: mc, cwd: wc, env: cc, title: ac, argv: fc, execArgv: hc, pid: Zc, ppid: ef, execPath: tf, debugPort: rf, hrtime: Oi, argv0: nf, _preload_modules: of, setSourceMapsEnabled: sf };
    });
    I2 = ze(() => {
      vf();
    });
    xf = ze(() => {
      A2();
      x2();
      I2();
      On = {}, Sf = false;
      ki = {}, Ef = false;
      mr = {}, Af = false;
    });
    qe = {};
    Kr(qe, { Buffer: () => U, INSPECT_MAX_BYTES: () => nw, default: () => Xt, kMaxLength: () => iw });
    ke = ze(() => {
      A2();
      x2();
      I2();
      xf();
      Xt = If();
      Xt.Buffer;
      Xt.SlowBuffer;
      Xt.INSPECT_MAX_BYTES;
      Xt.kMaxLength;
      U = Xt.Buffer, nw = Xt.INSPECT_MAX_BYTES, iw = Xt.kMaxLength;
    });
    x2 = ze(() => {
      ke();
    });
    Ee = D((MP, Tf) => {
      "use strict";
      A2();
      x2();
      I2();
      var fs = class extends Error {
        constructor(e8) {
          if (!Array.isArray(e8)) throw new TypeError(`Expected input to be an Array, got ${typeof e8}`);
          let r6 = "";
          for (let n6 = 0; n6 < e8.length; n6++) r6 += `    ${e8[n6].stack}
`;
          super(r6), this.name = "AggregateError", this.errors = e8;
        }
      };
      Tf.exports = { AggregateError: fs, ArrayIsArray(t5) {
        return Array.isArray(t5);
      }, ArrayPrototypeIncludes(t5, e8) {
        return t5.includes(e8);
      }, ArrayPrototypeIndexOf(t5, e8) {
        return t5.indexOf(e8);
      }, ArrayPrototypeJoin(t5, e8) {
        return t5.join(e8);
      }, ArrayPrototypeMap(t5, e8) {
        return t5.map(e8);
      }, ArrayPrototypePop(t5, e8) {
        return t5.pop(e8);
      }, ArrayPrototypePush(t5, e8) {
        return t5.push(e8);
      }, ArrayPrototypeSlice(t5, e8, r6) {
        return t5.slice(e8, r6);
      }, Error, FunctionPrototypeCall(t5, e8, ...r6) {
        return t5.call(e8, ...r6);
      }, FunctionPrototypeSymbolHasInstance(t5, e8) {
        return Function.prototype[Symbol.hasInstance].call(t5, e8);
      }, MathFloor: Math.floor, Number, NumberIsInteger: Number.isInteger, NumberIsNaN: Number.isNaN, NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER, NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER, NumberParseInt: Number.parseInt, ObjectDefineProperties(t5, e8) {
        return Object.defineProperties(t5, e8);
      }, ObjectDefineProperty(t5, e8, r6) {
        return Object.defineProperty(t5, e8, r6);
      }, ObjectGetOwnPropertyDescriptor(t5, e8) {
        return Object.getOwnPropertyDescriptor(t5, e8);
      }, ObjectKeys(t5) {
        return Object.keys(t5);
      }, ObjectSetPrototypeOf(t5, e8) {
        return Object.setPrototypeOf(t5, e8);
      }, Promise, PromisePrototypeCatch(t5, e8) {
        return t5.catch(e8);
      }, PromisePrototypeThen(t5, e8, r6) {
        return t5.then(e8, r6);
      }, PromiseReject(t5) {
        return Promise.reject(t5);
      }, PromiseResolve(t5) {
        return Promise.resolve(t5);
      }, ReflectApply: Reflect.apply, RegExpPrototypeTest(t5, e8) {
        return t5.test(e8);
      }, SafeSet: Set, String, StringPrototypeSlice(t5, e8, r6) {
        return t5.slice(e8, r6);
      }, StringPrototypeToLowerCase(t5) {
        return t5.toLowerCase();
      }, StringPrototypeToUpperCase(t5) {
        return t5.toUpperCase();
      }, StringPrototypeTrim(t5) {
        return t5.trim();
      }, Symbol, SymbolFor: Symbol.for, SymbolAsyncIterator: Symbol.asyncIterator, SymbolHasInstance: Symbol.hasInstance, SymbolIterator: Symbol.iterator, SymbolDispose: Symbol.dispose || Symbol("Symbol.dispose"), SymbolAsyncDispose: Symbol.asyncDispose || Symbol("Symbol.asyncDispose"), TypedArrayPrototypeSet(t5, e8, r6) {
        return t5.set(e8, r6);
      }, Boolean, Uint8Array };
    });
    hs = D((HP, Pf) => {
      "use strict";
      A2();
      x2();
      I2();
      Pf.exports = { format(t5, ...e8) {
        return t5.replace(/%([sdifj])/g, function(...[r6, n6]) {
          let i6 = e8.shift();
          return n6 === "f" ? i6.toFixed(6) : n6 === "j" ? JSON.stringify(i6) : n6 === "s" && typeof i6 == "object" ? `${i6.constructor !== Object ? i6.constructor.name : ""} {}`.trim() : i6.toString();
        });
      }, inspect(t5) {
        switch (typeof t5) {
          case "string":
            if (t5.includes("'")) if (t5.includes('"')) {
              if (!t5.includes("`") && !t5.includes("${")) return `\`${t5}\``;
            } else return `"${t5}"`;
            return `'${t5}'`;
          case "number":
            return isNaN(t5) ? "NaN" : Object.is(t5, -0) ? String(t5) : t5;
          case "bigint":
            return `${String(t5)}n`;
          case "boolean":
          case "undefined":
            return String(t5);
          case "object":
            return "{}";
        }
      } };
    });
    De = D((eO, kf) => {
      "use strict";
      A2();
      x2();
      I2();
      var { format: ow, inspect: Ci } = hs(), { AggregateError: sw } = Ee(), aw = globalThis.AggregateError || sw, uw = Symbol("kIsNodeError"), lw = ["string", "function", "number", "object", "Function", "Object", "boolean", "bigint", "symbol"], cw = /^([A-Z][a-z0-9]*)+$/, fw = "__node_internal_", Bi = {};
      function _r(t5, e8) {
        if (!t5) throw new Bi.ERR_INTERNAL_ASSERTION(e8);
      }
      function Of(t5) {
        let e8 = "", r6 = t5.length, n6 = t5[0] === "-" ? 1 : 0;
        for (; r6 >= n6 + 4; r6 -= 3) e8 = `_${t5.slice(r6 - 3, r6)}${e8}`;
        return `${t5.slice(0, r6)}${e8}`;
      }
      function hw(t5, e8, r6) {
        if (typeof e8 == "function") return _r(e8.length <= r6.length, `Code: ${t5}; The provided arguments length (${r6.length}) does not match the required ones (${e8.length}).`), e8(...r6);
        let n6 = (e8.match(/%[dfijoOs]/g) || []).length;
        return _r(n6 === r6.length, `Code: ${t5}; The provided arguments length (${r6.length}) does not match the required ones (${n6}).`), r6.length === 0 ? e8 : ow(e8, ...r6);
      }
      function Le(t5, e8, r6) {
        r6 || (r6 = Error);
        class n6 extends r6 {
          constructor(...s7) {
            super(hw(t5, e8, s7));
          }
          toString() {
            return `${this.name} [${t5}]: ${this.message}`;
          }
        }
        Object.defineProperties(n6.prototype, { name: { value: r6.name, writable: true, enumerable: false, configurable: true }, toString: { value() {
          return `${this.name} [${t5}]: ${this.message}`;
        }, writable: true, enumerable: false, configurable: true } }), n6.prototype.code = t5, n6.prototype[uw] = true, Bi[t5] = n6;
      }
      function Rf(t5) {
        let e8 = fw + t5.name;
        return Object.defineProperty(t5, "name", { value: e8 }), t5;
      }
      function dw(t5, e8) {
        if (t5 && e8 && t5 !== e8) {
          if (Array.isArray(e8.errors)) return e8.errors.push(t5), e8;
          let r6 = new aw([e8, t5], e8.message);
          return r6.code = e8.code, r6;
        }
        return t5 || e8;
      }
      var ds = class extends Error {
        constructor(e8 = "The operation was aborted", r6 = void 0) {
          if (r6 !== void 0 && typeof r6 != "object") throw new Bi.ERR_INVALID_ARG_TYPE("options", "Object", r6);
          super(e8, r6), this.code = "ABORT_ERR", this.name = "AbortError";
        }
      };
      Le("ERR_ASSERTION", "%s", Error);
      Le("ERR_INVALID_ARG_TYPE", (t5, e8, r6) => {
        _r(typeof t5 == "string", "'name' must be a string"), Array.isArray(e8) || (e8 = [e8]);
        let n6 = "The ";
        t5.endsWith(" argument") ? n6 += `${t5} ` : n6 += `"${t5}" ${t5.includes(".") ? "property" : "argument"} `, n6 += "must be ";
        let i6 = [], s7 = [], o6 = [];
        for (let c5 of e8) _r(typeof c5 == "string", "All expected entries have to be of type string"), lw.includes(c5) ? i6.push(c5.toLowerCase()) : cw.test(c5) ? s7.push(c5) : (_r(c5 !== "object", 'The value "object" should be written as "Object"'), o6.push(c5));
        if (s7.length > 0) {
          let c5 = i6.indexOf("object");
          c5 !== -1 && (i6.splice(i6, c5, 1), s7.push("Object"));
        }
        if (i6.length > 0) {
          switch (i6.length) {
            case 1:
              n6 += `of type ${i6[0]}`;
              break;
            case 2:
              n6 += `one of type ${i6[0]} or ${i6[1]}`;
              break;
            default: {
              let c5 = i6.pop();
              n6 += `one of type ${i6.join(", ")}, or ${c5}`;
            }
          }
          (s7.length > 0 || o6.length > 0) && (n6 += " or ");
        }
        if (s7.length > 0) {
          switch (s7.length) {
            case 1:
              n6 += `an instance of ${s7[0]}`;
              break;
            case 2:
              n6 += `an instance of ${s7[0]} or ${s7[1]}`;
              break;
            default: {
              let c5 = s7.pop();
              n6 += `an instance of ${s7.join(", ")}, or ${c5}`;
            }
          }
          o6.length > 0 && (n6 += " or ");
        }
        switch (o6.length) {
          case 0:
            break;
          case 1:
            o6[0].toLowerCase() !== o6[0] && (n6 += "an "), n6 += `${o6[0]}`;
            break;
          case 2:
            n6 += `one of ${o6[0]} or ${o6[1]}`;
            break;
          default: {
            let c5 = o6.pop();
            n6 += `one of ${o6.join(", ")}, or ${c5}`;
          }
        }
        if (r6 == null) n6 += `. Received ${r6}`;
        else if (typeof r6 == "function" && r6.name) n6 += `. Received function ${r6.name}`;
        else if (typeof r6 == "object") {
          var a3;
          if ((a3 = r6.constructor) !== null && a3 !== void 0 && a3.name) n6 += `. Received an instance of ${r6.constructor.name}`;
          else {
            let c5 = Ci(r6, { depth: -1 });
            n6 += `. Received ${c5}`;
          }
        } else {
          let c5 = Ci(r6, { colors: false });
          c5.length > 25 && (c5 = `${c5.slice(0, 25)}...`), n6 += `. Received type ${typeof r6} (${c5})`;
        }
        return n6;
      }, TypeError);
      Le("ERR_INVALID_ARG_VALUE", (t5, e8, r6 = "is invalid") => {
        let n6 = Ci(e8);
        return n6.length > 128 && (n6 = n6.slice(0, 128) + "..."), `The ${t5.includes(".") ? "property" : "argument"} '${t5}' ${r6}. Received ${n6}`;
      }, TypeError);
      Le("ERR_INVALID_RETURN_VALUE", (t5, e8, r6) => {
        var n6;
        let i6 = r6 != null && (n6 = r6.constructor) !== null && n6 !== void 0 && n6.name ? `instance of ${r6.constructor.name}` : `type ${typeof r6}`;
        return `Expected ${t5} to be returned from the "${e8}" function but got ${i6}.`;
      }, TypeError);
      Le("ERR_MISSING_ARGS", (...t5) => {
        _r(t5.length > 0, "At least one arg needs to be specified");
        let e8, r6 = t5.length;
        switch (t5 = (Array.isArray(t5) ? t5 : [t5]).map((n6) => `"${n6}"`).join(" or "), r6) {
          case 1:
            e8 += `The ${t5[0]} argument`;
            break;
          case 2:
            e8 += `The ${t5[0]} and ${t5[1]} arguments`;
            break;
          default:
            {
              let n6 = t5.pop();
              e8 += `The ${t5.join(", ")}, and ${n6} arguments`;
            }
            break;
        }
        return `${e8} must be specified`;
      }, TypeError);
      Le("ERR_OUT_OF_RANGE", (t5, e8, r6) => {
        _r(e8, 'Missing "range" argument');
        let n6;
        if (Number.isInteger(r6) && Math.abs(r6) > 2 ** 32) n6 = Of(String(r6));
        else if (typeof r6 == "bigint") {
          n6 = String(r6);
          let i6 = BigInt(2) ** BigInt(32);
          (r6 > i6 || r6 < -i6) && (n6 = Of(n6)), n6 += "n";
        } else n6 = Ci(r6);
        return `The value of "${t5}" is out of range. It must be ${e8}. Received ${n6}`;
      }, RangeError);
      Le("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error);
      Le("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error);
      Le("ERR_STREAM_ALREADY_FINISHED", "Cannot call %s after a stream was finished", Error);
      Le("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error);
      Le("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error);
      Le("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
      Le("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error);
      Le("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error);
      Le("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event", Error);
      Le("ERR_STREAM_WRITE_AFTER_END", "write after end", Error);
      Le("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError);
      kf.exports = { AbortError: ds, aggregateTwoErrors: Rf(dw), hideStackFrames: Rf, codes: Bi };
    });
    Yr = D((cO, Mi) => {
      "use strict";
      A2();
      x2();
      I2();
      var { AbortController: Cf, AbortSignal: pw } = typeof self < "u" ? self : typeof window < "u" ? window : void 0;
      Mi.exports = Cf;
      Mi.exports.AbortSignal = pw;
      Mi.exports.default = Cf;
    });
    Zt = {};
    Kr(Zt, { EventEmitter: () => gw, default: () => Rn, defaultMaxListeners: () => bw, init: () => ww, listenerCount: () => mw, on: () => _w, once: () => vw });
    er = ze(() => {
      A2();
      x2();
      I2();
      Ni = {}, Bf = false;
      Rn = yw();
      Rn.once;
      Rn.once = function(t5, e8) {
        return new Promise((r6, n6) => {
          function i6(...o6) {
            s7 !== void 0 && t5.removeListener("error", s7), r6(o6);
          }
          let s7;
          e8 !== "error" && (s7 = (o6) => {
            t5.removeListener(name, i6), n6(o6);
          }, t5.once("error", s7)), t5.once(e8, i6);
        });
      };
      Rn.on = function(t5, e8) {
        let r6 = [], n6 = [], i6 = null, s7 = false, o6 = { async next() {
          let f3 = r6.shift();
          if (f3) return createIterResult(f3, false);
          if (i6) {
            let h3 = Promise.reject(i6);
            return i6 = null, h3;
          }
          return s7 ? createIterResult(void 0, true) : new Promise((h3, d3) => n6.push({ resolve: h3, reject: d3 }));
        }, async return() {
          t5.removeListener(e8, a3), t5.removeListener("error", c5), s7 = true;
          for (let f3 of n6) f3.resolve(createIterResult(void 0, true));
          return createIterResult(void 0, true);
        }, throw(f3) {
          i6 = f3, t5.removeListener(e8, a3), t5.removeListener("error", c5);
        }, [Symbol.asyncIterator]() {
          return this;
        } };
        return t5.on(e8, a3), t5.on("error", c5), o6;
        function a3(...f3) {
          let h3 = n6.shift();
          h3 ? h3.resolve(createIterResult(f3, false)) : r6.push(f3);
        }
        function c5(f3) {
          s7 = true;
          let h3 = n6.shift();
          h3 ? h3.reject(f3) : i6 = f3, o6.return();
        }
      };
      ({ EventEmitter: gw, defaultMaxListeners: bw, init: ww, listenerCount: mw, on: _w, once: vw } = Rn);
    });
    $e = D((OO, ys) => {
      "use strict";
      A2();
      x2();
      I2();
      var Sw = (ke(), me(qe)), { format: Ew, inspect: Aw } = hs(), { codes: { ERR_INVALID_ARG_TYPE: ps } } = De(), { kResistStopPropagation: Iw, AggregateError: xw, SymbolDispose: Tw } = Ee(), Pw = globalThis.AbortSignal || Yr().AbortSignal, Ow = globalThis.AbortController || Yr().AbortController, Rw = Object.getPrototypeOf(async function() {
      }).constructor, Mf = globalThis.Blob || Sw.Blob, kw = typeof Mf < "u" ? function(e8) {
        return e8 instanceof Mf;
      } : function(e8) {
        return false;
      }, Nf = (t5, e8) => {
        if (t5 !== void 0 && (t5 === null || typeof t5 != "object" || !("aborted" in t5))) throw new ps(e8, "AbortSignal", t5);
      }, Cw = (t5, e8) => {
        if (typeof t5 != "function") throw new ps(e8, "Function", t5);
      };
      ys.exports = { AggregateError: xw, kEmptyObject: Object.freeze({}), once(t5) {
        let e8 = false;
        return function(...r6) {
          e8 || (e8 = true, t5.apply(this, r6));
        };
      }, createDeferredPromise: function() {
        let t5, e8;
        return { promise: new Promise((n6, i6) => {
          t5 = n6, e8 = i6;
        }), resolve: t5, reject: e8 };
      }, promisify(t5) {
        return new Promise((e8, r6) => {
          t5((n6, ...i6) => n6 ? r6(n6) : e8(...i6));
        });
      }, debuglog() {
        return function() {
        };
      }, format: Ew, inspect: Aw, types: { isAsyncFunction(t5) {
        return t5 instanceof Rw;
      }, isArrayBufferView(t5) {
        return ArrayBuffer.isView(t5);
      } }, isBlob: kw, deprecate(t5, e8) {
        return t5;
      }, addAbortListener: (er(), me(Zt)).addAbortListener || function(e8, r6) {
        if (e8 === void 0) throw new ps("signal", "AbortSignal", e8);
        Nf(e8, "signal"), Cw(r6, "listener");
        let n6;
        return e8.aborted ? queueMicrotask(() => r6()) : (e8.addEventListener("abort", r6, { __proto__: null, once: true, [Iw]: true }), n6 = () => {
          e8.removeEventListener("abort", r6);
        }), { __proto__: null, [Tw]() {
          var i6;
          (i6 = n6) === null || i6 === void 0 || i6();
        } };
      }, AbortSignalAny: Pw.any || function(e8) {
        if (e8.length === 1) return e8[0];
        let r6 = new Ow(), n6 = () => r6.abort();
        return e8.forEach((i6) => {
          Nf(i6, "signals"), i6.addEventListener("abort", n6, { once: true });
        }), r6.signal.addEventListener("abort", () => {
          e8.forEach((i6) => i6.removeEventListener("abort", n6));
        }, { once: true }), r6.signal;
      } };
      ys.exports.promisify.custom = Symbol.for("nodejs.util.promisify.custom");
    });
    Xr = D((DO, Vf) => {
      "use strict";
      A2();
      x2();
      I2();
      var { ArrayIsArray: bs, ArrayPrototypeIncludes: Df, ArrayPrototypeJoin: jf, ArrayPrototypeMap: Bw, NumberIsInteger: ws, NumberIsNaN: Mw, NumberMAX_SAFE_INTEGER: Nw, NumberMIN_SAFE_INTEGER: qw, NumberParseInt: Lw, ObjectPrototypeHasOwnProperty: Uw, RegExpPrototypeExec: Ff, String: Dw, StringPrototypeToUpperCase: jw, StringPrototypeTrim: Fw } = Ee(), { hideStackFrames: et, codes: { ERR_SOCKET_BAD_PORT: Ww, ERR_INVALID_ARG_TYPE: je, ERR_INVALID_ARG_VALUE: Jr, ERR_OUT_OF_RANGE: vr, ERR_UNKNOWN_SIGNAL: qf } } = De(), { normalizeEncoding: $w } = $e(), { isAsyncFunction: Hw, isArrayBufferView: Vw } = $e().types, Lf = {};
      function Gw(t5) {
        return t5 === (t5 | 0);
      }
      function zw(t5) {
        return t5 === t5 >>> 0;
      }
      var Kw = /^[0-7]+$/, Qw = "must be a 32-bit unsigned integer or an octal string";
      function Yw(t5, e8, r6) {
        if (typeof t5 > "u" && (t5 = r6), typeof t5 == "string") {
          if (Ff(Kw, t5) === null) throw new Jr(e8, t5, Qw);
          t5 = Lw(t5, 8);
        }
        return Wf(t5, e8), t5;
      }
      var Jw = et((t5, e8, r6 = qw, n6 = Nw) => {
        if (typeof t5 != "number") throw new je(e8, "number", t5);
        if (!ws(t5)) throw new vr(e8, "an integer", t5);
        if (t5 < r6 || t5 > n6) throw new vr(e8, `>= ${r6} && <= ${n6}`, t5);
      }), Xw = et((t5, e8, r6 = -2147483648, n6 = 2147483647) => {
        if (typeof t5 != "number") throw new je(e8, "number", t5);
        if (!ws(t5)) throw new vr(e8, "an integer", t5);
        if (t5 < r6 || t5 > n6) throw new vr(e8, `>= ${r6} && <= ${n6}`, t5);
      }), Wf = et((t5, e8, r6 = false) => {
        if (typeof t5 != "number") throw new je(e8, "number", t5);
        if (!ws(t5)) throw new vr(e8, "an integer", t5);
        let n6 = r6 ? 1 : 0, i6 = 4294967295;
        if (t5 < n6 || t5 > i6) throw new vr(e8, `>= ${n6} && <= ${i6}`, t5);
      });
      function ms(t5, e8) {
        if (typeof t5 != "string") throw new je(e8, "string", t5);
      }
      function Zw(t5, e8, r6 = void 0, n6) {
        if (typeof t5 != "number") throw new je(e8, "number", t5);
        if (r6 != null && t5 < r6 || n6 != null && t5 > n6 || (r6 != null || n6 != null) && Mw(t5)) throw new vr(e8, `${r6 != null ? `>= ${r6}` : ""}${r6 != null && n6 != null ? " && " : ""}${n6 != null ? `<= ${n6}` : ""}`, t5);
      }
      var em = et((t5, e8, r6) => {
        if (!Df(r6, t5)) {
          let i6 = "must be one of: " + jf(Bw(r6, (s7) => typeof s7 == "string" ? `'${s7}'` : Dw(s7)), ", ");
          throw new Jr(e8, t5, i6);
        }
      });
      function $f(t5, e8) {
        if (typeof t5 != "boolean") throw new je(e8, "boolean", t5);
      }
      function gs(t5, e8, r6) {
        return t5 == null || !Uw(t5, e8) ? r6 : t5[e8];
      }
      var tm = et((t5, e8, r6 = null) => {
        let n6 = gs(r6, "allowArray", false), i6 = gs(r6, "allowFunction", false);
        if (!gs(r6, "nullable", false) && t5 === null || !n6 && bs(t5) || typeof t5 != "object" && (!i6 || typeof t5 != "function")) throw new je(e8, "Object", t5);
      }), rm = et((t5, e8) => {
        if (t5 != null && typeof t5 != "object" && typeof t5 != "function") throw new je(e8, "a dictionary", t5);
      }), qi = et((t5, e8, r6 = 0) => {
        if (!bs(t5)) throw new je(e8, "Array", t5);
        if (t5.length < r6) {
          let n6 = `must be longer than ${r6}`;
          throw new Jr(e8, t5, n6);
        }
      });
      function nm(t5, e8) {
        qi(t5, e8);
        for (let r6 = 0; r6 < t5.length; r6++) ms(t5[r6], `${e8}[${r6}]`);
      }
      function im(t5, e8) {
        qi(t5, e8);
        for (let r6 = 0; r6 < t5.length; r6++) $f(t5[r6], `${e8}[${r6}]`);
      }
      function om(t5, e8) {
        qi(t5, e8);
        for (let r6 = 0; r6 < t5.length; r6++) {
          let n6 = t5[r6], i6 = `${e8}[${r6}]`;
          if (n6 == null) throw new je(i6, "AbortSignal", n6);
          Hf(n6, i6);
        }
      }
      function sm(t5, e8 = "signal") {
        if (ms(t5, e8), Lf[t5] === void 0) throw Lf[jw(t5)] !== void 0 ? new qf(t5 + " (signals must use all capital letters)") : new qf(t5);
      }
      var am = et((t5, e8 = "buffer") => {
        if (!Vw(t5)) throw new je(e8, ["Buffer", "TypedArray", "DataView"], t5);
      });
      function um(t5, e8) {
        let r6 = $w(e8), n6 = t5.length;
        if (r6 === "hex" && n6 % 2 !== 0) throw new Jr("encoding", e8, `is invalid for data of length ${n6}`);
      }
      function lm(t5, e8 = "Port", r6 = true) {
        if (typeof t5 != "number" && typeof t5 != "string" || typeof t5 == "string" && Fw(t5).length === 0 || +t5 !== +t5 >>> 0 || t5 > 65535 || t5 === 0 && !r6) throw new Ww(e8, t5, r6);
        return t5 | 0;
      }
      var Hf = et((t5, e8) => {
        if (t5 !== void 0 && (t5 === null || typeof t5 != "object" || !("aborted" in t5))) throw new je(e8, "AbortSignal", t5);
      }), cm = et((t5, e8) => {
        if (typeof t5 != "function") throw new je(e8, "Function", t5);
      }), fm = et((t5, e8) => {
        if (typeof t5 != "function" || Hw(t5)) throw new je(e8, "Function", t5);
      }), hm = et((t5, e8) => {
        if (t5 !== void 0) throw new je(e8, "undefined", t5);
      });
      function dm(t5, e8, r6) {
        if (!Df(r6, t5)) throw new je(e8, `('${jf(r6, "|")}')`, t5);
      }
      var pm = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
      function Uf(t5, e8) {
        if (typeof t5 > "u" || !Ff(pm, t5)) throw new Jr(e8, t5, 'must be an array or string of format "</styles.css>; rel=preload; as=style"');
      }
      function ym(t5) {
        if (typeof t5 == "string") return Uf(t5, "hints"), t5;
        if (bs(t5)) {
          let e8 = t5.length, r6 = "";
          if (e8 === 0) return r6;
          for (let n6 = 0; n6 < e8; n6++) {
            let i6 = t5[n6];
            Uf(i6, "hints"), r6 += i6, n6 !== e8 - 1 && (r6 += ", ");
          }
          return r6;
        }
        throw new Jr("hints", t5, 'must be an array or string of format "</styles.css>; rel=preload; as=style"');
      }
      Vf.exports = { isInt32: Gw, isUint32: zw, parseFileMode: Yw, validateArray: qi, validateStringArray: nm, validateBooleanArray: im, validateAbortSignalArray: om, validateBoolean: $f, validateBuffer: am, validateDictionary: rm, validateEncoding: um, validateFunction: cm, validateInt32: Xw, validateInteger: Jw, validateNumber: Zw, validateObject: tm, validateOneOf: em, validatePlainFunction: fm, validatePort: lm, validateSignalName: sm, validateString: ms, validateUint32: Wf, validateUndefined: hm, validateUnion: dm, validateAbortSignal: Hf, validateLinkHeaderValue: ym };
    });
    tr = D((QO, Qf) => {
      A2();
      x2();
      I2();
      var Te = Qf.exports = {}, gt, bt;
      function _s() {
        throw new Error("setTimeout has not been defined");
      }
      function vs() {
        throw new Error("clearTimeout has not been defined");
      }
      (function() {
        try {
          typeof setTimeout == "function" ? gt = setTimeout : gt = _s;
        } catch {
          gt = _s;
        }
        try {
          typeof clearTimeout == "function" ? bt = clearTimeout : bt = vs;
        } catch {
          bt = vs;
        }
      })();
      function Gf(t5) {
        if (gt === setTimeout) return setTimeout(t5, 0);
        if ((gt === _s || !gt) && setTimeout) return gt = setTimeout, setTimeout(t5, 0);
        try {
          return gt(t5, 0);
        } catch {
          try {
            return gt.call(null, t5, 0);
          } catch {
            return gt.call(this, t5, 0);
          }
        }
      }
      function gm(t5) {
        if (bt === clearTimeout) return clearTimeout(t5);
        if ((bt === vs || !bt) && clearTimeout) return bt = clearTimeout, clearTimeout(t5);
        try {
          return bt(t5);
        } catch {
          try {
            return bt.call(null, t5);
          } catch {
            return bt.call(this, t5);
          }
        }
      }
      var qt = [], Zr = false, Sr, Li = -1;
      function bm() {
        !Zr || !Sr || (Zr = false, Sr.length ? qt = Sr.concat(qt) : Li = -1, qt.length && zf());
      }
      function zf() {
        if (!Zr) {
          var t5 = Gf(bm);
          Zr = true;
          for (var e8 = qt.length; e8; ) {
            for (Sr = qt, qt = []; ++Li < e8; ) Sr && Sr[Li].run();
            Li = -1, e8 = qt.length;
          }
          Sr = null, Zr = false, gm(t5);
        }
      }
      Te.nextTick = function(t5) {
        var e8 = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var r6 = 1; r6 < arguments.length; r6++) e8[r6 - 1] = arguments[r6];
        qt.push(new Kf(t5, e8)), qt.length === 1 && !Zr && Gf(zf);
      };
      function Kf(t5, e8) {
        this.fun = t5, this.array = e8;
      }
      Kf.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      Te.title = "browser";
      Te.browser = true;
      Te.env = {};
      Te.argv = [];
      Te.version = "";
      Te.versions = {};
      function Lt() {
      }
      Te.on = Lt;
      Te.addListener = Lt;
      Te.once = Lt;
      Te.off = Lt;
      Te.removeListener = Lt;
      Te.removeAllListeners = Lt;
      Te.emit = Lt;
      Te.prependListener = Lt;
      Te.prependOnceListener = Lt;
      Te.listeners = function(t5) {
        return [];
      };
      Te.binding = function(t5) {
        throw new Error("process.binding is not supported");
      };
      Te.cwd = function() {
        return "/";
      };
      Te.chdir = function(t5) {
        throw new Error("process.chdir is not supported");
      };
      Te.umask = function() {
        return 0;
      };
    });
    mt = D((oR, ch) => {
      "use strict";
      A2();
      x2();
      I2();
      var { SymbolAsyncIterator: Yf, SymbolIterator: Jf, SymbolFor: Er } = Ee(), Xf = Er("nodejs.stream.destroyed"), Zf = Er("nodejs.stream.errored"), Ss = Er("nodejs.stream.readable"), Es = Er("nodejs.stream.writable"), eh = Er("nodejs.stream.disturbed"), wm = Er("nodejs.webstream.isClosedPromise"), mm = Er("nodejs.webstream.controllerErrorFunction");
      function Ui(t5, e8 = false) {
        var r6;
        return !!(t5 && typeof t5.pipe == "function" && typeof t5.on == "function" && (!e8 || typeof t5.pause == "function" && typeof t5.resume == "function") && (!t5._writableState || ((r6 = t5._readableState) === null || r6 === void 0 ? void 0 : r6.readable) !== false) && (!t5._writableState || t5._readableState));
      }
      function Di(t5) {
        var e8;
        return !!(t5 && typeof t5.write == "function" && typeof t5.on == "function" && (!t5._readableState || ((e8 = t5._writableState) === null || e8 === void 0 ? void 0 : e8.writable) !== false));
      }
      function _m(t5) {
        return !!(t5 && typeof t5.pipe == "function" && t5._readableState && typeof t5.on == "function" && typeof t5.write == "function");
      }
      function wt(t5) {
        return t5 && (t5._readableState || t5._writableState || typeof t5.write == "function" && typeof t5.on == "function" || typeof t5.pipe == "function" && typeof t5.on == "function");
      }
      function th(t5) {
        return !!(t5 && !wt(t5) && typeof t5.pipeThrough == "function" && typeof t5.getReader == "function" && typeof t5.cancel == "function");
      }
      function rh(t5) {
        return !!(t5 && !wt(t5) && typeof t5.getWriter == "function" && typeof t5.abort == "function");
      }
      function nh(t5) {
        return !!(t5 && !wt(t5) && typeof t5.readable == "object" && typeof t5.writable == "object");
      }
      function vm(t5) {
        return th(t5) || rh(t5) || nh(t5);
      }
      function Sm(t5, e8) {
        return t5 == null ? false : e8 === true ? typeof t5[Yf] == "function" : e8 === false ? typeof t5[Jf] == "function" : typeof t5[Yf] == "function" || typeof t5[Jf] == "function";
      }
      function ji(t5) {
        if (!wt(t5)) return null;
        let e8 = t5._writableState, r6 = t5._readableState, n6 = e8 || r6;
        return !!(t5.destroyed || t5[Xf] || n6 != null && n6.destroyed);
      }
      function ih(t5) {
        if (!Di(t5)) return null;
        if (t5.writableEnded === true) return true;
        let e8 = t5._writableState;
        return e8 != null && e8.errored ? false : typeof e8?.ended != "boolean" ? null : e8.ended;
      }
      function Em(t5, e8) {
        if (!Di(t5)) return null;
        if (t5.writableFinished === true) return true;
        let r6 = t5._writableState;
        return r6 != null && r6.errored ? false : typeof r6?.finished != "boolean" ? null : !!(r6.finished || e8 === false && r6.ended === true && r6.length === 0);
      }
      function Am(t5) {
        if (!Ui(t5)) return null;
        if (t5.readableEnded === true) return true;
        let e8 = t5._readableState;
        return !e8 || e8.errored ? false : typeof e8?.ended != "boolean" ? null : e8.ended;
      }
      function oh(t5, e8) {
        if (!Ui(t5)) return null;
        let r6 = t5._readableState;
        return r6 != null && r6.errored ? false : typeof r6?.endEmitted != "boolean" ? null : !!(r6.endEmitted || e8 === false && r6.ended === true && r6.length === 0);
      }
      function sh(t5) {
        return t5 && t5[Ss] != null ? t5[Ss] : typeof t5?.readable != "boolean" ? null : ji(t5) ? false : Ui(t5) && t5.readable && !oh(t5);
      }
      function ah(t5) {
        return t5 && t5[Es] != null ? t5[Es] : typeof t5?.writable != "boolean" ? null : ji(t5) ? false : Di(t5) && t5.writable && !ih(t5);
      }
      function Im(t5, e8) {
        return wt(t5) ? ji(t5) ? true : !(e8?.readable !== false && sh(t5) || e8?.writable !== false && ah(t5)) : null;
      }
      function xm(t5) {
        var e8, r6;
        return wt(t5) ? t5.writableErrored ? t5.writableErrored : (e8 = (r6 = t5._writableState) === null || r6 === void 0 ? void 0 : r6.errored) !== null && e8 !== void 0 ? e8 : null : null;
      }
      function Tm(t5) {
        var e8, r6;
        return wt(t5) ? t5.readableErrored ? t5.readableErrored : (e8 = (r6 = t5._readableState) === null || r6 === void 0 ? void 0 : r6.errored) !== null && e8 !== void 0 ? e8 : null : null;
      }
      function Pm(t5) {
        if (!wt(t5)) return null;
        if (typeof t5.closed == "boolean") return t5.closed;
        let e8 = t5._writableState, r6 = t5._readableState;
        return typeof e8?.closed == "boolean" || typeof r6?.closed == "boolean" ? e8?.closed || r6?.closed : typeof t5._closed == "boolean" && uh(t5) ? t5._closed : null;
      }
      function uh(t5) {
        return typeof t5._closed == "boolean" && typeof t5._defaultKeepAlive == "boolean" && typeof t5._removedConnection == "boolean" && typeof t5._removedContLen == "boolean";
      }
      function lh(t5) {
        return typeof t5._sent100 == "boolean" && uh(t5);
      }
      function Om(t5) {
        var e8;
        return typeof t5._consuming == "boolean" && typeof t5._dumped == "boolean" && ((e8 = t5.req) === null || e8 === void 0 ? void 0 : e8.upgradeOrConnect) === void 0;
      }
      function Rm(t5) {
        if (!wt(t5)) return null;
        let e8 = t5._writableState, r6 = t5._readableState, n6 = e8 || r6;
        return !n6 && lh(t5) || !!(n6 && n6.autoDestroy && n6.emitClose && n6.closed === false);
      }
      function km(t5) {
        var e8;
        return !!(t5 && ((e8 = t5[eh]) !== null && e8 !== void 0 ? e8 : t5.readableDidRead || t5.readableAborted));
      }
      function Cm(t5) {
        var e8, r6, n6, i6, s7, o6, a3, c5, f3, h3;
        return !!(t5 && ((e8 = (r6 = (n6 = (i6 = (s7 = (o6 = t5[Zf]) !== null && o6 !== void 0 ? o6 : t5.readableErrored) !== null && s7 !== void 0 ? s7 : t5.writableErrored) !== null && i6 !== void 0 ? i6 : (a3 = t5._readableState) === null || a3 === void 0 ? void 0 : a3.errorEmitted) !== null && n6 !== void 0 ? n6 : (c5 = t5._writableState) === null || c5 === void 0 ? void 0 : c5.errorEmitted) !== null && r6 !== void 0 ? r6 : (f3 = t5._readableState) === null || f3 === void 0 ? void 0 : f3.errored) !== null && e8 !== void 0 ? e8 : !((h3 = t5._writableState) === null || h3 === void 0) && h3.errored));
      }
      ch.exports = { isDestroyed: ji, kIsDestroyed: Xf, isDisturbed: km, kIsDisturbed: eh, isErrored: Cm, kIsErrored: Zf, isReadable: sh, kIsReadable: Ss, kIsClosedPromise: wm, kControllerErrorFunction: mm, kIsWritable: Es, isClosed: Pm, isDuplexNodeStream: _m, isFinished: Im, isIterable: Sm, isReadableNodeStream: Ui, isReadableStream: th, isReadableEnded: Am, isReadableFinished: oh, isReadableErrored: Tm, isNodeStream: wt, isWebStream: vm, isWritable: ah, isWritableNodeStream: Di, isWritableStream: rh, isWritableEnded: ih, isWritableFinished: Em, isWritableErrored: xm, isServerRequest: Om, isServerResponse: lh, willEmitClose: Rm, isTransformStream: nh };
    });
    Ut = D((yR, Ps) => {
      "use strict";
      A2();
      x2();
      I2();
      var rr = tr(), { AbortError: mh, codes: Bm } = De(), { ERR_INVALID_ARG_TYPE: Mm, ERR_STREAM_PREMATURE_CLOSE: fh } = Bm, { kEmptyObject: Is, once: xs } = $e(), { validateAbortSignal: Nm, validateFunction: qm, validateObject: Lm, validateBoolean: Um } = Xr(), { Promise: Dm, PromisePrototypeThen: jm, SymbolDispose: _h } = Ee(), { isClosed: Fm, isReadable: hh, isReadableNodeStream: As, isReadableStream: Wm, isReadableFinished: dh, isReadableErrored: ph, isWritable: yh, isWritableNodeStream: gh, isWritableStream: $m, isWritableFinished: bh, isWritableErrored: wh, isNodeStream: Hm, willEmitClose: Vm, kIsClosedPromise: Gm } = mt(), en;
      function zm(t5) {
        return t5.setHeader && typeof t5.abort == "function";
      }
      var Ts = () => {
      };
      function vh(t5, e8, r6) {
        var n6, i6;
        if (arguments.length === 2 ? (r6 = e8, e8 = Is) : e8 == null ? e8 = Is : Lm(e8, "options"), qm(r6, "callback"), Nm(e8.signal, "options.signal"), r6 = xs(r6), Wm(t5) || $m(t5)) return Km(t5, e8, r6);
        if (!Hm(t5)) throw new Mm("stream", ["ReadableStream", "WritableStream", "Stream"], t5);
        let s7 = (n6 = e8.readable) !== null && n6 !== void 0 ? n6 : As(t5), o6 = (i6 = e8.writable) !== null && i6 !== void 0 ? i6 : gh(t5), a3 = t5._writableState, c5 = t5._readableState, f3 = () => {
          t5.writable || w2();
        }, h3 = Vm(t5) && As(t5) === s7 && gh(t5) === o6, d3 = bh(t5, false), w2 = () => {
          d3 = true, t5.destroyed && (h3 = false), !(h3 && (!t5.readable || s7)) && (!s7 || y3) && r6.call(t5);
        }, y3 = dh(t5, false), P2 = () => {
          y3 = true, t5.destroyed && (h3 = false), !(h3 && (!t5.writable || o6)) && (!o6 || d3) && r6.call(t5);
        }, E2 = (g2) => {
          r6.call(t5, g2);
        }, b3 = Fm(t5), m2 = () => {
          b3 = true;
          let g2 = wh(t5) || ph(t5);
          if (g2 && typeof g2 != "boolean") return r6.call(t5, g2);
          if (s7 && !y3 && As(t5, true) && !dh(t5, false)) return r6.call(t5, new fh());
          if (o6 && !d3 && !bh(t5, false)) return r6.call(t5, new fh());
          r6.call(t5);
        }, v2 = () => {
          b3 = true;
          let g2 = wh(t5) || ph(t5);
          if (g2 && typeof g2 != "boolean") return r6.call(t5, g2);
          r6.call(t5);
        }, R2 = () => {
          t5.req.on("finish", w2);
        };
        zm(t5) ? (t5.on("complete", w2), h3 || t5.on("abort", m2), t5.req ? R2() : t5.on("request", R2)) : o6 && !a3 && (t5.on("end", f3), t5.on("close", f3)), !h3 && typeof t5.aborted == "boolean" && t5.on("aborted", m2), t5.on("end", P2), t5.on("finish", w2), e8.error !== false && t5.on("error", E2), t5.on("close", m2), b3 ? rr.nextTick(m2) : a3 != null && a3.errorEmitted || c5 != null && c5.errorEmitted ? h3 || rr.nextTick(v2) : (!s7 && (!h3 || hh(t5)) && (d3 || yh(t5) === false) || !o6 && (!h3 || yh(t5)) && (y3 || hh(t5) === false) || c5 && t5.req && t5.aborted) && rr.nextTick(v2);
        let T2 = () => {
          r6 = Ts, t5.removeListener("aborted", m2), t5.removeListener("complete", w2), t5.removeListener("abort", m2), t5.removeListener("request", R2), t5.req && t5.req.removeListener("finish", w2), t5.removeListener("end", f3), t5.removeListener("close", f3), t5.removeListener("finish", w2), t5.removeListener("end", P2), t5.removeListener("error", E2), t5.removeListener("close", m2);
        };
        if (e8.signal && !b3) {
          let g2 = () => {
            let O = r6;
            T2(), O.call(t5, new mh(void 0, { cause: e8.signal.reason }));
          };
          if (e8.signal.aborted) rr.nextTick(g2);
          else {
            en = en || $e().addAbortListener;
            let O = en(e8.signal, g2), _2 = r6;
            r6 = xs((...q) => {
              O[_h](), _2.apply(t5, q);
            });
          }
        }
        return T2;
      }
      function Km(t5, e8, r6) {
        let n6 = false, i6 = Ts;
        if (e8.signal) if (i6 = () => {
          n6 = true, r6.call(t5, new mh(void 0, { cause: e8.signal.reason }));
        }, e8.signal.aborted) rr.nextTick(i6);
        else {
          en = en || $e().addAbortListener;
          let o6 = en(e8.signal, i6), a3 = r6;
          r6 = xs((...c5) => {
            o6[_h](), a3.apply(t5, c5);
          });
        }
        let s7 = (...o6) => {
          n6 || rr.nextTick(() => r6.apply(t5, o6));
        };
        return jm(t5[Gm].promise, s7, s7), Ts;
      }
      function Qm(t5, e8) {
        var r6;
        let n6 = false;
        return e8 === null && (e8 = Is), (r6 = e8) !== null && r6 !== void 0 && r6.cleanup && (Um(e8.cleanup, "cleanup"), n6 = e8.cleanup), new Dm((i6, s7) => {
          let o6 = vh(t5, e8, (a3) => {
            n6 && o6(), a3 ? s7(a3) : i6();
          });
        });
      }
      Ps.exports = vh;
      Ps.exports.finished = Qm;
    });
    Ar = D((IR, Oh) => {
      "use strict";
      A2();
      x2();
      I2();
      var _t = tr(), { aggregateTwoErrors: Ym, codes: { ERR_MULTIPLE_CALLBACK: Jm }, AbortError: Xm } = De(), { Symbol: Ah } = Ee(), { kIsDestroyed: Zm, isDestroyed: e_, isFinished: t_, isServerRequest: r_ } = mt(), Ih = Ah("kDestroy"), Os = Ah("kConstruct");
      function xh(t5, e8, r6) {
        t5 && (t5.stack, e8 && !e8.errored && (e8.errored = t5), r6 && !r6.errored && (r6.errored = t5));
      }
      function n_(t5, e8) {
        let r6 = this._readableState, n6 = this._writableState, i6 = n6 || r6;
        return n6 != null && n6.destroyed || r6 != null && r6.destroyed ? (typeof e8 == "function" && e8(), this) : (xh(t5, n6, r6), n6 && (n6.destroyed = true), r6 && (r6.destroyed = true), i6.constructed ? Sh(this, t5, e8) : this.once(Ih, function(s7) {
          Sh(this, Ym(s7, t5), e8);
        }), this);
      }
      function Sh(t5, e8, r6) {
        let n6 = false;
        function i6(s7) {
          if (n6) return;
          n6 = true;
          let o6 = t5._readableState, a3 = t5._writableState;
          xh(s7, a3, o6), a3 && (a3.closed = true), o6 && (o6.closed = true), typeof r6 == "function" && r6(s7), s7 ? _t.nextTick(i_, t5, s7) : _t.nextTick(Th, t5);
        }
        try {
          t5._destroy(e8 || null, i6);
        } catch (s7) {
          i6(s7);
        }
      }
      function i_(t5, e8) {
        Rs(t5, e8), Th(t5);
      }
      function Th(t5) {
        let e8 = t5._readableState, r6 = t5._writableState;
        r6 && (r6.closeEmitted = true), e8 && (e8.closeEmitted = true), (r6 != null && r6.emitClose || e8 != null && e8.emitClose) && t5.emit("close");
      }
      function Rs(t5, e8) {
        let r6 = t5._readableState, n6 = t5._writableState;
        n6 != null && n6.errorEmitted || r6 != null && r6.errorEmitted || (n6 && (n6.errorEmitted = true), r6 && (r6.errorEmitted = true), t5.emit("error", e8));
      }
      function o_() {
        let t5 = this._readableState, e8 = this._writableState;
        t5 && (t5.constructed = true, t5.closed = false, t5.closeEmitted = false, t5.destroyed = false, t5.errored = null, t5.errorEmitted = false, t5.reading = false, t5.ended = t5.readable === false, t5.endEmitted = t5.readable === false), e8 && (e8.constructed = true, e8.destroyed = false, e8.closed = false, e8.closeEmitted = false, e8.errored = null, e8.errorEmitted = false, e8.finalCalled = false, e8.prefinished = false, e8.ended = e8.writable === false, e8.ending = e8.writable === false, e8.finished = e8.writable === false);
      }
      function ks(t5, e8, r6) {
        let n6 = t5._readableState, i6 = t5._writableState;
        if (i6 != null && i6.destroyed || n6 != null && n6.destroyed) return this;
        n6 != null && n6.autoDestroy || i6 != null && i6.autoDestroy ? t5.destroy(e8) : e8 && (e8.stack, i6 && !i6.errored && (i6.errored = e8), n6 && !n6.errored && (n6.errored = e8), r6 ? _t.nextTick(Rs, t5, e8) : Rs(t5, e8));
      }
      function s_(t5, e8) {
        if (typeof t5._construct != "function") return;
        let r6 = t5._readableState, n6 = t5._writableState;
        r6 && (r6.constructed = false), n6 && (n6.constructed = false), t5.once(Os, e8), !(t5.listenerCount(Os) > 1) && _t.nextTick(a_, t5);
      }
      function a_(t5) {
        let e8 = false;
        function r6(n6) {
          if (e8) {
            ks(t5, n6 ?? new Jm());
            return;
          }
          e8 = true;
          let i6 = t5._readableState, s7 = t5._writableState, o6 = s7 || i6;
          i6 && (i6.constructed = true), s7 && (s7.constructed = true), o6.destroyed ? t5.emit(Ih, n6) : n6 ? ks(t5, n6, true) : _t.nextTick(u_, t5);
        }
        try {
          t5._construct((n6) => {
            _t.nextTick(r6, n6);
          });
        } catch (n6) {
          _t.nextTick(r6, n6);
        }
      }
      function u_(t5) {
        t5.emit(Os);
      }
      function Eh(t5) {
        return t5?.setHeader && typeof t5.abort == "function";
      }
      function Ph(t5) {
        t5.emit("close");
      }
      function l_(t5, e8) {
        t5.emit("error", e8), _t.nextTick(Ph, t5);
      }
      function c_(t5, e8) {
        !t5 || e_(t5) || (!e8 && !t_(t5) && (e8 = new Xm()), r_(t5) ? (t5.socket = null, t5.destroy(e8)) : Eh(t5) ? t5.abort() : Eh(t5.req) ? t5.req.abort() : typeof t5.destroy == "function" ? t5.destroy(e8) : typeof t5.close == "function" ? t5.close() : e8 ? _t.nextTick(l_, t5, e8) : _t.nextTick(Ph, t5), t5.destroyed || (t5[Zm] = true));
      }
      Oh.exports = { construct: s_, destroyer: c_, destroy: n_, undestroy: o_, errorOrDestroy: ks };
    });
    $i = D((NR, kh) => {
      "use strict";
      A2();
      x2();
      I2();
      var { ArrayIsArray: f_, ObjectSetPrototypeOf: Rh } = Ee(), { EventEmitter: Fi } = (er(), me(Zt));
      function Wi(t5) {
        Fi.call(this, t5);
      }
      Rh(Wi.prototype, Fi.prototype);
      Rh(Wi, Fi);
      Wi.prototype.pipe = function(t5, e8) {
        let r6 = this;
        function n6(h3) {
          t5.writable && t5.write(h3) === false && r6.pause && r6.pause();
        }
        r6.on("data", n6);
        function i6() {
          r6.readable && r6.resume && r6.resume();
        }
        t5.on("drain", i6), !t5._isStdio && (!e8 || e8.end !== false) && (r6.on("end", o6), r6.on("close", a3));
        let s7 = false;
        function o6() {
          s7 || (s7 = true, t5.end());
        }
        function a3() {
          s7 || (s7 = true, typeof t5.destroy == "function" && t5.destroy());
        }
        function c5(h3) {
          f3(), Fi.listenerCount(this, "error") === 0 && this.emit("error", h3);
        }
        Cs(r6, "error", c5), Cs(t5, "error", c5);
        function f3() {
          r6.removeListener("data", n6), t5.removeListener("drain", i6), r6.removeListener("end", o6), r6.removeListener("close", a3), r6.removeListener("error", c5), t5.removeListener("error", c5), r6.removeListener("end", f3), r6.removeListener("close", f3), t5.removeListener("close", f3);
        }
        return r6.on("end", f3), r6.on("close", f3), t5.on("close", f3), t5.emit("pipe", r6), t5;
      };
      function Cs(t5, e8, r6) {
        if (typeof t5.prependListener == "function") return t5.prependListener(e8, r6);
        !t5._events || !t5._events[e8] ? t5.on(e8, r6) : f_(t5._events[e8]) ? t5._events[e8].unshift(r6) : t5._events[e8] = [r6, t5._events[e8]];
      }
      kh.exports = { Stream: Wi, prependListener: Cs };
    });
    kn = D((VR, Hi) => {
      "use strict";
      A2();
      x2();
      I2();
      var { SymbolDispose: h_ } = Ee(), { AbortError: Ch, codes: d_ } = De(), { isNodeStream: Bh, isWebStream: p_, kControllerErrorFunction: y_ } = mt(), g_ = Ut(), { ERR_INVALID_ARG_TYPE: Mh } = d_, Bs, b_ = (t5, e8) => {
        if (typeof t5 != "object" || !("aborted" in t5)) throw new Mh(e8, "AbortSignal", t5);
      };
      Hi.exports.addAbortSignal = function(e8, r6) {
        if (b_(e8, "signal"), !Bh(r6) && !p_(r6)) throw new Mh("stream", ["ReadableStream", "WritableStream", "Stream"], r6);
        return Hi.exports.addAbortSignalNoValidate(e8, r6);
      };
      Hi.exports.addAbortSignalNoValidate = function(t5, e8) {
        if (typeof t5 != "object" || !("aborted" in t5)) return e8;
        let r6 = Bh(e8) ? () => {
          e8.destroy(new Ch(void 0, { cause: t5.reason }));
        } : () => {
          e8[y_](new Ch(void 0, { cause: t5.reason }));
        };
        if (t5.aborted) r6();
        else {
          Bs = Bs || $e().addAbortListener;
          let n6 = Bs(t5, r6);
          g_(e8, n6[h_]);
        }
        return e8;
      };
    });
    Lh = D((rk, qh) => {
      "use strict";
      A2();
      x2();
      I2();
      var { StringPrototypeSlice: Nh, SymbolIterator: w_, TypedArrayPrototypeSet: Vi, Uint8Array: m_ } = Ee(), { Buffer: Ms } = (ke(), me(qe)), { inspect: __ } = $e();
      qh.exports = class {
        constructor() {
          this.head = null, this.tail = null, this.length = 0;
        }
        push(e8) {
          let r6 = { data: e8, next: null };
          this.length > 0 ? this.tail.next = r6 : this.head = r6, this.tail = r6, ++this.length;
        }
        unshift(e8) {
          let r6 = { data: e8, next: this.head };
          this.length === 0 && (this.tail = r6), this.head = r6, ++this.length;
        }
        shift() {
          if (this.length === 0) return;
          let e8 = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, e8;
        }
        clear() {
          this.head = this.tail = null, this.length = 0;
        }
        join(e8) {
          if (this.length === 0) return "";
          let r6 = this.head, n6 = "" + r6.data;
          for (; (r6 = r6.next) !== null; ) n6 += e8 + r6.data;
          return n6;
        }
        concat(e8) {
          if (this.length === 0) return Ms.alloc(0);
          let r6 = Ms.allocUnsafe(e8 >>> 0), n6 = this.head, i6 = 0;
          for (; n6; ) Vi(r6, n6.data, i6), i6 += n6.data.length, n6 = n6.next;
          return r6;
        }
        consume(e8, r6) {
          let n6 = this.head.data;
          if (e8 < n6.length) {
            let i6 = n6.slice(0, e8);
            return this.head.data = n6.slice(e8), i6;
          }
          return e8 === n6.length ? this.shift() : r6 ? this._getString(e8) : this._getBuffer(e8);
        }
        first() {
          return this.head.data;
        }
        *[w_]() {
          for (let e8 = this.head; e8; e8 = e8.next) yield e8.data;
        }
        _getString(e8) {
          let r6 = "", n6 = this.head, i6 = 0;
          do {
            let s7 = n6.data;
            if (e8 > s7.length) r6 += s7, e8 -= s7.length;
            else {
              e8 === s7.length ? (r6 += s7, ++i6, n6.next ? this.head = n6.next : this.head = this.tail = null) : (r6 += Nh(s7, 0, e8), this.head = n6, n6.data = Nh(s7, e8));
              break;
            }
            ++i6;
          } while ((n6 = n6.next) !== null);
          return this.length -= i6, r6;
        }
        _getBuffer(e8) {
          let r6 = Ms.allocUnsafe(e8), n6 = e8, i6 = this.head, s7 = 0;
          do {
            let o6 = i6.data;
            if (e8 > o6.length) Vi(r6, o6, n6 - e8), e8 -= o6.length;
            else {
              e8 === o6.length ? (Vi(r6, o6, n6 - e8), ++s7, i6.next ? this.head = i6.next : this.head = this.tail = null) : (Vi(r6, new m_(o6.buffer, o6.byteOffset, e8), n6 - e8), this.head = i6, i6.data = o6.slice(e8));
              break;
            }
            ++s7;
          } while ((i6 = i6.next) !== null);
          return this.length -= s7, r6;
        }
        [Symbol.for("nodejs.util.inspect.custom")](e8, r6) {
          return __(this, { ...r6, depth: 0, customInspect: false });
        }
      };
    });
    Cn = D((hk, Fh) => {
      "use strict";
      A2();
      x2();
      I2();
      var { MathFloor: v_, NumberIsInteger: S_ } = Ee(), { validateInteger: E_ } = Xr(), { ERR_INVALID_ARG_VALUE: A_ } = De().codes, Uh = 16 * 1024, Dh = 16;
      function I_(t5, e8, r6) {
        return t5.highWaterMark != null ? t5.highWaterMark : e8 ? t5[r6] : null;
      }
      function jh(t5) {
        return t5 ? Dh : Uh;
      }
      function x_(t5, e8) {
        E_(e8, "value", 0), t5 ? Dh = e8 : Uh = e8;
      }
      function T_(t5, e8, r6, n6) {
        let i6 = I_(e8, n6, r6);
        if (i6 != null) {
          if (!S_(i6) || i6 < 0) {
            let s7 = n6 ? `options.${r6}` : "options.highWaterMark";
            throw new A_(s7, i6);
          }
          return v_(i6);
        }
        return jh(t5.objectMode);
      }
      Fh.exports = { getHighWaterMark: T_, getDefaultHighWaterMark: jh, setDefaultHighWaterMark: x_ };
    });
    Hh = D((Ns, $h) => {
      A2();
      x2();
      I2();
      var Gi = (ke(), me(qe)), vt = Gi.Buffer;
      function Wh(t5, e8) {
        for (var r6 in t5) e8[r6] = t5[r6];
      }
      vt.from && vt.alloc && vt.allocUnsafe && vt.allocUnsafeSlow ? $h.exports = Gi : (Wh(Gi, Ns), Ns.Buffer = Ir);
      function Ir(t5, e8, r6) {
        return vt(t5, e8, r6);
      }
      Ir.prototype = Object.create(vt.prototype);
      Wh(vt, Ir);
      Ir.from = function(t5, e8, r6) {
        if (typeof t5 == "number") throw new TypeError("Argument must not be a number");
        return vt(t5, e8, r6);
      };
      Ir.alloc = function(t5, e8, r6) {
        if (typeof t5 != "number") throw new TypeError("Argument must be a number");
        var n6 = vt(t5);
        return e8 !== void 0 ? typeof r6 == "string" ? n6.fill(e8, r6) : n6.fill(e8) : n6.fill(0), n6;
      };
      Ir.allocUnsafe = function(t5) {
        if (typeof t5 != "number") throw new TypeError("Argument must be a number");
        return vt(t5);
      };
      Ir.allocUnsafeSlow = function(t5) {
        if (typeof t5 != "number") throw new TypeError("Argument must be a number");
        return Gi.SlowBuffer(t5);
      };
    });
    zh = D((Gh) => {
      "use strict";
      A2();
      x2();
      I2();
      var Ls = Hh().Buffer, Vh = Ls.isEncoding || function(t5) {
        switch (t5 = "" + t5, t5 && t5.toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return true;
          default:
            return false;
        }
      };
      function P_(t5) {
        if (!t5) return "utf8";
        for (var e8; ; ) switch (t5) {
          case "utf8":
          case "utf-8":
            return "utf8";
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return "utf16le";
          case "latin1":
          case "binary":
            return "latin1";
          case "base64":
          case "ascii":
          case "hex":
            return t5;
          default:
            if (e8) return;
            t5 = ("" + t5).toLowerCase(), e8 = true;
        }
      }
      function O_(t5) {
        var e8 = P_(t5);
        if (typeof e8 != "string" && (Ls.isEncoding === Vh || !Vh(t5))) throw new Error("Unknown encoding: " + t5);
        return e8 || t5;
      }
      Gh.StringDecoder = Bn;
      function Bn(t5) {
        this.encoding = O_(t5);
        var e8;
        switch (this.encoding) {
          case "utf16le":
            this.text = N_, this.end = q_, e8 = 4;
            break;
          case "utf8":
            this.fillLast = C_, e8 = 4;
            break;
          case "base64":
            this.text = L_, this.end = U_, e8 = 3;
            break;
          default:
            this.write = D_, this.end = j_;
            return;
        }
        this.lastNeed = 0, this.lastTotal = 0, this.lastChar = Ls.allocUnsafe(e8);
      }
      Bn.prototype.write = function(t5) {
        if (t5.length === 0) return "";
        var e8, r6;
        if (this.lastNeed) {
          if (e8 = this.fillLast(t5), e8 === void 0) return "";
          r6 = this.lastNeed, this.lastNeed = 0;
        } else r6 = 0;
        return r6 < t5.length ? e8 ? e8 + this.text(t5, r6) : this.text(t5, r6) : e8 || "";
      };
      Bn.prototype.end = M_;
      Bn.prototype.text = B_;
      Bn.prototype.fillLast = function(t5) {
        if (this.lastNeed <= t5.length) return t5.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
        t5.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t5.length), this.lastNeed -= t5.length;
      };
      function qs(t5) {
        return t5 <= 127 ? 0 : t5 >> 5 === 6 ? 2 : t5 >> 4 === 14 ? 3 : t5 >> 3 === 30 ? 4 : t5 >> 6 === 2 ? -1 : -2;
      }
      function R_(t5, e8, r6) {
        var n6 = e8.length - 1;
        if (n6 < r6) return 0;
        var i6 = qs(e8[n6]);
        return i6 >= 0 ? (i6 > 0 && (t5.lastNeed = i6 - 1), i6) : --n6 < r6 || i6 === -2 ? 0 : (i6 = qs(e8[n6]), i6 >= 0 ? (i6 > 0 && (t5.lastNeed = i6 - 2), i6) : --n6 < r6 || i6 === -2 ? 0 : (i6 = qs(e8[n6]), i6 >= 0 ? (i6 > 0 && (i6 === 2 ? i6 = 0 : t5.lastNeed = i6 - 3), i6) : 0));
      }
      function k_(t5, e8, r6) {
        if ((e8[0] & 192) !== 128) return t5.lastNeed = 0, "\uFFFD";
        if (t5.lastNeed > 1 && e8.length > 1) {
          if ((e8[1] & 192) !== 128) return t5.lastNeed = 1, "\uFFFD";
          if (t5.lastNeed > 2 && e8.length > 2 && (e8[2] & 192) !== 128) return t5.lastNeed = 2, "\uFFFD";
        }
      }
      function C_(t5) {
        var e8 = this.lastTotal - this.lastNeed, r6 = k_(this, t5, e8);
        if (r6 !== void 0) return r6;
        if (this.lastNeed <= t5.length) return t5.copy(this.lastChar, e8, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
        t5.copy(this.lastChar, e8, 0, t5.length), this.lastNeed -= t5.length;
      }
      function B_(t5, e8) {
        var r6 = R_(this, t5, e8);
        if (!this.lastNeed) return t5.toString("utf8", e8);
        this.lastTotal = r6;
        var n6 = t5.length - (r6 - this.lastNeed);
        return t5.copy(this.lastChar, 0, n6), t5.toString("utf8", e8, n6);
      }
      function M_(t5) {
        var e8 = t5 && t5.length ? this.write(t5) : "";
        return this.lastNeed ? e8 + "\uFFFD" : e8;
      }
      function N_(t5, e8) {
        if ((t5.length - e8) % 2 === 0) {
          var r6 = t5.toString("utf16le", e8);
          if (r6) {
            var n6 = r6.charCodeAt(r6.length - 1);
            if (n6 >= 55296 && n6 <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = t5[t5.length - 2], this.lastChar[1] = t5[t5.length - 1], r6.slice(0, -1);
          }
          return r6;
        }
        return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = t5[t5.length - 1], t5.toString("utf16le", e8, t5.length - 1);
      }
      function q_(t5) {
        var e8 = t5 && t5.length ? this.write(t5) : "";
        if (this.lastNeed) {
          var r6 = this.lastTotal - this.lastNeed;
          return e8 + this.lastChar.toString("utf16le", 0, r6);
        }
        return e8;
      }
      function L_(t5, e8) {
        var r6 = (t5.length - e8) % 3;
        return r6 === 0 ? t5.toString("base64", e8) : (this.lastNeed = 3 - r6, this.lastTotal = 3, r6 === 1 ? this.lastChar[0] = t5[t5.length - 1] : (this.lastChar[0] = t5[t5.length - 2], this.lastChar[1] = t5[t5.length - 1]), t5.toString("base64", e8, t5.length - r6));
      }
      function U_(t5) {
        var e8 = t5 && t5.length ? this.write(t5) : "";
        return this.lastNeed ? e8 + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : e8;
      }
      function D_(t5) {
        return t5.toString(this.encoding);
      }
      function j_(t5) {
        return t5 && t5.length ? this.write(t5) : "";
      }
    });
    Us = D((Fk, Jh) => {
      "use strict";
      A2();
      x2();
      I2();
      var Kh = tr(), { PromisePrototypeThen: F_, SymbolAsyncIterator: Qh, SymbolIterator: Yh } = Ee(), { Buffer: W_ } = (ke(), me(qe)), { ERR_INVALID_ARG_TYPE: $_, ERR_STREAM_NULL_VALUES: H_ } = De().codes;
      function V_(t5, e8, r6) {
        let n6;
        if (typeof e8 == "string" || e8 instanceof W_) return new t5({ objectMode: true, ...r6, read() {
          this.push(e8), this.push(null);
        } });
        let i6;
        if (e8 && e8[Qh]) i6 = true, n6 = e8[Qh]();
        else if (e8 && e8[Yh]) i6 = false, n6 = e8[Yh]();
        else throw new $_("iterable", ["Iterable"], e8);
        let s7 = new t5({ objectMode: true, highWaterMark: 1, ...r6 }), o6 = false;
        s7._read = function() {
          o6 || (o6 = true, c5());
        }, s7._destroy = function(f3, h3) {
          F_(a3(f3), () => Kh.nextTick(h3, f3), (d3) => Kh.nextTick(h3, d3 || f3));
        };
        async function a3(f3) {
          let h3 = f3 != null, d3 = typeof n6.throw == "function";
          if (h3 && d3) {
            let { value: w2, done: y3 } = await n6.throw(f3);
            if (await w2, y3) return;
          }
          if (typeof n6.return == "function") {
            let { value: w2 } = await n6.return();
            await w2;
          }
        }
        async function c5() {
          for (; ; ) {
            try {
              let { value: f3, done: h3 } = i6 ? await n6.next() : n6.next();
              if (h3) s7.push(null);
              else {
                let d3 = f3 && typeof f3.then == "function" ? await f3 : f3;
                if (d3 === null) throw o6 = false, new H_();
                if (s7.push(d3)) continue;
                o6 = false;
              }
            } catch (f3) {
              s7.destroy(f3);
            }
            break;
          }
        }
        return s7;
      }
      Jh.exports = V_;
    });
    Nn = D((Jk, yd) => {
      "use strict";
      A2();
      x2();
      I2();
      var lt = tr(), { ArrayPrototypeIndexOf: G_, NumberIsInteger: z_, NumberIsNaN: K_, NumberParseInt: Q_, ObjectDefineProperties: Gs, ObjectKeys: Y_, ObjectSetPrototypeOf: ed, Promise: td, SafeSet: J_, SymbolAsyncDispose: X_, SymbolAsyncIterator: Z_, Symbol: ev } = Ee();
      yd.exports = le;
      le.ReadableState = Yi;
      var { EventEmitter: tv } = (er(), me(Zt)), { Stream: nr, prependListener: rv } = $i(), { Buffer: Ds } = (ke(), me(qe)), { addAbortSignal: nv } = kn(), rd = Ut(), he = $e().debuglog("stream", (t5) => {
        he = t5;
      }), iv = Lh(), nn = Ar(), { getHighWaterMark: ov, getDefaultHighWaterMark: sv } = Cn(), { aggregateTwoErrors: Xh, codes: { ERR_INVALID_ARG_TYPE: av, ERR_METHOD_NOT_IMPLEMENTED: uv, ERR_OUT_OF_RANGE: lv, ERR_STREAM_PUSH_AFTER_EOF: cv, ERR_STREAM_UNSHIFT_AFTER_END_EVENT: fv }, AbortError: hv } = De(), { validateObject: dv } = Xr(), xr = ev("kPaused"), { StringDecoder: nd } = zh(), pv = Us();
      ed(le.prototype, nr.prototype);
      ed(le, nr);
      var js = () => {
      }, { errorOrDestroy: tn } = nn, rn = 1, yv = 2, id = 4, Mn = 8, od = 16, zi = 32, Ki = 64, sd = 128, gv = 256, bv = 512, wv = 1024, Hs = 2048, Vs = 4096, mv = 8192, _v = 16384, vv = 32768, ad = 65536, Sv = 1 << 17, Ev = 1 << 18;
      function Ce(t5) {
        return { enumerable: false, get() {
          return (this.state & t5) !== 0;
        }, set(e8) {
          e8 ? this.state |= t5 : this.state &= ~t5;
        } };
      }
      Gs(Yi.prototype, { objectMode: Ce(rn), ended: Ce(yv), endEmitted: Ce(id), reading: Ce(Mn), constructed: Ce(od), sync: Ce(zi), needReadable: Ce(Ki), emittedReadable: Ce(sd), readableListening: Ce(gv), resumeScheduled: Ce(bv), errorEmitted: Ce(wv), emitClose: Ce(Hs), autoDestroy: Ce(Vs), destroyed: Ce(mv), closed: Ce(_v), closeEmitted: Ce(vv), multiAwaitDrain: Ce(ad), readingMore: Ce(Sv), dataEmitted: Ce(Ev) });
      function Yi(t5, e8, r6) {
        typeof r6 != "boolean" && (r6 = e8 instanceof St()), this.state = Hs | Vs | od | zi, t5 && t5.objectMode && (this.state |= rn), r6 && t5 && t5.readableObjectMode && (this.state |= rn), this.highWaterMark = t5 ? ov(this, t5, "readableHighWaterMark", r6) : sv(false), this.buffer = new iv(), this.length = 0, this.pipes = [], this.flowing = null, this[xr] = null, t5 && t5.emitClose === false && (this.state &= ~Hs), t5 && t5.autoDestroy === false && (this.state &= ~Vs), this.errored = null, this.defaultEncoding = t5 && t5.defaultEncoding || "utf8", this.awaitDrainWriters = null, this.decoder = null, this.encoding = null, t5 && t5.encoding && (this.decoder = new nd(t5.encoding), this.encoding = t5.encoding);
      }
      function le(t5) {
        if (!(this instanceof le)) return new le(t5);
        let e8 = this instanceof St();
        this._readableState = new Yi(t5, this, e8), t5 && (typeof t5.read == "function" && (this._read = t5.read), typeof t5.destroy == "function" && (this._destroy = t5.destroy), typeof t5.construct == "function" && (this._construct = t5.construct), t5.signal && !e8 && nv(t5.signal, this)), nr.call(this, t5), nn.construct(this, () => {
          this._readableState.needReadable && Qi(this, this._readableState);
        });
      }
      le.prototype.destroy = nn.destroy;
      le.prototype._undestroy = nn.undestroy;
      le.prototype._destroy = function(t5, e8) {
        e8(t5);
      };
      le.prototype[tv.captureRejectionSymbol] = function(t5) {
        this.destroy(t5);
      };
      le.prototype[X_] = function() {
        let t5;
        return this.destroyed || (t5 = this.readableEnded ? null : new hv(), this.destroy(t5)), new td((e8, r6) => rd(this, (n6) => n6 && n6 !== t5 ? r6(n6) : e8(null)));
      };
      le.prototype.push = function(t5, e8) {
        return ud(this, t5, e8, false);
      };
      le.prototype.unshift = function(t5, e8) {
        return ud(this, t5, e8, true);
      };
      function ud(t5, e8, r6, n6) {
        he("readableAddChunk", e8);
        let i6 = t5._readableState, s7;
        if ((i6.state & rn) === 0 && (typeof e8 == "string" ? (r6 = r6 || i6.defaultEncoding, i6.encoding !== r6 && (n6 && i6.encoding ? e8 = Ds.from(e8, r6).toString(i6.encoding) : (e8 = Ds.from(e8, r6), r6 = ""))) : e8 instanceof Ds ? r6 = "" : nr._isUint8Array(e8) ? (e8 = nr._uint8ArrayToBuffer(e8), r6 = "") : e8 != null && (s7 = new av("chunk", ["string", "Buffer", "Uint8Array"], e8))), s7) tn(t5, s7);
        else if (e8 === null) i6.state &= ~Mn, xv(t5, i6);
        else if ((i6.state & rn) !== 0 || e8 && e8.length > 0) if (n6) if ((i6.state & id) !== 0) tn(t5, new fv());
        else {
          if (i6.destroyed || i6.errored) return false;
          Fs(t5, i6, e8, true);
        }
        else if (i6.ended) tn(t5, new cv());
        else {
          if (i6.destroyed || i6.errored) return false;
          i6.state &= ~Mn, i6.decoder && !r6 ? (e8 = i6.decoder.write(e8), i6.objectMode || e8.length !== 0 ? Fs(t5, i6, e8, false) : Qi(t5, i6)) : Fs(t5, i6, e8, false);
        }
        else n6 || (i6.state &= ~Mn, Qi(t5, i6));
        return !i6.ended && (i6.length < i6.highWaterMark || i6.length === 0);
      }
      function Fs(t5, e8, r6, n6) {
        e8.flowing && e8.length === 0 && !e8.sync && t5.listenerCount("data") > 0 ? ((e8.state & ad) !== 0 ? e8.awaitDrainWriters.clear() : e8.awaitDrainWriters = null, e8.dataEmitted = true, t5.emit("data", r6)) : (e8.length += e8.objectMode ? 1 : r6.length, n6 ? e8.buffer.unshift(r6) : e8.buffer.push(r6), (e8.state & Ki) !== 0 && Ji(t5)), Qi(t5, e8);
      }
      le.prototype.isPaused = function() {
        let t5 = this._readableState;
        return t5[xr] === true || t5.flowing === false;
      };
      le.prototype.setEncoding = function(t5) {
        let e8 = new nd(t5);
        this._readableState.decoder = e8, this._readableState.encoding = this._readableState.decoder.encoding;
        let r6 = this._readableState.buffer, n6 = "";
        for (let i6 of r6) n6 += e8.write(i6);
        return r6.clear(), n6 !== "" && r6.push(n6), this._readableState.length = n6.length, this;
      };
      var Av = 1073741824;
      function Iv(t5) {
        if (t5 > Av) throw new lv("size", "<= 1GiB", t5);
        return t5--, t5 |= t5 >>> 1, t5 |= t5 >>> 2, t5 |= t5 >>> 4, t5 |= t5 >>> 8, t5 |= t5 >>> 16, t5++, t5;
      }
      function Zh(t5, e8) {
        return t5 <= 0 || e8.length === 0 && e8.ended ? 0 : (e8.state & rn) !== 0 ? 1 : K_(t5) ? e8.flowing && e8.length ? e8.buffer.first().length : e8.length : t5 <= e8.length ? t5 : e8.ended ? e8.length : 0;
      }
      le.prototype.read = function(t5) {
        he("read", t5), t5 === void 0 ? t5 = NaN : z_(t5) || (t5 = Q_(t5, 10));
        let e8 = this._readableState, r6 = t5;
        if (t5 > e8.highWaterMark && (e8.highWaterMark = Iv(t5)), t5 !== 0 && (e8.state &= ~sd), t5 === 0 && e8.needReadable && ((e8.highWaterMark !== 0 ? e8.length >= e8.highWaterMark : e8.length > 0) || e8.ended)) return he("read: emitReadable", e8.length, e8.ended), e8.length === 0 && e8.ended ? Ws(this) : Ji(this), null;
        if (t5 = Zh(t5, e8), t5 === 0 && e8.ended) return e8.length === 0 && Ws(this), null;
        let n6 = (e8.state & Ki) !== 0;
        if (he("need readable", n6), (e8.length === 0 || e8.length - t5 < e8.highWaterMark) && (n6 = true, he("length less than watermark", n6)), e8.ended || e8.reading || e8.destroyed || e8.errored || !e8.constructed) n6 = false, he("reading, ended or constructing", n6);
        else if (n6) {
          he("do read"), e8.state |= Mn | zi, e8.length === 0 && (e8.state |= Ki);
          try {
            this._read(e8.highWaterMark);
          } catch (s7) {
            tn(this, s7);
          }
          e8.state &= ~zi, e8.reading || (t5 = Zh(r6, e8));
        }
        let i6;
        return t5 > 0 ? i6 = dd(t5, e8) : i6 = null, i6 === null ? (e8.needReadable = e8.length <= e8.highWaterMark, t5 = 0) : (e8.length -= t5, e8.multiAwaitDrain ? e8.awaitDrainWriters.clear() : e8.awaitDrainWriters = null), e8.length === 0 && (e8.ended || (e8.needReadable = true), r6 !== t5 && e8.ended && Ws(this)), i6 !== null && !e8.errorEmitted && !e8.closeEmitted && (e8.dataEmitted = true, this.emit("data", i6)), i6;
      };
      function xv(t5, e8) {
        if (he("onEofChunk"), !e8.ended) {
          if (e8.decoder) {
            let r6 = e8.decoder.end();
            r6 && r6.length && (e8.buffer.push(r6), e8.length += e8.objectMode ? 1 : r6.length);
          }
          e8.ended = true, e8.sync ? Ji(t5) : (e8.needReadable = false, e8.emittedReadable = true, ld(t5));
        }
      }
      function Ji(t5) {
        let e8 = t5._readableState;
        he("emitReadable", e8.needReadable, e8.emittedReadable), e8.needReadable = false, e8.emittedReadable || (he("emitReadable", e8.flowing), e8.emittedReadable = true, lt.nextTick(ld, t5));
      }
      function ld(t5) {
        let e8 = t5._readableState;
        he("emitReadable_", e8.destroyed, e8.length, e8.ended), !e8.destroyed && !e8.errored && (e8.length || e8.ended) && (t5.emit("readable"), e8.emittedReadable = false), e8.needReadable = !e8.flowing && !e8.ended && e8.length <= e8.highWaterMark, fd(t5);
      }
      function Qi(t5, e8) {
        !e8.readingMore && e8.constructed && (e8.readingMore = true, lt.nextTick(Tv, t5, e8));
      }
      function Tv(t5, e8) {
        for (; !e8.reading && !e8.ended && (e8.length < e8.highWaterMark || e8.flowing && e8.length === 0); ) {
          let r6 = e8.length;
          if (he("maybeReadMore read 0"), t5.read(0), r6 === e8.length) break;
        }
        e8.readingMore = false;
      }
      le.prototype._read = function(t5) {
        throw new uv("_read()");
      };
      le.prototype.pipe = function(t5, e8) {
        let r6 = this, n6 = this._readableState;
        n6.pipes.length === 1 && (n6.multiAwaitDrain || (n6.multiAwaitDrain = true, n6.awaitDrainWriters = new J_(n6.awaitDrainWriters ? [n6.awaitDrainWriters] : []))), n6.pipes.push(t5), he("pipe count=%d opts=%j", n6.pipes.length, e8);
        let s7 = (!e8 || e8.end !== false) && t5 !== lt.stdout && t5 !== lt.stderr ? a3 : b3;
        n6.endEmitted ? lt.nextTick(s7) : r6.once("end", s7), t5.on("unpipe", o6);
        function o6(m2, v2) {
          he("onunpipe"), m2 === r6 && v2 && v2.hasUnpiped === false && (v2.hasUnpiped = true, h3());
        }
        function a3() {
          he("onend"), t5.end();
        }
        let c5, f3 = false;
        function h3() {
          he("cleanup"), t5.removeListener("close", P2), t5.removeListener("finish", E2), c5 && t5.removeListener("drain", c5), t5.removeListener("error", y3), t5.removeListener("unpipe", o6), r6.removeListener("end", a3), r6.removeListener("end", b3), r6.removeListener("data", w2), f3 = true, c5 && n6.awaitDrainWriters && (!t5._writableState || t5._writableState.needDrain) && c5();
        }
        function d3() {
          f3 || (n6.pipes.length === 1 && n6.pipes[0] === t5 ? (he("false write response, pause", 0), n6.awaitDrainWriters = t5, n6.multiAwaitDrain = false) : n6.pipes.length > 1 && n6.pipes.includes(t5) && (he("false write response, pause", n6.awaitDrainWriters.size), n6.awaitDrainWriters.add(t5)), r6.pause()), c5 || (c5 = Pv(r6, t5), t5.on("drain", c5));
        }
        r6.on("data", w2);
        function w2(m2) {
          he("ondata");
          let v2 = t5.write(m2);
          he("dest.write", v2), v2 === false && d3();
        }
        function y3(m2) {
          if (he("onerror", m2), b3(), t5.removeListener("error", y3), t5.listenerCount("error") === 0) {
            let v2 = t5._writableState || t5._readableState;
            v2 && !v2.errorEmitted ? tn(t5, m2) : t5.emit("error", m2);
          }
        }
        rv(t5, "error", y3);
        function P2() {
          t5.removeListener("finish", E2), b3();
        }
        t5.once("close", P2);
        function E2() {
          he("onfinish"), t5.removeListener("close", P2), b3();
        }
        t5.once("finish", E2);
        function b3() {
          he("unpipe"), r6.unpipe(t5);
        }
        return t5.emit("pipe", r6), t5.writableNeedDrain === true ? d3() : n6.flowing || (he("pipe resume"), r6.resume()), t5;
      };
      function Pv(t5, e8) {
        return function() {
          let n6 = t5._readableState;
          n6.awaitDrainWriters === e8 ? (he("pipeOnDrain", 1), n6.awaitDrainWriters = null) : n6.multiAwaitDrain && (he("pipeOnDrain", n6.awaitDrainWriters.size), n6.awaitDrainWriters.delete(e8)), (!n6.awaitDrainWriters || n6.awaitDrainWriters.size === 0) && t5.listenerCount("data") && t5.resume();
        };
      }
      le.prototype.unpipe = function(t5) {
        let e8 = this._readableState, r6 = { hasUnpiped: false };
        if (e8.pipes.length === 0) return this;
        if (!t5) {
          let i6 = e8.pipes;
          e8.pipes = [], this.pause();
          for (let s7 = 0; s7 < i6.length; s7++) i6[s7].emit("unpipe", this, { hasUnpiped: false });
          return this;
        }
        let n6 = G_(e8.pipes, t5);
        return n6 === -1 ? this : (e8.pipes.splice(n6, 1), e8.pipes.length === 0 && this.pause(), t5.emit("unpipe", this, r6), this);
      };
      le.prototype.on = function(t5, e8) {
        let r6 = nr.prototype.on.call(this, t5, e8), n6 = this._readableState;
        return t5 === "data" ? (n6.readableListening = this.listenerCount("readable") > 0, n6.flowing !== false && this.resume()) : t5 === "readable" && !n6.endEmitted && !n6.readableListening && (n6.readableListening = n6.needReadable = true, n6.flowing = false, n6.emittedReadable = false, he("on readable", n6.length, n6.reading), n6.length ? Ji(this) : n6.reading || lt.nextTick(Ov, this)), r6;
      };
      le.prototype.addListener = le.prototype.on;
      le.prototype.removeListener = function(t5, e8) {
        let r6 = nr.prototype.removeListener.call(this, t5, e8);
        return t5 === "readable" && lt.nextTick(cd, this), r6;
      };
      le.prototype.off = le.prototype.removeListener;
      le.prototype.removeAllListeners = function(t5) {
        let e8 = nr.prototype.removeAllListeners.apply(this, arguments);
        return (t5 === "readable" || t5 === void 0) && lt.nextTick(cd, this), e8;
      };
      function cd(t5) {
        let e8 = t5._readableState;
        e8.readableListening = t5.listenerCount("readable") > 0, e8.resumeScheduled && e8[xr] === false ? e8.flowing = true : t5.listenerCount("data") > 0 ? t5.resume() : e8.readableListening || (e8.flowing = null);
      }
      function Ov(t5) {
        he("readable nexttick read 0"), t5.read(0);
      }
      le.prototype.resume = function() {
        let t5 = this._readableState;
        return t5.flowing || (he("resume"), t5.flowing = !t5.readableListening, Rv(this, t5)), t5[xr] = false, this;
      };
      function Rv(t5, e8) {
        e8.resumeScheduled || (e8.resumeScheduled = true, lt.nextTick(kv, t5, e8));
      }
      function kv(t5, e8) {
        he("resume", e8.reading), e8.reading || t5.read(0), e8.resumeScheduled = false, t5.emit("resume"), fd(t5), e8.flowing && !e8.reading && t5.read(0);
      }
      le.prototype.pause = function() {
        return he("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== false && (he("pause"), this._readableState.flowing = false, this.emit("pause")), this._readableState[xr] = true, this;
      };
      function fd(t5) {
        let e8 = t5._readableState;
        for (he("flow", e8.flowing); e8.flowing && t5.read() !== null; ) ;
      }
      le.prototype.wrap = function(t5) {
        let e8 = false;
        t5.on("data", (n6) => {
          !this.push(n6) && t5.pause && (e8 = true, t5.pause());
        }), t5.on("end", () => {
          this.push(null);
        }), t5.on("error", (n6) => {
          tn(this, n6);
        }), t5.on("close", () => {
          this.destroy();
        }), t5.on("destroy", () => {
          this.destroy();
        }), this._read = () => {
          e8 && t5.resume && (e8 = false, t5.resume());
        };
        let r6 = Y_(t5);
        for (let n6 = 1; n6 < r6.length; n6++) {
          let i6 = r6[n6];
          this[i6] === void 0 && typeof t5[i6] == "function" && (this[i6] = t5[i6].bind(t5));
        }
        return this;
      };
      le.prototype[Z_] = function() {
        return hd(this);
      };
      le.prototype.iterator = function(t5) {
        return t5 !== void 0 && dv(t5, "options"), hd(this, t5);
      };
      function hd(t5, e8) {
        typeof t5.read != "function" && (t5 = le.wrap(t5, { objectMode: true }));
        let r6 = Cv(t5, e8);
        return r6.stream = t5, r6;
      }
      async function* Cv(t5, e8) {
        let r6 = js;
        function n6(o6) {
          this === t5 ? (r6(), r6 = js) : r6 = o6;
        }
        t5.on("readable", n6);
        let i6, s7 = rd(t5, { writable: false }, (o6) => {
          i6 = o6 ? Xh(i6, o6) : null, r6(), r6 = js;
        });
        try {
          for (; ; ) {
            let o6 = t5.destroyed ? null : t5.read();
            if (o6 !== null) yield o6;
            else {
              if (i6) throw i6;
              if (i6 === null) return;
              await new td(n6);
            }
          }
        } catch (o6) {
          throw i6 = Xh(i6, o6), i6;
        } finally {
          (i6 || e8?.destroyOnReturn !== false) && (i6 === void 0 || t5._readableState.autoDestroy) ? nn.destroyer(t5, null) : (t5.off("readable", n6), s7());
        }
      }
      Gs(le.prototype, { readable: { __proto__: null, get() {
        let t5 = this._readableState;
        return !!t5 && t5.readable !== false && !t5.destroyed && !t5.errorEmitted && !t5.endEmitted;
      }, set(t5) {
        this._readableState && (this._readableState.readable = !!t5);
      } }, readableDidRead: { __proto__: null, enumerable: false, get: function() {
        return this._readableState.dataEmitted;
      } }, readableAborted: { __proto__: null, enumerable: false, get: function() {
        return !!(this._readableState.readable !== false && (this._readableState.destroyed || this._readableState.errored) && !this._readableState.endEmitted);
      } }, readableHighWaterMark: { __proto__: null, enumerable: false, get: function() {
        return this._readableState.highWaterMark;
      } }, readableBuffer: { __proto__: null, enumerable: false, get: function() {
        return this._readableState && this._readableState.buffer;
      } }, readableFlowing: { __proto__: null, enumerable: false, get: function() {
        return this._readableState.flowing;
      }, set: function(t5) {
        this._readableState && (this._readableState.flowing = t5);
      } }, readableLength: { __proto__: null, enumerable: false, get() {
        return this._readableState.length;
      } }, readableObjectMode: { __proto__: null, enumerable: false, get() {
        return this._readableState ? this._readableState.objectMode : false;
      } }, readableEncoding: { __proto__: null, enumerable: false, get() {
        return this._readableState ? this._readableState.encoding : null;
      } }, errored: { __proto__: null, enumerable: false, get() {
        return this._readableState ? this._readableState.errored : null;
      } }, closed: { __proto__: null, get() {
        return this._readableState ? this._readableState.closed : false;
      } }, destroyed: { __proto__: null, enumerable: false, get() {
        return this._readableState ? this._readableState.destroyed : false;
      }, set(t5) {
        this._readableState && (this._readableState.destroyed = t5);
      } }, readableEnded: { __proto__: null, enumerable: false, get() {
        return this._readableState ? this._readableState.endEmitted : false;
      } } });
      Gs(Yi.prototype, { pipesCount: { __proto__: null, get() {
        return this.pipes.length;
      } }, paused: { __proto__: null, get() {
        return this[xr] !== false;
      }, set(t5) {
        this[xr] = !!t5;
      } } });
      le._fromList = dd;
      function dd(t5, e8) {
        if (e8.length === 0) return null;
        let r6;
        return e8.objectMode ? r6 = e8.buffer.shift() : !t5 || t5 >= e8.length ? (e8.decoder ? r6 = e8.buffer.join("") : e8.buffer.length === 1 ? r6 = e8.buffer.first() : r6 = e8.buffer.concat(e8.length), e8.buffer.clear()) : r6 = e8.buffer.consume(t5, e8.decoder), r6;
      }
      function Ws(t5) {
        let e8 = t5._readableState;
        he("endReadable", e8.endEmitted), e8.endEmitted || (e8.ended = true, lt.nextTick(Bv, e8, t5));
      }
      function Bv(t5, e8) {
        if (he("endReadableNT", t5.endEmitted, t5.length), !t5.errored && !t5.closeEmitted && !t5.endEmitted && t5.length === 0) {
          if (t5.endEmitted = true, e8.emit("end"), e8.writable && e8.allowHalfOpen === false) lt.nextTick(Mv, e8);
          else if (t5.autoDestroy) {
            let r6 = e8._writableState;
            (!r6 || r6.autoDestroy && (r6.finished || r6.writable === false)) && e8.destroy();
          }
        }
      }
      function Mv(t5) {
        t5.writable && !t5.writableEnded && !t5.destroyed && t5.end();
      }
      le.from = function(t5, e8) {
        return pv(le, t5, e8);
      };
      var $s;
      function pd() {
        return $s === void 0 && ($s = {}), $s;
      }
      le.fromWeb = function(t5, e8) {
        return pd().newStreamReadableFromReadableStream(t5, e8);
      };
      le.toWeb = function(t5, e8) {
        return pd().newReadableStreamFromStreamReadable(t5, e8);
      };
      le.wrap = function(t5, e8) {
        var r6, n6;
        return new le({ objectMode: (r6 = (n6 = t5.readableObjectMode) !== null && n6 !== void 0 ? n6 : t5.objectMode) !== null && r6 !== void 0 ? r6 : true, ...e8, destroy(i6, s7) {
          nn.destroyer(t5, i6), s7(i6);
        } }).wrap(t5);
      };
    });
    ro = D((aC, Td) => {
      "use strict";
      A2();
      x2();
      I2();
      var Tr = tr(), { ArrayPrototypeSlice: wd, Error: Nv, FunctionPrototypeSymbolHasInstance: md, ObjectDefineProperty: _d, ObjectDefineProperties: qv, ObjectSetPrototypeOf: vd, StringPrototypeToLowerCase: Lv, Symbol: Uv, SymbolHasInstance: Dv } = Ee();
      Td.exports = Ie;
      Ie.WritableState = Un;
      var { EventEmitter: jv } = (er(), me(Zt)), qn = $i().Stream, { Buffer: Xi } = (ke(), me(qe)), to = Ar(), { addAbortSignal: Fv } = kn(), { getHighWaterMark: Wv, getDefaultHighWaterMark: $v } = Cn(), { ERR_INVALID_ARG_TYPE: Hv, ERR_METHOD_NOT_IMPLEMENTED: Vv, ERR_MULTIPLE_CALLBACK: Sd, ERR_STREAM_CANNOT_PIPE: Gv, ERR_STREAM_DESTROYED: Ln, ERR_STREAM_ALREADY_FINISHED: zv, ERR_STREAM_NULL_VALUES: Kv, ERR_STREAM_WRITE_AFTER_END: Qv, ERR_UNKNOWN_ENCODING: Ed } = De().codes, { errorOrDestroy: on } = to;
      vd(Ie.prototype, qn.prototype);
      vd(Ie, qn);
      function Qs() {
      }
      var sn = Uv("kOnFinished");
      function Un(t5, e8, r6) {
        typeof r6 != "boolean" && (r6 = e8 instanceof St()), this.objectMode = !!(t5 && t5.objectMode), r6 && (this.objectMode = this.objectMode || !!(t5 && t5.writableObjectMode)), this.highWaterMark = t5 ? Wv(this, t5, "writableHighWaterMark", r6) : $v(false), this.finalCalled = false, this.needDrain = false, this.ending = false, this.ended = false, this.finished = false, this.destroyed = false;
        let n6 = !!(t5 && t5.decodeStrings === false);
        this.decodeStrings = !n6, this.defaultEncoding = t5 && t5.defaultEncoding || "utf8", this.length = 0, this.writing = false, this.corked = 0, this.sync = true, this.bufferProcessing = false, this.onwrite = Jv.bind(void 0, e8), this.writecb = null, this.writelen = 0, this.afterWriteTickInfo = null, eo(this), this.pendingcb = 0, this.constructed = true, this.prefinished = false, this.errorEmitted = false, this.emitClose = !t5 || t5.emitClose !== false, this.autoDestroy = !t5 || t5.autoDestroy !== false, this.errored = null, this.closed = false, this.closeEmitted = false, this[sn] = [];
      }
      function eo(t5) {
        t5.buffered = [], t5.bufferedIndex = 0, t5.allBuffers = true, t5.allNoop = true;
      }
      Un.prototype.getBuffer = function() {
        return wd(this.buffered, this.bufferedIndex);
      };
      _d(Un.prototype, "bufferedRequestCount", { __proto__: null, get() {
        return this.buffered.length - this.bufferedIndex;
      } });
      function Ie(t5) {
        let e8 = this instanceof St();
        if (!e8 && !md(Ie, this)) return new Ie(t5);
        this._writableState = new Un(t5, this, e8), t5 && (typeof t5.write == "function" && (this._write = t5.write), typeof t5.writev == "function" && (this._writev = t5.writev), typeof t5.destroy == "function" && (this._destroy = t5.destroy), typeof t5.final == "function" && (this._final = t5.final), typeof t5.construct == "function" && (this._construct = t5.construct), t5.signal && Fv(t5.signal, this)), qn.call(this, t5), to.construct(this, () => {
          let r6 = this._writableState;
          r6.writing || Js(this, r6), Xs(this, r6);
        });
      }
      _d(Ie, Dv, { __proto__: null, value: function(t5) {
        return md(this, t5) ? true : this !== Ie ? false : t5 && t5._writableState instanceof Un;
      } });
      Ie.prototype.pipe = function() {
        on(this, new Gv());
      };
      function Ad(t5, e8, r6, n6) {
        let i6 = t5._writableState;
        if (typeof r6 == "function") n6 = r6, r6 = i6.defaultEncoding;
        else {
          if (!r6) r6 = i6.defaultEncoding;
          else if (r6 !== "buffer" && !Xi.isEncoding(r6)) throw new Ed(r6);
          typeof n6 != "function" && (n6 = Qs);
        }
        if (e8 === null) throw new Kv();
        if (!i6.objectMode) if (typeof e8 == "string") i6.decodeStrings !== false && (e8 = Xi.from(e8, r6), r6 = "buffer");
        else if (e8 instanceof Xi) r6 = "buffer";
        else if (qn._isUint8Array(e8)) e8 = qn._uint8ArrayToBuffer(e8), r6 = "buffer";
        else throw new Hv("chunk", ["string", "Buffer", "Uint8Array"], e8);
        let s7;
        return i6.ending ? s7 = new Qv() : i6.destroyed && (s7 = new Ln("write")), s7 ? (Tr.nextTick(n6, s7), on(t5, s7, true), s7) : (i6.pendingcb++, Yv(t5, i6, e8, r6, n6));
      }
      Ie.prototype.write = function(t5, e8, r6) {
        return Ad(this, t5, e8, r6) === true;
      };
      Ie.prototype.cork = function() {
        this._writableState.corked++;
      };
      Ie.prototype.uncork = function() {
        let t5 = this._writableState;
        t5.corked && (t5.corked--, t5.writing || Js(this, t5));
      };
      Ie.prototype.setDefaultEncoding = function(e8) {
        if (typeof e8 == "string" && (e8 = Lv(e8)), !Xi.isEncoding(e8)) throw new Ed(e8);
        return this._writableState.defaultEncoding = e8, this;
      };
      function Yv(t5, e8, r6, n6, i6) {
        let s7 = e8.objectMode ? 1 : r6.length;
        e8.length += s7;
        let o6 = e8.length < e8.highWaterMark;
        return o6 || (e8.needDrain = true), e8.writing || e8.corked || e8.errored || !e8.constructed ? (e8.buffered.push({ chunk: r6, encoding: n6, callback: i6 }), e8.allBuffers && n6 !== "buffer" && (e8.allBuffers = false), e8.allNoop && i6 !== Qs && (e8.allNoop = false)) : (e8.writelen = s7, e8.writecb = i6, e8.writing = true, e8.sync = true, t5._write(r6, n6, e8.onwrite), e8.sync = false), o6 && !e8.errored && !e8.destroyed;
      }
      function gd(t5, e8, r6, n6, i6, s7, o6) {
        e8.writelen = n6, e8.writecb = o6, e8.writing = true, e8.sync = true, e8.destroyed ? e8.onwrite(new Ln("write")) : r6 ? t5._writev(i6, e8.onwrite) : t5._write(i6, s7, e8.onwrite), e8.sync = false;
      }
      function bd(t5, e8, r6, n6) {
        --e8.pendingcb, n6(r6), Ys(e8), on(t5, r6);
      }
      function Jv(t5, e8) {
        let r6 = t5._writableState, n6 = r6.sync, i6 = r6.writecb;
        if (typeof i6 != "function") {
          on(t5, new Sd());
          return;
        }
        r6.writing = false, r6.writecb = null, r6.length -= r6.writelen, r6.writelen = 0, e8 ? (e8.stack, r6.errored || (r6.errored = e8), t5._readableState && !t5._readableState.errored && (t5._readableState.errored = e8), n6 ? Tr.nextTick(bd, t5, r6, e8, i6) : bd(t5, r6, e8, i6)) : (r6.buffered.length > r6.bufferedIndex && Js(t5, r6), n6 ? r6.afterWriteTickInfo !== null && r6.afterWriteTickInfo.cb === i6 ? r6.afterWriteTickInfo.count++ : (r6.afterWriteTickInfo = { count: 1, cb: i6, stream: t5, state: r6 }, Tr.nextTick(Xv, r6.afterWriteTickInfo)) : Id(t5, r6, 1, i6));
      }
      function Xv({ stream: t5, state: e8, count: r6, cb: n6 }) {
        return e8.afterWriteTickInfo = null, Id(t5, e8, r6, n6);
      }
      function Id(t5, e8, r6, n6) {
        for (!e8.ending && !t5.destroyed && e8.length === 0 && e8.needDrain && (e8.needDrain = false, t5.emit("drain")); r6-- > 0; ) e8.pendingcb--, n6();
        e8.destroyed && Ys(e8), Xs(t5, e8);
      }
      function Ys(t5) {
        if (t5.writing) return;
        for (let i6 = t5.bufferedIndex; i6 < t5.buffered.length; ++i6) {
          var e8;
          let { chunk: s7, callback: o6 } = t5.buffered[i6], a3 = t5.objectMode ? 1 : s7.length;
          t5.length -= a3, o6((e8 = t5.errored) !== null && e8 !== void 0 ? e8 : new Ln("write"));
        }
        let r6 = t5[sn].splice(0);
        for (let i6 = 0; i6 < r6.length; i6++) {
          var n6;
          r6[i6]((n6 = t5.errored) !== null && n6 !== void 0 ? n6 : new Ln("end"));
        }
        eo(t5);
      }
      function Js(t5, e8) {
        if (e8.corked || e8.bufferProcessing || e8.destroyed || !e8.constructed) return;
        let { buffered: r6, bufferedIndex: n6, objectMode: i6 } = e8, s7 = r6.length - n6;
        if (!s7) return;
        let o6 = n6;
        if (e8.bufferProcessing = true, s7 > 1 && t5._writev) {
          e8.pendingcb -= s7 - 1;
          let a3 = e8.allNoop ? Qs : (f3) => {
            for (let h3 = o6; h3 < r6.length; ++h3) r6[h3].callback(f3);
          }, c5 = e8.allNoop && o6 === 0 ? r6 : wd(r6, o6);
          c5.allBuffers = e8.allBuffers, gd(t5, e8, true, e8.length, c5, "", a3), eo(e8);
        } else {
          do {
            let { chunk: a3, encoding: c5, callback: f3 } = r6[o6];
            r6[o6++] = null;
            let h3 = i6 ? 1 : a3.length;
            gd(t5, e8, false, h3, a3, c5, f3);
          } while (o6 < r6.length && !e8.writing);
          o6 === r6.length ? eo(e8) : o6 > 256 ? (r6.splice(0, o6), e8.bufferedIndex = 0) : e8.bufferedIndex = o6;
        }
        e8.bufferProcessing = false;
      }
      Ie.prototype._write = function(t5, e8, r6) {
        if (this._writev) this._writev([{ chunk: t5, encoding: e8 }], r6);
        else throw new Vv("_write()");
      };
      Ie.prototype._writev = null;
      Ie.prototype.end = function(t5, e8, r6) {
        let n6 = this._writableState;
        typeof t5 == "function" ? (r6 = t5, t5 = null, e8 = null) : typeof e8 == "function" && (r6 = e8, e8 = null);
        let i6;
        if (t5 != null) {
          let s7 = Ad(this, t5, e8);
          s7 instanceof Nv && (i6 = s7);
        }
        return n6.corked && (n6.corked = 1, this.uncork()), i6 || (!n6.errored && !n6.ending ? (n6.ending = true, Xs(this, n6, true), n6.ended = true) : n6.finished ? i6 = new zv("end") : n6.destroyed && (i6 = new Ln("end"))), typeof r6 == "function" && (i6 || n6.finished ? Tr.nextTick(r6, i6) : n6[sn].push(r6)), this;
      };
      function Zi(t5) {
        return t5.ending && !t5.destroyed && t5.constructed && t5.length === 0 && !t5.errored && t5.buffered.length === 0 && !t5.finished && !t5.writing && !t5.errorEmitted && !t5.closeEmitted;
      }
      function Zv(t5, e8) {
        let r6 = false;
        function n6(i6) {
          if (r6) {
            on(t5, i6 ?? Sd());
            return;
          }
          if (r6 = true, e8.pendingcb--, i6) {
            let s7 = e8[sn].splice(0);
            for (let o6 = 0; o6 < s7.length; o6++) s7[o6](i6);
            on(t5, i6, e8.sync);
          } else Zi(e8) && (e8.prefinished = true, t5.emit("prefinish"), e8.pendingcb++, Tr.nextTick(Ks, t5, e8));
        }
        e8.sync = true, e8.pendingcb++;
        try {
          t5._final(n6);
        } catch (i6) {
          n6(i6);
        }
        e8.sync = false;
      }
      function e0(t5, e8) {
        !e8.prefinished && !e8.finalCalled && (typeof t5._final == "function" && !e8.destroyed ? (e8.finalCalled = true, Zv(t5, e8)) : (e8.prefinished = true, t5.emit("prefinish")));
      }
      function Xs(t5, e8, r6) {
        Zi(e8) && (e0(t5, e8), e8.pendingcb === 0 && (r6 ? (e8.pendingcb++, Tr.nextTick((n6, i6) => {
          Zi(i6) ? Ks(n6, i6) : i6.pendingcb--;
        }, t5, e8)) : Zi(e8) && (e8.pendingcb++, Ks(t5, e8))));
      }
      function Ks(t5, e8) {
        e8.pendingcb--, e8.finished = true;
        let r6 = e8[sn].splice(0);
        for (let n6 = 0; n6 < r6.length; n6++) r6[n6]();
        if (t5.emit("finish"), e8.autoDestroy) {
          let n6 = t5._readableState;
          (!n6 || n6.autoDestroy && (n6.endEmitted || n6.readable === false)) && t5.destroy();
        }
      }
      qv(Ie.prototype, { closed: { __proto__: null, get() {
        return this._writableState ? this._writableState.closed : false;
      } }, destroyed: { __proto__: null, get() {
        return this._writableState ? this._writableState.destroyed : false;
      }, set(t5) {
        this._writableState && (this._writableState.destroyed = t5);
      } }, writable: { __proto__: null, get() {
        let t5 = this._writableState;
        return !!t5 && t5.writable !== false && !t5.destroyed && !t5.errored && !t5.ending && !t5.ended;
      }, set(t5) {
        this._writableState && (this._writableState.writable = !!t5);
      } }, writableFinished: { __proto__: null, get() {
        return this._writableState ? this._writableState.finished : false;
      } }, writableObjectMode: { __proto__: null, get() {
        return this._writableState ? this._writableState.objectMode : false;
      } }, writableBuffer: { __proto__: null, get() {
        return this._writableState && this._writableState.getBuffer();
      } }, writableEnded: { __proto__: null, get() {
        return this._writableState ? this._writableState.ending : false;
      } }, writableNeedDrain: { __proto__: null, get() {
        let t5 = this._writableState;
        return t5 ? !t5.destroyed && !t5.ending && t5.needDrain : false;
      } }, writableHighWaterMark: { __proto__: null, get() {
        return this._writableState && this._writableState.highWaterMark;
      } }, writableCorked: { __proto__: null, get() {
        return this._writableState ? this._writableState.corked : 0;
      } }, writableLength: { __proto__: null, get() {
        return this._writableState && this._writableState.length;
      } }, errored: { __proto__: null, enumerable: false, get() {
        return this._writableState ? this._writableState.errored : null;
      } }, writableAborted: { __proto__: null, enumerable: false, get: function() {
        return !!(this._writableState.writable !== false && (this._writableState.destroyed || this._writableState.errored) && !this._writableState.finished);
      } } });
      var t0 = to.destroy;
      Ie.prototype.destroy = function(t5, e8) {
        let r6 = this._writableState;
        return !r6.destroyed && (r6.bufferedIndex < r6.buffered.length || r6[sn].length) && Tr.nextTick(Ys, r6), t0.call(this, t5, e8), this;
      };
      Ie.prototype._undestroy = to.undestroy;
      Ie.prototype._destroy = function(t5, e8) {
        e8(t5);
      };
      Ie.prototype[jv.captureRejectionSymbol] = function(t5) {
        this.destroy(t5);
      };
      var zs;
      function xd() {
        return zs === void 0 && (zs = {}), zs;
      }
      Ie.fromWeb = function(t5, e8) {
        return xd().newStreamWritableFromWritableStream(t5, e8);
      };
      Ie.toWeb = function(t5) {
        return xd().newWritableStreamFromStreamWritable(t5);
      };
    });
    Wd = D((bC, Fd) => {
      A2();
      x2();
      I2();
      var Zs = tr(), r0 = (ke(), me(qe)), { isReadable: n0, isWritable: i0, isIterable: Pd, isNodeStream: o0, isReadableNodeStream: Od, isWritableNodeStream: Rd, isDuplexNodeStream: s0, isReadableStream: kd, isWritableStream: Cd } = mt(), Bd = Ut(), { AbortError: Dd, codes: { ERR_INVALID_ARG_TYPE: a0, ERR_INVALID_RETURN_VALUE: Md } } = De(), { destroyer: un } = Ar(), u0 = St(), jd = Nn(), l0 = ro(), { createDeferredPromise: Nd } = $e(), qd = Us(), Ld = globalThis.Blob || r0.Blob, c0 = typeof Ld < "u" ? function(e8) {
        return e8 instanceof Ld;
      } : function(e8) {
        return false;
      }, f0 = globalThis.AbortController || Yr().AbortController, { FunctionPrototypeCall: Ud } = Ee(), ir = class extends u0 {
        constructor(e8) {
          super(e8), e8?.readable === false && (this._readableState.readable = false, this._readableState.ended = true, this._readableState.endEmitted = true), e8?.writable === false && (this._writableState.writable = false, this._writableState.ending = true, this._writableState.ended = true, this._writableState.finished = true);
        }
      };
      Fd.exports = function t5(e8, r6) {
        if (s0(e8)) return e8;
        if (Od(e8)) return an({ readable: e8 });
        if (Rd(e8)) return an({ writable: e8 });
        if (o0(e8)) return an({ writable: false, readable: false });
        if (kd(e8)) return an({ readable: jd.fromWeb(e8) });
        if (Cd(e8)) return an({ writable: l0.fromWeb(e8) });
        if (typeof e8 == "function") {
          let { value: i6, write: s7, final: o6, destroy: a3 } = h0(e8);
          if (Pd(i6)) return qd(ir, i6, { objectMode: true, write: s7, final: o6, destroy: a3 });
          let c5 = i6?.then;
          if (typeof c5 == "function") {
            let f3, h3 = Ud(c5, i6, (d3) => {
              if (d3 != null) throw new Md("nully", "body", d3);
            }, (d3) => {
              un(f3, d3);
            });
            return f3 = new ir({ objectMode: true, readable: false, write: s7, final(d3) {
              o6(async () => {
                try {
                  await h3, Zs.nextTick(d3, null);
                } catch (w2) {
                  Zs.nextTick(d3, w2);
                }
              });
            }, destroy: a3 });
          }
          throw new Md("Iterable, AsyncIterable or AsyncFunction", r6, i6);
        }
        if (c0(e8)) return t5(e8.arrayBuffer());
        if (Pd(e8)) return qd(ir, e8, { objectMode: true, writable: false });
        if (kd(e8?.readable) && Cd(e8?.writable)) return ir.fromWeb(e8);
        if (typeof e8?.writable == "object" || typeof e8?.readable == "object") {
          let i6 = e8 != null && e8.readable ? Od(e8?.readable) ? e8?.readable : t5(e8.readable) : void 0, s7 = e8 != null && e8.writable ? Rd(e8?.writable) ? e8?.writable : t5(e8.writable) : void 0;
          return an({ readable: i6, writable: s7 });
        }
        let n6 = e8?.then;
        if (typeof n6 == "function") {
          let i6;
          return Ud(n6, e8, (s7) => {
            s7 != null && i6.push(s7), i6.push(null);
          }, (s7) => {
            un(i6, s7);
          }), i6 = new ir({ objectMode: true, writable: false, read() {
          } });
        }
        throw new a0(r6, ["Blob", "ReadableStream", "WritableStream", "Stream", "Iterable", "AsyncIterable", "Function", "{ readable, writable } pair", "Promise"], e8);
      };
      function h0(t5) {
        let { promise: e8, resolve: r6 } = Nd(), n6 = new f0(), i6 = n6.signal;
        return { value: t5((async function* () {
          for (; ; ) {
            let o6 = e8;
            e8 = null;
            let { chunk: a3, done: c5, cb: f3 } = await o6;
            if (Zs.nextTick(f3), c5) return;
            if (i6.aborted) throw new Dd(void 0, { cause: i6.reason });
            ({ promise: e8, resolve: r6 } = Nd()), yield a3;
          }
        })(), { signal: i6 }), write(o6, a3, c5) {
          let f3 = r6;
          r6 = null, f3({ chunk: o6, done: false, cb: c5 });
        }, final(o6) {
          let a3 = r6;
          r6 = null, a3({ done: true, cb: o6 });
        }, destroy(o6, a3) {
          n6.abort(), a3(o6);
        } };
      }
      function an(t5) {
        let e8 = t5.readable && typeof t5.readable.read != "function" ? jd.wrap(t5.readable) : t5.readable, r6 = t5.writable, n6 = !!n0(e8), i6 = !!i0(r6), s7, o6, a3, c5, f3;
        function h3(d3) {
          let w2 = c5;
          c5 = null, w2 ? w2(d3) : d3 && f3.destroy(d3);
        }
        return f3 = new ir({ readableObjectMode: !!(e8 != null && e8.readableObjectMode), writableObjectMode: !!(r6 != null && r6.writableObjectMode), readable: n6, writable: i6 }), i6 && (Bd(r6, (d3) => {
          i6 = false, d3 && un(e8, d3), h3(d3);
        }), f3._write = function(d3, w2, y3) {
          r6.write(d3, w2) ? y3() : s7 = y3;
        }, f3._final = function(d3) {
          r6.end(), o6 = d3;
        }, r6.on("drain", function() {
          if (s7) {
            let d3 = s7;
            s7 = null, d3();
          }
        }), r6.on("finish", function() {
          if (o6) {
            let d3 = o6;
            o6 = null, d3();
          }
        })), n6 && (Bd(e8, (d3) => {
          n6 = false, d3 && un(e8, d3), h3(d3);
        }), e8.on("readable", function() {
          if (a3) {
            let d3 = a3;
            a3 = null, d3();
          }
        }), e8.on("end", function() {
          f3.push(null);
        }), f3._read = function() {
          for (; ; ) {
            let d3 = e8.read();
            if (d3 === null) {
              a3 = f3._read;
              return;
            }
            if (!f3.push(d3)) return;
          }
        }), f3._destroy = function(d3, w2) {
          !d3 && c5 !== null && (d3 = new Dd()), a3 = null, s7 = null, o6 = null, c5 === null ? w2(d3) : (c5 = w2, un(r6, d3), un(e8, d3));
        }, f3;
      }
    });
    St = D((TC, Vd) => {
      "use strict";
      A2();
      x2();
      I2();
      var { ObjectDefineProperties: d0, ObjectGetOwnPropertyDescriptor: Dt, ObjectKeys: p0, ObjectSetPrototypeOf: $d } = Ee();
      Vd.exports = ct;
      var ra = Nn(), tt = ro();
      $d(ct.prototype, ra.prototype);
      $d(ct, ra);
      {
        let t5 = p0(tt.prototype);
        for (let e8 = 0; e8 < t5.length; e8++) {
          let r6 = t5[e8];
          ct.prototype[r6] || (ct.prototype[r6] = tt.prototype[r6]);
        }
      }
      function ct(t5) {
        if (!(this instanceof ct)) return new ct(t5);
        ra.call(this, t5), tt.call(this, t5), t5 ? (this.allowHalfOpen = t5.allowHalfOpen !== false, t5.readable === false && (this._readableState.readable = false, this._readableState.ended = true, this._readableState.endEmitted = true), t5.writable === false && (this._writableState.writable = false, this._writableState.ending = true, this._writableState.ended = true, this._writableState.finished = true)) : this.allowHalfOpen = true;
      }
      d0(ct.prototype, { writable: { __proto__: null, ...Dt(tt.prototype, "writable") }, writableHighWaterMark: { __proto__: null, ...Dt(tt.prototype, "writableHighWaterMark") }, writableObjectMode: { __proto__: null, ...Dt(tt.prototype, "writableObjectMode") }, writableBuffer: { __proto__: null, ...Dt(tt.prototype, "writableBuffer") }, writableLength: { __proto__: null, ...Dt(tt.prototype, "writableLength") }, writableFinished: { __proto__: null, ...Dt(tt.prototype, "writableFinished") }, writableCorked: { __proto__: null, ...Dt(tt.prototype, "writableCorked") }, writableEnded: { __proto__: null, ...Dt(tt.prototype, "writableEnded") }, writableNeedDrain: { __proto__: null, ...Dt(tt.prototype, "writableNeedDrain") }, destroyed: { __proto__: null, get() {
        return this._readableState === void 0 || this._writableState === void 0 ? false : this._readableState.destroyed && this._writableState.destroyed;
      }, set(t5) {
        this._readableState && this._writableState && (this._readableState.destroyed = t5, this._writableState.destroyed = t5);
      } } });
      var ea;
      function Hd() {
        return ea === void 0 && (ea = {}), ea;
      }
      ct.fromWeb = function(t5, e8) {
        return Hd().newStreamDuplexFromReadableWritablePair(t5, e8);
      };
      ct.toWeb = function(t5) {
        return Hd().newReadableWritablePairFromDuplex(t5);
      };
      var ta;
      ct.from = function(t5) {
        return ta || (ta = Wd()), ta(t5, "body");
      };
    });
    oa = D((LC, zd) => {
      "use strict";
      A2();
      x2();
      I2();
      var { ObjectSetPrototypeOf: Gd, Symbol: y0 } = Ee();
      zd.exports = jt;
      var { ERR_METHOD_NOT_IMPLEMENTED: g0 } = De().codes, ia = St(), { getHighWaterMark: b0 } = Cn();
      Gd(jt.prototype, ia.prototype);
      Gd(jt, ia);
      var Dn = y0("kCallback");
      function jt(t5) {
        if (!(this instanceof jt)) return new jt(t5);
        let e8 = t5 ? b0(this, t5, "readableHighWaterMark", true) : null;
        e8 === 0 && (t5 = { ...t5, highWaterMark: null, readableHighWaterMark: e8, writableHighWaterMark: t5.writableHighWaterMark || 0 }), ia.call(this, t5), this._readableState.sync = false, this[Dn] = null, t5 && (typeof t5.transform == "function" && (this._transform = t5.transform), typeof t5.flush == "function" && (this._flush = t5.flush)), this.on("prefinish", w0);
      }
      function na(t5) {
        typeof this._flush == "function" && !this.destroyed ? this._flush((e8, r6) => {
          if (e8) {
            t5 ? t5(e8) : this.destroy(e8);
            return;
          }
          r6 != null && this.push(r6), this.push(null), t5 && t5();
        }) : (this.push(null), t5 && t5());
      }
      function w0() {
        this._final !== na && na.call(this);
      }
      jt.prototype._final = na;
      jt.prototype._transform = function(t5, e8, r6) {
        throw new g0("_transform()");
      };
      jt.prototype._write = function(t5, e8, r6) {
        let n6 = this._readableState, i6 = this._writableState, s7 = n6.length;
        this._transform(t5, e8, (o6, a3) => {
          if (o6) {
            r6(o6);
            return;
          }
          a3 != null && this.push(a3), i6.ended || s7 === n6.length || n6.length < n6.highWaterMark ? r6() : this[Dn] = r6;
        });
      };
      jt.prototype._read = function() {
        if (this[Dn]) {
          let t5 = this[Dn];
          this[Dn] = null, t5();
        }
      };
    });
    aa = D((zC, Qd) => {
      "use strict";
      A2();
      x2();
      I2();
      var { ObjectSetPrototypeOf: Kd } = Ee();
      Qd.exports = ln;
      var sa = oa();
      Kd(ln.prototype, sa.prototype);
      Kd(ln, sa);
      function ln(t5) {
        if (!(this instanceof ln)) return new ln(t5);
        sa.call(this, t5);
      }
      ln.prototype._transform = function(t5, e8, r6) {
        r6(null, t5);
      };
    });
    so = D((nB, ep) => {
      A2();
      x2();
      I2();
      var jn = tr(), { ArrayIsArray: m0, Promise: _0, SymbolAsyncIterator: v0, SymbolDispose: S0 } = Ee(), oo = Ut(), { once: E0 } = $e(), A0 = Ar(), Yd = St(), { aggregateTwoErrors: I0, codes: { ERR_INVALID_ARG_TYPE: ga, ERR_INVALID_RETURN_VALUE: ua, ERR_MISSING_ARGS: x0, ERR_STREAM_DESTROYED: T0, ERR_STREAM_PREMATURE_CLOSE: P0 }, AbortError: O0 } = De(), { validateFunction: R0, validateAbortSignal: k0 } = Xr(), { isIterable: Pr, isReadable: la, isReadableNodeStream: io, isNodeStream: Jd, isTransformStream: cn, isWebStream: C0, isReadableStream: ca, isReadableFinished: B0 } = mt(), M0 = globalThis.AbortController || Yr().AbortController, fa, ha, da;
      function Xd(t5, e8, r6) {
        let n6 = false;
        t5.on("close", () => {
          n6 = true;
        });
        let i6 = oo(t5, { readable: e8, writable: r6 }, (s7) => {
          n6 = !s7;
        });
        return { destroy: (s7) => {
          n6 || (n6 = true, A0.destroyer(t5, s7 || new T0("pipe")));
        }, cleanup: i6 };
      }
      function N0(t5) {
        return R0(t5[t5.length - 1], "streams[stream.length - 1]"), t5.pop();
      }
      function pa(t5) {
        if (Pr(t5)) return t5;
        if (io(t5)) return q0(t5);
        throw new ga("val", ["Readable", "Iterable", "AsyncIterable"], t5);
      }
      async function* q0(t5) {
        ha || (ha = Nn()), yield* ha.prototype[v0].call(t5);
      }
      async function no(t5, e8, r6, { end: n6 }) {
        let i6, s7 = null, o6 = (f3) => {
          if (f3 && (i6 = f3), s7) {
            let h3 = s7;
            s7 = null, h3();
          }
        }, a3 = () => new _0((f3, h3) => {
          i6 ? h3(i6) : s7 = () => {
            i6 ? h3(i6) : f3();
          };
        });
        e8.on("drain", o6);
        let c5 = oo(e8, { readable: false }, o6);
        try {
          e8.writableNeedDrain && await a3();
          for await (let f3 of t5) e8.write(f3) || await a3();
          n6 && (e8.end(), await a3()), r6();
        } catch (f3) {
          r6(i6 !== f3 ? I0(i6, f3) : f3);
        } finally {
          c5(), e8.off("drain", o6);
        }
      }
      async function ya(t5, e8, r6, { end: n6 }) {
        cn(e8) && (e8 = e8.writable);
        let i6 = e8.getWriter();
        try {
          for await (let s7 of t5) await i6.ready, i6.write(s7).catch(() => {
          });
          await i6.ready, n6 && await i6.close(), r6();
        } catch (s7) {
          try {
            await i6.abort(s7), r6(s7);
          } catch (o6) {
            r6(o6);
          }
        }
      }
      function L0(...t5) {
        return Zd(t5, E0(N0(t5)));
      }
      function Zd(t5, e8, r6) {
        if (t5.length === 1 && m0(t5[0]) && (t5 = t5[0]), t5.length < 2) throw new x0("streams");
        let n6 = new M0(), i6 = n6.signal, s7 = r6?.signal, o6 = [];
        k0(s7, "options.signal");
        function a3() {
          P2(new O0());
        }
        da = da || $e().addAbortListener;
        let c5;
        s7 && (c5 = da(s7, a3));
        let f3, h3, d3 = [], w2 = 0;
        function y3(R2) {
          P2(R2, --w2 === 0);
        }
        function P2(R2, T2) {
          var g2;
          if (R2 && (!f3 || f3.code === "ERR_STREAM_PREMATURE_CLOSE") && (f3 = R2), !(!f3 && !T2)) {
            for (; d3.length; ) d3.shift()(f3);
            (g2 = c5) === null || g2 === void 0 || g2[S0](), n6.abort(), T2 && (f3 || o6.forEach((O) => O()), jn.nextTick(e8, f3, h3));
          }
        }
        let E2;
        for (let R2 = 0; R2 < t5.length; R2++) {
          let T2 = t5[R2], g2 = R2 < t5.length - 1, O = R2 > 0, _2 = g2 || r6?.end !== false, q = R2 === t5.length - 1;
          if (Jd(T2)) {
            let $2 = function(j2) {
              j2 && j2.name !== "AbortError" && j2.code !== "ERR_STREAM_PREMATURE_CLOSE" && y3(j2);
            };
            var v2 = $2;
            if (_2) {
              let { destroy: j2, cleanup: J } = Xd(T2, g2, O);
              d3.push(j2), la(T2) && q && o6.push(J);
            }
            T2.on("error", $2), la(T2) && q && o6.push(() => {
              T2.removeListener("error", $2);
            });
          }
          if (R2 === 0) if (typeof T2 == "function") {
            if (E2 = T2({ signal: i6 }), !Pr(E2)) throw new ua("Iterable, AsyncIterable or Stream", "source", E2);
          } else Pr(T2) || io(T2) || cn(T2) ? E2 = T2 : E2 = Yd.from(T2);
          else if (typeof T2 == "function") {
            if (cn(E2)) {
              var b3;
              E2 = pa((b3 = E2) === null || b3 === void 0 ? void 0 : b3.readable);
            } else E2 = pa(E2);
            if (E2 = T2(E2, { signal: i6 }), g2) {
              if (!Pr(E2, true)) throw new ua("AsyncIterable", `transform[${R2 - 1}]`, E2);
            } else {
              var m2;
              fa || (fa = aa());
              let $2 = new fa({ objectMode: true }), j2 = (m2 = E2) === null || m2 === void 0 ? void 0 : m2.then;
              if (typeof j2 == "function") w2++, j2.call(E2, (H2) => {
                h3 = H2, H2 != null && $2.write(H2), _2 && $2.end(), jn.nextTick(y3);
              }, (H2) => {
                $2.destroy(H2), jn.nextTick(y3, H2);
              });
              else if (Pr(E2, true)) w2++, no(E2, $2, y3, { end: _2 });
              else if (ca(E2) || cn(E2)) {
                let H2 = E2.readable || E2;
                w2++, no(H2, $2, y3, { end: _2 });
              } else throw new ua("AsyncIterable or Promise", "destination", E2);
              E2 = $2;
              let { destroy: J, cleanup: W } = Xd(E2, false, true);
              d3.push(J), q && o6.push(W);
            }
          } else if (Jd(T2)) {
            if (io(E2)) {
              w2 += 2;
              let $2 = U0(E2, T2, y3, { end: _2 });
              la(T2) && q && o6.push($2);
            } else if (cn(E2) || ca(E2)) {
              let $2 = E2.readable || E2;
              w2++, no($2, T2, y3, { end: _2 });
            } else if (Pr(E2)) w2++, no(E2, T2, y3, { end: _2 });
            else throw new ga("val", ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"], E2);
            E2 = T2;
          } else if (C0(T2)) {
            if (io(E2)) w2++, ya(pa(E2), T2, y3, { end: _2 });
            else if (ca(E2) || Pr(E2)) w2++, ya(E2, T2, y3, { end: _2 });
            else if (cn(E2)) w2++, ya(E2.readable, T2, y3, { end: _2 });
            else throw new ga("val", ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"], E2);
            E2 = T2;
          } else E2 = Yd.from(T2);
        }
        return (i6 != null && i6.aborted || s7 != null && s7.aborted) && jn.nextTick(a3), E2;
      }
      function U0(t5, e8, r6, { end: n6 }) {
        let i6 = false;
        if (e8.on("close", () => {
          i6 || r6(new P0());
        }), t5.pipe(e8, { end: false }), n6) {
          let o6 = function() {
            i6 = true, e8.end();
          };
          var s7 = o6;
          B0(t5) ? jn.nextTick(o6) : t5.once("end", o6);
        } else r6();
        return oo(t5, { readable: true, writable: false }, (o6) => {
          let a3 = t5._readableState;
          o6 && o6.code === "ERR_STREAM_PREMATURE_CLOSE" && a3 && a3.ended && !a3.errored && !a3.errorEmitted ? t5.once("end", r6).once("error", r6) : r6(o6);
        }), oo(e8, { readable: false, writable: true }, r6);
      }
      ep.exports = { pipelineImpl: Zd, pipeline: L0 };
    });
    wa = D((dB, sp) => {
      "use strict";
      A2();
      x2();
      I2();
      var { pipeline: D0 } = so(), ao = St(), { destroyer: j0 } = Ar(), { isNodeStream: uo, isReadable: tp, isWritable: rp, isWebStream: ba, isTransformStream: Or, isWritableStream: np, isReadableStream: ip } = mt(), { AbortError: F0, codes: { ERR_INVALID_ARG_VALUE: op, ERR_MISSING_ARGS: W0 } } = De(), $0 = Ut();
      sp.exports = function(...e8) {
        if (e8.length === 0) throw new W0("streams");
        if (e8.length === 1) return ao.from(e8[0]);
        let r6 = [...e8];
        if (typeof e8[0] == "function" && (e8[0] = ao.from(e8[0])), typeof e8[e8.length - 1] == "function") {
          let y3 = e8.length - 1;
          e8[y3] = ao.from(e8[y3]);
        }
        for (let y3 = 0; y3 < e8.length; ++y3) if (!(!uo(e8[y3]) && !ba(e8[y3]))) {
          if (y3 < e8.length - 1 && !(tp(e8[y3]) || ip(e8[y3]) || Or(e8[y3]))) throw new op(`streams[${y3}]`, r6[y3], "must be readable");
          if (y3 > 0 && !(rp(e8[y3]) || np(e8[y3]) || Or(e8[y3]))) throw new op(`streams[${y3}]`, r6[y3], "must be writable");
        }
        let n6, i6, s7, o6, a3;
        function c5(y3) {
          let P2 = o6;
          o6 = null, P2 ? P2(y3) : y3 ? a3.destroy(y3) : !w2 && !d3 && a3.destroy();
        }
        let f3 = e8[0], h3 = D0(e8, c5), d3 = !!(rp(f3) || np(f3) || Or(f3)), w2 = !!(tp(h3) || ip(h3) || Or(h3));
        if (a3 = new ao({ writableObjectMode: !!(f3 != null && f3.writableObjectMode), readableObjectMode: !!(h3 != null && h3.readableObjectMode), writable: d3, readable: w2 }), d3) {
          if (uo(f3)) a3._write = function(P2, E2, b3) {
            f3.write(P2, E2) ? b3() : n6 = b3;
          }, a3._final = function(P2) {
            f3.end(), i6 = P2;
          }, f3.on("drain", function() {
            if (n6) {
              let P2 = n6;
              n6 = null, P2();
            }
          });
          else if (ba(f3)) {
            let E2 = (Or(f3) ? f3.writable : f3).getWriter();
            a3._write = async function(b3, m2, v2) {
              try {
                await E2.ready, E2.write(b3).catch(() => {
                }), v2();
              } catch (R2) {
                v2(R2);
              }
            }, a3._final = async function(b3) {
              try {
                await E2.ready, E2.close().catch(() => {
                }), i6 = b3;
              } catch (m2) {
                b3(m2);
              }
            };
          }
          let y3 = Or(h3) ? h3.readable : h3;
          $0(y3, () => {
            if (i6) {
              let P2 = i6;
              i6 = null, P2();
            }
          });
        }
        if (w2) {
          if (uo(h3)) h3.on("readable", function() {
            if (s7) {
              let y3 = s7;
              s7 = null, y3();
            }
          }), h3.on("end", function() {
            a3.push(null);
          }), a3._read = function() {
            for (; ; ) {
              let y3 = h3.read();
              if (y3 === null) {
                s7 = a3._read;
                return;
              }
              if (!a3.push(y3)) return;
            }
          };
          else if (ba(h3)) {
            let P2 = (Or(h3) ? h3.readable : h3).getReader();
            a3._read = async function() {
              for (; ; ) try {
                let { value: E2, done: b3 } = await P2.read();
                if (!a3.push(E2)) return;
                if (b3) {
                  a3.push(null);
                  return;
                }
              } catch {
                return;
              }
            };
          }
        }
        return a3._destroy = function(y3, P2) {
          !y3 && o6 !== null && (y3 = new F0()), s7 = null, n6 = null, i6 = null, o6 === null ? P2(y3) : (o6 = P2, uo(h3) && j0(h3, y3));
        }, a3;
      };
    });
    gp = D((EB, va) => {
      "use strict";
      A2();
      x2();
      I2();
      var H0 = globalThis.AbortController || Yr().AbortController, { codes: { ERR_INVALID_ARG_VALUE: V0, ERR_INVALID_ARG_TYPE: Fn, ERR_MISSING_ARGS: G0, ERR_OUT_OF_RANGE: z0 }, AbortError: Et } = De(), { validateAbortSignal: Rr, validateInteger: ap, validateObject: kr } = Xr(), K0 = Ee().Symbol("kWeak"), Q0 = Ee().Symbol("kResistStopPropagation"), { finished: Y0 } = Ut(), J0 = wa(), { addAbortSignalNoValidate: X0 } = kn(), { isWritable: Z0, isNodeStream: eS } = mt(), { deprecate: tS } = $e(), { ArrayPrototypePush: rS, Boolean: nS, MathFloor: up, Number: iS, NumberIsNaN: oS, Promise: lp, PromiseReject: cp, PromiseResolve: sS, PromisePrototypeThen: fp, Symbol: dp } = Ee(), lo = dp("kEmpty"), hp = dp("kEof");
      function aS(t5, e8) {
        if (e8 != null && kr(e8, "options"), e8?.signal != null && Rr(e8.signal, "options.signal"), eS(t5) && !Z0(t5)) throw new V0("stream", t5, "must be writable");
        let r6 = J0(this, t5);
        return e8 != null && e8.signal && X0(e8.signal, r6), r6;
      }
      function co(t5, e8) {
        if (typeof t5 != "function") throw new Fn("fn", ["Function", "AsyncFunction"], t5);
        e8 != null && kr(e8, "options"), e8?.signal != null && Rr(e8.signal, "options.signal");
        let r6 = 1;
        e8?.concurrency != null && (r6 = up(e8.concurrency));
        let n6 = r6 - 1;
        return e8?.highWaterMark != null && (n6 = up(e8.highWaterMark)), ap(r6, "options.concurrency", 1), ap(n6, "options.highWaterMark", 0), n6 += r6, async function* () {
          let s7 = $e().AbortSignalAny([e8?.signal].filter(nS)), o6 = this, a3 = [], c5 = { signal: s7 }, f3, h3, d3 = false, w2 = 0;
          function y3() {
            d3 = true, P2();
          }
          function P2() {
            w2 -= 1, E2();
          }
          function E2() {
            h3 && !d3 && w2 < r6 && a3.length < n6 && (h3(), h3 = null);
          }
          async function b3() {
            try {
              for await (let m2 of o6) {
                if (d3) return;
                if (s7.aborted) throw new Et();
                try {
                  if (m2 = t5(m2, c5), m2 === lo) continue;
                  m2 = sS(m2);
                } catch (v2) {
                  m2 = cp(v2);
                }
                w2 += 1, fp(m2, P2, y3), a3.push(m2), f3 && (f3(), f3 = null), !d3 && (a3.length >= n6 || w2 >= r6) && await new lp((v2) => {
                  h3 = v2;
                });
              }
              a3.push(hp);
            } catch (m2) {
              let v2 = cp(m2);
              fp(v2, P2, y3), a3.push(v2);
            } finally {
              d3 = true, f3 && (f3(), f3 = null);
            }
          }
          b3();
          try {
            for (; ; ) {
              for (; a3.length > 0; ) {
                let m2 = await a3[0];
                if (m2 === hp) return;
                if (s7.aborted) throw new Et();
                m2 !== lo && (yield m2), a3.shift(), E2();
              }
              await new lp((m2) => {
                f3 = m2;
              });
            }
          } finally {
            d3 = true, h3 && (h3(), h3 = null);
          }
        }.call(this);
      }
      function uS(t5 = void 0) {
        return t5 != null && kr(t5, "options"), t5?.signal != null && Rr(t5.signal, "options.signal"), async function* () {
          let r6 = 0;
          for await (let i6 of this) {
            var n6;
            if (t5 != null && (n6 = t5.signal) !== null && n6 !== void 0 && n6.aborted) throw new Et({ cause: t5.signal.reason });
            yield [r6++, i6];
          }
        }.call(this);
      }
      async function pp(t5, e8 = void 0) {
        for await (let r6 of _a.call(this, t5, e8)) return true;
        return false;
      }
      async function lS(t5, e8 = void 0) {
        if (typeof t5 != "function") throw new Fn("fn", ["Function", "AsyncFunction"], t5);
        return !await pp.call(this, async (...r6) => !await t5(...r6), e8);
      }
      async function cS(t5, e8) {
        for await (let r6 of _a.call(this, t5, e8)) return r6;
      }
      async function fS(t5, e8) {
        if (typeof t5 != "function") throw new Fn("fn", ["Function", "AsyncFunction"], t5);
        async function r6(n6, i6) {
          return await t5(n6, i6), lo;
        }
        for await (let n6 of co.call(this, r6, e8)) ;
      }
      function _a(t5, e8) {
        if (typeof t5 != "function") throw new Fn("fn", ["Function", "AsyncFunction"], t5);
        async function r6(n6, i6) {
          return await t5(n6, i6) ? n6 : lo;
        }
        return co.call(this, r6, e8);
      }
      var ma = class extends G0 {
        constructor() {
          super("reduce"), this.message = "Reduce of an empty stream requires an initial value";
        }
      };
      async function hS(t5, e8, r6) {
        var n6;
        if (typeof t5 != "function") throw new Fn("reducer", ["Function", "AsyncFunction"], t5);
        r6 != null && kr(r6, "options"), r6?.signal != null && Rr(r6.signal, "options.signal");
        let i6 = arguments.length > 1;
        if (r6 != null && (n6 = r6.signal) !== null && n6 !== void 0 && n6.aborted) {
          let f3 = new Et(void 0, { cause: r6.signal.reason });
          throw this.once("error", () => {
          }), await Y0(this.destroy(f3)), f3;
        }
        let s7 = new H0(), o6 = s7.signal;
        if (r6 != null && r6.signal) {
          let f3 = { once: true, [K0]: this, [Q0]: true };
          r6.signal.addEventListener("abort", () => s7.abort(), f3);
        }
        let a3 = false;
        try {
          for await (let f3 of this) {
            var c5;
            if (a3 = true, r6 != null && (c5 = r6.signal) !== null && c5 !== void 0 && c5.aborted) throw new Et();
            i6 ? e8 = await t5(e8, f3, { signal: o6 }) : (e8 = f3, i6 = true);
          }
          if (!a3 && !i6) throw new ma();
        } finally {
          s7.abort();
        }
        return e8;
      }
      async function dS(t5) {
        t5 != null && kr(t5, "options"), t5?.signal != null && Rr(t5.signal, "options.signal");
        let e8 = [];
        for await (let n6 of this) {
          var r6;
          if (t5 != null && (r6 = t5.signal) !== null && r6 !== void 0 && r6.aborted) throw new Et(void 0, { cause: t5.signal.reason });
          rS(e8, n6);
        }
        return e8;
      }
      function pS(t5, e8) {
        let r6 = co.call(this, t5, e8);
        return async function* () {
          for await (let i6 of r6) yield* i6;
        }.call(this);
      }
      function yp(t5) {
        if (t5 = iS(t5), oS(t5)) return 0;
        if (t5 < 0) throw new z0("number", ">= 0", t5);
        return t5;
      }
      function yS(t5, e8 = void 0) {
        return e8 != null && kr(e8, "options"), e8?.signal != null && Rr(e8.signal, "options.signal"), t5 = yp(t5), async function* () {
          var n6;
          if (e8 != null && (n6 = e8.signal) !== null && n6 !== void 0 && n6.aborted) throw new Et();
          for await (let s7 of this) {
            var i6;
            if (e8 != null && (i6 = e8.signal) !== null && i6 !== void 0 && i6.aborted) throw new Et();
            t5-- <= 0 && (yield s7);
          }
        }.call(this);
      }
      function gS(t5, e8 = void 0) {
        return e8 != null && kr(e8, "options"), e8?.signal != null && Rr(e8.signal, "options.signal"), t5 = yp(t5), async function* () {
          var n6;
          if (e8 != null && (n6 = e8.signal) !== null && n6 !== void 0 && n6.aborted) throw new Et();
          for await (let s7 of this) {
            var i6;
            if (e8 != null && (i6 = e8.signal) !== null && i6 !== void 0 && i6.aborted) throw new Et();
            if (t5-- > 0 && (yield s7), t5 <= 0) return;
          }
        }.call(this);
      }
      va.exports.streamReturningOperators = { asIndexedPairs: tS(uS, "readable.asIndexedPairs will be removed in a future version."), drop: yS, filter: _a, flatMap: pS, map: co, take: gS, compose: aS };
      va.exports.promiseReturningOperators = { every: lS, forEach: fS, reduce: hS, toArray: dS, some: pp, find: cS };
    });
    Sa = D((BB, bp) => {
      "use strict";
      A2();
      x2();
      I2();
      var { ArrayPrototypePop: bS, Promise: wS } = Ee(), { isIterable: mS, isNodeStream: _S, isWebStream: vS } = mt(), { pipelineImpl: SS } = so(), { finished: ES } = Ut();
      Ea();
      function AS(...t5) {
        return new wS((e8, r6) => {
          let n6, i6, s7 = t5[t5.length - 1];
          if (s7 && typeof s7 == "object" && !_S(s7) && !mS(s7) && !vS(s7)) {
            let o6 = bS(t5);
            n6 = o6.signal, i6 = o6.end;
          }
          SS(t5, (o6, a3) => {
            o6 ? r6(o6) : e8(a3);
          }, { signal: n6, end: i6 });
        });
      }
      bp.exports = { finished: ES, pipeline: AS };
    });
    Ea = D(($B, xp) => {
      "use strict";
      A2();
      x2();
      I2();
      var { Buffer: IS } = (ke(), me(qe)), { ObjectDefineProperty: Ft, ObjectKeys: _p, ReflectApply: vp } = Ee(), { promisify: { custom: Sp } } = $e(), { streamReturningOperators: wp, promiseReturningOperators: mp } = gp(), { codes: { ERR_ILLEGAL_CONSTRUCTOR: Ep } } = De(), xS = wa(), { setDefaultHighWaterMark: TS, getDefaultHighWaterMark: PS } = Cn(), { pipeline: Ap } = so(), { destroyer: OS } = Ar(), Ip = Ut(), Aa = Sa(), Wn = mt(), Se = xp.exports = $i().Stream;
      Se.isDestroyed = Wn.isDestroyed;
      Se.isDisturbed = Wn.isDisturbed;
      Se.isErrored = Wn.isErrored;
      Se.isReadable = Wn.isReadable;
      Se.isWritable = Wn.isWritable;
      Se.Readable = Nn();
      for (let t5 of _p(wp)) {
        let r6 = function(...n6) {
          if (new.target) throw Ep();
          return Se.Readable.from(vp(e8, this, n6));
        }, e8 = wp[t5];
        Ft(r6, "name", { __proto__: null, value: e8.name }), Ft(r6, "length", { __proto__: null, value: e8.length }), Ft(Se.Readable.prototype, t5, { __proto__: null, value: r6, enumerable: false, configurable: true, writable: true });
      }
      for (let t5 of _p(mp)) {
        let r6 = function(...n6) {
          if (new.target) throw Ep();
          return vp(e8, this, n6);
        }, e8 = mp[t5];
        Ft(r6, "name", { __proto__: null, value: e8.name }), Ft(r6, "length", { __proto__: null, value: e8.length }), Ft(Se.Readable.prototype, t5, { __proto__: null, value: r6, enumerable: false, configurable: true, writable: true });
      }
      Se.Writable = ro();
      Se.Duplex = St();
      Se.Transform = oa();
      Se.PassThrough = aa();
      Se.pipeline = Ap;
      var { addAbortSignal: RS } = kn();
      Se.addAbortSignal = RS;
      Se.finished = Ip;
      Se.destroy = OS;
      Se.compose = xS;
      Se.setDefaultHighWaterMark = TS;
      Se.getDefaultHighWaterMark = PS;
      Ft(Se, "promises", { __proto__: null, configurable: true, enumerable: true, get() {
        return Aa;
      } });
      Ft(Ap, Sp, { __proto__: null, enumerable: true, get() {
        return Aa.pipeline;
      } });
      Ft(Ip, Sp, { __proto__: null, enumerable: true, get() {
        return Aa.finished;
      } });
      Se.Stream = Se;
      Se._isUint8Array = function(e8) {
        return e8 instanceof Uint8Array;
      };
      Se._uint8ArrayToBuffer = function(e8) {
        return IS.from(e8.buffer, e8.byteOffset, e8.byteLength);
      };
    });
    or = D((ZB, Pe) => {
      "use strict";
      A2();
      x2();
      I2();
      var Be = Ea(), kS = Sa(), CS = Be.Readable.destroy;
      Pe.exports = Be.Readable;
      Pe.exports._uint8ArrayToBuffer = Be._uint8ArrayToBuffer;
      Pe.exports._isUint8Array = Be._isUint8Array;
      Pe.exports.isDisturbed = Be.isDisturbed;
      Pe.exports.isErrored = Be.isErrored;
      Pe.exports.isReadable = Be.isReadable;
      Pe.exports.Readable = Be.Readable;
      Pe.exports.Writable = Be.Writable;
      Pe.exports.Duplex = Be.Duplex;
      Pe.exports.Transform = Be.Transform;
      Pe.exports.PassThrough = Be.PassThrough;
      Pe.exports.addAbortSignal = Be.addAbortSignal;
      Pe.exports.finished = Be.finished;
      Pe.exports.destroy = Be.destroy;
      Pe.exports.destroy = CS;
      Pe.exports.pipeline = Be.pipeline;
      Pe.exports.compose = Be.compose;
      Object.defineProperty(Be, "promises", { configurable: true, enumerable: true, get() {
        return kS;
      } });
      Pe.exports.Stream = Be.Stream;
      Pe.exports.default = Pe.exports;
    });
    Tp = D((lM, Ia) => {
      A2();
      x2();
      I2();
      typeof Object.create == "function" ? Ia.exports = function(e8, r6) {
        r6 && (e8.super_ = r6, e8.prototype = Object.create(r6.prototype, { constructor: { value: e8, enumerable: false, writable: true, configurable: true } }));
      } : Ia.exports = function(e8, r6) {
        if (r6) {
          e8.super_ = r6;
          var n6 = function() {
          };
          n6.prototype = r6.prototype, e8.prototype = new n6(), e8.prototype.constructor = e8;
        }
      };
    });
    Rp = D((mM, Op) => {
      "use strict";
      A2();
      x2();
      I2();
      var { Buffer: ft } = (ke(), me(qe)), Pp = Symbol.for("BufferList");
      function be(t5) {
        if (!(this instanceof be)) return new be(t5);
        be._init.call(this, t5);
      }
      be._init = function(e8) {
        Object.defineProperty(this, Pp, { value: true }), this._bufs = [], this.length = 0, e8 && this.append(e8);
      };
      be.prototype._new = function(e8) {
        return new be(e8);
      };
      be.prototype._offset = function(e8) {
        if (e8 === 0) return [0, 0];
        let r6 = 0;
        for (let n6 = 0; n6 < this._bufs.length; n6++) {
          let i6 = r6 + this._bufs[n6].length;
          if (e8 < i6 || n6 === this._bufs.length - 1) return [n6, e8 - r6];
          r6 = i6;
        }
      };
      be.prototype._reverseOffset = function(t5) {
        let e8 = t5[0], r6 = t5[1];
        for (let n6 = 0; n6 < e8; n6++) r6 += this._bufs[n6].length;
        return r6;
      };
      be.prototype.getBuffers = function() {
        return this._bufs;
      };
      be.prototype.get = function(e8) {
        if (e8 > this.length || e8 < 0) return;
        let r6 = this._offset(e8);
        return this._bufs[r6[0]][r6[1]];
      };
      be.prototype.slice = function(e8, r6) {
        return typeof e8 == "number" && e8 < 0 && (e8 += this.length), typeof r6 == "number" && r6 < 0 && (r6 += this.length), this.copy(null, 0, e8, r6);
      };
      be.prototype.copy = function(e8, r6, n6, i6) {
        if ((typeof n6 != "number" || n6 < 0) && (n6 = 0), (typeof i6 != "number" || i6 > this.length) && (i6 = this.length), n6 >= this.length || i6 <= 0) return e8 || ft.alloc(0);
        let s7 = !!e8, o6 = this._offset(n6), a3 = i6 - n6, c5 = a3, f3 = s7 && r6 || 0, h3 = o6[1];
        if (n6 === 0 && i6 === this.length) {
          if (!s7) return this._bufs.length === 1 ? this._bufs[0] : ft.concat(this._bufs, this.length);
          for (let d3 = 0; d3 < this._bufs.length; d3++) this._bufs[d3].copy(e8, f3), f3 += this._bufs[d3].length;
          return e8;
        }
        if (c5 <= this._bufs[o6[0]].length - h3) return s7 ? this._bufs[o6[0]].copy(e8, r6, h3, h3 + c5) : this._bufs[o6[0]].slice(h3, h3 + c5);
        s7 || (e8 = ft.allocUnsafe(a3));
        for (let d3 = o6[0]; d3 < this._bufs.length; d3++) {
          let w2 = this._bufs[d3].length - h3;
          if (c5 > w2) this._bufs[d3].copy(e8, f3, h3), f3 += w2;
          else {
            this._bufs[d3].copy(e8, f3, h3, h3 + c5), f3 += w2;
            break;
          }
          c5 -= w2, h3 && (h3 = 0);
        }
        return e8.length > f3 ? e8.slice(0, f3) : e8;
      };
      be.prototype.shallowSlice = function(e8, r6) {
        if (e8 = e8 || 0, r6 = typeof r6 != "number" ? this.length : r6, e8 < 0 && (e8 += this.length), r6 < 0 && (r6 += this.length), e8 === r6) return this._new();
        let n6 = this._offset(e8), i6 = this._offset(r6), s7 = this._bufs.slice(n6[0], i6[0] + 1);
        return i6[1] === 0 ? s7.pop() : s7[s7.length - 1] = s7[s7.length - 1].slice(0, i6[1]), n6[1] !== 0 && (s7[0] = s7[0].slice(n6[1])), this._new(s7);
      };
      be.prototype.toString = function(e8, r6, n6) {
        return this.slice(r6, n6).toString(e8);
      };
      be.prototype.consume = function(e8) {
        if (e8 = Math.trunc(e8), Number.isNaN(e8) || e8 <= 0) return this;
        for (; this._bufs.length; ) if (e8 >= this._bufs[0].length) e8 -= this._bufs[0].length, this.length -= this._bufs[0].length, this._bufs.shift();
        else {
          this._bufs[0] = this._bufs[0].slice(e8), this.length -= e8;
          break;
        }
        return this;
      };
      be.prototype.duplicate = function() {
        let e8 = this._new();
        for (let r6 = 0; r6 < this._bufs.length; r6++) e8.append(this._bufs[r6]);
        return e8;
      };
      be.prototype.append = function(e8) {
        return this._attach(e8, be.prototype._appendBuffer);
      };
      be.prototype.prepend = function(e8) {
        return this._attach(e8, be.prototype._prependBuffer, true);
      };
      be.prototype._attach = function(e8, r6, n6) {
        if (e8 == null) return this;
        if (e8.buffer) r6.call(this, ft.from(e8.buffer, e8.byteOffset, e8.byteLength));
        else if (Array.isArray(e8)) {
          let [i6, s7] = n6 ? [e8.length - 1, -1] : [0, 1];
          for (let o6 = i6; o6 >= 0 && o6 < e8.length; o6 += s7) this._attach(e8[o6], r6, n6);
        } else if (this._isBufferList(e8)) {
          let [i6, s7] = n6 ? [e8._bufs.length - 1, -1] : [0, 1];
          for (let o6 = i6; o6 >= 0 && o6 < e8._bufs.length; o6 += s7) this._attach(e8._bufs[o6], r6, n6);
        } else typeof e8 == "number" && (e8 = e8.toString()), r6.call(this, ft.from(e8));
        return this;
      };
      be.prototype._appendBuffer = function(e8) {
        this._bufs.push(e8), this.length += e8.length;
      };
      be.prototype._prependBuffer = function(e8) {
        this._bufs.unshift(e8), this.length += e8.length;
      };
      be.prototype.indexOf = function(t5, e8, r6) {
        if (r6 === void 0 && typeof e8 == "string" && (r6 = e8, e8 = void 0), typeof t5 == "function" || Array.isArray(t5)) throw new TypeError('The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.');
        if (typeof t5 == "number" ? t5 = ft.from([t5]) : typeof t5 == "string" ? t5 = ft.from(t5, r6) : this._isBufferList(t5) ? t5 = t5.slice() : Array.isArray(t5.buffer) ? t5 = ft.from(t5.buffer, t5.byteOffset, t5.byteLength) : ft.isBuffer(t5) || (t5 = ft.from(t5)), e8 = Number(e8 || 0), isNaN(e8) && (e8 = 0), e8 < 0 && (e8 = this.length + e8), e8 < 0 && (e8 = 0), t5.length === 0) return e8 > this.length ? this.length : e8;
        let n6 = this._offset(e8), i6 = n6[0], s7 = n6[1];
        for (; i6 < this._bufs.length; i6++) {
          let o6 = this._bufs[i6];
          for (; s7 < o6.length; ) if (o6.length - s7 >= t5.length) {
            let c5 = o6.indexOf(t5, s7);
            if (c5 !== -1) return this._reverseOffset([i6, c5]);
            s7 = o6.length - t5.length + 1;
          } else {
            let c5 = this._reverseOffset([i6, s7]);
            if (this._match(c5, t5)) return c5;
            s7++;
          }
          s7 = 0;
        }
        return -1;
      };
      be.prototype._match = function(t5, e8) {
        if (this.length - t5 < e8.length) return false;
        for (let r6 = 0; r6 < e8.length; r6++) if (this.get(t5 + r6) !== e8[r6]) return false;
        return true;
      };
      (function() {
        let t5 = { readDoubleBE: 8, readDoubleLE: 8, readFloatBE: 4, readFloatLE: 4, readBigInt64BE: 8, readBigInt64LE: 8, readBigUInt64BE: 8, readBigUInt64LE: 8, readInt32BE: 4, readInt32LE: 4, readUInt32BE: 4, readUInt32LE: 4, readInt16BE: 2, readInt16LE: 2, readUInt16BE: 2, readUInt16LE: 2, readInt8: 1, readUInt8: 1, readIntBE: null, readIntLE: null, readUIntBE: null, readUIntLE: null };
        for (let e8 in t5) (function(r6) {
          t5[r6] === null ? be.prototype[r6] = function(n6, i6) {
            return this.slice(n6, n6 + i6)[r6](0, i6);
          } : be.prototype[r6] = function(n6 = 0) {
            return this.slice(n6, n6 + t5[r6])[r6](0);
          };
        })(e8);
      })();
      be.prototype._isBufferList = function(e8) {
        return e8 instanceof be || be.isBufferList(e8);
      };
      be.isBufferList = function(e8) {
        return e8 != null && e8[Pp];
      };
      Op.exports = be;
    });
    kp = D((OM, fo) => {
      "use strict";
      A2();
      x2();
      I2();
      var xa = or().Duplex, BS = Tp(), $n = Rp();
      function Fe(t5) {
        if (!(this instanceof Fe)) return new Fe(t5);
        if (typeof t5 == "function") {
          this._callback = t5;
          let e8 = function(n6) {
            this._callback && (this._callback(n6), this._callback = null);
          }.bind(this);
          this.on("pipe", function(n6) {
            n6.on("error", e8);
          }), this.on("unpipe", function(n6) {
            n6.removeListener("error", e8);
          }), t5 = null;
        }
        $n._init.call(this, t5), xa.call(this);
      }
      BS(Fe, xa);
      Object.assign(Fe.prototype, $n.prototype);
      Fe.prototype._new = function(e8) {
        return new Fe(e8);
      };
      Fe.prototype._write = function(e8, r6, n6) {
        this._appendBuffer(e8), typeof n6 == "function" && n6();
      };
      Fe.prototype._read = function(e8) {
        if (!this.length) return this.push(null);
        e8 = Math.min(e8, this.length), this.push(this.slice(0, e8)), this.consume(e8);
      };
      Fe.prototype.end = function(e8) {
        xa.prototype.end.call(this, e8), this._callback && (this._callback(null, this.slice()), this._callback = null);
      };
      Fe.prototype._destroy = function(e8, r6) {
        this._bufs.length = 0, this.length = 0, r6(e8);
      };
      Fe.prototype._isBufferList = function(e8) {
        return e8 instanceof Fe || e8 instanceof $n || Fe.isBufferList(e8);
      };
      Fe.isBufferList = $n.isBufferList;
      fo.exports = Fe;
      fo.exports.BufferListStream = Fe;
      fo.exports.BufferList = $n;
    });
    Bp = D((DM, Cp) => {
      A2();
      x2();
      I2();
      var Ta = class {
        constructor() {
          this.cmd = null, this.retain = false, this.qos = 0, this.dup = false, this.length = -1, this.topic = null, this.payload = null;
        }
      };
      Cp.exports = Ta;
    });
    Pa = D((QM, Mp) => {
      A2();
      x2();
      I2();
      var z2 = Mp.exports, { Buffer: Ke } = (ke(), me(qe));
      z2.types = { 0: "reserved", 1: "connect", 2: "connack", 3: "publish", 4: "puback", 5: "pubrec", 6: "pubrel", 7: "pubcomp", 8: "subscribe", 9: "suback", 10: "unsubscribe", 11: "unsuback", 12: "pingreq", 13: "pingresp", 14: "disconnect", 15: "auth" };
      z2.requiredHeaderFlags = { 1: 0, 2: 0, 4: 0, 5: 0, 6: 2, 7: 0, 8: 2, 9: 0, 10: 2, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0 };
      z2.requiredHeaderFlagsErrors = {};
      for (let t5 in z2.requiredHeaderFlags) {
        let e8 = z2.requiredHeaderFlags[t5];
        z2.requiredHeaderFlagsErrors[t5] = "Invalid header flag bits, must be 0x" + e8.toString(16) + " for " + z2.types[t5] + " packet";
      }
      z2.codes = {};
      for (let t5 in z2.types) {
        let e8 = z2.types[t5];
        z2.codes[e8] = t5;
      }
      z2.CMD_SHIFT = 4;
      z2.CMD_MASK = 240;
      z2.DUP_MASK = 8;
      z2.QOS_MASK = 3;
      z2.QOS_SHIFT = 1;
      z2.RETAIN_MASK = 1;
      z2.VARBYTEINT_MASK = 127;
      z2.VARBYTEINT_FIN_MASK = 128;
      z2.VARBYTEINT_MAX = 268435455;
      z2.SESSIONPRESENT_MASK = 1;
      z2.SESSIONPRESENT_HEADER = Ke.from([z2.SESSIONPRESENT_MASK]);
      z2.CONNACK_HEADER = Ke.from([z2.codes.connack << z2.CMD_SHIFT]);
      z2.USERNAME_MASK = 128;
      z2.PASSWORD_MASK = 64;
      z2.WILL_RETAIN_MASK = 32;
      z2.WILL_QOS_MASK = 24;
      z2.WILL_QOS_SHIFT = 3;
      z2.WILL_FLAG_MASK = 4;
      z2.CLEAN_SESSION_MASK = 2;
      z2.CONNECT_HEADER = Ke.from([z2.codes.connect << z2.CMD_SHIFT]);
      z2.properties = { sessionExpiryInterval: 17, willDelayInterval: 24, receiveMaximum: 33, maximumPacketSize: 39, topicAliasMaximum: 34, requestResponseInformation: 25, requestProblemInformation: 23, userProperties: 38, authenticationMethod: 21, authenticationData: 22, payloadFormatIndicator: 1, messageExpiryInterval: 2, contentType: 3, responseTopic: 8, correlationData: 9, maximumQoS: 36, retainAvailable: 37, assignedClientIdentifier: 18, reasonString: 31, wildcardSubscriptionAvailable: 40, subscriptionIdentifiersAvailable: 41, sharedSubscriptionAvailable: 42, serverKeepAlive: 19, responseInformation: 26, serverReference: 28, topicAlias: 35, subscriptionIdentifier: 11 };
      z2.propertiesCodes = {};
      for (let t5 in z2.properties) {
        let e8 = z2.properties[t5];
        z2.propertiesCodes[e8] = t5;
      }
      z2.propertiesTypes = { sessionExpiryInterval: "int32", willDelayInterval: "int32", receiveMaximum: "int16", maximumPacketSize: "int32", topicAliasMaximum: "int16", requestResponseInformation: "byte", requestProblemInformation: "byte", userProperties: "pair", authenticationMethod: "string", authenticationData: "binary", payloadFormatIndicator: "byte", messageExpiryInterval: "int32", contentType: "string", responseTopic: "string", correlationData: "binary", maximumQoS: "int8", retainAvailable: "byte", assignedClientIdentifier: "string", reasonString: "string", wildcardSubscriptionAvailable: "byte", subscriptionIdentifiersAvailable: "byte", sharedSubscriptionAvailable: "byte", serverKeepAlive: "int16", responseInformation: "string", serverReference: "string", topicAlias: "int16", subscriptionIdentifier: "var" };
      function sr(t5) {
        return [0, 1, 2].map((e8) => [0, 1].map((r6) => [0, 1].map((n6) => {
          let i6 = Ke.alloc(1);
          return i6.writeUInt8(z2.codes[t5] << z2.CMD_SHIFT | (r6 ? z2.DUP_MASK : 0) | e8 << z2.QOS_SHIFT | n6, 0, true), i6;
        })));
      }
      z2.PUBLISH_HEADER = sr("publish");
      z2.SUBSCRIBE_HEADER = sr("subscribe");
      z2.SUBSCRIBE_OPTIONS_QOS_MASK = 3;
      z2.SUBSCRIBE_OPTIONS_NL_MASK = 1;
      z2.SUBSCRIBE_OPTIONS_NL_SHIFT = 2;
      z2.SUBSCRIBE_OPTIONS_RAP_MASK = 1;
      z2.SUBSCRIBE_OPTIONS_RAP_SHIFT = 3;
      z2.SUBSCRIBE_OPTIONS_RH_MASK = 3;
      z2.SUBSCRIBE_OPTIONS_RH_SHIFT = 4;
      z2.SUBSCRIBE_OPTIONS_RH = [0, 16, 32];
      z2.SUBSCRIBE_OPTIONS_NL = 4;
      z2.SUBSCRIBE_OPTIONS_RAP = 8;
      z2.SUBSCRIBE_OPTIONS_QOS = [0, 1, 2];
      z2.UNSUBSCRIBE_HEADER = sr("unsubscribe");
      z2.ACKS = { unsuback: sr("unsuback"), puback: sr("puback"), pubcomp: sr("pubcomp"), pubrel: sr("pubrel"), pubrec: sr("pubrec") };
      z2.SUBACK_HEADER = Ke.from([z2.codes.suback << z2.CMD_SHIFT]);
      z2.VERSION3 = Ke.from([3]);
      z2.VERSION4 = Ke.from([4]);
      z2.VERSION5 = Ke.from([5]);
      z2.VERSION131 = Ke.from([131]);
      z2.VERSION132 = Ke.from([132]);
      z2.QOS = [0, 1, 2].map((t5) => Ke.from([t5]));
      z2.EMPTY = { pingreq: Ke.from([z2.codes.pingreq << 4, 0]), pingresp: Ke.from([z2.codes.pingresp << 4, 0]), disconnect: Ke.from([z2.codes.disconnect << 4, 0]) };
      z2.MQTT5_PUBACK_PUBREC_CODES = { 0: "Success", 16: "No matching subscribers", 128: "Unspecified error", 131: "Implementation specific error", 135: "Not authorized", 144: "Topic Name invalid", 145: "Packet identifier in use", 151: "Quota exceeded", 153: "Payload format invalid" };
      z2.MQTT5_PUBREL_PUBCOMP_CODES = { 0: "Success", 146: "Packet Identifier not found" };
      z2.MQTT5_SUBACK_CODES = { 0: "Granted QoS 0", 1: "Granted QoS 1", 2: "Granted QoS 2", 128: "Unspecified error", 131: "Implementation specific error", 135: "Not authorized", 143: "Topic Filter invalid", 145: "Packet Identifier in use", 151: "Quota exceeded", 158: "Shared Subscriptions not supported", 161: "Subscription Identifiers not supported", 162: "Wildcard Subscriptions not supported" };
      z2.MQTT5_UNSUBACK_CODES = { 0: "Success", 17: "No subscription existed", 128: "Unspecified error", 131: "Implementation specific error", 135: "Not authorized", 143: "Topic Filter invalid", 145: "Packet Identifier in use" };
      z2.MQTT5_DISCONNECT_CODES = { 0: "Normal disconnection", 4: "Disconnect with Will Message", 128: "Unspecified error", 129: "Malformed Packet", 130: "Protocol Error", 131: "Implementation specific error", 135: "Not authorized", 137: "Server busy", 139: "Server shutting down", 141: "Keep Alive timeout", 142: "Session taken over", 143: "Topic Filter invalid", 144: "Topic Name invalid", 147: "Receive Maximum exceeded", 148: "Topic Alias invalid", 149: "Packet too large", 150: "Message rate too high", 151: "Quota exceeded", 152: "Administrative action", 153: "Payload format invalid", 154: "Retain not supported", 155: "QoS not supported", 156: "Use another server", 157: "Server moved", 158: "Shared Subscriptions not supported", 159: "Connection rate exceeded", 160: "Maximum connect time", 161: "Subscription Identifiers not supported", 162: "Wildcard Subscriptions not supported" };
      z2.MQTT5_AUTH_CODES = { 0: "Success", 24: "Continue authentication", 25: "Re-authenticate" };
    });
    qp = D((o22, Np) => {
      A2();
      x2();
      I2();
      var fn = 1e3, hn = fn * 60, dn = hn * 60, Cr = dn * 24, MS = Cr * 7, NS = Cr * 365.25;
      Np.exports = function(t5, e8) {
        e8 = e8 || {};
        var r6 = typeof t5;
        if (r6 === "string" && t5.length > 0) return qS(t5);
        if (r6 === "number" && isFinite(t5)) return e8.long ? US(t5) : LS(t5);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t5));
      };
      function qS(t5) {
        if (t5 = String(t5), !(t5.length > 100)) {
          var e8 = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t5);
          if (e8) {
            var r6 = parseFloat(e8[1]), n6 = (e8[2] || "ms").toLowerCase();
            switch (n6) {
              case "years":
              case "year":
              case "yrs":
              case "yr":
              case "y":
                return r6 * NS;
              case "weeks":
              case "week":
              case "w":
                return r6 * MS;
              case "days":
              case "day":
              case "d":
                return r6 * Cr;
              case "hours":
              case "hour":
              case "hrs":
              case "hr":
              case "h":
                return r6 * dn;
              case "minutes":
              case "minute":
              case "mins":
              case "min":
              case "m":
                return r6 * hn;
              case "seconds":
              case "second":
              case "secs":
              case "sec":
              case "s":
                return r6 * fn;
              case "milliseconds":
              case "millisecond":
              case "msecs":
              case "msec":
              case "ms":
                return r6;
              default:
                return;
            }
          }
        }
      }
      function LS(t5) {
        var e8 = Math.abs(t5);
        return e8 >= Cr ? Math.round(t5 / Cr) + "d" : e8 >= dn ? Math.round(t5 / dn) + "h" : e8 >= hn ? Math.round(t5 / hn) + "m" : e8 >= fn ? Math.round(t5 / fn) + "s" : t5 + "ms";
      }
      function US(t5) {
        var e8 = Math.abs(t5);
        return e8 >= Cr ? ho(t5, e8, Cr, "day") : e8 >= dn ? ho(t5, e8, dn, "hour") : e8 >= hn ? ho(t5, e8, hn, "minute") : e8 >= fn ? ho(t5, e8, fn, "second") : t5 + " ms";
      }
      function ho(t5, e8, r6, n6) {
        var i6 = e8 >= r6 * 1.5;
        return Math.round(t5 / r6) + " " + n6 + (i6 ? "s" : "");
      }
    });
    Up = D((y22, Lp) => {
      A2();
      x2();
      I2();
      function DS(t5) {
        r6.debug = r6, r6.default = r6, r6.coerce = c5, r6.disable = o6, r6.enable = i6, r6.enabled = a3, r6.humanize = qp(), r6.destroy = f3, Object.keys(t5).forEach((h3) => {
          r6[h3] = t5[h3];
        }), r6.names = [], r6.skips = [], r6.formatters = {};
        function e8(h3) {
          let d3 = 0;
          for (let w2 = 0; w2 < h3.length; w2++) d3 = (d3 << 5) - d3 + h3.charCodeAt(w2), d3 |= 0;
          return r6.colors[Math.abs(d3) % r6.colors.length];
        }
        r6.selectColor = e8;
        function r6(h3) {
          let d3, w2 = null, y3, P2;
          function E2(...b3) {
            if (!E2.enabled) return;
            let m2 = E2, v2 = Number(/* @__PURE__ */ new Date()), R2 = v2 - (d3 || v2);
            m2.diff = R2, m2.prev = d3, m2.curr = v2, d3 = v2, b3[0] = r6.coerce(b3[0]), typeof b3[0] != "string" && b3.unshift("%O");
            let T2 = 0;
            b3[0] = b3[0].replace(/%([a-zA-Z%])/g, (O, _2) => {
              if (O === "%%") return "%";
              T2++;
              let q = r6.formatters[_2];
              if (typeof q == "function") {
                let $2 = b3[T2];
                O = q.call(m2, $2), b3.splice(T2, 1), T2--;
              }
              return O;
            }), r6.formatArgs.call(m2, b3), (m2.log || r6.log).apply(m2, b3);
          }
          return E2.namespace = h3, E2.useColors = r6.useColors(), E2.color = r6.selectColor(h3), E2.extend = n6, E2.destroy = r6.destroy, Object.defineProperty(E2, "enabled", { enumerable: true, configurable: false, get: () => w2 !== null ? w2 : (y3 !== r6.namespaces && (y3 = r6.namespaces, P2 = r6.enabled(h3)), P2), set: (b3) => {
            w2 = b3;
          } }), typeof r6.init == "function" && r6.init(E2), E2;
        }
        function n6(h3, d3) {
          let w2 = r6(this.namespace + (typeof d3 > "u" ? ":" : d3) + h3);
          return w2.log = this.log, w2;
        }
        function i6(h3) {
          r6.save(h3), r6.namespaces = h3, r6.names = [], r6.skips = [];
          let d3 = (typeof h3 == "string" ? h3 : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
          for (let w2 of d3) w2[0] === "-" ? r6.skips.push(w2.slice(1)) : r6.names.push(w2);
        }
        function s7(h3, d3) {
          let w2 = 0, y3 = 0, P2 = -1, E2 = 0;
          for (; w2 < h3.length; ) if (y3 < d3.length && (d3[y3] === h3[w2] || d3[y3] === "*")) d3[y3] === "*" ? (P2 = y3, E2 = w2, y3++) : (w2++, y3++);
          else if (P2 !== -1) y3 = P2 + 1, E2++, w2 = E2;
          else return false;
          for (; y3 < d3.length && d3[y3] === "*"; ) y3++;
          return y3 === d3.length;
        }
        function o6() {
          let h3 = [...r6.names, ...r6.skips.map((d3) => "-" + d3)].join(",");
          return r6.enable(""), h3;
        }
        function a3(h3) {
          for (let d3 of r6.skips) if (s7(h3, d3)) return false;
          for (let d3 of r6.names) if (s7(h3, d3)) return true;
          return false;
        }
        function c5(h3) {
          return h3 instanceof Error ? h3.stack || h3.message : h3;
        }
        function f3() {
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
        return r6.enable(r6.load()), r6;
      }
      Lp.exports = DS;
    });
    At = D((Qe, po) => {
      A2();
      x2();
      I2();
      Qe.formatArgs = FS;
      Qe.save = WS;
      Qe.load = $S;
      Qe.useColors = jS;
      Qe.storage = HS();
      Qe.destroy = /* @__PURE__ */ (() => {
        let t5 = false;
        return () => {
          t5 || (t5 = true, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
        };
      })();
      Qe.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"];
      function jS() {
        if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return true;
        if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return false;
        let t5;
        return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && (t5 = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(t5[1], 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }
      function FS(t5) {
        if (t5[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t5[0] + (this.useColors ? "%c " : " ") + "+" + po.exports.humanize(this.diff), !this.useColors) return;
        let e8 = "color: " + this.color;
        t5.splice(1, 0, e8, "color: inherit");
        let r6 = 0, n6 = 0;
        t5[0].replace(/%[a-zA-Z%]/g, (i6) => {
          i6 !== "%%" && (r6++, i6 === "%c" && (n6 = r6));
        }), t5.splice(n6, 0, e8);
      }
      Qe.log = console.debug || console.log || (() => {
      });
      function WS(t5) {
        try {
          t5 ? Qe.storage.setItem("debug", t5) : Qe.storage.removeItem("debug");
        } catch {
        }
      }
      function $S() {
        let t5;
        try {
          t5 = Qe.storage.getItem("debug") || Qe.storage.getItem("DEBUG");
        } catch {
        }
        return !t5 && typeof M2 < "u" && "env" in M2 && (t5 = M2.env.DEBUG), t5;
      }
      function HS() {
        try {
          return localStorage;
        } catch {
        }
      }
      po.exports = Up()(Qe);
      var { formatters: VS } = po.exports;
      VS.j = function(t5) {
        try {
          return JSON.stringify(t5);
        } catch (e8) {
          return "[UnexpectedJSONParseError]: " + e8.message;
        }
      };
    });
    Fp = D((M22, jp) => {
      A2();
      x2();
      I2();
      var GS = kp(), { EventEmitter: zS } = (er(), me(Zt)), Dp = Bp(), de = Pa(), ae = At()("mqtt-packet:parser"), Oa = class t5 extends zS {
        constructor() {
          super(), this.parser = this.constructor.parser;
        }
        static parser(e8) {
          return this instanceof t5 ? (this.settings = e8 || {}, this._states = ["_parseHeader", "_parseLength", "_parsePayload", "_newPacket"], this._resetState(), this) : new t5().parser(e8);
        }
        _resetState() {
          ae("_resetState: resetting packet, error, _list, and _stateCounter"), this.packet = new Dp(), this.error = null, this._list = GS(), this._stateCounter = 0;
        }
        parse(e8) {
          for (this.error && this._resetState(), this._list.append(e8), ae("parse: current state: %s", this._states[this._stateCounter]); (this.packet.length !== -1 || this._list.length > 0) && this[this._states[this._stateCounter]]() && !this.error; ) this._stateCounter++, ae("parse: state complete. _stateCounter is now: %d", this._stateCounter), ae("parse: packet.length: %d, buffer list length: %d", this.packet.length, this._list.length), this._stateCounter >= this._states.length && (this._stateCounter = 0);
          return ae("parse: exited while loop. packet: %d, buffer list length: %d", this.packet.length, this._list.length), this._list.length;
        }
        _parseHeader() {
          let e8 = this._list.readUInt8(0), r6 = e8 >> de.CMD_SHIFT;
          this.packet.cmd = de.types[r6];
          let n6 = e8 & 15, i6 = de.requiredHeaderFlags[r6];
          return i6 != null && n6 !== i6 ? this._emitError(new Error(de.requiredHeaderFlagsErrors[r6])) : (this.packet.retain = (e8 & de.RETAIN_MASK) !== 0, this.packet.qos = e8 >> de.QOS_SHIFT & de.QOS_MASK, this.packet.qos > 2 ? this._emitError(new Error("Packet must not have both QoS bits set to 1")) : (this.packet.dup = (e8 & de.DUP_MASK) !== 0, ae("_parseHeader: packet: %o", this.packet), this._list.consume(1), true));
        }
        _parseLength() {
          let e8 = this._parseVarByteNum(true);
          return e8 && (this.packet.length = e8.value, this._list.consume(e8.bytes)), ae("_parseLength %d", e8.value), !!e8;
        }
        _parsePayload() {
          ae("_parsePayload: payload %O", this._list);
          let e8 = false;
          if (this.packet.length === 0 || this._list.length >= this.packet.length) {
            switch (this._pos = 0, this.packet.cmd) {
              case "connect":
                this._parseConnect();
                break;
              case "connack":
                this._parseConnack();
                break;
              case "publish":
                this._parsePublish();
                break;
              case "puback":
              case "pubrec":
              case "pubrel":
              case "pubcomp":
                this._parseConfirmation();
                break;
              case "subscribe":
                this._parseSubscribe();
                break;
              case "suback":
                this._parseSuback();
                break;
              case "unsubscribe":
                this._parseUnsubscribe();
                break;
              case "unsuback":
                this._parseUnsuback();
                break;
              case "pingreq":
              case "pingresp":
                break;
              case "disconnect":
                this._parseDisconnect();
                break;
              case "auth":
                this._parseAuth();
                break;
              default:
                this._emitError(new Error("Not supported"));
            }
            e8 = true;
          }
          return ae("_parsePayload complete result: %s", e8), e8;
        }
        _parseConnect() {
          ae("_parseConnect");
          let e8, r6, n6, i6, s7 = {}, o6 = this.packet, a3 = this._parseString();
          if (a3 === null) return this._emitError(new Error("Cannot parse protocolId"));
          if (a3 !== "MQTT" && a3 !== "MQIsdp") return this._emitError(new Error("Invalid protocolId"));
          if (o6.protocolId = a3, this._pos >= this._list.length) return this._emitError(new Error("Packet too short"));
          if (o6.protocolVersion = this._list.readUInt8(this._pos), o6.protocolVersion >= 128 && (o6.bridgeMode = true, o6.protocolVersion = o6.protocolVersion - 128), o6.protocolVersion !== 3 && o6.protocolVersion !== 4 && o6.protocolVersion !== 5) return this._emitError(new Error("Invalid protocol version"));
          if (this._pos++, this._pos >= this._list.length) return this._emitError(new Error("Packet too short"));
          if (this._list.readUInt8(this._pos) & 1) return this._emitError(new Error("Connect flag bit 0 must be 0, but got 1"));
          s7.username = this._list.readUInt8(this._pos) & de.USERNAME_MASK, s7.password = this._list.readUInt8(this._pos) & de.PASSWORD_MASK, s7.will = this._list.readUInt8(this._pos) & de.WILL_FLAG_MASK;
          let c5 = !!(this._list.readUInt8(this._pos) & de.WILL_RETAIN_MASK), f3 = (this._list.readUInt8(this._pos) & de.WILL_QOS_MASK) >> de.WILL_QOS_SHIFT;
          if (s7.will) o6.will = {}, o6.will.retain = c5, o6.will.qos = f3;
          else {
            if (c5) return this._emitError(new Error("Will Retain Flag must be set to zero when Will Flag is set to 0"));
            if (f3) return this._emitError(new Error("Will QoS must be set to zero when Will Flag is set to 0"));
          }
          if (o6.clean = (this._list.readUInt8(this._pos) & de.CLEAN_SESSION_MASK) !== 0, this._pos++, o6.keepalive = this._parseNum(), o6.keepalive === -1) return this._emitError(new Error("Packet too short"));
          if (o6.protocolVersion === 5) {
            let d3 = this._parseProperties();
            Object.getOwnPropertyNames(d3).length && (o6.properties = d3);
          }
          let h3 = this._parseString();
          if (h3 === null) return this._emitError(new Error("Packet too short"));
          if (o6.clientId = h3, ae("_parseConnect: packet.clientId: %s", o6.clientId), s7.will) {
            if (o6.protocolVersion === 5) {
              let d3 = this._parseProperties();
              Object.getOwnPropertyNames(d3).length && (o6.will.properties = d3);
            }
            if (e8 = this._parseString(), e8 === null) return this._emitError(new Error("Cannot parse will topic"));
            if (o6.will.topic = e8, ae("_parseConnect: packet.will.topic: %s", o6.will.topic), r6 = this._parseBuffer(), r6 === null) return this._emitError(new Error("Cannot parse will payload"));
            o6.will.payload = r6, ae("_parseConnect: packet.will.paylaod: %s", o6.will.payload);
          }
          if (s7.username) {
            if (i6 = this._parseString(), i6 === null) return this._emitError(new Error("Cannot parse username"));
            o6.username = i6, ae("_parseConnect: packet.username: %s", o6.username);
          }
          if (s7.password) {
            if (n6 = this._parseBuffer(), n6 === null) return this._emitError(new Error("Cannot parse password"));
            o6.password = n6;
          }
          return this.settings = o6, ae("_parseConnect: complete"), o6;
        }
        _parseConnack() {
          ae("_parseConnack");
          let e8 = this.packet;
          if (this._list.length < 1) return null;
          let r6 = this._list.readUInt8(this._pos++);
          if (r6 > 1) return this._emitError(new Error("Invalid connack flags, bits 7-1 must be set to 0"));
          if (e8.sessionPresent = !!(r6 & de.SESSIONPRESENT_MASK), this.settings.protocolVersion === 5) this._list.length >= 2 ? e8.reasonCode = this._list.readUInt8(this._pos++) : e8.reasonCode = 0;
          else {
            if (this._list.length < 2) return null;
            e8.returnCode = this._list.readUInt8(this._pos++);
          }
          if (e8.returnCode === -1 || e8.reasonCode === -1) return this._emitError(new Error("Cannot parse return code"));
          if (this.settings.protocolVersion === 5) {
            let n6 = this._parseProperties();
            Object.getOwnPropertyNames(n6).length && (e8.properties = n6);
          }
          ae("_parseConnack: complete");
        }
        _parsePublish() {
          ae("_parsePublish");
          let e8 = this.packet;
          if (e8.topic = this._parseString(), e8.topic === null) return this._emitError(new Error("Cannot parse topic"));
          if (!(e8.qos > 0 && !this._parseMessageId())) {
            if (this.settings.protocolVersion === 5) {
              let r6 = this._parseProperties();
              Object.getOwnPropertyNames(r6).length && (e8.properties = r6);
            }
            e8.payload = this._list.slice(this._pos, e8.length), ae("_parsePublish: payload from buffer list: %o", e8.payload);
          }
        }
        _parseSubscribe() {
          ae("_parseSubscribe");
          let e8 = this.packet, r6, n6, i6, s7, o6, a3, c5;
          if (e8.subscriptions = [], !!this._parseMessageId()) {
            if (this.settings.protocolVersion === 5) {
              let f3 = this._parseProperties();
              Object.getOwnPropertyNames(f3).length && (e8.properties = f3);
            }
            if (e8.length <= 0) return this._emitError(new Error("Malformed subscribe, no payload specified"));
            for (; this._pos < e8.length; ) {
              if (r6 = this._parseString(), r6 === null) return this._emitError(new Error("Cannot parse topic"));
              if (this._pos >= e8.length) return this._emitError(new Error("Malformed Subscribe Payload"));
              if (n6 = this._parseByte(), this.settings.protocolVersion === 5) {
                if (n6 & 192) return this._emitError(new Error("Invalid subscribe topic flag bits, bits 7-6 must be 0"));
              } else if (n6 & 252) return this._emitError(new Error("Invalid subscribe topic flag bits, bits 7-2 must be 0"));
              if (i6 = n6 & de.SUBSCRIBE_OPTIONS_QOS_MASK, i6 > 2) return this._emitError(new Error("Invalid subscribe QoS, must be <= 2"));
              if (a3 = (n6 >> de.SUBSCRIBE_OPTIONS_NL_SHIFT & de.SUBSCRIBE_OPTIONS_NL_MASK) !== 0, o6 = (n6 >> de.SUBSCRIBE_OPTIONS_RAP_SHIFT & de.SUBSCRIBE_OPTIONS_RAP_MASK) !== 0, s7 = n6 >> de.SUBSCRIBE_OPTIONS_RH_SHIFT & de.SUBSCRIBE_OPTIONS_RH_MASK, s7 > 2) return this._emitError(new Error("Invalid retain handling, must be <= 2"));
              c5 = { topic: r6, qos: i6 }, this.settings.protocolVersion === 5 ? (c5.nl = a3, c5.rap = o6, c5.rh = s7) : this.settings.bridgeMode && (c5.rh = 0, c5.rap = true, c5.nl = true), ae("_parseSubscribe: push subscription `%s` to subscription", c5), e8.subscriptions.push(c5);
            }
          }
        }
        _parseSuback() {
          ae("_parseSuback");
          let e8 = this.packet;
          if (this.packet.granted = [], !!this._parseMessageId()) {
            if (this.settings.protocolVersion === 5) {
              let r6 = this._parseProperties();
              Object.getOwnPropertyNames(r6).length && (e8.properties = r6);
            }
            if (e8.length <= 0) return this._emitError(new Error("Malformed suback, no payload specified"));
            for (; this._pos < this.packet.length; ) {
              let r6 = this._list.readUInt8(this._pos++);
              if (this.settings.protocolVersion === 5) {
                if (!de.MQTT5_SUBACK_CODES[r6]) return this._emitError(new Error("Invalid suback code"));
              } else if (r6 > 2 && r6 !== 128) return this._emitError(new Error("Invalid suback QoS, must be 0, 1, 2 or 128"));
              this.packet.granted.push(r6);
            }
          }
        }
        _parseUnsubscribe() {
          ae("_parseUnsubscribe");
          let e8 = this.packet;
          if (e8.unsubscriptions = [], !!this._parseMessageId()) {
            if (this.settings.protocolVersion === 5) {
              let r6 = this._parseProperties();
              Object.getOwnPropertyNames(r6).length && (e8.properties = r6);
            }
            if (e8.length <= 0) return this._emitError(new Error("Malformed unsubscribe, no payload specified"));
            for (; this._pos < e8.length; ) {
              let r6 = this._parseString();
              if (r6 === null) return this._emitError(new Error("Cannot parse topic"));
              ae("_parseUnsubscribe: push topic `%s` to unsubscriptions", r6), e8.unsubscriptions.push(r6);
            }
          }
        }
        _parseUnsuback() {
          ae("_parseUnsuback");
          let e8 = this.packet;
          if (!this._parseMessageId()) return this._emitError(new Error("Cannot parse messageId"));
          if ((this.settings.protocolVersion === 3 || this.settings.protocolVersion === 4) && e8.length !== 2) return this._emitError(new Error("Malformed unsuback, payload length must be 2"));
          if (e8.length <= 0) return this._emitError(new Error("Malformed unsuback, no payload specified"));
          if (this.settings.protocolVersion === 5) {
            let r6 = this._parseProperties();
            for (Object.getOwnPropertyNames(r6).length && (e8.properties = r6), e8.granted = []; this._pos < this.packet.length; ) {
              let n6 = this._list.readUInt8(this._pos++);
              if (!de.MQTT5_UNSUBACK_CODES[n6]) return this._emitError(new Error("Invalid unsuback code"));
              this.packet.granted.push(n6);
            }
          }
        }
        _parseConfirmation() {
          ae("_parseConfirmation: packet.cmd: `%s`", this.packet.cmd);
          let e8 = this.packet;
          if (this._parseMessageId(), this.settings.protocolVersion === 5) {
            if (e8.length > 2) {
              switch (e8.reasonCode = this._parseByte(), this.packet.cmd) {
                case "puback":
                case "pubrec":
                  if (!de.MQTT5_PUBACK_PUBREC_CODES[e8.reasonCode]) return this._emitError(new Error("Invalid " + this.packet.cmd + " reason code"));
                  break;
                case "pubrel":
                case "pubcomp":
                  if (!de.MQTT5_PUBREL_PUBCOMP_CODES[e8.reasonCode]) return this._emitError(new Error("Invalid " + this.packet.cmd + " reason code"));
                  break;
              }
              ae("_parseConfirmation: packet.reasonCode `%d`", e8.reasonCode);
            } else e8.reasonCode = 0;
            if (e8.length > 3) {
              let r6 = this._parseProperties();
              Object.getOwnPropertyNames(r6).length && (e8.properties = r6);
            }
          }
          return true;
        }
        _parseDisconnect() {
          let e8 = this.packet;
          if (ae("_parseDisconnect"), this.settings.protocolVersion === 5) {
            this._list.length > 0 ? (e8.reasonCode = this._parseByte(), de.MQTT5_DISCONNECT_CODES[e8.reasonCode] || this._emitError(new Error("Invalid disconnect reason code"))) : e8.reasonCode = 0;
            let r6 = this._parseProperties();
            Object.getOwnPropertyNames(r6).length && (e8.properties = r6);
          }
          return ae("_parseDisconnect result: true"), true;
        }
        _parseAuth() {
          ae("_parseAuth");
          let e8 = this.packet;
          if (this.settings.protocolVersion !== 5) return this._emitError(new Error("Not supported auth packet for this version MQTT"));
          if (e8.reasonCode = this._parseByte(), !de.MQTT5_AUTH_CODES[e8.reasonCode]) return this._emitError(new Error("Invalid auth reason code"));
          let r6 = this._parseProperties();
          return Object.getOwnPropertyNames(r6).length && (e8.properties = r6), ae("_parseAuth: result: true"), true;
        }
        _parseMessageId() {
          let e8 = this.packet;
          return e8.messageId = this._parseNum(), e8.messageId === null ? (this._emitError(new Error("Cannot parse messageId")), false) : (ae("_parseMessageId: packet.messageId %d", e8.messageId), true);
        }
        _parseString(e8) {
          let r6 = this._parseNum(), n6 = r6 + this._pos;
          if (r6 === -1 || n6 > this._list.length || n6 > this.packet.length) return null;
          let i6 = this._list.toString("utf8", this._pos, n6);
          return this._pos += r6, ae("_parseString: result: %s", i6), i6;
        }
        _parseStringPair() {
          return ae("_parseStringPair"), { name: this._parseString(), value: this._parseString() };
        }
        _parseBuffer() {
          let e8 = this._parseNum(), r6 = e8 + this._pos;
          if (e8 === -1 || r6 > this._list.length || r6 > this.packet.length) return null;
          let n6 = this._list.slice(this._pos, r6);
          return this._pos += e8, ae("_parseBuffer: result: %o", n6), n6;
        }
        _parseNum() {
          if (this._list.length - this._pos < 2) return -1;
          let e8 = this._list.readUInt16BE(this._pos);
          return this._pos += 2, ae("_parseNum: result: %s", e8), e8;
        }
        _parse4ByteNum() {
          if (this._list.length - this._pos < 4) return -1;
          let e8 = this._list.readUInt32BE(this._pos);
          return this._pos += 4, ae("_parse4ByteNum: result: %s", e8), e8;
        }
        _parseVarByteNum(e8) {
          ae("_parseVarByteNum");
          let r6 = 4, n6 = 0, i6 = 1, s7 = 0, o6 = false, a3, c5 = this._pos ? this._pos : 0;
          for (; n6 < r6 && c5 + n6 < this._list.length; ) {
            if (a3 = this._list.readUInt8(c5 + n6++), s7 += i6 * (a3 & de.VARBYTEINT_MASK), i6 *= 128, (a3 & de.VARBYTEINT_FIN_MASK) === 0) {
              o6 = true;
              break;
            }
            if (this._list.length <= n6) break;
          }
          return !o6 && n6 === r6 && this._list.length >= n6 && this._emitError(new Error("Invalid variable byte integer")), c5 && (this._pos += n6), o6 ? e8 ? o6 = { bytes: n6, value: s7 } : o6 = s7 : o6 = false, ae("_parseVarByteNum: result: %o", o6), o6;
        }
        _parseByte() {
          let e8;
          return this._pos < this._list.length && (e8 = this._list.readUInt8(this._pos), this._pos++), ae("_parseByte: result: %o", e8), e8;
        }
        _parseByType(e8) {
          switch (ae("_parseByType: type: %s", e8), e8) {
            case "byte":
              return this._parseByte() !== 0;
            case "int8":
              return this._parseByte();
            case "int16":
              return this._parseNum();
            case "int32":
              return this._parse4ByteNum();
            case "var":
              return this._parseVarByteNum();
            case "string":
              return this._parseString();
            case "pair":
              return this._parseStringPair();
            case "binary":
              return this._parseBuffer();
          }
        }
        _parseProperties() {
          ae("_parseProperties");
          let e8 = this._parseVarByteNum(), n6 = this._pos + e8, i6 = {};
          for (; this._pos < n6; ) {
            let s7 = this._parseByte();
            if (!s7) return this._emitError(new Error("Cannot parse property code type")), false;
            let o6 = de.propertiesCodes[s7];
            if (!o6) return this._emitError(new Error("Unknown property")), false;
            if (o6 === "userProperties") {
              i6[o6] || (i6[o6] = /* @__PURE__ */ Object.create(null));
              let a3 = this._parseByType(de.propertiesTypes[o6]);
              if (i6[o6][a3.name]) if (Array.isArray(i6[o6][a3.name])) i6[o6][a3.name].push(a3.value);
              else {
                let c5 = i6[o6][a3.name];
                i6[o6][a3.name] = [c5], i6[o6][a3.name].push(a3.value);
              }
              else i6[o6][a3.name] = a3.value;
              continue;
            }
            i6[o6] ? Array.isArray(i6[o6]) ? i6[o6].push(this._parseByType(de.propertiesTypes[o6])) : (i6[o6] = [i6[o6]], i6[o6].push(this._parseByType(de.propertiesTypes[o6]))) : i6[o6] = this._parseByType(de.propertiesTypes[o6]);
          }
          return i6;
        }
        _newPacket() {
          return ae("_newPacket"), this.packet && (this._list.consume(this.packet.length), ae("_newPacket: parser emit packet: packet.cmd: %s, packet.payload: %s, packet.length: %d", this.packet.cmd, this.packet.payload, this.packet.length), this.emit("packet", this.packet)), ae("_newPacket: new packet"), this.packet = new Dp(), this._pos = 0, true;
        }
        _emitError(e8) {
          ae("_emitError", e8), this.error = e8, this.emit("error", e8);
        }
      };
      jp.exports = Oa;
    });
    Vp = D((H2, Hp) => {
      A2();
      x2();
      I2();
      var { Buffer: Hn } = (ke(), me(qe)), KS = 65536, Wp = {}, QS = Hn.isBuffer(Hn.from([1, 2]).subarray(0, 1));
      function $p(t5) {
        let e8 = Hn.allocUnsafe(2);
        return e8.writeUInt8(t5 >> 8, 0), e8.writeUInt8(t5 & 255, 1), e8;
      }
      function YS() {
        for (let t5 = 0; t5 < KS; t5++) Wp[t5] = $p(t5);
      }
      function JS(t5) {
        let r6 = 0, n6 = 0, i6 = Hn.allocUnsafe(4);
        do
          r6 = t5 % 128 | 0, t5 = t5 / 128 | 0, t5 > 0 && (r6 = r6 | 128), i6.writeUInt8(r6, n6++);
        while (t5 > 0 && n6 < 4);
        return t5 > 0 && (n6 = 0), QS ? i6.subarray(0, n6) : i6.slice(0, n6);
      }
      function XS(t5) {
        let e8 = Hn.allocUnsafe(4);
        return e8.writeUInt32BE(t5, 0), e8;
      }
      Hp.exports = { cache: Wp, generateCache: YS, generateNumber: $p, genBufVariableByteInt: JS, generate4ByteBuffer: XS };
    });
    Gp = D((eN, Ra) => {
      "use strict";
      A2();
      x2();
      I2();
      typeof M2 > "u" || !M2.version || M2.version.indexOf("v0.") === 0 || M2.version.indexOf("v1.") === 0 && M2.version.indexOf("v1.8.") !== 0 ? Ra.exports = { nextTick: ZS } : Ra.exports = M2;
      function ZS(t5, e8, r6, n6) {
        if (typeof t5 != "function") throw new TypeError('"callback" argument must be a function');
        var i6 = arguments.length, s7, o6;
        switch (i6) {
          case 0:
          case 1:
            return M2.nextTick(t5);
          case 2:
            return M2.nextTick(function() {
              t5.call(null, e8);
            });
          case 3:
            return M2.nextTick(function() {
              t5.call(null, e8, r6);
            });
          case 4:
            return M2.nextTick(function() {
              t5.call(null, e8, r6, n6);
            });
          default:
            for (s7 = new Array(i6 - 1), o6 = 0; o6 < s7.length; ) s7[o6++] = arguments[o6];
            return M2.nextTick(function() {
              t5.apply(null, s7);
            });
        }
      }
    });
    Ba = D((cN, ey) => {
      A2();
      x2();
      I2();
      var ue = Pa(), { Buffer: se } = (ke(), me(qe)), eE = se.allocUnsafe(0), tE = se.from([0]), Vn = Vp(), rE = Gp().nextTick, rt = At()("mqtt-packet:writeToStream"), yo = Vn.cache, nE = Vn.generateNumber, iE = Vn.generateCache, ka = Vn.genBufVariableByteInt, oE = Vn.generate4ByteBuffer, He = Ca, go = true;
      function Xp(t5, e8, r6) {
        switch (rt("generate called"), e8.cork && (e8.cork(), rE(sE, e8)), go && (go = false, iE()), rt("generate: packet.cmd: %s", t5.cmd), t5.cmd) {
          case "connect":
            return aE(t5, e8, r6);
          case "connack":
            return uE(t5, e8, r6);
          case "publish":
            return lE(t5, e8, r6);
          case "puback":
          case "pubrec":
          case "pubrel":
          case "pubcomp":
            return cE(t5, e8, r6);
          case "subscribe":
            return fE(t5, e8, r6);
          case "suback":
            return hE(t5, e8, r6);
          case "unsubscribe":
            return dE(t5, e8, r6);
          case "unsuback":
            return pE(t5, e8, r6);
          case "pingreq":
          case "pingresp":
            return yE(t5, e8, r6);
          case "disconnect":
            return gE(t5, e8, r6);
          case "auth":
            return bE(t5, e8, r6);
          default:
            return e8.destroy(new Error("Unknown command")), false;
        }
      }
      Object.defineProperty(Xp, "cacheNumbers", { get() {
        return He === Ca;
      }, set(t5) {
        t5 ? ((!yo || Object.keys(yo).length === 0) && (go = true), He = Ca) : (go = false, He = wE);
      } });
      function sE(t5) {
        t5.uncork();
      }
      function aE(t5, e8, r6) {
        let n6 = t5 || {}, i6 = n6.protocolId || "MQTT", s7 = n6.protocolVersion || 4, o6 = n6.will, a3 = n6.clean, c5 = n6.keepalive || 0, f3 = n6.clientId || "", h3 = n6.username, d3 = n6.password, w2 = n6.properties;
        a3 === void 0 && (a3 = true);
        let y3 = 0;
        if (!i6 || typeof i6 != "string" && !se.isBuffer(i6)) return e8.destroy(new Error("Invalid protocolId")), false;
        if (y3 += i6.length + 2, s7 !== 3 && s7 !== 4 && s7 !== 5) return e8.destroy(new Error("Invalid protocol version")), false;
        if (y3 += 1, (typeof f3 == "string" || se.isBuffer(f3)) && (f3 || s7 >= 4) && (f3 || a3)) y3 += se.byteLength(f3) + 2;
        else {
          if (s7 < 4) return e8.destroy(new Error("clientId must be supplied before 3.1.1")), false;
          if (a3 * 1 === 0) return e8.destroy(new Error("clientId must be given if cleanSession set to 0")), false;
        }
        if (typeof c5 != "number" || c5 < 0 || c5 > 65535 || c5 % 1 !== 0) return e8.destroy(new Error("Invalid keepalive")), false;
        y3 += 2, y3 += 1;
        let P2, E2;
        if (s7 === 5) {
          if (P2 = ar(e8, w2), !P2) return false;
          y3 += P2.length;
        }
        if (o6) {
          if (typeof o6 != "object") return e8.destroy(new Error("Invalid will")), false;
          if (!o6.topic || typeof o6.topic != "string") return e8.destroy(new Error("Invalid will topic")), false;
          if (y3 += se.byteLength(o6.topic) + 2, y3 += 2, o6.payload) if (o6.payload.length >= 0) typeof o6.payload == "string" ? y3 += se.byteLength(o6.payload) : y3 += o6.payload.length;
          else return e8.destroy(new Error("Invalid will payload")), false;
          if (E2 = {}, s7 === 5) {
            if (E2 = ar(e8, o6.properties), !E2) return false;
            y3 += E2.length;
          }
        }
        let b3 = false;
        if (h3 != null) if (Jp(h3)) b3 = true, y3 += se.byteLength(h3) + 2;
        else return e8.destroy(new Error("Invalid username")), false;
        if (d3 != null) {
          if (!b3) return e8.destroy(new Error("Username is required to use password")), false;
          if (Jp(d3)) y3 += Zp(d3) + 2;
          else return e8.destroy(new Error("Invalid password")), false;
        }
        e8.write(ue.CONNECT_HEADER), nt(e8, y3), pn(e8, i6), n6.bridgeMode && (s7 += 128), e8.write(s7 === 131 ? ue.VERSION131 : s7 === 132 ? ue.VERSION132 : s7 === 4 ? ue.VERSION4 : s7 === 5 ? ue.VERSION5 : ue.VERSION3);
        let m2 = 0;
        return m2 |= h3 != null ? ue.USERNAME_MASK : 0, m2 |= d3 != null ? ue.PASSWORD_MASK : 0, m2 |= o6 && o6.retain ? ue.WILL_RETAIN_MASK : 0, m2 |= o6 && o6.qos ? o6.qos << ue.WILL_QOS_SHIFT : 0, m2 |= o6 ? ue.WILL_FLAG_MASK : 0, m2 |= a3 ? ue.CLEAN_SESSION_MASK : 0, e8.write(se.from([m2])), He(e8, c5), s7 === 5 && P2.write(), pn(e8, f3), o6 && (s7 === 5 && E2.write(), Br(e8, o6.topic), pn(e8, o6.payload)), h3 != null && pn(e8, h3), d3 != null && pn(e8, d3), true;
      }
      function uE(t5, e8, r6) {
        let n6 = r6 ? r6.protocolVersion : 4, i6 = t5 || {}, s7 = n6 === 5 ? i6.reasonCode : i6.returnCode, o6 = i6.properties, a3 = 2;
        if (typeof s7 != "number") return e8.destroy(new Error("Invalid return code")), false;
        let c5 = null;
        if (n6 === 5) {
          if (c5 = ar(e8, o6), !c5) return false;
          a3 += c5.length;
        }
        return e8.write(ue.CONNACK_HEADER), nt(e8, a3), e8.write(i6.sessionPresent ? ue.SESSIONPRESENT_HEADER : tE), e8.write(se.from([s7])), c5?.write(), true;
      }
      function lE(t5, e8, r6) {
        rt("publish: packet: %o", t5);
        let n6 = r6 ? r6.protocolVersion : 4, i6 = t5 || {}, s7 = i6.qos || 0, o6 = i6.retain ? ue.RETAIN_MASK : 0, a3 = i6.topic, c5 = i6.payload || eE, f3 = i6.messageId, h3 = i6.properties, d3 = 0;
        if (typeof a3 == "string") d3 += se.byteLength(a3) + 2;
        else if (se.isBuffer(a3)) d3 += a3.length + 2;
        else return e8.destroy(new Error("Invalid topic")), false;
        if (se.isBuffer(c5) ? d3 += c5.length : d3 += se.byteLength(c5), s7 && typeof f3 != "number") return e8.destroy(new Error("Invalid messageId")), false;
        s7 && (d3 += 2);
        let w2 = null;
        if (n6 === 5) {
          if (w2 = ar(e8, h3), !w2) return false;
          d3 += w2.length;
        }
        return e8.write(ue.PUBLISH_HEADER[s7][i6.dup ? 1 : 0][o6 ? 1 : 0]), nt(e8, d3), He(e8, Zp(a3)), e8.write(a3), s7 > 0 && He(e8, f3), w2?.write(), rt("publish: payload: %o", c5), e8.write(c5);
      }
      function cE(t5, e8, r6) {
        let n6 = r6 ? r6.protocolVersion : 4, i6 = t5 || {}, s7 = i6.cmd || "puback", o6 = i6.messageId, a3 = i6.dup && s7 === "pubrel" ? ue.DUP_MASK : 0, c5 = 0, f3 = i6.reasonCode, h3 = i6.properties, d3 = n6 === 5 ? 3 : 2;
        if (s7 === "pubrel" && (c5 = 1), typeof o6 != "number") return e8.destroy(new Error("Invalid messageId")), false;
        let w2 = null;
        if (n6 === 5 && typeof h3 == "object") {
          if (w2 = Gn(e8, h3, r6, d3), !w2) return false;
          d3 += w2.length;
        }
        return e8.write(ue.ACKS[s7][c5][a3][0]), d3 === 3 && (d3 += f3 !== 0 ? 1 : -1), nt(e8, d3), He(e8, o6), n6 === 5 && d3 !== 2 && e8.write(se.from([f3])), w2 !== null ? w2.write() : d3 === 4 && e8.write(se.from([0])), true;
      }
      function fE(t5, e8, r6) {
        rt("subscribe: packet: ");
        let n6 = r6 ? r6.protocolVersion : 4, i6 = t5 || {}, s7 = i6.dup ? ue.DUP_MASK : 0, o6 = i6.messageId, a3 = i6.subscriptions, c5 = i6.properties, f3 = 0;
        if (typeof o6 != "number") return e8.destroy(new Error("Invalid messageId")), false;
        f3 += 2;
        let h3 = null;
        if (n6 === 5) {
          if (h3 = ar(e8, c5), !h3) return false;
          f3 += h3.length;
        }
        if (typeof a3 == "object" && a3.length) for (let w2 = 0; w2 < a3.length; w2 += 1) {
          let y3 = a3[w2].topic, P2 = a3[w2].qos;
          if (typeof y3 != "string") return e8.destroy(new Error("Invalid subscriptions - invalid topic")), false;
          if (typeof P2 != "number") return e8.destroy(new Error("Invalid subscriptions - invalid qos")), false;
          if (n6 === 5) {
            if (typeof (a3[w2].nl || false) != "boolean") return e8.destroy(new Error("Invalid subscriptions - invalid No Local")), false;
            if (typeof (a3[w2].rap || false) != "boolean") return e8.destroy(new Error("Invalid subscriptions - invalid Retain as Published")), false;
            let m2 = a3[w2].rh || 0;
            if (typeof m2 != "number" || m2 > 2) return e8.destroy(new Error("Invalid subscriptions - invalid Retain Handling")), false;
          }
          f3 += se.byteLength(y3) + 2 + 1;
        }
        else return e8.destroy(new Error("Invalid subscriptions")), false;
        rt("subscribe: writing to stream: %o", ue.SUBSCRIBE_HEADER), e8.write(ue.SUBSCRIBE_HEADER[1][s7 ? 1 : 0][0]), nt(e8, f3), He(e8, o6), h3 !== null && h3.write();
        let d3 = true;
        for (let w2 of a3) {
          let y3 = w2.topic, P2 = w2.qos, E2 = +w2.nl, b3 = +w2.rap, m2 = w2.rh, v2;
          Br(e8, y3), v2 = ue.SUBSCRIBE_OPTIONS_QOS[P2], n6 === 5 && (v2 |= E2 ? ue.SUBSCRIBE_OPTIONS_NL : 0, v2 |= b3 ? ue.SUBSCRIBE_OPTIONS_RAP : 0, v2 |= m2 ? ue.SUBSCRIBE_OPTIONS_RH[m2] : 0), d3 = e8.write(se.from([v2]));
        }
        return d3;
      }
      function hE(t5, e8, r6) {
        let n6 = r6 ? r6.protocolVersion : 4, i6 = t5 || {}, s7 = i6.messageId, o6 = i6.granted, a3 = i6.properties, c5 = 0;
        if (typeof s7 != "number") return e8.destroy(new Error("Invalid messageId")), false;
        if (c5 += 2, typeof o6 == "object" && o6.length) for (let h3 = 0; h3 < o6.length; h3 += 1) {
          if (typeof o6[h3] != "number") return e8.destroy(new Error("Invalid qos vector")), false;
          c5 += 1;
        }
        else return e8.destroy(new Error("Invalid qos vector")), false;
        let f3 = null;
        if (n6 === 5) {
          if (f3 = Gn(e8, a3, r6, c5), !f3) return false;
          c5 += f3.length;
        }
        return e8.write(ue.SUBACK_HEADER), nt(e8, c5), He(e8, s7), f3 !== null && f3.write(), e8.write(se.from(o6));
      }
      function dE(t5, e8, r6) {
        let n6 = r6 ? r6.protocolVersion : 4, i6 = t5 || {}, s7 = i6.messageId, o6 = i6.dup ? ue.DUP_MASK : 0, a3 = i6.unsubscriptions, c5 = i6.properties, f3 = 0;
        if (typeof s7 != "number") return e8.destroy(new Error("Invalid messageId")), false;
        if (f3 += 2, typeof a3 == "object" && a3.length) for (let w2 = 0; w2 < a3.length; w2 += 1) {
          if (typeof a3[w2] != "string") return e8.destroy(new Error("Invalid unsubscriptions")), false;
          f3 += se.byteLength(a3[w2]) + 2;
        }
        else return e8.destroy(new Error("Invalid unsubscriptions")), false;
        let h3 = null;
        if (n6 === 5) {
          if (h3 = ar(e8, c5), !h3) return false;
          f3 += h3.length;
        }
        e8.write(ue.UNSUBSCRIBE_HEADER[1][o6 ? 1 : 0][0]), nt(e8, f3), He(e8, s7), h3 !== null && h3.write();
        let d3 = true;
        for (let w2 = 0; w2 < a3.length; w2++) d3 = Br(e8, a3[w2]);
        return d3;
      }
      function pE(t5, e8, r6) {
        let n6 = r6 ? r6.protocolVersion : 4, i6 = t5 || {}, s7 = i6.messageId, o6 = i6.dup ? ue.DUP_MASK : 0, a3 = i6.granted, c5 = i6.properties, f3 = i6.cmd, h3 = 0, d3 = 2;
        if (typeof s7 != "number") return e8.destroy(new Error("Invalid messageId")), false;
        if (n6 === 5) if (typeof a3 == "object" && a3.length) for (let y3 = 0; y3 < a3.length; y3 += 1) {
          if (typeof a3[y3] != "number") return e8.destroy(new Error("Invalid qos vector")), false;
          d3 += 1;
        }
        else return e8.destroy(new Error("Invalid qos vector")), false;
        let w2 = null;
        if (n6 === 5) {
          if (w2 = Gn(e8, c5, r6, d3), !w2) return false;
          d3 += w2.length;
        }
        return e8.write(ue.ACKS[f3][h3][o6][0]), nt(e8, d3), He(e8, s7), w2 !== null && w2.write(), n6 === 5 && e8.write(se.from(a3)), true;
      }
      function yE(t5, e8, r6) {
        return e8.write(ue.EMPTY[t5.cmd]);
      }
      function gE(t5, e8, r6) {
        let n6 = r6 ? r6.protocolVersion : 4, i6 = t5 || {}, s7 = i6.reasonCode, o6 = i6.properties, a3 = n6 === 5 ? 1 : 0, c5 = null;
        if (n6 === 5) {
          if (c5 = Gn(e8, o6, r6, a3), !c5) return false;
          a3 += c5.length;
        }
        return e8.write(se.from([ue.codes.disconnect << 4])), nt(e8, a3), n6 === 5 && e8.write(se.from([s7])), c5 !== null && c5.write(), true;
      }
      function bE(t5, e8, r6) {
        let n6 = r6 ? r6.protocolVersion : 4, i6 = t5 || {}, s7 = i6.reasonCode, o6 = i6.properties, a3 = n6 === 5 ? 1 : 0;
        n6 !== 5 && e8.destroy(new Error("Invalid mqtt version for auth packet"));
        let c5 = Gn(e8, o6, r6, a3);
        return c5 ? (a3 += c5.length, e8.write(se.from([ue.codes.auth << 4])), nt(e8, a3), e8.write(se.from([s7])), c5 !== null && c5.write(), true) : false;
      }
      var zp = {};
      function nt(t5, e8) {
        if (e8 > ue.VARBYTEINT_MAX) return t5.destroy(new Error(`Invalid variable byte integer: ${e8}`)), false;
        let r6 = zp[e8];
        return r6 || (r6 = ka(e8), e8 < 16384 && (zp[e8] = r6)), rt("writeVarByteInt: writing to stream: %o", r6), t5.write(r6);
      }
      function Br(t5, e8) {
        let r6 = se.byteLength(e8);
        return He(t5, r6), rt("writeString: %s", e8), t5.write(e8, "utf8");
      }
      function Kp(t5, e8, r6) {
        Br(t5, e8), Br(t5, r6);
      }
      function Ca(t5, e8) {
        return rt("writeNumberCached: number: %d", e8), rt("writeNumberCached: %o", yo[e8]), t5.write(yo[e8]);
      }
      function wE(t5, e8) {
        let r6 = nE(e8);
        return rt("writeNumberGenerated: %o", r6), t5.write(r6);
      }
      function mE(t5, e8) {
        let r6 = oE(e8);
        return rt("write4ByteNumber: %o", r6), t5.write(r6);
      }
      function pn(t5, e8) {
        typeof e8 == "string" ? Br(t5, e8) : e8 ? (He(t5, e8.length), t5.write(e8)) : He(t5, 0);
      }
      function ar(t5, e8) {
        if (typeof e8 != "object" || e8.length != null) return { length: 1, write() {
          Yp(t5, {}, 0);
        } };
        let r6 = 0;
        function n6(s7, o6) {
          let a3 = ue.propertiesTypes[s7], c5 = 0;
          switch (a3) {
            case "byte": {
              if (typeof o6 != "boolean") return t5.destroy(new Error(`Invalid ${s7}: ${o6}`)), false;
              c5 += 2;
              break;
            }
            case "int8": {
              if (typeof o6 != "number" || o6 < 0 || o6 > 255) return t5.destroy(new Error(`Invalid ${s7}: ${o6}`)), false;
              c5 += 2;
              break;
            }
            case "binary": {
              if (o6 && o6 === null) return t5.destroy(new Error(`Invalid ${s7}: ${o6}`)), false;
              c5 += 1 + se.byteLength(o6) + 2;
              break;
            }
            case "int16": {
              if (typeof o6 != "number" || o6 < 0 || o6 > 65535) return t5.destroy(new Error(`Invalid ${s7}: ${o6}`)), false;
              c5 += 3;
              break;
            }
            case "int32": {
              if (typeof o6 != "number" || o6 < 0 || o6 > 4294967295) return t5.destroy(new Error(`Invalid ${s7}: ${o6}`)), false;
              c5 += 5;
              break;
            }
            case "var": {
              if (typeof o6 != "number" || o6 < 0 || o6 > 268435455) return t5.destroy(new Error(`Invalid ${s7}: ${o6}`)), false;
              c5 += 1 + se.byteLength(ka(o6));
              break;
            }
            case "string": {
              if (typeof o6 != "string") return t5.destroy(new Error(`Invalid ${s7}: ${o6}`)), false;
              c5 += 3 + se.byteLength(o6.toString());
              break;
            }
            case "pair": {
              if (typeof o6 != "object") return t5.destroy(new Error(`Invalid ${s7}: ${o6}`)), false;
              c5 += Object.getOwnPropertyNames(o6).reduce((f3, h3) => {
                let d3 = o6[h3];
                return Array.isArray(d3) ? f3 += d3.reduce((w2, y3) => (w2 += 3 + se.byteLength(h3.toString()) + 2 + se.byteLength(y3.toString()), w2), 0) : f3 += 3 + se.byteLength(h3.toString()) + 2 + se.byteLength(o6[h3].toString()), f3;
              }, 0);
              break;
            }
            default:
              return t5.destroy(new Error(`Invalid property ${s7}: ${o6}`)), false;
          }
          return c5;
        }
        if (e8) for (let s7 in e8) {
          let o6 = 0, a3 = 0, c5 = e8[s7];
          if (c5 !== void 0) {
            if (Array.isArray(c5)) for (let f3 = 0; f3 < c5.length; f3++) {
              if (a3 = n6(s7, c5[f3]), !a3) return false;
              o6 += a3;
            }
            else {
              if (a3 = n6(s7, c5), !a3) return false;
              o6 = a3;
            }
            if (!o6) return false;
            r6 += o6;
          }
        }
        return { length: se.byteLength(ka(r6)) + r6, write() {
          Yp(t5, e8, r6);
        } };
      }
      function Gn(t5, e8, r6, n6) {
        let i6 = ["reasonString", "userProperties"], s7 = r6 && r6.properties && r6.properties.maximumPacketSize ? r6.properties.maximumPacketSize : 0, o6 = ar(t5, e8);
        if (s7) for (; n6 + o6.length > s7; ) {
          let a3 = i6.shift();
          if (a3 && e8[a3]) delete e8[a3], o6 = ar(t5, e8);
          else return false;
        }
        return o6;
      }
      function Qp(t5, e8, r6) {
        switch (ue.propertiesTypes[e8]) {
          case "byte": {
            t5.write(se.from([ue.properties[e8]])), t5.write(se.from([+r6]));
            break;
          }
          case "int8": {
            t5.write(se.from([ue.properties[e8]])), t5.write(se.from([r6]));
            break;
          }
          case "binary": {
            t5.write(se.from([ue.properties[e8]])), pn(t5, r6);
            break;
          }
          case "int16": {
            t5.write(se.from([ue.properties[e8]])), He(t5, r6);
            break;
          }
          case "int32": {
            t5.write(se.from([ue.properties[e8]])), mE(t5, r6);
            break;
          }
          case "var": {
            t5.write(se.from([ue.properties[e8]])), nt(t5, r6);
            break;
          }
          case "string": {
            t5.write(se.from([ue.properties[e8]])), Br(t5, r6);
            break;
          }
          case "pair": {
            Object.getOwnPropertyNames(r6).forEach((i6) => {
              let s7 = r6[i6];
              Array.isArray(s7) ? s7.forEach((o6) => {
                t5.write(se.from([ue.properties[e8]])), Kp(t5, i6.toString(), o6.toString());
              }) : (t5.write(se.from([ue.properties[e8]])), Kp(t5, i6.toString(), s7.toString()));
            });
            break;
          }
          default:
            return t5.destroy(new Error(`Invalid property ${e8} value: ${r6}`)), false;
        }
      }
      function Yp(t5, e8, r6) {
        nt(t5, r6);
        for (let n6 in e8) if (Object.prototype.hasOwnProperty.call(e8, n6) && e8[n6] != null) {
          let i6 = e8[n6];
          if (Array.isArray(i6)) for (let s7 = 0; s7 < i6.length; s7++) Qp(t5, n6, i6[s7]);
          else Qp(t5, n6, i6);
        }
      }
      function Zp(t5) {
        return t5 ? t5 instanceof se ? t5.length : se.byteLength(t5) : 0;
      }
      function Jp(t5) {
        return typeof t5 == "string" || t5 instanceof se;
      }
      ey.exports = Xp;
    });
    ny = D((_N, ry) => {
      A2();
      x2();
      I2();
      var _E = Ba(), { EventEmitter: vE } = (er(), me(Zt)), { Buffer: ty } = (ke(), me(qe));
      function SE(t5, e8) {
        let r6 = new Ma();
        return _E(t5, r6, e8), r6.concat();
      }
      var Ma = class extends vE {
        constructor() {
          super(), this._array = new Array(20), this._i = 0;
        }
        write(e8) {
          return this._array[this._i++] = e8, true;
        }
        concat() {
          let e8 = 0, r6 = new Array(this._array.length), n6 = this._array, i6 = 0, s7;
          for (s7 = 0; s7 < n6.length && n6[s7] !== void 0; s7++) typeof n6[s7] != "string" ? r6[s7] = n6[s7].length : r6[s7] = ty.byteLength(n6[s7]), e8 += r6[s7];
          let o6 = ty.allocUnsafe(e8);
          for (s7 = 0; s7 < n6.length && n6[s7] !== void 0; s7++) typeof n6[s7] != "string" ? (n6[s7].copy(o6, i6), i6 += r6[s7]) : (o6.write(n6[s7], i6), i6 += r6[s7]);
          return o6;
        }
        destroy(e8) {
          e8 && this.emit("error", e8);
        }
      };
      ry.exports = SE;
    });
    iy = D((bo) => {
      A2();
      x2();
      I2();
      bo.parser = Fp().parser;
      bo.generate = ny();
      bo.writeToStream = Ba();
    });
    sy = D((jN, oy) => {
      "use strict";
      A2();
      x2();
      I2();
      oy.exports = EE;
      function yn(t5) {
        return t5 instanceof U ? U.from(t5) : new t5.constructor(t5.buffer.slice(), t5.byteOffset, t5.length);
      }
      function EE(t5) {
        if (t5 = t5 || {}, t5.circles) return AE(t5);
        let e8 = /* @__PURE__ */ new Map();
        if (e8.set(Date, (o6) => new Date(o6)), e8.set(Map, (o6, a3) => new Map(n6(Array.from(o6), a3))), e8.set(Set, (o6, a3) => new Set(n6(Array.from(o6), a3))), t5.constructorHandlers) for (let o6 of t5.constructorHandlers) e8.set(o6[0], o6[1]);
        let r6 = null;
        return t5.proto ? s7 : i6;
        function n6(o6, a3) {
          let c5 = Object.keys(o6), f3 = new Array(c5.length);
          for (let h3 = 0; h3 < c5.length; h3++) {
            let d3 = c5[h3], w2 = o6[d3];
            typeof w2 != "object" || w2 === null ? f3[d3] = w2 : w2.constructor !== Object && (r6 = e8.get(w2.constructor)) ? f3[d3] = r6(w2, a3) : ArrayBuffer.isView(w2) ? f3[d3] = yn(w2) : f3[d3] = a3(w2);
          }
          return f3;
        }
        function i6(o6) {
          if (typeof o6 != "object" || o6 === null) return o6;
          if (Array.isArray(o6)) return n6(o6, i6);
          if (o6.constructor !== Object && (r6 = e8.get(o6.constructor))) return r6(o6, i6);
          let a3 = {};
          for (let c5 in o6) {
            if (Object.hasOwnProperty.call(o6, c5) === false) continue;
            let f3 = o6[c5];
            typeof f3 != "object" || f3 === null ? a3[c5] = f3 : f3.constructor !== Object && (r6 = e8.get(f3.constructor)) ? a3[c5] = r6(f3, i6) : ArrayBuffer.isView(f3) ? a3[c5] = yn(f3) : a3[c5] = i6(f3);
          }
          return a3;
        }
        function s7(o6) {
          if (typeof o6 != "object" || o6 === null) return o6;
          if (Array.isArray(o6)) return n6(o6, s7);
          if (o6.constructor !== Object && (r6 = e8.get(o6.constructor))) return r6(o6, s7);
          let a3 = {};
          for (let c5 in o6) {
            let f3 = o6[c5];
            typeof f3 != "object" || f3 === null ? a3[c5] = f3 : f3.constructor !== Object && (r6 = e8.get(f3.constructor)) ? a3[c5] = r6(f3, s7) : ArrayBuffer.isView(f3) ? a3[c5] = yn(f3) : a3[c5] = s7(f3);
          }
          return a3;
        }
      }
      function AE(t5) {
        let e8 = [], r6 = [], n6 = /* @__PURE__ */ new Map();
        if (n6.set(Date, (c5) => new Date(c5)), n6.set(Map, (c5, f3) => new Map(s7(Array.from(c5), f3))), n6.set(Set, (c5, f3) => new Set(s7(Array.from(c5), f3))), t5.constructorHandlers) for (let c5 of t5.constructorHandlers) n6.set(c5[0], c5[1]);
        let i6 = null;
        return t5.proto ? a3 : o6;
        function s7(c5, f3) {
          let h3 = Object.keys(c5), d3 = new Array(h3.length);
          for (let w2 = 0; w2 < h3.length; w2++) {
            let y3 = h3[w2], P2 = c5[y3];
            if (typeof P2 != "object" || P2 === null) d3[y3] = P2;
            else if (P2.constructor !== Object && (i6 = n6.get(P2.constructor))) d3[y3] = i6(P2, f3);
            else if (ArrayBuffer.isView(P2)) d3[y3] = yn(P2);
            else {
              let E2 = e8.indexOf(P2);
              E2 !== -1 ? d3[y3] = r6[E2] : d3[y3] = f3(P2);
            }
          }
          return d3;
        }
        function o6(c5) {
          if (typeof c5 != "object" || c5 === null) return c5;
          if (Array.isArray(c5)) return s7(c5, o6);
          if (c5.constructor !== Object && (i6 = n6.get(c5.constructor))) return i6(c5, o6);
          let f3 = {};
          e8.push(c5), r6.push(f3);
          for (let h3 in c5) {
            if (Object.hasOwnProperty.call(c5, h3) === false) continue;
            let d3 = c5[h3];
            if (typeof d3 != "object" || d3 === null) f3[h3] = d3;
            else if (d3.constructor !== Object && (i6 = n6.get(d3.constructor))) f3[h3] = i6(d3, o6);
            else if (ArrayBuffer.isView(d3)) f3[h3] = yn(d3);
            else {
              let w2 = e8.indexOf(d3);
              w2 !== -1 ? f3[h3] = r6[w2] : f3[h3] = o6(d3);
            }
          }
          return e8.pop(), r6.pop(), f3;
        }
        function a3(c5) {
          if (typeof c5 != "object" || c5 === null) return c5;
          if (Array.isArray(c5)) return s7(c5, a3);
          if (c5.constructor !== Object && (i6 = n6.get(c5.constructor))) return i6(c5, a3);
          let f3 = {};
          e8.push(c5), r6.push(f3);
          for (let h3 in c5) {
            let d3 = c5[h3];
            if (typeof d3 != "object" || d3 === null) f3[h3] = d3;
            else if (d3.constructor !== Object && (i6 = n6.get(d3.constructor))) f3[h3] = i6(d3, a3);
            else if (ArrayBuffer.isView(d3)) f3[h3] = yn(d3);
            else {
              let w2 = e8.indexOf(d3);
              w2 !== -1 ? f3[h3] = r6[w2] : f3[h3] = a3(d3);
            }
          }
          return e8.pop(), r6.pop(), f3;
        }
      }
    });
    uy = D((YN, ay) => {
      "use strict";
      A2();
      x2();
      I2();
      ay.exports = sy()();
    });
    cy = D((wo) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(wo, "__esModule", { value: true });
      wo.validateTopic = ly;
      wo.validateTopics = IE;
      function ly(t5) {
        let e8 = t5.split("/");
        for (let r6 = 0; r6 < e8.length; r6++) if (e8[r6] !== "+") {
          if (e8[r6] === "#") return r6 === e8.length - 1;
          if (e8[r6].indexOf("+") !== -1 || e8[r6].indexOf("#") !== -1) return false;
        }
        return true;
      }
      function IE(t5) {
        if (t5.length === 0) return "empty_topic_list";
        for (let e8 = 0; e8 < t5.length; e8++) if (!ly(t5[e8])) return t5[e8];
        return null;
      }
    });
    La = D((qa) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(qa, "__esModule", { value: true });
      var xE = or(), TE = { objectMode: true }, PE = { clean: true }, Na = class {
        constructor(e8) {
          __publicField(this, "options");
          __publicField(this, "_inflights");
          this.options = e8 || {}, this.options = { ...PE, ...e8 }, this._inflights = /* @__PURE__ */ new Map();
        }
        put(e8, r6) {
          return this._inflights.set(e8.messageId, e8), r6 && r6(), this;
        }
        createStream() {
          let e8 = new xE.Readable(TE), r6 = [], n6 = false, i6 = 0;
          return this._inflights.forEach((s7, o6) => {
            r6.push(s7);
          }), e8._read = () => {
            !n6 && i6 < r6.length ? e8.push(r6[i6++]) : e8.push(null);
          }, e8.destroy = (s7) => {
            if (!n6) return n6 = true, setTimeout(() => {
              e8.emit("close");
            }, 0), e8;
          }, e8;
        }
        del(e8, r6) {
          let n6 = this._inflights.get(e8.messageId);
          return n6 ? (this._inflights.delete(e8.messageId), r6(null, n6)) : r6 && r6(new Error("missing packet")), this;
        }
        get(e8, r6) {
          let n6 = this._inflights.get(e8.messageId);
          return n6 ? r6(null, n6) : r6 && r6(new Error("missing packet")), this;
        }
        close(e8) {
          this.options.clean && (this._inflights = null), e8 && e8();
        }
      };
      qa.default = Na;
    });
    hy = D((Ua) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(Ua, "__esModule", { value: true });
      var fy = [0, 16, 128, 131, 135, 144, 145, 151, 153], OE = (t5, e8, r6) => {
        t5.log("handlePublish: packet %o", e8), r6 = typeof r6 < "u" ? r6 : t5.noop;
        let n6 = e8.topic.toString(), i6 = e8.payload, { qos: s7 } = e8, { messageId: o6 } = e8, { options: a3 } = t5;
        if (t5.options.protocolVersion === 5) {
          let c5;
          if (e8.properties && (c5 = e8.properties.topicAlias), typeof c5 < "u") if (n6.length === 0) if (c5 > 0 && c5 <= 65535) {
            let f3 = t5.topicAliasRecv.getTopicByAlias(c5);
            if (f3) n6 = f3, t5.log("handlePublish :: topic complemented by alias. topic: %s - alias: %d", n6, c5);
            else {
              t5.log("handlePublish :: unregistered topic alias. alias: %d", c5), t5.emit("error", new Error("Received unregistered Topic Alias"));
              return;
            }
          } else {
            t5.log("handlePublish :: topic alias out of range. alias: %d", c5), t5.emit("error", new Error("Received Topic Alias is out of range"));
            return;
          }
          else if (t5.topicAliasRecv.put(n6, c5)) t5.log("handlePublish :: registered topic: %s - alias: %d", n6, c5);
          else {
            t5.log("handlePublish :: topic alias out of range. alias: %d", c5), t5.emit("error", new Error("Received Topic Alias is out of range"));
            return;
          }
        }
        switch (t5.log("handlePublish: qos %d", s7), s7) {
          case 2: {
            a3.customHandleAcks(n6, i6, e8, (c5, f3) => {
              if (typeof c5 == "number" && (f3 = c5, c5 = null), c5) return t5.emit("error", c5);
              if (fy.indexOf(f3) === -1) return t5.emit("error", new Error("Wrong reason code for pubrec"));
              f3 ? t5._sendPacket({ cmd: "pubrec", messageId: o6, reasonCode: f3 }, r6) : t5.incomingStore.put(e8, () => {
                t5._sendPacket({ cmd: "pubrec", messageId: o6 }, r6);
              });
            });
            break;
          }
          case 1: {
            a3.customHandleAcks(n6, i6, e8, (c5, f3) => {
              if (typeof c5 == "number" && (f3 = c5, c5 = null), c5) return t5.emit("error", c5);
              if (fy.indexOf(f3) === -1) return t5.emit("error", new Error("Wrong reason code for puback"));
              f3 || t5.emit("message", n6, i6, e8), t5.handleMessage(e8, (h3) => {
                if (h3) return r6 && r6(h3);
                t5._sendPacket({ cmd: "puback", messageId: o6, reasonCode: f3 }, r6);
              });
            });
            break;
          }
          case 0:
            t5.emit("message", n6, i6, e8), t5.handleMessage(e8, r6);
            break;
          default:
            t5.log("handlePublish: unknown QoS. Doing nothing.");
            break;
        }
      };
      Ua.default = OE;
    });
    dy = D((qq, RE) => {
      RE.exports = { version: "5.14.0" };
    });
    Mr = D((ht) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(ht, "__esModule", { value: true });
      ht.MQTTJS_VERSION = ht.nextTick = ht.ErrorWithSubackPacket = ht.ErrorWithReasonCode = void 0;
      ht.applyMixin = kE;
      var Da = class t5 extends Error {
        constructor(e8, r6) {
          super(e8);
          __publicField(this, "code");
          this.code = r6, Object.setPrototypeOf(this, t5.prototype), Object.getPrototypeOf(this).name = "ErrorWithReasonCode";
        }
      };
      ht.ErrorWithReasonCode = Da;
      var ja = class t5 extends Error {
        constructor(e8, r6) {
          super(e8);
          __publicField(this, "packet");
          this.packet = r6, Object.setPrototypeOf(this, t5.prototype), Object.getPrototypeOf(this).name = "ErrorWithSubackPacket";
        }
      };
      ht.ErrorWithSubackPacket = ja;
      function kE(t5, e8, r6 = false) {
        let n6 = [e8];
        for (; ; ) {
          let i6 = n6[0], s7 = Object.getPrototypeOf(i6);
          if (s7?.prototype) n6.unshift(s7);
          else break;
        }
        for (let i6 of n6) for (let s7 of Object.getOwnPropertyNames(i6.prototype)) (r6 || s7 !== "constructor") && Object.defineProperty(t5.prototype, s7, Object.getOwnPropertyDescriptor(i6.prototype, s7) ?? /* @__PURE__ */ Object.create(null));
      }
      ht.nextTick = typeof M2?.nextTick == "function" ? M2.nextTick : (t5) => {
        setTimeout(t5, 0);
      };
      ht.MQTTJS_VERSION = dy().version;
    });
    zn = D((ur) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(ur, "__esModule", { value: true });
      ur.ReasonCodes = void 0;
      var py = Mr();
      ur.ReasonCodes = { 0: "", 1: "Unacceptable protocol version", 2: "Identifier rejected", 3: "Server unavailable", 4: "Bad username or password", 5: "Not authorized", 16: "No matching subscribers", 17: "No subscription existed", 128: "Unspecified error", 129: "Malformed Packet", 130: "Protocol Error", 131: "Implementation specific error", 132: "Unsupported Protocol Version", 133: "Client Identifier not valid", 134: "Bad User Name or Password", 135: "Not authorized", 136: "Server unavailable", 137: "Server busy", 138: "Banned", 139: "Server shutting down", 140: "Bad authentication method", 141: "Keep Alive timeout", 142: "Session taken over", 143: "Topic Filter invalid", 144: "Topic Name invalid", 145: "Packet identifier in use", 146: "Packet Identifier not found", 147: "Receive Maximum exceeded", 148: "Topic Alias invalid", 149: "Packet too large", 150: "Message rate too high", 151: "Quota exceeded", 152: "Administrative action", 153: "Payload format invalid", 154: "Retain not supported", 155: "QoS not supported", 156: "Use another server", 157: "Server moved", 158: "Shared Subscriptions not supported", 159: "Connection rate exceeded", 160: "Maximum connect time", 161: "Subscription Identifiers not supported", 162: "Wildcard Subscriptions not supported" };
      var CE = (t5, e8) => {
        let { messageId: r6 } = e8, n6 = e8.cmd, i6 = null, s7 = t5.outgoing[r6] ? t5.outgoing[r6].cb : null, o6 = null;
        if (!s7) {
          t5.log("_handleAck :: Server sent an ack in error. Ignoring.");
          return;
        }
        switch (t5.log("_handleAck :: packet type", n6), n6) {
          case "pubcomp":
          case "puback": {
            let a3 = e8.reasonCode;
            a3 && a3 > 0 && a3 !== 16 ? (o6 = new py.ErrorWithReasonCode(`Publish error: ${ur.ReasonCodes[a3]}`, a3), t5._removeOutgoingAndStoreMessage(r6, () => {
              s7(o6, e8);
            })) : t5._removeOutgoingAndStoreMessage(r6, s7);
            break;
          }
          case "pubrec": {
            i6 = { cmd: "pubrel", qos: 2, messageId: r6 };
            let a3 = e8.reasonCode;
            a3 && a3 > 0 && a3 !== 16 ? (o6 = new py.ErrorWithReasonCode(`Publish error: ${ur.ReasonCodes[a3]}`, a3), t5._removeOutgoingAndStoreMessage(r6, () => {
              s7(o6, e8);
            })) : t5._sendPacket(i6);
            break;
          }
          case "suback": {
            delete t5.outgoing[r6], t5.messageIdProvider.deallocate(r6);
            let a3 = e8.granted;
            for (let c5 = 0; c5 < a3.length; c5++) {
              let f3 = a3[c5];
              if ((f3 & 128) !== 0) {
                o6 = new Error(`Subscribe error: ${ur.ReasonCodes[f3]}`), o6.code = f3;
                let h3 = t5.messageIdToTopic[r6];
                h3 && h3.forEach((d3) => {
                  delete t5._resubscribeTopics[d3];
                });
              }
            }
            delete t5.messageIdToTopic[r6], t5._invokeStoreProcessingQueue(), s7(o6, e8);
            break;
          }
          case "unsuback": {
            delete t5.outgoing[r6], t5.messageIdProvider.deallocate(r6), t5._invokeStoreProcessingQueue(), s7(null, e8);
            break;
          }
          default:
            t5.emit("error", new Error("unrecognized packet type"));
        }
        t5.disconnecting && Object.keys(t5.outgoing).length === 0 && t5.emit("outgoingEmpty");
      };
      ur.default = CE;
    });
    gy = D((Fa) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(Fa, "__esModule", { value: true });
      var yy = Mr(), BE = zn(), ME = (t5, e8) => {
        let { options: r6 } = t5, n6 = r6.protocolVersion, i6 = n6 === 5 ? e8.reasonCode : e8.returnCode;
        if (n6 !== 5) {
          let s7 = new yy.ErrorWithReasonCode(`Protocol error: Auth packets are only supported in MQTT 5. Your version:${n6}`, i6);
          t5.emit("error", s7);
          return;
        }
        t5.handleAuth(e8, (s7, o6) => {
          if (s7) {
            t5.emit("error", s7);
            return;
          }
          if (i6 === 24) t5.reconnecting = false, t5._sendPacket(o6);
          else {
            let a3 = new yy.ErrorWithReasonCode(`Connection refused: ${BE.ReasonCodes[i6]}`, i6);
            t5.emit("error", a3);
          }
        });
      };
      Fa.default = ME;
    });
    vy = D((_o) => {
      "use strict";
      var _a, _u, _b2, _c2, _u2, _f2, _y2, _g, _R, _k, _i2, _b3, _n, _r, _e, _l2, _h, _a2, _o2, _w2, _s, _m, __, _d, _v, _x2, _c3, _t_instances, N_fn, _T, _I2, _q, _p, F_fn, _P, _C, _L, S_fn, E_fn, U_fn, B_fn, M_fn, t_fn, D_fn, O_fn, A_fn, j_fn, _d2;
      A2();
      x2();
      I2();
      Object.defineProperty(_o, "__esModule", { value: true });
      _o.LRUCache = void 0;
      var gn = typeof performance == "object" && performance && typeof performance.now == "function" ? performance : Date, wy = /* @__PURE__ */ new Set(), Wa = typeof M2 == "object" && M2 ? M2 : {}, my = (t5, e8, r6, n6) => {
        typeof Wa.emitWarning == "function" ? Wa.emitWarning(t5, e8, r6, n6) : console.error(`[${r6}] ${e8}: ${t5}`);
      }, mo = globalThis.AbortController, by = globalThis.AbortSignal;
      if (typeof mo > "u") {
        by = class {
          constructor() {
            __publicField(this, "onabort");
            __publicField(this, "_onabort", []);
            __publicField(this, "reason");
            __publicField(this, "aborted", false);
          }
          addEventListener(n6, i6) {
            this._onabort.push(i6);
          }
        }, mo = class {
          constructor() {
            __publicField(this, "signal", new by());
            e8();
          }
          abort(n6) {
            if (!this.signal.aborted) {
              this.signal.reason = n6, this.signal.aborted = true;
              for (let i6 of this.signal._onabort) i6(n6);
              this.signal.onabort?.(n6);
            }
          }
        };
        let t5 = Wa.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1", e8 = () => {
          t5 && (t5 = false, my("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", e8));
        };
      }
      var NE = (t5) => !wy.has(t5), yL = Symbol("type"), lr = (t5) => t5 && t5 === Math.floor(t5) && t5 > 0 && isFinite(t5), _y = (t5) => lr(t5) ? t5 <= Math.pow(2, 8) ? Uint8Array : t5 <= Math.pow(2, 16) ? Uint16Array : t5 <= Math.pow(2, 32) ? Uint32Array : t5 <= Number.MAX_SAFE_INTEGER ? bn : null : null, bn = class extends Array {
        constructor(e8) {
          super(e8), this.fill(0);
        }
      }, $a = (_a = class {
        constructor(e8, r6) {
          __publicField(this, "heap");
          __publicField(this, "length");
          if (!__privateGet(_a, _u)) throw new TypeError("instantiate Stack using Stack.create(n)");
          this.heap = new r6(e8), this.length = 0;
        }
        static create(e8) {
          let r6 = _y(e8);
          if (!r6) return [];
          __privateSet(_a, _u, true);
          let n6 = new _a(e8, r6);
          return __privateSet(_a, _u, false), n6;
        }
        push(e8) {
          this.heap[this.length++] = e8;
        }
        pop() {
          return this.heap[--this.length];
        }
      }, _u = new WeakMap(), __privateAdd(_a, _u, false), _a), Ha = (_d2 = class {
        constructor(e8) {
          __privateAdd(this, _t_instances);
          __privateAdd(this, _u2);
          __privateAdd(this, _f2);
          __privateAdd(this, _y2);
          __privateAdd(this, _g);
          __privateAdd(this, _R);
          __privateAdd(this, _k);
          __publicField(this, "ttl");
          __publicField(this, "ttlResolution");
          __publicField(this, "ttlAutopurge");
          __publicField(this, "updateAgeOnGet");
          __publicField(this, "updateAgeOnHas");
          __publicField(this, "allowStale");
          __publicField(this, "noDisposeOnSet");
          __publicField(this, "noUpdateTTL");
          __publicField(this, "maxEntrySize");
          __publicField(this, "sizeCalculation");
          __publicField(this, "noDeleteOnFetchRejection");
          __publicField(this, "noDeleteOnStaleGet");
          __publicField(this, "allowStaleOnFetchAbort");
          __publicField(this, "allowStaleOnFetchRejection");
          __publicField(this, "ignoreFetchAbort");
          __privateAdd(this, _i2);
          __privateAdd(this, _b3);
          __privateAdd(this, _n);
          __privateAdd(this, _r);
          __privateAdd(this, _e);
          __privateAdd(this, _l2);
          __privateAdd(this, _h);
          __privateAdd(this, _a2);
          __privateAdd(this, _o2);
          __privateAdd(this, _w2);
          __privateAdd(this, _s);
          __privateAdd(this, _m);
          __privateAdd(this, __);
          __privateAdd(this, _d);
          __privateAdd(this, _v);
          __privateAdd(this, _x2);
          __privateAdd(this, _c3);
          __privateAdd(this, _T, () => {
          });
          __privateAdd(this, _I2, () => {
          });
          __privateAdd(this, _q, () => {
          });
          __privateAdd(this, _p, () => false);
          __privateAdd(this, _P, (e8) => {
          });
          __privateAdd(this, _C, (e8, r6, n6) => {
          });
          __privateAdd(this, _L, (e8, r6, n6, i6) => {
            if (n6 || i6) throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
            return 0;
          });
          __publicField(this, _b2, "LRUCache");
          let { max: r6 = 0, ttl: n6, ttlResolution: i6 = 1, ttlAutopurge: s7, updateAgeOnGet: o6, updateAgeOnHas: a3, allowStale: c5, dispose: f3, disposeAfter: h3, noDisposeOnSet: d3, noUpdateTTL: w2, maxSize: y3 = 0, maxEntrySize: P2 = 0, sizeCalculation: E2, fetchMethod: b3, memoMethod: m2, noDeleteOnFetchRejection: v2, noDeleteOnStaleGet: R2, allowStaleOnFetchRejection: T2, allowStaleOnFetchAbort: g2, ignoreFetchAbort: O } = e8;
          if (r6 !== 0 && !lr(r6)) throw new TypeError("max option must be a nonnegative integer");
          let _2 = r6 ? _y(r6) : Array;
          if (!_2) throw new Error("invalid max value: " + r6);
          if (__privateSet(this, _u2, r6), __privateSet(this, _f2, y3), this.maxEntrySize = P2 || __privateGet(this, _f2), this.sizeCalculation = E2, this.sizeCalculation) {
            if (!__privateGet(this, _f2) && !this.maxEntrySize) throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
            if (typeof this.sizeCalculation != "function") throw new TypeError("sizeCalculation set to non-function");
          }
          if (m2 !== void 0 && typeof m2 != "function") throw new TypeError("memoMethod must be a function if defined");
          if (__privateSet(this, _k, m2), b3 !== void 0 && typeof b3 != "function") throw new TypeError("fetchMethod must be a function if specified");
          if (__privateSet(this, _R, b3), __privateSet(this, _x2, !!b3), __privateSet(this, _n, /* @__PURE__ */ new Map()), __privateSet(this, _r, new Array(r6).fill(void 0)), __privateSet(this, _e, new Array(r6).fill(void 0)), __privateSet(this, _l2, new _2(r6)), __privateSet(this, _h, new _2(r6)), __privateSet(this, _a2, 0), __privateSet(this, _o2, 0), __privateSet(this, _w2, $a.create(r6)), __privateSet(this, _i2, 0), __privateSet(this, _b3, 0), typeof f3 == "function" && __privateSet(this, _y2, f3), typeof h3 == "function" ? (__privateSet(this, _g, h3), __privateSet(this, _s, [])) : (__privateSet(this, _g, void 0), __privateSet(this, _s, void 0)), __privateSet(this, _v, !!__privateGet(this, _y2)), __privateSet(this, _c3, !!__privateGet(this, _g)), this.noDisposeOnSet = !!d3, this.noUpdateTTL = !!w2, this.noDeleteOnFetchRejection = !!v2, this.allowStaleOnFetchRejection = !!T2, this.allowStaleOnFetchAbort = !!g2, this.ignoreFetchAbort = !!O, this.maxEntrySize !== 0) {
            if (__privateGet(this, _f2) !== 0 && !lr(__privateGet(this, _f2))) throw new TypeError("maxSize must be a positive integer if specified");
            if (!lr(this.maxEntrySize)) throw new TypeError("maxEntrySize must be a positive integer if specified");
            __privateMethod(this, _t_instances, F_fn).call(this);
          }
          if (this.allowStale = !!c5, this.noDeleteOnStaleGet = !!R2, this.updateAgeOnGet = !!o6, this.updateAgeOnHas = !!a3, this.ttlResolution = lr(i6) || i6 === 0 ? i6 : 1, this.ttlAutopurge = !!s7, this.ttl = n6 || 0, this.ttl) {
            if (!lr(this.ttl)) throw new TypeError("ttl must be a positive integer if specified");
            __privateMethod(this, _t_instances, N_fn).call(this);
          }
          if (__privateGet(this, _u2) === 0 && this.ttl === 0 && __privateGet(this, _f2) === 0) throw new TypeError("At least one of max, maxSize, or ttl is required");
          if (!this.ttlAutopurge && !__privateGet(this, _u2) && !__privateGet(this, _f2)) {
            let q = "LRU_CACHE_UNBOUNDED";
            NE(q) && (wy.add(q), my("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", q, _d2));
          }
        }
        static unsafeExposeInternals(e8) {
          return { starts: __privateGet(e8, __), ttls: __privateGet(e8, _d), sizes: __privateGet(e8, _m), keyMap: __privateGet(e8, _n), keyList: __privateGet(e8, _r), valList: __privateGet(e8, _e), next: __privateGet(e8, _l2), prev: __privateGet(e8, _h), get head() {
            return __privateGet(e8, _a2);
          }, get tail() {
            return __privateGet(e8, _o2);
          }, free: __privateGet(e8, _w2), isBackgroundFetch: (r6) => {
            var _a3;
            return __privateMethod(_a3 = e8, _t_instances, t_fn).call(_a3, r6);
          }, backgroundFetch: (r6, n6, i6, s7) => {
            var _a3;
            return __privateMethod(_a3 = e8, _t_instances, M_fn).call(_a3, r6, n6, i6, s7);
          }, moveToTail: (r6) => {
            var _a3;
            return __privateMethod(_a3 = e8, _t_instances, O_fn).call(_a3, r6);
          }, indexes: (r6) => {
            var _a3;
            return __privateMethod(_a3 = e8, _t_instances, S_fn).call(_a3, r6);
          }, rindexes: (r6) => {
            var _a3;
            return __privateMethod(_a3 = e8, _t_instances, E_fn).call(_a3, r6);
          }, isStale: (r6) => {
            var _a3;
            return __privateGet(_a3 = e8, _p).call(_a3, r6);
          } };
        }
        get max() {
          return __privateGet(this, _u2);
        }
        get maxSize() {
          return __privateGet(this, _f2);
        }
        get calculatedSize() {
          return __privateGet(this, _b3);
        }
        get size() {
          return __privateGet(this, _i2);
        }
        get fetchMethod() {
          return __privateGet(this, _R);
        }
        get memoMethod() {
          return __privateGet(this, _k);
        }
        get dispose() {
          return __privateGet(this, _y2);
        }
        get disposeAfter() {
          return __privateGet(this, _g);
        }
        getRemainingTTL(e8) {
          return __privateGet(this, _n).has(e8) ? 1 / 0 : 0;
        }
        *entries() {
          for (let e8 of __privateMethod(this, _t_instances, S_fn).call(this)) __privateGet(this, _e)[e8] !== void 0 && __privateGet(this, _r)[e8] !== void 0 && !__privateMethod(this, _t_instances, t_fn).call(this, __privateGet(this, _e)[e8]) && (yield [__privateGet(this, _r)[e8], __privateGet(this, _e)[e8]]);
        }
        *rentries() {
          for (let e8 of __privateMethod(this, _t_instances, E_fn).call(this)) __privateGet(this, _e)[e8] !== void 0 && __privateGet(this, _r)[e8] !== void 0 && !__privateMethod(this, _t_instances, t_fn).call(this, __privateGet(this, _e)[e8]) && (yield [__privateGet(this, _r)[e8], __privateGet(this, _e)[e8]]);
        }
        *keys() {
          for (let e8 of __privateMethod(this, _t_instances, S_fn).call(this)) {
            let r6 = __privateGet(this, _r)[e8];
            r6 !== void 0 && !__privateMethod(this, _t_instances, t_fn).call(this, __privateGet(this, _e)[e8]) && (yield r6);
          }
        }
        *rkeys() {
          for (let e8 of __privateMethod(this, _t_instances, E_fn).call(this)) {
            let r6 = __privateGet(this, _r)[e8];
            r6 !== void 0 && !__privateMethod(this, _t_instances, t_fn).call(this, __privateGet(this, _e)[e8]) && (yield r6);
          }
        }
        *values() {
          for (let e8 of __privateMethod(this, _t_instances, S_fn).call(this)) __privateGet(this, _e)[e8] !== void 0 && !__privateMethod(this, _t_instances, t_fn).call(this, __privateGet(this, _e)[e8]) && (yield __privateGet(this, _e)[e8]);
        }
        *rvalues() {
          for (let e8 of __privateMethod(this, _t_instances, E_fn).call(this)) __privateGet(this, _e)[e8] !== void 0 && !__privateMethod(this, _t_instances, t_fn).call(this, __privateGet(this, _e)[e8]) && (yield __privateGet(this, _e)[e8]);
        }
        [(_c2 = Symbol.iterator, _b2 = Symbol.toStringTag, _c2)]() {
          return this.entries();
        }
        find(e8, r6 = {}) {
          for (let n6 of __privateMethod(this, _t_instances, S_fn).call(this)) {
            let i6 = __privateGet(this, _e)[n6], s7 = __privateMethod(this, _t_instances, t_fn).call(this, i6) ? i6.__staleWhileFetching : i6;
            if (s7 !== void 0 && e8(s7, __privateGet(this, _r)[n6], this)) return this.get(__privateGet(this, _r)[n6], r6);
          }
        }
        forEach(e8, r6 = this) {
          for (let n6 of __privateMethod(this, _t_instances, S_fn).call(this)) {
            let i6 = __privateGet(this, _e)[n6], s7 = __privateMethod(this, _t_instances, t_fn).call(this, i6) ? i6.__staleWhileFetching : i6;
            s7 !== void 0 && e8.call(r6, s7, __privateGet(this, _r)[n6], this);
          }
        }
        rforEach(e8, r6 = this) {
          for (let n6 of __privateMethod(this, _t_instances, E_fn).call(this)) {
            let i6 = __privateGet(this, _e)[n6], s7 = __privateMethod(this, _t_instances, t_fn).call(this, i6) ? i6.__staleWhileFetching : i6;
            s7 !== void 0 && e8.call(r6, s7, __privateGet(this, _r)[n6], this);
          }
        }
        purgeStale() {
          let e8 = false;
          for (let r6 of __privateMethod(this, _t_instances, E_fn).call(this, { allowStale: true })) __privateGet(this, _p).call(this, r6) && (__privateMethod(this, _t_instances, A_fn).call(this, __privateGet(this, _r)[r6], "expire"), e8 = true);
          return e8;
        }
        info(e8) {
          let r6 = __privateGet(this, _n).get(e8);
          if (r6 === void 0) return;
          let n6 = __privateGet(this, _e)[r6], i6 = __privateMethod(this, _t_instances, t_fn).call(this, n6) ? n6.__staleWhileFetching : n6;
          if (i6 === void 0) return;
          let s7 = { value: i6 };
          if (__privateGet(this, _d) && __privateGet(this, __)) {
            let o6 = __privateGet(this, _d)[r6], a3 = __privateGet(this, __)[r6];
            if (o6 && a3) {
              let c5 = o6 - (gn.now() - a3);
              s7.ttl = c5, s7.start = Date.now();
            }
          }
          return __privateGet(this, _m) && (s7.size = __privateGet(this, _m)[r6]), s7;
        }
        dump() {
          let e8 = [];
          for (let r6 of __privateMethod(this, _t_instances, S_fn).call(this, { allowStale: true })) {
            let n6 = __privateGet(this, _r)[r6], i6 = __privateGet(this, _e)[r6], s7 = __privateMethod(this, _t_instances, t_fn).call(this, i6) ? i6.__staleWhileFetching : i6;
            if (s7 === void 0 || n6 === void 0) continue;
            let o6 = { value: s7 };
            if (__privateGet(this, _d) && __privateGet(this, __)) {
              o6.ttl = __privateGet(this, _d)[r6];
              let a3 = gn.now() - __privateGet(this, __)[r6];
              o6.start = Math.floor(Date.now() - a3);
            }
            __privateGet(this, _m) && (o6.size = __privateGet(this, _m)[r6]), e8.unshift([n6, o6]);
          }
          return e8;
        }
        load(e8) {
          this.clear();
          for (let [r6, n6] of e8) {
            if (n6.start) {
              let i6 = Date.now() - n6.start;
              n6.start = gn.now() - i6;
            }
            this.set(r6, n6.value, n6);
          }
        }
        set(e8, r6, n6 = {}) {
          var _a3, _b4, _c4;
          if (r6 === void 0) return this.delete(e8), this;
          let { ttl: i6 = this.ttl, start: s7, noDisposeOnSet: o6 = this.noDisposeOnSet, sizeCalculation: a3 = this.sizeCalculation, status: c5 } = n6, { noUpdateTTL: f3 = this.noUpdateTTL } = n6, h3 = __privateGet(this, _L).call(this, e8, r6, n6.size || 0, a3);
          if (this.maxEntrySize && h3 > this.maxEntrySize) return c5 && (c5.set = "miss", c5.maxEntrySizeExceeded = true), __privateMethod(this, _t_instances, A_fn).call(this, e8, "set"), this;
          let d3 = __privateGet(this, _i2) === 0 ? void 0 : __privateGet(this, _n).get(e8);
          if (d3 === void 0) d3 = __privateGet(this, _i2) === 0 ? __privateGet(this, _o2) : __privateGet(this, _w2).length !== 0 ? __privateGet(this, _w2).pop() : __privateGet(this, _i2) === __privateGet(this, _u2) ? __privateMethod(this, _t_instances, B_fn).call(this, false) : __privateGet(this, _i2), __privateGet(this, _r)[d3] = e8, __privateGet(this, _e)[d3] = r6, __privateGet(this, _n).set(e8, d3), __privateGet(this, _l2)[__privateGet(this, _o2)] = d3, __privateGet(this, _h)[d3] = __privateGet(this, _o2), __privateSet(this, _o2, d3), __privateWrapper(this, _i2)._++, __privateGet(this, _C).call(this, d3, h3, c5), c5 && (c5.set = "add"), f3 = false;
          else {
            __privateMethod(this, _t_instances, O_fn).call(this, d3);
            let w2 = __privateGet(this, _e)[d3];
            if (r6 !== w2) {
              if (__privateGet(this, _x2) && __privateMethod(this, _t_instances, t_fn).call(this, w2)) {
                w2.__abortController.abort(new Error("replaced"));
                let { __staleWhileFetching: y3 } = w2;
                y3 !== void 0 && !o6 && (__privateGet(this, _v) && ((_a3 = __privateGet(this, _y2)) == null ? void 0 : _a3.call(this, y3, e8, "set")), __privateGet(this, _c3) && __privateGet(this, _s)?.push([y3, e8, "set"]));
              } else o6 || (__privateGet(this, _v) && ((_b4 = __privateGet(this, _y2)) == null ? void 0 : _b4.call(this, w2, e8, "set")), __privateGet(this, _c3) && __privateGet(this, _s)?.push([w2, e8, "set"]));
              if (__privateGet(this, _P).call(this, d3), __privateGet(this, _C).call(this, d3, h3, c5), __privateGet(this, _e)[d3] = r6, c5) {
                c5.set = "replace";
                let y3 = w2 && __privateMethod(this, _t_instances, t_fn).call(this, w2) ? w2.__staleWhileFetching : w2;
                y3 !== void 0 && (c5.oldValue = y3);
              }
            } else c5 && (c5.set = "update");
          }
          if (i6 !== 0 && !__privateGet(this, _d) && __privateMethod(this, _t_instances, N_fn).call(this), __privateGet(this, _d) && (f3 || __privateGet(this, _q).call(this, d3, i6, s7), c5 && __privateGet(this, _I2).call(this, c5, d3)), !o6 && __privateGet(this, _c3) && __privateGet(this, _s)) {
            let w2 = __privateGet(this, _s), y3;
            for (; y3 = w2?.shift(); ) (_c4 = __privateGet(this, _g)) == null ? void 0 : _c4.call(this, ...y3);
          }
          return this;
        }
        pop() {
          var _a3;
          try {
            for (; __privateGet(this, _i2); ) {
              let e8 = __privateGet(this, _e)[__privateGet(this, _a2)];
              if (__privateMethod(this, _t_instances, B_fn).call(this, true), __privateMethod(this, _t_instances, t_fn).call(this, e8)) {
                if (e8.__staleWhileFetching) return e8.__staleWhileFetching;
              } else if (e8 !== void 0) return e8;
            }
          } finally {
            if (__privateGet(this, _c3) && __privateGet(this, _s)) {
              let e8 = __privateGet(this, _s), r6;
              for (; r6 = e8?.shift(); ) (_a3 = __privateGet(this, _g)) == null ? void 0 : _a3.call(this, ...r6);
            }
          }
        }
        has(e8, r6 = {}) {
          let { updateAgeOnHas: n6 = this.updateAgeOnHas, status: i6 } = r6, s7 = __privateGet(this, _n).get(e8);
          if (s7 !== void 0) {
            let o6 = __privateGet(this, _e)[s7];
            if (__privateMethod(this, _t_instances, t_fn).call(this, o6) && o6.__staleWhileFetching === void 0) return false;
            if (__privateGet(this, _p).call(this, s7)) i6 && (i6.has = "stale", __privateGet(this, _I2).call(this, i6, s7));
            else return n6 && __privateGet(this, _T).call(this, s7), i6 && (i6.has = "hit", __privateGet(this, _I2).call(this, i6, s7)), true;
          } else i6 && (i6.has = "miss");
          return false;
        }
        peek(e8, r6 = {}) {
          let { allowStale: n6 = this.allowStale } = r6, i6 = __privateGet(this, _n).get(e8);
          if (i6 === void 0 || !n6 && __privateGet(this, _p).call(this, i6)) return;
          let s7 = __privateGet(this, _e)[i6];
          return __privateMethod(this, _t_instances, t_fn).call(this, s7) ? s7.__staleWhileFetching : s7;
        }
        async fetch(e8, r6 = {}) {
          let { allowStale: n6 = this.allowStale, updateAgeOnGet: i6 = this.updateAgeOnGet, noDeleteOnStaleGet: s7 = this.noDeleteOnStaleGet, ttl: o6 = this.ttl, noDisposeOnSet: a3 = this.noDisposeOnSet, size: c5 = 0, sizeCalculation: f3 = this.sizeCalculation, noUpdateTTL: h3 = this.noUpdateTTL, noDeleteOnFetchRejection: d3 = this.noDeleteOnFetchRejection, allowStaleOnFetchRejection: w2 = this.allowStaleOnFetchRejection, ignoreFetchAbort: y3 = this.ignoreFetchAbort, allowStaleOnFetchAbort: P2 = this.allowStaleOnFetchAbort, context: E2, forceRefresh: b3 = false, status: m2, signal: v2 } = r6;
          if (!__privateGet(this, _x2)) return m2 && (m2.fetch = "get"), this.get(e8, { allowStale: n6, updateAgeOnGet: i6, noDeleteOnStaleGet: s7, status: m2 });
          let R2 = { allowStale: n6, updateAgeOnGet: i6, noDeleteOnStaleGet: s7, ttl: o6, noDisposeOnSet: a3, size: c5, sizeCalculation: f3, noUpdateTTL: h3, noDeleteOnFetchRejection: d3, allowStaleOnFetchRejection: w2, allowStaleOnFetchAbort: P2, ignoreFetchAbort: y3, status: m2, signal: v2 }, T2 = __privateGet(this, _n).get(e8);
          if (T2 === void 0) {
            m2 && (m2.fetch = "miss");
            let g2 = __privateMethod(this, _t_instances, M_fn).call(this, e8, T2, R2, E2);
            return g2.__returned = g2;
          } else {
            let g2 = __privateGet(this, _e)[T2];
            if (__privateMethod(this, _t_instances, t_fn).call(this, g2)) {
              let j2 = n6 && g2.__staleWhileFetching !== void 0;
              return m2 && (m2.fetch = "inflight", j2 && (m2.returnedStale = true)), j2 ? g2.__staleWhileFetching : g2.__returned = g2;
            }
            let O = __privateGet(this, _p).call(this, T2);
            if (!b3 && !O) return m2 && (m2.fetch = "hit"), __privateMethod(this, _t_instances, O_fn).call(this, T2), i6 && __privateGet(this, _T).call(this, T2), m2 && __privateGet(this, _I2).call(this, m2, T2), g2;
            let _2 = __privateMethod(this, _t_instances, M_fn).call(this, e8, T2, R2, E2), $2 = _2.__staleWhileFetching !== void 0 && n6;
            return m2 && (m2.fetch = O ? "stale" : "refresh", $2 && O && (m2.returnedStale = true)), $2 ? _2.__staleWhileFetching : _2.__returned = _2;
          }
        }
        async forceFetch(e8, r6 = {}) {
          let n6 = await this.fetch(e8, r6);
          if (n6 === void 0) throw new Error("fetch() returned undefined");
          return n6;
        }
        memo(e8, r6 = {}) {
          let n6 = __privateGet(this, _k);
          if (!n6) throw new Error("no memoMethod provided to constructor");
          let { context: i6, forceRefresh: s7, ...o6 } = r6, a3 = this.get(e8, o6);
          if (!s7 && a3 !== void 0) return a3;
          let c5 = n6(e8, a3, { options: o6, context: i6 });
          return this.set(e8, c5, o6), c5;
        }
        get(e8, r6 = {}) {
          let { allowStale: n6 = this.allowStale, updateAgeOnGet: i6 = this.updateAgeOnGet, noDeleteOnStaleGet: s7 = this.noDeleteOnStaleGet, status: o6 } = r6, a3 = __privateGet(this, _n).get(e8);
          if (a3 !== void 0) {
            let c5 = __privateGet(this, _e)[a3], f3 = __privateMethod(this, _t_instances, t_fn).call(this, c5);
            return o6 && __privateGet(this, _I2).call(this, o6, a3), __privateGet(this, _p).call(this, a3) ? (o6 && (o6.get = "stale"), f3 ? (o6 && n6 && c5.__staleWhileFetching !== void 0 && (o6.returnedStale = true), n6 ? c5.__staleWhileFetching : void 0) : (s7 || __privateMethod(this, _t_instances, A_fn).call(this, e8, "expire"), o6 && n6 && (o6.returnedStale = true), n6 ? c5 : void 0)) : (o6 && (o6.get = "hit"), f3 ? c5.__staleWhileFetching : (__privateMethod(this, _t_instances, O_fn).call(this, a3), i6 && __privateGet(this, _T).call(this, a3), c5));
          } else o6 && (o6.get = "miss");
        }
        delete(e8) {
          return __privateMethod(this, _t_instances, A_fn).call(this, e8, "delete");
        }
        clear() {
          return __privateMethod(this, _t_instances, j_fn).call(this, "delete");
        }
      }, _u2 = new WeakMap(), _f2 = new WeakMap(), _y2 = new WeakMap(), _g = new WeakMap(), _R = new WeakMap(), _k = new WeakMap(), _i2 = new WeakMap(), _b3 = new WeakMap(), _n = new WeakMap(), _r = new WeakMap(), _e = new WeakMap(), _l2 = new WeakMap(), _h = new WeakMap(), _a2 = new WeakMap(), _o2 = new WeakMap(), _w2 = new WeakMap(), _s = new WeakMap(), _m = new WeakMap(), __ = new WeakMap(), _d = new WeakMap(), _v = new WeakMap(), _x2 = new WeakMap(), _c3 = new WeakMap(), _t_instances = new WeakSet(), N_fn = function() {
        let e8 = new bn(__privateGet(this, _u2)), r6 = new bn(__privateGet(this, _u2));
        __privateSet(this, _d, e8), __privateSet(this, __, r6), __privateSet(this, _q, (s7, o6, a3 = gn.now()) => {
          if (r6[s7] = o6 !== 0 ? a3 : 0, e8[s7] = o6, o6 !== 0 && this.ttlAutopurge) {
            let c5 = setTimeout(() => {
              __privateGet(this, _p).call(this, s7) && __privateMethod(this, _t_instances, A_fn).call(this, __privateGet(this, _r)[s7], "expire");
            }, o6 + 1);
            c5.unref && c5.unref();
          }
        }), __privateSet(this, _T, (s7) => {
          r6[s7] = e8[s7] !== 0 ? gn.now() : 0;
        }), __privateSet(this, _I2, (s7, o6) => {
          if (e8[o6]) {
            let a3 = e8[o6], c5 = r6[o6];
            if (!a3 || !c5) return;
            s7.ttl = a3, s7.start = c5, s7.now = n6 || i6();
            let f3 = s7.now - c5;
            s7.remainingTTL = a3 - f3;
          }
        });
        let n6 = 0, i6 = () => {
          let s7 = gn.now();
          if (this.ttlResolution > 0) {
            n6 = s7;
            let o6 = setTimeout(() => n6 = 0, this.ttlResolution);
            o6.unref && o6.unref();
          }
          return s7;
        };
        this.getRemainingTTL = (s7) => {
          let o6 = __privateGet(this, _n).get(s7);
          if (o6 === void 0) return 0;
          let a3 = e8[o6], c5 = r6[o6];
          if (!a3 || !c5) return 1 / 0;
          let f3 = (n6 || i6()) - c5;
          return a3 - f3;
        }, __privateSet(this, _p, (s7) => {
          let o6 = r6[s7], a3 = e8[s7];
          return !!a3 && !!o6 && (n6 || i6()) - o6 > a3;
        });
      }, _T = new WeakMap(), _I2 = new WeakMap(), _q = new WeakMap(), _p = new WeakMap(), F_fn = function() {
        let e8 = new bn(__privateGet(this, _u2));
        __privateSet(this, _b3, 0), __privateSet(this, _m, e8), __privateSet(this, _P, (r6) => {
          __privateSet(this, _b3, __privateGet(this, _b3) - e8[r6]), e8[r6] = 0;
        }), __privateSet(this, _L, (r6, n6, i6, s7) => {
          if (__privateMethod(this, _t_instances, t_fn).call(this, n6)) return 0;
          if (!lr(i6)) if (s7) {
            if (typeof s7 != "function") throw new TypeError("sizeCalculation must be a function");
            if (i6 = s7(n6, r6), !lr(i6)) throw new TypeError("sizeCalculation return invalid (expect positive integer)");
          } else throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
          return i6;
        }), __privateSet(this, _C, (r6, n6, i6) => {
          if (e8[r6] = n6, __privateGet(this, _f2)) {
            let s7 = __privateGet(this, _f2) - e8[r6];
            for (; __privateGet(this, _b3) > s7; ) __privateMethod(this, _t_instances, B_fn).call(this, true);
          }
          __privateSet(this, _b3, __privateGet(this, _b3) + e8[r6]), i6 && (i6.entrySize = n6, i6.totalCalculatedSize = __privateGet(this, _b3));
        });
      }, _P = new WeakMap(), _C = new WeakMap(), _L = new WeakMap(), S_fn = function* ({ allowStale: e8 = this.allowStale } = {}) {
        if (__privateGet(this, _i2)) for (let r6 = __privateGet(this, _o2); !(!__privateMethod(this, _t_instances, U_fn).call(this, r6) || ((e8 || !__privateGet(this, _p).call(this, r6)) && (yield r6), r6 === __privateGet(this, _a2))); ) r6 = __privateGet(this, _h)[r6];
      }, E_fn = function* ({ allowStale: e8 = this.allowStale } = {}) {
        if (__privateGet(this, _i2)) for (let r6 = __privateGet(this, _a2); !(!__privateMethod(this, _t_instances, U_fn).call(this, r6) || ((e8 || !__privateGet(this, _p).call(this, r6)) && (yield r6), r6 === __privateGet(this, _o2))); ) r6 = __privateGet(this, _l2)[r6];
      }, U_fn = function(e8) {
        return e8 !== void 0 && __privateGet(this, _n).get(__privateGet(this, _r)[e8]) === e8;
      }, B_fn = function(e8) {
        var _a3;
        let r6 = __privateGet(this, _a2), n6 = __privateGet(this, _r)[r6], i6 = __privateGet(this, _e)[r6];
        return __privateGet(this, _x2) && __privateMethod(this, _t_instances, t_fn).call(this, i6) ? i6.__abortController.abort(new Error("evicted")) : (__privateGet(this, _v) || __privateGet(this, _c3)) && (__privateGet(this, _v) && ((_a3 = __privateGet(this, _y2)) == null ? void 0 : _a3.call(this, i6, n6, "evict")), __privateGet(this, _c3) && __privateGet(this, _s)?.push([i6, n6, "evict"])), __privateGet(this, _P).call(this, r6), e8 && (__privateGet(this, _r)[r6] = void 0, __privateGet(this, _e)[r6] = void 0, __privateGet(this, _w2).push(r6)), __privateGet(this, _i2) === 1 ? (__privateSet(this, _a2, __privateSet(this, _o2, 0)), __privateGet(this, _w2).length = 0) : __privateSet(this, _a2, __privateGet(this, _l2)[r6]), __privateGet(this, _n).delete(n6), __privateWrapper(this, _i2)._--, r6;
      }, M_fn = function(e8, r6, n6, i6) {
        let s7 = r6 === void 0 ? void 0 : __privateGet(this, _e)[r6];
        if (__privateMethod(this, _t_instances, t_fn).call(this, s7)) return s7;
        let o6 = new mo(), { signal: a3 } = n6;
        a3?.addEventListener("abort", () => o6.abort(a3.reason), { signal: o6.signal });
        let c5 = { signal: o6.signal, options: n6, context: i6 }, f3 = (E2, b3 = false) => {
          let { aborted: m2 } = o6.signal, v2 = n6.ignoreFetchAbort && E2 !== void 0;
          if (n6.status && (m2 && !b3 ? (n6.status.fetchAborted = true, n6.status.fetchError = o6.signal.reason, v2 && (n6.status.fetchAbortIgnored = true)) : n6.status.fetchResolved = true), m2 && !v2 && !b3) return d3(o6.signal.reason);
          let R2 = y3;
          return __privateGet(this, _e)[r6] === y3 && (E2 === void 0 ? R2.__staleWhileFetching ? __privateGet(this, _e)[r6] = R2.__staleWhileFetching : __privateMethod(this, _t_instances, A_fn).call(this, e8, "fetch") : (n6.status && (n6.status.fetchUpdated = true), this.set(e8, E2, c5.options))), E2;
        }, h3 = (E2) => (n6.status && (n6.status.fetchRejected = true, n6.status.fetchError = E2), d3(E2)), d3 = (E2) => {
          let { aborted: b3 } = o6.signal, m2 = b3 && n6.allowStaleOnFetchAbort, v2 = m2 || n6.allowStaleOnFetchRejection, R2 = v2 || n6.noDeleteOnFetchRejection, T2 = y3;
          if (__privateGet(this, _e)[r6] === y3 && (!R2 || T2.__staleWhileFetching === void 0 ? __privateMethod(this, _t_instances, A_fn).call(this, e8, "fetch") : m2 || (__privateGet(this, _e)[r6] = T2.__staleWhileFetching)), v2) return n6.status && T2.__staleWhileFetching !== void 0 && (n6.status.returnedStale = true), T2.__staleWhileFetching;
          if (T2.__returned === T2) throw E2;
        }, w2 = (E2, b3) => {
          var _a3;
          let m2 = (_a3 = __privateGet(this, _R)) == null ? void 0 : _a3.call(this, e8, s7, c5);
          m2 && m2 instanceof Promise && m2.then((v2) => E2(v2 === void 0 ? void 0 : v2), b3), o6.signal.addEventListener("abort", () => {
            (!n6.ignoreFetchAbort || n6.allowStaleOnFetchAbort) && (E2(void 0), n6.allowStaleOnFetchAbort && (E2 = (v2) => f3(v2, true)));
          });
        };
        n6.status && (n6.status.fetchDispatched = true);
        let y3 = new Promise(w2).then(f3, h3), P2 = Object.assign(y3, { __abortController: o6, __staleWhileFetching: s7, __returned: void 0 });
        return r6 === void 0 ? (this.set(e8, P2, { ...c5.options, status: void 0 }), r6 = __privateGet(this, _n).get(e8)) : __privateGet(this, _e)[r6] = P2, P2;
      }, t_fn = function(e8) {
        if (!__privateGet(this, _x2)) return false;
        let r6 = e8;
        return !!r6 && r6 instanceof Promise && r6.hasOwnProperty("__staleWhileFetching") && r6.__abortController instanceof mo;
      }, D_fn = function(e8, r6) {
        __privateGet(this, _h)[r6] = e8, __privateGet(this, _l2)[e8] = r6;
      }, O_fn = function(e8) {
        e8 !== __privateGet(this, _o2) && (e8 === __privateGet(this, _a2) ? __privateSet(this, _a2, __privateGet(this, _l2)[e8]) : __privateMethod(this, _t_instances, D_fn).call(this, __privateGet(this, _h)[e8], __privateGet(this, _l2)[e8]), __privateMethod(this, _t_instances, D_fn).call(this, __privateGet(this, _o2), e8), __privateSet(this, _o2, e8));
      }, A_fn = function(e8, r6) {
        var _a3, _b4;
        let n6 = false;
        if (__privateGet(this, _i2) !== 0) {
          let i6 = __privateGet(this, _n).get(e8);
          if (i6 !== void 0) if (n6 = true, __privateGet(this, _i2) === 1) __privateMethod(this, _t_instances, j_fn).call(this, r6);
          else {
            __privateGet(this, _P).call(this, i6);
            let s7 = __privateGet(this, _e)[i6];
            if (__privateMethod(this, _t_instances, t_fn).call(this, s7) ? s7.__abortController.abort(new Error("deleted")) : (__privateGet(this, _v) || __privateGet(this, _c3)) && (__privateGet(this, _v) && ((_a3 = __privateGet(this, _y2)) == null ? void 0 : _a3.call(this, s7, e8, r6)), __privateGet(this, _c3) && __privateGet(this, _s)?.push([s7, e8, r6])), __privateGet(this, _n).delete(e8), __privateGet(this, _r)[i6] = void 0, __privateGet(this, _e)[i6] = void 0, i6 === __privateGet(this, _o2)) __privateSet(this, _o2, __privateGet(this, _h)[i6]);
            else if (i6 === __privateGet(this, _a2)) __privateSet(this, _a2, __privateGet(this, _l2)[i6]);
            else {
              let o6 = __privateGet(this, _h)[i6];
              __privateGet(this, _l2)[o6] = __privateGet(this, _l2)[i6];
              let a3 = __privateGet(this, _l2)[i6];
              __privateGet(this, _h)[a3] = __privateGet(this, _h)[i6];
            }
            __privateWrapper(this, _i2)._--, __privateGet(this, _w2).push(i6);
          }
        }
        if (__privateGet(this, _c3) && __privateGet(this, _s)?.length) {
          let i6 = __privateGet(this, _s), s7;
          for (; s7 = i6?.shift(); ) (_b4 = __privateGet(this, _g)) == null ? void 0 : _b4.call(this, ...s7);
        }
        return n6;
      }, j_fn = function(e8) {
        var _a3, _b4;
        for (let r6 of __privateMethod(this, _t_instances, E_fn).call(this, { allowStale: true })) {
          let n6 = __privateGet(this, _e)[r6];
          if (__privateMethod(this, _t_instances, t_fn).call(this, n6)) n6.__abortController.abort(new Error("deleted"));
          else {
            let i6 = __privateGet(this, _r)[r6];
            __privateGet(this, _v) && ((_a3 = __privateGet(this, _y2)) == null ? void 0 : _a3.call(this, n6, i6, e8)), __privateGet(this, _c3) && __privateGet(this, _s)?.push([n6, i6, e8]);
          }
        }
        if (__privateGet(this, _n).clear(), __privateGet(this, _e).fill(void 0), __privateGet(this, _r).fill(void 0), __privateGet(this, _d) && __privateGet(this, __) && (__privateGet(this, _d).fill(0), __privateGet(this, __).fill(0)), __privateGet(this, _m) && __privateGet(this, _m).fill(0), __privateSet(this, _a2, 0), __privateSet(this, _o2, 0), __privateGet(this, _w2).length = 0, __privateSet(this, _b3, 0), __privateSet(this, _i2, 0), __privateGet(this, _c3) && __privateGet(this, _s)) {
          let r6 = __privateGet(this, _s), n6;
          for (; n6 = r6?.shift(); ) (_b4 = __privateGet(this, _g)) == null ? void 0 : _b4.call(this, ...n6);
        }
      }, _d2);
      _o.LRUCache = Ha;
    });
    It = D((cr) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(cr, "t", { value: true });
      cr.ContainerIterator = cr.Container = cr.Base = void 0;
      var Va = class {
        constructor(e8 = 0) {
          this.iteratorType = e8;
        }
        equals(e8) {
          return this.o === e8.o;
        }
      };
      cr.ContainerIterator = Va;
      var vo = class {
        constructor() {
          this.i = 0;
        }
        get length() {
          return this.i;
        }
        size() {
          return this.i;
        }
        empty() {
          return this.i === 0;
        }
      };
      cr.Base = vo;
      var Ga = class extends vo {
      };
      cr.Container = Ga;
    });
    Sy = D((So) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(So, "t", { value: true });
      So.default = void 0;
      var qE = It(), za = class extends qE.Base {
        constructor(e8 = []) {
          super(), this.S = [];
          let r6 = this;
          e8.forEach(function(n6) {
            r6.push(n6);
          });
        }
        clear() {
          this.i = 0, this.S = [];
        }
        push(e8) {
          return this.S.push(e8), this.i += 1, this.i;
        }
        pop() {
          if (this.i !== 0) return this.i -= 1, this.S.pop();
        }
        top() {
          return this.S[this.i - 1];
        }
      }, LE = za;
      So.default = LE;
    });
    Ey = D((Eo) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(Eo, "t", { value: true });
      Eo.default = void 0;
      var UE = It(), Ka = class extends UE.Base {
        constructor(e8 = []) {
          super(), this.j = 0, this.q = [];
          let r6 = this;
          e8.forEach(function(n6) {
            r6.push(n6);
          });
        }
        clear() {
          this.q = [], this.i = this.j = 0;
        }
        push(e8) {
          let r6 = this.q.length;
          if (this.j / r6 > 0.5 && this.j + this.i >= r6 && r6 > 4096) {
            let n6 = this.i;
            for (let i6 = 0; i6 < n6; ++i6) this.q[i6] = this.q[this.j + i6];
            this.j = 0, this.q[this.i] = e8;
          } else this.q[this.j + this.i] = e8;
          return ++this.i;
        }
        pop() {
          if (this.i === 0) return;
          let e8 = this.q[this.j++];
          return this.i -= 1, e8;
        }
        front() {
          if (this.i !== 0) return this.q[this.j];
        }
      }, DE = Ka;
      Eo.default = DE;
    });
    Ay = D((Ao) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(Ao, "t", { value: true });
      Ao.default = void 0;
      var jE = It(), Qa = class extends jE.Base {
        constructor(e8 = [], r6 = function(i6, s7) {
          return i6 > s7 ? -1 : i6 < s7 ? 1 : 0;
        }, n6 = true) {
          if (super(), this.v = r6, Array.isArray(e8)) this.C = n6 ? [...e8] : e8;
          else {
            this.C = [];
            let s7 = this;
            e8.forEach(function(o6) {
              s7.C.push(o6);
            });
          }
          this.i = this.C.length;
          let i6 = this.i >> 1;
          for (let s7 = this.i - 1 >> 1; s7 >= 0; --s7) this.k(s7, i6);
        }
        m(e8) {
          let r6 = this.C[e8];
          for (; e8 > 0; ) {
            let n6 = e8 - 1 >> 1, i6 = this.C[n6];
            if (this.v(i6, r6) <= 0) break;
            this.C[e8] = i6, e8 = n6;
          }
          this.C[e8] = r6;
        }
        k(e8, r6) {
          let n6 = this.C[e8];
          for (; e8 < r6; ) {
            let i6 = e8 << 1 | 1, s7 = i6 + 1, o6 = this.C[i6];
            if (s7 < this.i && this.v(o6, this.C[s7]) > 0 && (i6 = s7, o6 = this.C[s7]), this.v(o6, n6) >= 0) break;
            this.C[e8] = o6, e8 = i6;
          }
          this.C[e8] = n6;
        }
        clear() {
          this.i = 0, this.C.length = 0;
        }
        push(e8) {
          this.C.push(e8), this.m(this.i), this.i += 1;
        }
        pop() {
          if (this.i === 0) return;
          let e8 = this.C[0], r6 = this.C.pop();
          return this.i -= 1, this.i && (this.C[0] = r6, this.k(0, this.i >> 1)), e8;
        }
        top() {
          return this.C[0];
        }
        find(e8) {
          return this.C.indexOf(e8) >= 0;
        }
        remove(e8) {
          let r6 = this.C.indexOf(e8);
          return r6 < 0 ? false : (r6 === 0 ? this.pop() : r6 === this.i - 1 ? (this.C.pop(), this.i -= 1) : (this.C.splice(r6, 1, this.C.pop()), this.i -= 1, this.m(r6), this.k(r6, this.i >> 1)), true);
        }
        updateItem(e8) {
          let r6 = this.C.indexOf(e8);
          return r6 < 0 ? false : (this.m(r6), this.k(r6, this.i >> 1), true);
        }
        toArray() {
          return [...this.C];
        }
      }, FE = Qa;
      Ao.default = FE;
    });
    xo = D((Io) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(Io, "t", { value: true });
      Io.default = void 0;
      var WE = It(), Ya = class extends WE.Container {
      }, $E = Ya;
      Io.default = $E;
    });
    xt = D((Ja) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(Ja, "t", { value: true });
      Ja.throwIteratorAccessError = HE;
      function HE() {
        throw new RangeError("Iterator access denied!");
      }
    });
    Za = D((Po) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(Po, "t", { value: true });
      Po.RandomIterator = void 0;
      var VE = It(), To = xt(), Xa = class extends VE.ContainerIterator {
        constructor(e8, r6) {
          super(r6), this.o = e8, this.iteratorType === 0 ? (this.pre = function() {
            return this.o === 0 && (0, To.throwIteratorAccessError)(), this.o -= 1, this;
          }, this.next = function() {
            return this.o === this.container.size() && (0, To.throwIteratorAccessError)(), this.o += 1, this;
          }) : (this.pre = function() {
            return this.o === this.container.size() - 1 && (0, To.throwIteratorAccessError)(), this.o += 1, this;
          }, this.next = function() {
            return this.o === -1 && (0, To.throwIteratorAccessError)(), this.o -= 1, this;
          });
        }
        get pointer() {
          return this.container.getElementByPos(this.o);
        }
        set pointer(e8) {
          this.container.setElementByPos(this.o, e8);
        }
      };
      Po.RandomIterator = Xa;
    });
    Iy = D((Oo) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(Oo, "t", { value: true });
      Oo.default = void 0;
      var GE = KE(xo()), zE = Za();
      function KE(t5) {
        return t5 && t5.t ? t5 : { default: t5 };
      }
      var Nr = class t5 extends zE.RandomIterator {
        constructor(e8, r6, n6) {
          super(e8, n6), this.container = r6;
        }
        copy() {
          return new t5(this.o, this.container, this.iteratorType);
        }
      }, eu = class extends GE.default {
        constructor(e8 = [], r6 = true) {
          if (super(), Array.isArray(e8)) this.J = r6 ? [...e8] : e8, this.i = e8.length;
          else {
            this.J = [];
            let n6 = this;
            e8.forEach(function(i6) {
              n6.pushBack(i6);
            });
          }
        }
        clear() {
          this.i = 0, this.J.length = 0;
        }
        begin() {
          return new Nr(0, this);
        }
        end() {
          return new Nr(this.i, this);
        }
        rBegin() {
          return new Nr(this.i - 1, this, 1);
        }
        rEnd() {
          return new Nr(-1, this, 1);
        }
        front() {
          return this.J[0];
        }
        back() {
          return this.J[this.i - 1];
        }
        getElementByPos(e8) {
          if (e8 < 0 || e8 > this.i - 1) throw new RangeError();
          return this.J[e8];
        }
        eraseElementByPos(e8) {
          if (e8 < 0 || e8 > this.i - 1) throw new RangeError();
          return this.J.splice(e8, 1), this.i -= 1, this.i;
        }
        eraseElementByValue(e8) {
          let r6 = 0;
          for (let n6 = 0; n6 < this.i; ++n6) this.J[n6] !== e8 && (this.J[r6++] = this.J[n6]);
          return this.i = this.J.length = r6, this.i;
        }
        eraseElementByIterator(e8) {
          let r6 = e8.o;
          return e8 = e8.next(), this.eraseElementByPos(r6), e8;
        }
        pushBack(e8) {
          return this.J.push(e8), this.i += 1, this.i;
        }
        popBack() {
          if (this.i !== 0) return this.i -= 1, this.J.pop();
        }
        setElementByPos(e8, r6) {
          if (e8 < 0 || e8 > this.i - 1) throw new RangeError();
          this.J[e8] = r6;
        }
        insert(e8, r6, n6 = 1) {
          if (e8 < 0 || e8 > this.i) throw new RangeError();
          return this.J.splice(e8, 0, ...new Array(n6).fill(r6)), this.i += n6, this.i;
        }
        find(e8) {
          for (let r6 = 0; r6 < this.i; ++r6) if (this.J[r6] === e8) return new Nr(r6, this);
          return this.end();
        }
        reverse() {
          this.J.reverse();
        }
        unique() {
          let e8 = 1;
          for (let r6 = 1; r6 < this.i; ++r6) this.J[r6] !== this.J[r6 - 1] && (this.J[e8++] = this.J[r6]);
          return this.i = this.J.length = e8, this.i;
        }
        sort(e8) {
          this.J.sort(e8);
        }
        forEach(e8) {
          for (let r6 = 0; r6 < this.i; ++r6) e8(this.J[r6], r6, this);
        }
        [Symbol.iterator]() {
          return function* () {
            yield* this.J;
          }.bind(this)();
        }
      }, QE = eu;
      Oo.default = QE;
    });
    xy = D((Ro) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(Ro, "t", { value: true });
      Ro.default = void 0;
      var YE = XE(xo()), JE = It(), qr = xt();
      function XE(t5) {
        return t5 && t5.t ? t5 : { default: t5 };
      }
      var Lr = class t5 extends JE.ContainerIterator {
        constructor(e8, r6, n6, i6) {
          super(i6), this.o = e8, this.h = r6, this.container = n6, this.iteratorType === 0 ? (this.pre = function() {
            return this.o.L === this.h && (0, qr.throwIteratorAccessError)(), this.o = this.o.L, this;
          }, this.next = function() {
            return this.o === this.h && (0, qr.throwIteratorAccessError)(), this.o = this.o.B, this;
          }) : (this.pre = function() {
            return this.o.B === this.h && (0, qr.throwIteratorAccessError)(), this.o = this.o.B, this;
          }, this.next = function() {
            return this.o === this.h && (0, qr.throwIteratorAccessError)(), this.o = this.o.L, this;
          });
        }
        get pointer() {
          return this.o === this.h && (0, qr.throwIteratorAccessError)(), this.o.l;
        }
        set pointer(e8) {
          this.o === this.h && (0, qr.throwIteratorAccessError)(), this.o.l = e8;
        }
        copy() {
          return new t5(this.o, this.h, this.container, this.iteratorType);
        }
      }, tu = class extends YE.default {
        constructor(e8 = []) {
          super(), this.h = {}, this.p = this._ = this.h.L = this.h.B = this.h;
          let r6 = this;
          e8.forEach(function(n6) {
            r6.pushBack(n6);
          });
        }
        V(e8) {
          let { L: r6, B: n6 } = e8;
          r6.B = n6, n6.L = r6, e8 === this.p && (this.p = n6), e8 === this._ && (this._ = r6), this.i -= 1;
        }
        G(e8, r6) {
          let n6 = r6.B, i6 = { l: e8, L: r6, B: n6 };
          r6.B = i6, n6.L = i6, r6 === this.h && (this.p = i6), n6 === this.h && (this._ = i6), this.i += 1;
        }
        clear() {
          this.i = 0, this.p = this._ = this.h.L = this.h.B = this.h;
        }
        begin() {
          return new Lr(this.p, this.h, this);
        }
        end() {
          return new Lr(this.h, this.h, this);
        }
        rBegin() {
          return new Lr(this._, this.h, this, 1);
        }
        rEnd() {
          return new Lr(this.h, this.h, this, 1);
        }
        front() {
          return this.p.l;
        }
        back() {
          return this._.l;
        }
        getElementByPos(e8) {
          if (e8 < 0 || e8 > this.i - 1) throw new RangeError();
          let r6 = this.p;
          for (; e8--; ) r6 = r6.B;
          return r6.l;
        }
        eraseElementByPos(e8) {
          if (e8 < 0 || e8 > this.i - 1) throw new RangeError();
          let r6 = this.p;
          for (; e8--; ) r6 = r6.B;
          return this.V(r6), this.i;
        }
        eraseElementByValue(e8) {
          let r6 = this.p;
          for (; r6 !== this.h; ) r6.l === e8 && this.V(r6), r6 = r6.B;
          return this.i;
        }
        eraseElementByIterator(e8) {
          let r6 = e8.o;
          return r6 === this.h && (0, qr.throwIteratorAccessError)(), e8 = e8.next(), this.V(r6), e8;
        }
        pushBack(e8) {
          return this.G(e8, this._), this.i;
        }
        popBack() {
          if (this.i === 0) return;
          let e8 = this._.l;
          return this.V(this._), e8;
        }
        pushFront(e8) {
          return this.G(e8, this.h), this.i;
        }
        popFront() {
          if (this.i === 0) return;
          let e8 = this.p.l;
          return this.V(this.p), e8;
        }
        setElementByPos(e8, r6) {
          if (e8 < 0 || e8 > this.i - 1) throw new RangeError();
          let n6 = this.p;
          for (; e8--; ) n6 = n6.B;
          n6.l = r6;
        }
        insert(e8, r6, n6 = 1) {
          if (e8 < 0 || e8 > this.i) throw new RangeError();
          if (n6 <= 0) return this.i;
          if (e8 === 0) for (; n6--; ) this.pushFront(r6);
          else if (e8 === this.i) for (; n6--; ) this.pushBack(r6);
          else {
            let i6 = this.p;
            for (let o6 = 1; o6 < e8; ++o6) i6 = i6.B;
            let s7 = i6.B;
            for (this.i += n6; n6--; ) i6.B = { l: r6, L: i6 }, i6.B.L = i6, i6 = i6.B;
            i6.B = s7, s7.L = i6;
          }
          return this.i;
        }
        find(e8) {
          let r6 = this.p;
          for (; r6 !== this.h; ) {
            if (r6.l === e8) return new Lr(r6, this.h, this);
            r6 = r6.B;
          }
          return this.end();
        }
        reverse() {
          if (this.i <= 1) return;
          let e8 = this.p, r6 = this._, n6 = 0;
          for (; n6 << 1 < this.i; ) {
            let i6 = e8.l;
            e8.l = r6.l, r6.l = i6, e8 = e8.B, r6 = r6.L, n6 += 1;
          }
        }
        unique() {
          if (this.i <= 1) return this.i;
          let e8 = this.p;
          for (; e8 !== this.h; ) {
            let r6 = e8;
            for (; r6.B !== this.h && r6.l === r6.B.l; ) r6 = r6.B, this.i -= 1;
            e8.B = r6.B, e8.B.L = e8, e8 = e8.B;
          }
          return this.i;
        }
        sort(e8) {
          if (this.i <= 1) return;
          let r6 = [];
          this.forEach(function(i6) {
            r6.push(i6);
          }), r6.sort(e8);
          let n6 = this.p;
          r6.forEach(function(i6) {
            n6.l = i6, n6 = n6.B;
          });
        }
        merge(e8) {
          let r6 = this;
          if (this.i === 0) e8.forEach(function(n6) {
            r6.pushBack(n6);
          });
          else {
            let n6 = this.p;
            e8.forEach(function(i6) {
              for (; n6 !== r6.h && n6.l <= i6; ) n6 = n6.B;
              r6.G(i6, n6.L);
            });
          }
          return this.i;
        }
        forEach(e8) {
          let r6 = this.p, n6 = 0;
          for (; r6 !== this.h; ) e8(r6.l, n6++, this), r6 = r6.B;
        }
        [Symbol.iterator]() {
          return function* () {
            if (this.i === 0) return;
            let e8 = this.p;
            for (; e8 !== this.h; ) yield e8.l, e8 = e8.B;
          }.bind(this)();
        }
      }, ZE = tu;
      Ro.default = ZE;
    });
    Ty = D((ko) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(ko, "t", { value: true });
      ko.default = void 0;
      var e1 = r1(xo()), t1 = Za();
      function r1(t5) {
        return t5 && t5.t ? t5 : { default: t5 };
      }
      var Ur = class t5 extends t1.RandomIterator {
        constructor(e8, r6, n6) {
          super(e8, n6), this.container = r6;
        }
        copy() {
          return new t5(this.o, this.container, this.iteratorType);
        }
      }, ru = class extends e1.default {
        constructor(e8 = [], r6 = 4096) {
          super(), this.j = 0, this.D = 0, this.R = 0, this.N = 0, this.P = 0, this.A = [];
          let n6 = (() => {
            if (typeof e8.length == "number") return e8.length;
            if (typeof e8.size == "number") return e8.size;
            if (typeof e8.size == "function") return e8.size();
            throw new TypeError("Cannot get the length or size of the container");
          })();
          this.F = r6, this.P = Math.max(Math.ceil(n6 / this.F), 1);
          for (let o6 = 0; o6 < this.P; ++o6) this.A.push(new Array(this.F));
          let i6 = Math.ceil(n6 / this.F);
          this.j = this.R = (this.P >> 1) - (i6 >> 1), this.D = this.N = this.F - n6 % this.F >> 1;
          let s7 = this;
          e8.forEach(function(o6) {
            s7.pushBack(o6);
          });
        }
        T() {
          let e8 = [], r6 = Math.max(this.P >> 1, 1);
          for (let n6 = 0; n6 < r6; ++n6) e8[n6] = new Array(this.F);
          for (let n6 = this.j; n6 < this.P; ++n6) e8[e8.length] = this.A[n6];
          for (let n6 = 0; n6 < this.R; ++n6) e8[e8.length] = this.A[n6];
          e8[e8.length] = [...this.A[this.R]], this.j = r6, this.R = e8.length - 1;
          for (let n6 = 0; n6 < r6; ++n6) e8[e8.length] = new Array(this.F);
          this.A = e8, this.P = e8.length;
        }
        O(e8) {
          let r6 = this.D + e8 + 1, n6 = r6 % this.F, i6 = n6 - 1, s7 = this.j + (r6 - n6) / this.F;
          return n6 === 0 && (s7 -= 1), s7 %= this.P, i6 < 0 && (i6 += this.F), { curNodeBucketIndex: s7, curNodePointerIndex: i6 };
        }
        clear() {
          this.A = [new Array(this.F)], this.P = 1, this.j = this.R = this.i = 0, this.D = this.N = this.F >> 1;
        }
        begin() {
          return new Ur(0, this);
        }
        end() {
          return new Ur(this.i, this);
        }
        rBegin() {
          return new Ur(this.i - 1, this, 1);
        }
        rEnd() {
          return new Ur(-1, this, 1);
        }
        front() {
          if (this.i !== 0) return this.A[this.j][this.D];
        }
        back() {
          if (this.i !== 0) return this.A[this.R][this.N];
        }
        pushBack(e8) {
          return this.i && (this.N < this.F - 1 ? this.N += 1 : this.R < this.P - 1 ? (this.R += 1, this.N = 0) : (this.R = 0, this.N = 0), this.R === this.j && this.N === this.D && this.T()), this.i += 1, this.A[this.R][this.N] = e8, this.i;
        }
        popBack() {
          if (this.i === 0) return;
          let e8 = this.A[this.R][this.N];
          return this.i !== 1 && (this.N > 0 ? this.N -= 1 : this.R > 0 ? (this.R -= 1, this.N = this.F - 1) : (this.R = this.P - 1, this.N = this.F - 1)), this.i -= 1, e8;
        }
        pushFront(e8) {
          return this.i && (this.D > 0 ? this.D -= 1 : this.j > 0 ? (this.j -= 1, this.D = this.F - 1) : (this.j = this.P - 1, this.D = this.F - 1), this.j === this.R && this.D === this.N && this.T()), this.i += 1, this.A[this.j][this.D] = e8, this.i;
        }
        popFront() {
          if (this.i === 0) return;
          let e8 = this.A[this.j][this.D];
          return this.i !== 1 && (this.D < this.F - 1 ? this.D += 1 : this.j < this.P - 1 ? (this.j += 1, this.D = 0) : (this.j = 0, this.D = 0)), this.i -= 1, e8;
        }
        getElementByPos(e8) {
          if (e8 < 0 || e8 > this.i - 1) throw new RangeError();
          let { curNodeBucketIndex: r6, curNodePointerIndex: n6 } = this.O(e8);
          return this.A[r6][n6];
        }
        setElementByPos(e8, r6) {
          if (e8 < 0 || e8 > this.i - 1) throw new RangeError();
          let { curNodeBucketIndex: n6, curNodePointerIndex: i6 } = this.O(e8);
          this.A[n6][i6] = r6;
        }
        insert(e8, r6, n6 = 1) {
          if (e8 < 0 || e8 > this.i) throw new RangeError();
          if (e8 === 0) for (; n6--; ) this.pushFront(r6);
          else if (e8 === this.i) for (; n6--; ) this.pushBack(r6);
          else {
            let i6 = [];
            for (let s7 = e8; s7 < this.i; ++s7) i6.push(this.getElementByPos(s7));
            this.cut(e8 - 1);
            for (let s7 = 0; s7 < n6; ++s7) this.pushBack(r6);
            for (let s7 = 0; s7 < i6.length; ++s7) this.pushBack(i6[s7]);
          }
          return this.i;
        }
        cut(e8) {
          if (e8 < 0) return this.clear(), 0;
          let { curNodeBucketIndex: r6, curNodePointerIndex: n6 } = this.O(e8);
          return this.R = r6, this.N = n6, this.i = e8 + 1, this.i;
        }
        eraseElementByPos(e8) {
          if (e8 < 0 || e8 > this.i - 1) throw new RangeError();
          if (e8 === 0) this.popFront();
          else if (e8 === this.i - 1) this.popBack();
          else {
            let r6 = [];
            for (let i6 = e8 + 1; i6 < this.i; ++i6) r6.push(this.getElementByPos(i6));
            this.cut(e8), this.popBack();
            let n6 = this;
            r6.forEach(function(i6) {
              n6.pushBack(i6);
            });
          }
          return this.i;
        }
        eraseElementByValue(e8) {
          if (this.i === 0) return 0;
          let r6 = [];
          for (let i6 = 0; i6 < this.i; ++i6) {
            let s7 = this.getElementByPos(i6);
            s7 !== e8 && r6.push(s7);
          }
          let n6 = r6.length;
          for (let i6 = 0; i6 < n6; ++i6) this.setElementByPos(i6, r6[i6]);
          return this.cut(n6 - 1);
        }
        eraseElementByIterator(e8) {
          let r6 = e8.o;
          return this.eraseElementByPos(r6), e8 = e8.next(), e8;
        }
        find(e8) {
          for (let r6 = 0; r6 < this.i; ++r6) if (this.getElementByPos(r6) === e8) return new Ur(r6, this);
          return this.end();
        }
        reverse() {
          let e8 = 0, r6 = this.i - 1;
          for (; e8 < r6; ) {
            let n6 = this.getElementByPos(e8);
            this.setElementByPos(e8, this.getElementByPos(r6)), this.setElementByPos(r6, n6), e8 += 1, r6 -= 1;
          }
        }
        unique() {
          if (this.i <= 1) return this.i;
          let e8 = 1, r6 = this.getElementByPos(0);
          for (let n6 = 1; n6 < this.i; ++n6) {
            let i6 = this.getElementByPos(n6);
            i6 !== r6 && (r6 = i6, this.setElementByPos(e8++, i6));
          }
          for (; this.i > e8; ) this.popBack();
          return this.i;
        }
        sort(e8) {
          let r6 = [];
          for (let n6 = 0; n6 < this.i; ++n6) r6.push(this.getElementByPos(n6));
          r6.sort(e8);
          for (let n6 = 0; n6 < this.i; ++n6) this.setElementByPos(n6, r6[n6]);
        }
        shrinkToFit() {
          if (this.i === 0) return;
          let e8 = [];
          this.forEach(function(r6) {
            e8.push(r6);
          }), this.P = Math.max(Math.ceil(this.i / this.F), 1), this.i = this.j = this.R = this.D = this.N = 0, this.A = [];
          for (let r6 = 0; r6 < this.P; ++r6) this.A.push(new Array(this.F));
          for (let r6 = 0; r6 < e8.length; ++r6) this.pushBack(e8[r6]);
        }
        forEach(e8) {
          for (let r6 = 0; r6 < this.i; ++r6) e8(this.getElementByPos(r6), r6, this);
        }
        [Symbol.iterator]() {
          return function* () {
            for (let e8 = 0; e8 < this.i; ++e8) yield this.getElementByPos(e8);
          }.bind(this)();
        }
      }, n1 = ru;
      ko.default = n1;
    });
    Py = D((wn) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(wn, "t", { value: true });
      wn.TreeNodeEnableIndex = wn.TreeNode = void 0;
      var Co = class {
        constructor(e8, r6) {
          this.ee = 1, this.u = void 0, this.l = void 0, this.U = void 0, this.W = void 0, this.tt = void 0, this.u = e8, this.l = r6;
        }
        L() {
          let e8 = this;
          if (e8.ee === 1 && e8.tt.tt === e8) e8 = e8.W;
          else if (e8.U) for (e8 = e8.U; e8.W; ) e8 = e8.W;
          else {
            let r6 = e8.tt;
            for (; r6.U === e8; ) e8 = r6, r6 = e8.tt;
            e8 = r6;
          }
          return e8;
        }
        B() {
          let e8 = this;
          if (e8.W) {
            for (e8 = e8.W; e8.U; ) e8 = e8.U;
            return e8;
          } else {
            let r6 = e8.tt;
            for (; r6.W === e8; ) e8 = r6, r6 = e8.tt;
            return e8.W !== r6 ? r6 : e8;
          }
        }
        te() {
          let e8 = this.tt, r6 = this.W, n6 = r6.U;
          return e8.tt === this ? e8.tt = r6 : e8.U === this ? e8.U = r6 : e8.W = r6, r6.tt = e8, r6.U = this, this.tt = r6, this.W = n6, n6 && (n6.tt = this), r6;
        }
        se() {
          let e8 = this.tt, r6 = this.U, n6 = r6.W;
          return e8.tt === this ? e8.tt = r6 : e8.U === this ? e8.U = r6 : e8.W = r6, r6.tt = e8, r6.W = this, this.tt = r6, this.U = n6, n6 && (n6.tt = this), r6;
        }
      };
      wn.TreeNode = Co;
      var nu = class extends Co {
        constructor() {
          super(...arguments), this.rt = 1;
        }
        te() {
          let e8 = super.te();
          return this.ie(), e8.ie(), e8;
        }
        se() {
          let e8 = super.se();
          return this.ie(), e8.ie(), e8;
        }
        ie() {
          this.rt = 1, this.U && (this.rt += this.U.rt), this.W && (this.rt += this.W.rt);
        }
      };
      wn.TreeNodeEnableIndex = nu;
    });
    ou = D((Bo) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(Bo, "t", { value: true });
      Bo.default = void 0;
      var Oy = Py(), i1 = It(), Ry = xt(), iu = class extends i1.Container {
        constructor(e8 = function(n6, i6) {
          return n6 < i6 ? -1 : n6 > i6 ? 1 : 0;
        }, r6 = false) {
          super(), this.Y = void 0, this.v = e8, r6 ? (this.re = Oy.TreeNodeEnableIndex, this.M = function(n6, i6, s7) {
            let o6 = this.ne(n6, i6, s7);
            if (o6) {
              let a3 = o6.tt;
              for (; a3 !== this.h; ) a3.rt += 1, a3 = a3.tt;
              let c5 = this.he(o6);
              if (c5) {
                let { parentNode: f3, grandParent: h3, curNode: d3 } = c5;
                f3.ie(), h3.ie(), d3.ie();
              }
            }
            return this.i;
          }, this.V = function(n6) {
            let i6 = this.fe(n6);
            for (; i6 !== this.h; ) i6.rt -= 1, i6 = i6.tt;
          }) : (this.re = Oy.TreeNode, this.M = function(n6, i6, s7) {
            let o6 = this.ne(n6, i6, s7);
            return o6 && this.he(o6), this.i;
          }, this.V = this.fe), this.h = new this.re();
        }
        X(e8, r6) {
          let n6 = this.h;
          for (; e8; ) {
            let i6 = this.v(e8.u, r6);
            if (i6 < 0) e8 = e8.W;
            else if (i6 > 0) n6 = e8, e8 = e8.U;
            else return e8;
          }
          return n6;
        }
        Z(e8, r6) {
          let n6 = this.h;
          for (; e8; ) this.v(e8.u, r6) <= 0 ? e8 = e8.W : (n6 = e8, e8 = e8.U);
          return n6;
        }
        $(e8, r6) {
          let n6 = this.h;
          for (; e8; ) {
            let i6 = this.v(e8.u, r6);
            if (i6 < 0) n6 = e8, e8 = e8.W;
            else if (i6 > 0) e8 = e8.U;
            else return e8;
          }
          return n6;
        }
        rr(e8, r6) {
          let n6 = this.h;
          for (; e8; ) this.v(e8.u, r6) < 0 ? (n6 = e8, e8 = e8.W) : e8 = e8.U;
          return n6;
        }
        ue(e8) {
          for (; ; ) {
            let r6 = e8.tt;
            if (r6 === this.h) return;
            if (e8.ee === 1) {
              e8.ee = 0;
              return;
            }
            if (e8 === r6.U) {
              let n6 = r6.W;
              if (n6.ee === 1) n6.ee = 0, r6.ee = 1, r6 === this.Y ? this.Y = r6.te() : r6.te();
              else if (n6.W && n6.W.ee === 1) {
                n6.ee = r6.ee, r6.ee = 0, n6.W.ee = 0, r6 === this.Y ? this.Y = r6.te() : r6.te();
                return;
              } else n6.U && n6.U.ee === 1 ? (n6.ee = 1, n6.U.ee = 0, n6.se()) : (n6.ee = 1, e8 = r6);
            } else {
              let n6 = r6.U;
              if (n6.ee === 1) n6.ee = 0, r6.ee = 1, r6 === this.Y ? this.Y = r6.se() : r6.se();
              else if (n6.U && n6.U.ee === 1) {
                n6.ee = r6.ee, r6.ee = 0, n6.U.ee = 0, r6 === this.Y ? this.Y = r6.se() : r6.se();
                return;
              } else n6.W && n6.W.ee === 1 ? (n6.ee = 1, n6.W.ee = 0, n6.te()) : (n6.ee = 1, e8 = r6);
            }
          }
        }
        fe(e8) {
          if (this.i === 1) return this.clear(), this.h;
          let r6 = e8;
          for (; r6.U || r6.W; ) {
            if (r6.W) for (r6 = r6.W; r6.U; ) r6 = r6.U;
            else r6 = r6.U;
            [e8.u, r6.u] = [r6.u, e8.u], [e8.l, r6.l] = [r6.l, e8.l], e8 = r6;
          }
          this.h.U === r6 ? this.h.U = r6.tt : this.h.W === r6 && (this.h.W = r6.tt), this.ue(r6);
          let n6 = r6.tt;
          return r6 === n6.U ? n6.U = void 0 : n6.W = void 0, this.i -= 1, this.Y.ee = 0, n6;
        }
        oe(e8, r6) {
          return e8 === void 0 ? false : this.oe(e8.U, r6) || r6(e8) ? true : this.oe(e8.W, r6);
        }
        he(e8) {
          for (; ; ) {
            let r6 = e8.tt;
            if (r6.ee === 0) return;
            let n6 = r6.tt;
            if (r6 === n6.U) {
              let i6 = n6.W;
              if (i6 && i6.ee === 1) {
                if (i6.ee = r6.ee = 0, n6 === this.Y) return;
                n6.ee = 1, e8 = n6;
                continue;
              } else if (e8 === r6.W) {
                if (e8.ee = 0, e8.U && (e8.U.tt = r6), e8.W && (e8.W.tt = n6), r6.W = e8.U, n6.U = e8.W, e8.U = r6, e8.W = n6, n6 === this.Y) this.Y = e8, this.h.tt = e8;
                else {
                  let s7 = n6.tt;
                  s7.U === n6 ? s7.U = e8 : s7.W = e8;
                }
                return e8.tt = n6.tt, r6.tt = e8, n6.tt = e8, n6.ee = 1, { parentNode: r6, grandParent: n6, curNode: e8 };
              } else r6.ee = 0, n6 === this.Y ? this.Y = n6.se() : n6.se(), n6.ee = 1;
            } else {
              let i6 = n6.U;
              if (i6 && i6.ee === 1) {
                if (i6.ee = r6.ee = 0, n6 === this.Y) return;
                n6.ee = 1, e8 = n6;
                continue;
              } else if (e8 === r6.U) {
                if (e8.ee = 0, e8.U && (e8.U.tt = n6), e8.W && (e8.W.tt = r6), n6.W = e8.U, r6.U = e8.W, e8.U = n6, e8.W = r6, n6 === this.Y) this.Y = e8, this.h.tt = e8;
                else {
                  let s7 = n6.tt;
                  s7.U === n6 ? s7.U = e8 : s7.W = e8;
                }
                return e8.tt = n6.tt, r6.tt = e8, n6.tt = e8, n6.ee = 1, { parentNode: r6, grandParent: n6, curNode: e8 };
              } else r6.ee = 0, n6 === this.Y ? this.Y = n6.te() : n6.te(), n6.ee = 1;
            }
            return;
          }
        }
        ne(e8, r6, n6) {
          if (this.Y === void 0) {
            this.i += 1, this.Y = new this.re(e8, r6), this.Y.ee = 0, this.Y.tt = this.h, this.h.tt = this.Y, this.h.U = this.Y, this.h.W = this.Y;
            return;
          }
          let i6, s7 = this.h.U, o6 = this.v(s7.u, e8);
          if (o6 === 0) {
            s7.l = r6;
            return;
          } else if (o6 > 0) s7.U = new this.re(e8, r6), s7.U.tt = s7, i6 = s7.U, this.h.U = i6;
          else {
            let a3 = this.h.W, c5 = this.v(a3.u, e8);
            if (c5 === 0) {
              a3.l = r6;
              return;
            } else if (c5 < 0) a3.W = new this.re(e8, r6), a3.W.tt = a3, i6 = a3.W, this.h.W = i6;
            else {
              if (n6 !== void 0) {
                let f3 = n6.o;
                if (f3 !== this.h) {
                  let h3 = this.v(f3.u, e8);
                  if (h3 === 0) {
                    f3.l = r6;
                    return;
                  } else if (h3 > 0) {
                    let d3 = f3.L(), w2 = this.v(d3.u, e8);
                    if (w2 === 0) {
                      d3.l = r6;
                      return;
                    } else w2 < 0 && (i6 = new this.re(e8, r6), d3.W === void 0 ? (d3.W = i6, i6.tt = d3) : (f3.U = i6, i6.tt = f3));
                  }
                }
              }
              if (i6 === void 0) for (i6 = this.Y; ; ) {
                let f3 = this.v(i6.u, e8);
                if (f3 > 0) {
                  if (i6.U === void 0) {
                    i6.U = new this.re(e8, r6), i6.U.tt = i6, i6 = i6.U;
                    break;
                  }
                  i6 = i6.U;
                } else if (f3 < 0) {
                  if (i6.W === void 0) {
                    i6.W = new this.re(e8, r6), i6.W.tt = i6, i6 = i6.W;
                    break;
                  }
                  i6 = i6.W;
                } else {
                  i6.l = r6;
                  return;
                }
              }
            }
          }
          return this.i += 1, i6;
        }
        I(e8, r6) {
          for (; e8; ) {
            let n6 = this.v(e8.u, r6);
            if (n6 < 0) e8 = e8.W;
            else if (n6 > 0) e8 = e8.U;
            else return e8;
          }
          return e8 || this.h;
        }
        clear() {
          this.i = 0, this.Y = void 0, this.h.tt = void 0, this.h.U = this.h.W = void 0;
        }
        updateKeyByIterator(e8, r6) {
          let n6 = e8.o;
          if (n6 === this.h && (0, Ry.throwIteratorAccessError)(), this.i === 1) return n6.u = r6, true;
          if (n6 === this.h.U) return this.v(n6.B().u, r6) > 0 ? (n6.u = r6, true) : false;
          if (n6 === this.h.W) return this.v(n6.L().u, r6) < 0 ? (n6.u = r6, true) : false;
          let i6 = n6.L().u;
          if (this.v(i6, r6) >= 0) return false;
          let s7 = n6.B().u;
          return this.v(s7, r6) <= 0 ? false : (n6.u = r6, true);
        }
        eraseElementByPos(e8) {
          if (e8 < 0 || e8 > this.i - 1) throw new RangeError();
          let r6 = 0, n6 = this;
          return this.oe(this.Y, function(i6) {
            return e8 === r6 ? (n6.V(i6), true) : (r6 += 1, false);
          }), this.i;
        }
        eraseElementByKey(e8) {
          if (this.i === 0) return false;
          let r6 = this.I(this.Y, e8);
          return r6 === this.h ? false : (this.V(r6), true);
        }
        eraseElementByIterator(e8) {
          let r6 = e8.o;
          r6 === this.h && (0, Ry.throwIteratorAccessError)();
          let n6 = r6.W === void 0;
          return e8.iteratorType === 0 ? n6 && e8.next() : (!n6 || r6.U === void 0) && e8.next(), this.V(r6), e8;
        }
        forEach(e8) {
          let r6 = 0;
          for (let n6 of this) e8(n6, r6++, this);
        }
        getElementByPos(e8) {
          if (e8 < 0 || e8 > this.i - 1) throw new RangeError();
          let r6, n6 = 0;
          for (let i6 of this) {
            if (n6 === e8) {
              r6 = i6;
              break;
            }
            n6 += 1;
          }
          return r6;
        }
        getHeight() {
          if (this.i === 0) return 0;
          let e8 = function(r6) {
            return r6 ? Math.max(e8(r6.U), e8(r6.W)) + 1 : 0;
          };
          return e8(this.Y);
        }
      }, o1 = iu;
      Bo.default = o1;
    });
    au = D((No) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(No, "t", { value: true });
      No.default = void 0;
      var s1 = It(), Mo = xt(), su = class extends s1.ContainerIterator {
        constructor(e8, r6, n6) {
          super(n6), this.o = e8, this.h = r6, this.iteratorType === 0 ? (this.pre = function() {
            return this.o === this.h.U && (0, Mo.throwIteratorAccessError)(), this.o = this.o.L(), this;
          }, this.next = function() {
            return this.o === this.h && (0, Mo.throwIteratorAccessError)(), this.o = this.o.B(), this;
          }) : (this.pre = function() {
            return this.o === this.h.W && (0, Mo.throwIteratorAccessError)(), this.o = this.o.B(), this;
          }, this.next = function() {
            return this.o === this.h && (0, Mo.throwIteratorAccessError)(), this.o = this.o.L(), this;
          });
        }
        get index() {
          let e8 = this.o, r6 = this.h.tt;
          if (e8 === this.h) return r6 ? r6.rt - 1 : 0;
          let n6 = 0;
          for (e8.U && (n6 += e8.U.rt); e8 !== r6; ) {
            let i6 = e8.tt;
            e8 === i6.W && (n6 += 1, i6.U && (n6 += i6.U.rt)), e8 = i6;
          }
          return n6;
        }
      }, a1 = su;
      No.default = a1;
    });
    Cy = D((qo) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(qo, "t", { value: true });
      qo.default = void 0;
      var u1 = ky(ou()), l1 = ky(au()), c1 = xt();
      function ky(t5) {
        return t5 && t5.t ? t5 : { default: t5 };
      }
      var dt = class t5 extends l1.default {
        constructor(e8, r6, n6, i6) {
          super(e8, r6, i6), this.container = n6;
        }
        get pointer() {
          return this.o === this.h && (0, c1.throwIteratorAccessError)(), this.o.u;
        }
        copy() {
          return new t5(this.o, this.h, this.container, this.iteratorType);
        }
      }, uu = class extends u1.default {
        constructor(e8 = [], r6, n6) {
          super(r6, n6);
          let i6 = this;
          e8.forEach(function(s7) {
            i6.insert(s7);
          });
        }
        *K(e8) {
          e8 !== void 0 && (yield* this.K(e8.U), yield e8.u, yield* this.K(e8.W));
        }
        begin() {
          return new dt(this.h.U || this.h, this.h, this);
        }
        end() {
          return new dt(this.h, this.h, this);
        }
        rBegin() {
          return new dt(this.h.W || this.h, this.h, this, 1);
        }
        rEnd() {
          return new dt(this.h, this.h, this, 1);
        }
        front() {
          return this.h.U ? this.h.U.u : void 0;
        }
        back() {
          return this.h.W ? this.h.W.u : void 0;
        }
        insert(e8, r6) {
          return this.M(e8, void 0, r6);
        }
        find(e8) {
          let r6 = this.I(this.Y, e8);
          return new dt(r6, this.h, this);
        }
        lowerBound(e8) {
          let r6 = this.X(this.Y, e8);
          return new dt(r6, this.h, this);
        }
        upperBound(e8) {
          let r6 = this.Z(this.Y, e8);
          return new dt(r6, this.h, this);
        }
        reverseLowerBound(e8) {
          let r6 = this.$(this.Y, e8);
          return new dt(r6, this.h, this);
        }
        reverseUpperBound(e8) {
          let r6 = this.rr(this.Y, e8);
          return new dt(r6, this.h, this);
        }
        union(e8) {
          let r6 = this;
          return e8.forEach(function(n6) {
            r6.insert(n6);
          }), this.i;
        }
        [Symbol.iterator]() {
          return this.K(this.Y);
        }
      }, f1 = uu;
      qo.default = f1;
    });
    My = D((Lo) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(Lo, "t", { value: true });
      Lo.default = void 0;
      var h1 = By(ou()), d1 = By(au()), p1 = xt();
      function By(t5) {
        return t5 && t5.t ? t5 : { default: t5 };
      }
      var pt = class t5 extends d1.default {
        constructor(e8, r6, n6, i6) {
          super(e8, r6, i6), this.container = n6;
        }
        get pointer() {
          this.o === this.h && (0, p1.throwIteratorAccessError)();
          let e8 = this;
          return new Proxy([], { get(r6, n6) {
            if (n6 === "0") return e8.o.u;
            if (n6 === "1") return e8.o.l;
          }, set(r6, n6, i6) {
            if (n6 !== "1") throw new TypeError("props must be 1");
            return e8.o.l = i6, true;
          } });
        }
        copy() {
          return new t5(this.o, this.h, this.container, this.iteratorType);
        }
      }, lu = class extends h1.default {
        constructor(e8 = [], r6, n6) {
          super(r6, n6);
          let i6 = this;
          e8.forEach(function(s7) {
            i6.setElement(s7[0], s7[1]);
          });
        }
        *K(e8) {
          e8 !== void 0 && (yield* this.K(e8.U), yield [e8.u, e8.l], yield* this.K(e8.W));
        }
        begin() {
          return new pt(this.h.U || this.h, this.h, this);
        }
        end() {
          return new pt(this.h, this.h, this);
        }
        rBegin() {
          return new pt(this.h.W || this.h, this.h, this, 1);
        }
        rEnd() {
          return new pt(this.h, this.h, this, 1);
        }
        front() {
          if (this.i === 0) return;
          let e8 = this.h.U;
          return [e8.u, e8.l];
        }
        back() {
          if (this.i === 0) return;
          let e8 = this.h.W;
          return [e8.u, e8.l];
        }
        lowerBound(e8) {
          let r6 = this.X(this.Y, e8);
          return new pt(r6, this.h, this);
        }
        upperBound(e8) {
          let r6 = this.Z(this.Y, e8);
          return new pt(r6, this.h, this);
        }
        reverseLowerBound(e8) {
          let r6 = this.$(this.Y, e8);
          return new pt(r6, this.h, this);
        }
        reverseUpperBound(e8) {
          let r6 = this.rr(this.Y, e8);
          return new pt(r6, this.h, this);
        }
        setElement(e8, r6, n6) {
          return this.M(e8, r6, n6);
        }
        find(e8) {
          let r6 = this.I(this.Y, e8);
          return new pt(r6, this.h, this);
        }
        getElementByKey(e8) {
          return this.I(this.Y, e8).l;
        }
        union(e8) {
          let r6 = this;
          return e8.forEach(function(n6) {
            r6.setElement(n6[0], n6[1]);
          }), this.i;
        }
        [Symbol.iterator]() {
          return this.K(this.Y);
        }
      }, y1 = lu;
      Lo.default = y1;
    });
    fu = D((cu) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(cu, "t", { value: true });
      cu.default = g1;
      function g1(t5) {
        let e8 = typeof t5;
        return e8 === "object" && t5 !== null || e8 === "function";
      }
    });
    yu = D((mn) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(mn, "t", { value: true });
      mn.HashContainerIterator = mn.HashContainer = void 0;
      var Ny = It(), hu = b1(fu()), Kn = xt();
      function b1(t5) {
        return t5 && t5.t ? t5 : { default: t5 };
      }
      var du = class extends Ny.ContainerIterator {
        constructor(e8, r6, n6) {
          super(n6), this.o = e8, this.h = r6, this.iteratorType === 0 ? (this.pre = function() {
            return this.o.L === this.h && (0, Kn.throwIteratorAccessError)(), this.o = this.o.L, this;
          }, this.next = function() {
            return this.o === this.h && (0, Kn.throwIteratorAccessError)(), this.o = this.o.B, this;
          }) : (this.pre = function() {
            return this.o.B === this.h && (0, Kn.throwIteratorAccessError)(), this.o = this.o.B, this;
          }, this.next = function() {
            return this.o === this.h && (0, Kn.throwIteratorAccessError)(), this.o = this.o.L, this;
          });
        }
      };
      mn.HashContainerIterator = du;
      var pu = class extends Ny.Container {
        constructor() {
          super(), this.H = [], this.g = {}, this.HASH_TAG = Symbol("@@HASH_TAG"), Object.setPrototypeOf(this.g, null), this.h = {}, this.h.L = this.h.B = this.p = this._ = this.h;
        }
        V(e8) {
          let { L: r6, B: n6 } = e8;
          r6.B = n6, n6.L = r6, e8 === this.p && (this.p = n6), e8 === this._ && (this._ = r6), this.i -= 1;
        }
        M(e8, r6, n6) {
          n6 === void 0 && (n6 = (0, hu.default)(e8));
          let i6;
          if (n6) {
            let s7 = e8[this.HASH_TAG];
            if (s7 !== void 0) return this.H[s7].l = r6, this.i;
            Object.defineProperty(e8, this.HASH_TAG, { value: this.H.length, configurable: true }), i6 = { u: e8, l: r6, L: this._, B: this.h }, this.H.push(i6);
          } else {
            let s7 = this.g[e8];
            if (s7) return s7.l = r6, this.i;
            i6 = { u: e8, l: r6, L: this._, B: this.h }, this.g[e8] = i6;
          }
          return this.i === 0 ? (this.p = i6, this.h.B = i6) : this._.B = i6, this._ = i6, this.h.L = i6, ++this.i;
        }
        I(e8, r6) {
          if (r6 === void 0 && (r6 = (0, hu.default)(e8)), r6) {
            let n6 = e8[this.HASH_TAG];
            return n6 === void 0 ? this.h : this.H[n6];
          } else return this.g[e8] || this.h;
        }
        clear() {
          let e8 = this.HASH_TAG;
          this.H.forEach(function(r6) {
            delete r6.u[e8];
          }), this.H = [], this.g = {}, Object.setPrototypeOf(this.g, null), this.i = 0, this.p = this._ = this.h.L = this.h.B = this.h;
        }
        eraseElementByKey(e8, r6) {
          let n6;
          if (r6 === void 0 && (r6 = (0, hu.default)(e8)), r6) {
            let i6 = e8[this.HASH_TAG];
            if (i6 === void 0) return false;
            delete e8[this.HASH_TAG], n6 = this.H[i6], delete this.H[i6];
          } else {
            if (n6 = this.g[e8], n6 === void 0) return false;
            delete this.g[e8];
          }
          return this.V(n6), true;
        }
        eraseElementByIterator(e8) {
          let r6 = e8.o;
          return r6 === this.h && (0, Kn.throwIteratorAccessError)(), this.V(r6), e8.next();
        }
        eraseElementByPos(e8) {
          if (e8 < 0 || e8 > this.i - 1) throw new RangeError();
          let r6 = this.p;
          for (; e8--; ) r6 = r6.B;
          return this.V(r6), this.i;
        }
      };
      mn.HashContainer = pu;
    });
    Ly = D((Uo) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(Uo, "t", { value: true });
      Uo.default = void 0;
      var qy = yu(), w1 = xt(), Dr = class t5 extends qy.HashContainerIterator {
        constructor(e8, r6, n6, i6) {
          super(e8, r6, i6), this.container = n6;
        }
        get pointer() {
          return this.o === this.h && (0, w1.throwIteratorAccessError)(), this.o.u;
        }
        copy() {
          return new t5(this.o, this.h, this.container, this.iteratorType);
        }
      }, gu = class extends qy.HashContainer {
        constructor(e8 = []) {
          super();
          let r6 = this;
          e8.forEach(function(n6) {
            r6.insert(n6);
          });
        }
        begin() {
          return new Dr(this.p, this.h, this);
        }
        end() {
          return new Dr(this.h, this.h, this);
        }
        rBegin() {
          return new Dr(this._, this.h, this, 1);
        }
        rEnd() {
          return new Dr(this.h, this.h, this, 1);
        }
        front() {
          return this.p.u;
        }
        back() {
          return this._.u;
        }
        insert(e8, r6) {
          return this.M(e8, void 0, r6);
        }
        getElementByPos(e8) {
          if (e8 < 0 || e8 > this.i - 1) throw new RangeError();
          let r6 = this.p;
          for (; e8--; ) r6 = r6.B;
          return r6.u;
        }
        find(e8, r6) {
          let n6 = this.I(e8, r6);
          return new Dr(n6, this.h, this);
        }
        forEach(e8) {
          let r6 = 0, n6 = this.p;
          for (; n6 !== this.h; ) e8(n6.u, r6++, this), n6 = n6.B;
        }
        [Symbol.iterator]() {
          return function* () {
            let e8 = this.p;
            for (; e8 !== this.h; ) yield e8.u, e8 = e8.B;
          }.bind(this)();
        }
      }, m1 = gu;
      Uo.default = m1;
    });
    Dy = D((Do) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(Do, "t", { value: true });
      Do.default = void 0;
      var Uy = yu(), _1 = S1(fu()), v1 = xt();
      function S1(t5) {
        return t5 && t5.t ? t5 : { default: t5 };
      }
      var jr = class t5 extends Uy.HashContainerIterator {
        constructor(e8, r6, n6, i6) {
          super(e8, r6, i6), this.container = n6;
        }
        get pointer() {
          this.o === this.h && (0, v1.throwIteratorAccessError)();
          let e8 = this;
          return new Proxy([], { get(r6, n6) {
            if (n6 === "0") return e8.o.u;
            if (n6 === "1") return e8.o.l;
          }, set(r6, n6, i6) {
            if (n6 !== "1") throw new TypeError("props must be 1");
            return e8.o.l = i6, true;
          } });
        }
        copy() {
          return new t5(this.o, this.h, this.container, this.iteratorType);
        }
      }, bu = class extends Uy.HashContainer {
        constructor(e8 = []) {
          super();
          let r6 = this;
          e8.forEach(function(n6) {
            r6.setElement(n6[0], n6[1]);
          });
        }
        begin() {
          return new jr(this.p, this.h, this);
        }
        end() {
          return new jr(this.h, this.h, this);
        }
        rBegin() {
          return new jr(this._, this.h, this, 1);
        }
        rEnd() {
          return new jr(this.h, this.h, this, 1);
        }
        front() {
          if (this.i !== 0) return [this.p.u, this.p.l];
        }
        back() {
          if (this.i !== 0) return [this._.u, this._.l];
        }
        setElement(e8, r6, n6) {
          return this.M(e8, r6, n6);
        }
        getElementByKey(e8, r6) {
          if (r6 === void 0 && (r6 = (0, _1.default)(e8)), r6) {
            let i6 = e8[this.HASH_TAG];
            return i6 !== void 0 ? this.H[i6].l : void 0;
          }
          let n6 = this.g[e8];
          return n6 ? n6.l : void 0;
        }
        getElementByPos(e8) {
          if (e8 < 0 || e8 > this.i - 1) throw new RangeError();
          let r6 = this.p;
          for (; e8--; ) r6 = r6.B;
          return [r6.u, r6.l];
        }
        find(e8, r6) {
          let n6 = this.I(e8, r6);
          return new jr(n6, this.h, this);
        }
        forEach(e8) {
          let r6 = 0, n6 = this.p;
          for (; n6 !== this.h; ) e8([n6.u, n6.l], r6++, this), n6 = n6.B;
        }
        [Symbol.iterator]() {
          return function* () {
            let e8 = this.p;
            for (; e8 !== this.h; ) yield [e8.u, e8.l], e8 = e8.B;
          }.bind(this)();
        }
      }, E1 = bu;
      Do.default = E1;
    });
    jy = D((it) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(it, "t", { value: true });
      Object.defineProperty(it, "Deque", { enumerable: true, get: function() {
        return O1.default;
      } });
      Object.defineProperty(it, "HashMap", { enumerable: true, get: function() {
        return B1.default;
      } });
      Object.defineProperty(it, "HashSet", { enumerable: true, get: function() {
        return C1.default;
      } });
      Object.defineProperty(it, "LinkList", { enumerable: true, get: function() {
        return P1.default;
      } });
      Object.defineProperty(it, "OrderedMap", { enumerable: true, get: function() {
        return k1.default;
      } });
      Object.defineProperty(it, "OrderedSet", { enumerable: true, get: function() {
        return R1.default;
      } });
      Object.defineProperty(it, "PriorityQueue", { enumerable: true, get: function() {
        return x1.default;
      } });
      Object.defineProperty(it, "Queue", { enumerable: true, get: function() {
        return I1.default;
      } });
      Object.defineProperty(it, "Stack", { enumerable: true, get: function() {
        return A1.default;
      } });
      Object.defineProperty(it, "Vector", { enumerable: true, get: function() {
        return T1.default;
      } });
      var A1 = Tt(Sy()), I1 = Tt(Ey()), x1 = Tt(Ay()), T1 = Tt(Iy()), P1 = Tt(xy()), O1 = Tt(Ty()), R1 = Tt(Cy()), k1 = Tt(My()), C1 = Tt(Ly()), B1 = Tt(Dy());
      function Tt(t5) {
        return t5 && t5.t ? t5 : { default: t5 };
      }
    });
    Wy = D((cj, Fy) => {
      "use strict";
      A2();
      x2();
      I2();
      var M1 = jy().OrderedSet, Pt = At()("number-allocator:trace"), N1 = At()("number-allocator:error");
      function Ve(t5, e8) {
        this.low = t5, this.high = e8;
      }
      Ve.prototype.equals = function(t5) {
        return this.low === t5.low && this.high === t5.high;
      };
      Ve.prototype.compare = function(t5) {
        return this.low < t5.low && this.high < t5.low ? -1 : t5.low < this.low && t5.high < this.low ? 1 : 0;
      };
      function Ot(t5, e8) {
        if (!(this instanceof Ot)) return new Ot(t5, e8);
        this.min = t5, this.max = e8, this.ss = new M1([], (r6, n6) => r6.compare(n6)), Pt("Create"), this.clear();
      }
      Ot.prototype.firstVacant = function() {
        return this.ss.size() === 0 ? null : this.ss.front().low;
      };
      Ot.prototype.alloc = function() {
        if (this.ss.size() === 0) return Pt("alloc():empty"), null;
        let t5 = this.ss.begin(), e8 = t5.pointer.low, r6 = t5.pointer.high, n6 = e8;
        return n6 + 1 <= r6 ? this.ss.updateKeyByIterator(t5, new Ve(e8 + 1, r6)) : this.ss.eraseElementByPos(0), Pt("alloc():" + n6), n6;
      };
      Ot.prototype.use = function(t5) {
        let e8 = new Ve(t5, t5), r6 = this.ss.lowerBound(e8);
        if (!r6.equals(this.ss.end())) {
          let n6 = r6.pointer.low, i6 = r6.pointer.high;
          return r6.pointer.equals(e8) ? (this.ss.eraseElementByIterator(r6), Pt("use():" + t5), true) : n6 > t5 ? false : n6 === t5 ? (this.ss.updateKeyByIterator(r6, new Ve(n6 + 1, i6)), Pt("use():" + t5), true) : i6 === t5 ? (this.ss.updateKeyByIterator(r6, new Ve(n6, i6 - 1)), Pt("use():" + t5), true) : (this.ss.updateKeyByIterator(r6, new Ve(t5 + 1, i6)), this.ss.insert(new Ve(n6, t5 - 1)), Pt("use():" + t5), true);
        }
        return Pt("use():failed"), false;
      };
      Ot.prototype.free = function(t5) {
        if (t5 < this.min || t5 > this.max) {
          N1("free():" + t5 + " is out of range");
          return;
        }
        let e8 = new Ve(t5, t5), r6 = this.ss.upperBound(e8);
        if (r6.equals(this.ss.end())) {
          if (r6.equals(this.ss.begin())) {
            this.ss.insert(e8);
            return;
          }
          r6.pre();
          let n6 = r6.pointer.high;
          r6.pointer.high + 1 === t5 ? this.ss.updateKeyByIterator(r6, new Ve(n6, t5)) : this.ss.insert(e8);
        } else if (r6.equals(this.ss.begin())) if (t5 + 1 === r6.pointer.low) {
          let n6 = r6.pointer.high;
          this.ss.updateKeyByIterator(r6, new Ve(t5, n6));
        } else this.ss.insert(e8);
        else {
          let n6 = r6.pointer.low, i6 = r6.pointer.high;
          r6.pre();
          let s7 = r6.pointer.low;
          r6.pointer.high + 1 === t5 ? t5 + 1 === n6 ? (this.ss.eraseElementByIterator(r6), this.ss.updateKeyByIterator(r6, new Ve(s7, i6))) : this.ss.updateKeyByIterator(r6, new Ve(s7, t5)) : t5 + 1 === n6 ? (this.ss.eraseElementByIterator(r6.next()), this.ss.insert(new Ve(t5, i6))) : this.ss.insert(e8);
        }
        Pt("free():" + t5);
      };
      Ot.prototype.clear = function() {
        Pt("clear()"), this.ss.clear(), this.ss.insert(new Ve(this.min, this.max));
      };
      Ot.prototype.intervalCount = function() {
        return this.ss.size();
      };
      Ot.prototype.dump = function() {
        console.log("length:" + this.ss.size());
        for (let t5 of this.ss) console.log(t5);
      };
      Fy.exports = Ot;
    });
    wu = D((_j, $y) => {
      A2();
      x2();
      I2();
      var q1 = Wy();
      $y.exports.NumberAllocator = q1;
    });
    Hy = D((_u) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(_u, "__esModule", { value: true });
      var L1 = vy(), U1 = wu(), mu = class {
        constructor(e8) {
          __publicField(this, "aliasToTopic");
          __publicField(this, "topicToAlias");
          __publicField(this, "max");
          __publicField(this, "numberAllocator");
          __publicField(this, "length");
          e8 > 0 && (this.aliasToTopic = new L1.LRUCache({ max: e8 }), this.topicToAlias = {}, this.numberAllocator = new U1.NumberAllocator(1, e8), this.max = e8, this.length = 0);
        }
        put(e8, r6) {
          if (r6 === 0 || r6 > this.max) return false;
          let n6 = this.aliasToTopic.get(r6);
          return n6 && delete this.topicToAlias[n6], this.aliasToTopic.set(r6, e8), this.topicToAlias[e8] = r6, this.numberAllocator.use(r6), this.length = this.aliasToTopic.size, true;
        }
        getTopicByAlias(e8) {
          return this.aliasToTopic.get(e8);
        }
        getAliasByTopic(e8) {
          let r6 = this.topicToAlias[e8];
          return typeof r6 < "u" && this.aliasToTopic.get(r6), r6;
        }
        clear() {
          this.aliasToTopic.clear(), this.topicToAlias = {}, this.numberAllocator.clear(), this.length = 0;
        }
        getLruAlias() {
          let e8 = this.numberAllocator.firstVacant();
          return e8 || [...this.aliasToTopic.keys()][this.aliasToTopic.size - 1];
        }
      };
      _u.default = mu;
    });
    Vy = D((Qn) => {
      "use strict";
      A2();
      x2();
      I2();
      var D1 = Qn && Qn.__importDefault || function(t5) {
        return t5 && t5.__esModule ? t5 : { default: t5 };
      };
      Object.defineProperty(Qn, "__esModule", { value: true });
      var j1 = zn(), F1 = D1(Hy()), W1 = Mr(), $1 = (t5, e8) => {
        t5.log("_handleConnack");
        let { options: r6 } = t5, i6 = r6.protocolVersion === 5 ? e8.reasonCode : e8.returnCode;
        if (clearTimeout(t5.connackTimer), delete t5.topicAliasSend, e8.properties) {
          if (e8.properties.topicAliasMaximum) {
            if (e8.properties.topicAliasMaximum > 65535) {
              t5.emit("error", new Error("topicAliasMaximum from broker is out of range"));
              return;
            }
            e8.properties.topicAliasMaximum > 0 && (t5.topicAliasSend = new F1.default(e8.properties.topicAliasMaximum));
          }
          e8.properties.serverKeepAlive && r6.keepalive && (r6.keepalive = e8.properties.serverKeepAlive), e8.properties.maximumPacketSize && (r6.properties || (r6.properties = {}), r6.properties.maximumPacketSize = e8.properties.maximumPacketSize);
        }
        if (i6 === 0) t5.reconnecting = false, t5._onConnect(e8);
        else if (i6 > 0) {
          let s7 = new W1.ErrorWithReasonCode(`Connection refused: ${j1.ReasonCodes[i6]}`, i6);
          t5.emit("error", s7), t5.options.reconnectOnConnackError && t5._cleanUp(true);
        }
      };
      Qn.default = $1;
    });
    Gy = D((vu) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(vu, "__esModule", { value: true });
      var H1 = (t5, e8, r6) => {
        t5.log("handling pubrel packet");
        let n6 = typeof r6 < "u" ? r6 : t5.noop, { messageId: i6 } = e8, s7 = { cmd: "pubcomp", messageId: i6 };
        t5.incomingStore.get(e8, (o6, a3) => {
          o6 ? t5._sendPacket(s7, n6) : (t5.emit("message", a3.topic, a3.payload, a3), t5.handleMessage(a3, (c5) => {
            if (c5) return n6(c5);
            t5.incomingStore.del(a3, t5.noop), t5._sendPacket(s7, n6);
          }));
        });
      };
      vu.default = H1;
    });
    zy = D((Yn) => {
      "use strict";
      A2();
      x2();
      I2();
      var Jn = Yn && Yn.__importDefault || function(t5) {
        return t5 && t5.__esModule ? t5 : { default: t5 };
      };
      Object.defineProperty(Yn, "__esModule", { value: true });
      var V1 = Jn(hy()), G1 = Jn(gy()), z1 = Jn(Vy()), K1 = Jn(zn()), Q1 = Jn(Gy()), Y1 = (t5, e8, r6) => {
        let { options: n6 } = t5;
        if (n6.protocolVersion === 5 && n6.properties && n6.properties.maximumPacketSize && n6.properties.maximumPacketSize < e8.length) return t5.emit("error", new Error(`exceeding packets size ${e8.cmd}`)), t5.end({ reasonCode: 149, properties: { reasonString: "Maximum packet size was exceeded" } }), t5;
        switch (t5.log("_handlePacket :: emitting packetreceive"), t5.emit("packetreceive", e8), e8.cmd) {
          case "publish":
            (0, V1.default)(t5, e8, r6);
            break;
          case "puback":
          case "pubrec":
          case "pubcomp":
          case "suback":
          case "unsuback":
            t5.reschedulePing(), (0, K1.default)(t5, e8), r6();
            break;
          case "pubrel":
            t5.reschedulePing(), (0, Q1.default)(t5, e8, r6);
            break;
          case "connack":
            (0, z1.default)(t5, e8), r6();
            break;
          case "auth":
            t5.reschedulePing(), (0, G1.default)(t5, e8), r6();
            break;
          case "pingresp":
            t5.log("_handlePacket :: received pingresp"), t5.reschedulePing(true), r6();
            break;
          case "disconnect":
            t5.emit("disconnect", e8), r6();
            break;
          default:
            t5.log("_handlePacket :: unknown command"), r6();
            break;
        }
      };
      Yn.default = Y1;
    });
    Au = D((Eu) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(Eu, "__esModule", { value: true });
      var Su = class {
        constructor() {
          __publicField(this, "nextId");
          this.nextId = Math.max(1, Math.floor(Math.random() * 65535));
        }
        allocate() {
          let e8 = this.nextId++;
          return this.nextId === 65536 && (this.nextId = 1), e8;
        }
        getLastAllocated() {
          return this.nextId === 1 ? 65535 : this.nextId - 1;
        }
        register(e8) {
          return true;
        }
        deallocate(e8) {
        }
        clear() {
        }
      };
      Eu.default = Su;
    });
    Ky = D((xu) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(xu, "__esModule", { value: true });
      var Iu = class {
        constructor(e8) {
          __publicField(this, "aliasToTopic");
          __publicField(this, "max");
          __publicField(this, "length");
          this.aliasToTopic = {}, this.max = e8;
        }
        put(e8, r6) {
          return r6 === 0 || r6 > this.max ? false : (this.aliasToTopic[r6] = e8, this.length = Object.keys(this.aliasToTopic).length, true);
        }
        getTopicByAlias(e8) {
          return this.aliasToTopic[e8];
        }
        clear() {
          this.aliasToTopic = {};
        }
      };
      xu.default = Iu;
    });
    Qy = D((_n) => {
      "use strict";
      A2();
      x2();
      I2();
      var J1 = _n && _n.__importDefault || function(t5) {
        return t5 && t5.__esModule ? t5 : { default: t5 };
      };
      Object.defineProperty(_n, "__esModule", { value: true });
      _n.TypedEventEmitter = void 0;
      var X1 = J1((er(), me(Zt))), Z1 = Mr(), jo = class {
      };
      _n.TypedEventEmitter = jo;
      (0, Z1.applyMixin)(jo, X1.default);
    });
    Xn = D((GF, Wt) => {
      A2();
      x2();
      I2();
      function Tu(t5) {
        "@babel/helpers - typeof";
        return Wt.exports = Tu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e8) {
          return typeof e8;
        } : function(e8) {
          return e8 && typeof Symbol == "function" && e8.constructor === Symbol && e8 !== Symbol.prototype ? "symbol" : typeof e8;
        }, Wt.exports.__esModule = true, Wt.exports.default = Wt.exports, Tu(t5);
      }
      Wt.exports = Tu, Wt.exports.__esModule = true, Wt.exports.default = Wt.exports;
    });
    Jy = D((r8, Zn) => {
      A2();
      x2();
      I2();
      var Yy = Xn().default;
      function eA(t5, e8) {
        if (Yy(t5) != "object" || !t5) return t5;
        var r6 = t5[Symbol.toPrimitive];
        if (r6 !== void 0) {
          var n6 = r6.call(t5, e8 || "default");
          if (Yy(n6) != "object") return n6;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (e8 === "string" ? String : Number)(t5);
      }
      Zn.exports = eA, Zn.exports.__esModule = true, Zn.exports.default = Zn.exports;
    });
    Xy = D((h8, ei) => {
      A2();
      x2();
      I2();
      var tA = Xn().default, rA = Jy();
      function nA(t5) {
        var e8 = rA(t5, "string");
        return tA(e8) == "symbol" ? e8 : e8 + "";
      }
      ei.exports = nA, ei.exports.__esModule = true, ei.exports.default = ei.exports;
    });
    Zy = D((S8, ti) => {
      A2();
      x2();
      I2();
      var iA = Xy();
      function oA(t5, e8, r6) {
        return (e8 = iA(e8)) in t5 ? Object.defineProperty(t5, e8, { value: r6, enumerable: true, configurable: true, writable: true }) : t5[e8] = r6, t5;
      }
      ti.exports = oA, ti.exports.__esModule = true, ti.exports.default = ti.exports;
    });
    eg = D((C8, ri) => {
      A2();
      x2();
      I2();
      function sA(t5) {
        if (Array.isArray(t5)) return t5;
      }
      ri.exports = sA, ri.exports.__esModule = true, ri.exports.default = ri.exports;
    });
    tg = D((W8, ni) => {
      A2();
      x2();
      I2();
      function aA(t5, e8) {
        var r6 = t5 == null ? null : typeof Symbol < "u" && t5[Symbol.iterator] || t5["@@iterator"];
        if (r6 != null) {
          var n6, i6, s7, o6, a3 = [], c5 = true, f3 = false;
          try {
            if (s7 = (r6 = r6.call(t5)).next, e8 === 0) {
              if (Object(r6) !== r6) return;
              c5 = false;
            } else for (; !(c5 = (n6 = s7.call(r6)).done) && (a3.push(n6.value), a3.length !== e8); c5 = true) ;
          } catch (h3) {
            f3 = true, i6 = h3;
          } finally {
            try {
              if (!c5 && r6.return != null && (o6 = r6.return(), Object(o6) !== o6)) return;
            } finally {
              if (f3) throw i6;
            }
          }
          return a3;
        }
      }
      ni.exports = aA, ni.exports.__esModule = true, ni.exports.default = ni.exports;
    });
    rg = D((X8, ii) => {
      A2();
      x2();
      I2();
      function uA(t5, e8) {
        (e8 == null || e8 > t5.length) && (e8 = t5.length);
        for (var r6 = 0, n6 = Array(e8); r6 < e8; r6++) n6[r6] = t5[r6];
        return n6;
      }
      ii.exports = uA, ii.exports.__esModule = true, ii.exports.default = ii.exports;
    });
    ig = D((u6, oi) => {
      A2();
      x2();
      I2();
      var ng = rg();
      function lA(t5, e8) {
        if (t5) {
          if (typeof t5 == "string") return ng(t5, e8);
          var r6 = {}.toString.call(t5).slice(8, -1);
          return r6 === "Object" && t5.constructor && (r6 = t5.constructor.name), r6 === "Map" || r6 === "Set" ? Array.from(t5) : r6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r6) ? ng(t5, e8) : void 0;
        }
      }
      oi.exports = lA, oi.exports.__esModule = true, oi.exports.default = oi.exports;
    });
    og = D((w6, si) => {
      A2();
      x2();
      I2();
      function cA() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      si.exports = cA, si.exports.__esModule = true, si.exports.default = si.exports;
    });
    sg = D((P6, ai) => {
      A2();
      x2();
      I2();
      var fA = eg(), hA = tg(), dA = ig(), pA = og();
      function yA(t5, e8) {
        return fA(t5) || hA(t5, e8) || dA(t5, e8) || pA();
      }
      ai.exports = yA, ai.exports.__esModule = true, ai.exports.default = ai.exports;
    });
    Pu = D((Fo, ag) => {
      A2();
      x2();
      I2();
      (function(t5, e8) {
        typeof Fo == "object" && typeof ag < "u" ? e8(Fo) : typeof define == "function" && define.amd ? define(["exports"], e8) : (t5 = typeof globalThis < "u" ? globalThis : t5 || self, e8(t5.fastUniqueNumbers = {}));
      })(Fo, function(t5) {
        "use strict";
        var e8 = function(w2) {
          return function(y3) {
            var P2 = w2(y3);
            return y3.add(P2), P2;
          };
        }, r6 = function(w2) {
          return function(y3, P2) {
            return w2.set(y3, P2), P2;
          };
        }, n6 = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, i6 = 536870912, s7 = i6 * 2, o6 = function(w2, y3) {
          return function(P2) {
            var E2 = y3.get(P2), b3 = E2 === void 0 ? P2.size : E2 < s7 ? E2 + 1 : 0;
            if (!P2.has(b3)) return w2(P2, b3);
            if (P2.size < i6) {
              for (; P2.has(b3); ) b3 = Math.floor(Math.random() * s7);
              return w2(P2, b3);
            }
            if (P2.size > n6) throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
            for (; P2.has(b3); ) b3 = Math.floor(Math.random() * n6);
            return w2(P2, b3);
          };
        }, a3 = /* @__PURE__ */ new WeakMap(), c5 = r6(a3), f3 = o6(c5, a3), h3 = e8(f3);
        t5.addUniqueNumber = h3, t5.generateUniqueNumber = f3;
      });
    });
    lg = D((z6, ui) => {
      A2();
      x2();
      I2();
      function ug(t5, e8, r6, n6, i6, s7, o6) {
        try {
          var a3 = t5[s7](o6), c5 = a3.value;
        } catch (f3) {
          return void r6(f3);
        }
        a3.done ? e8(c5) : Promise.resolve(c5).then(n6, i6);
      }
      function gA(t5) {
        return function() {
          var e8 = this, r6 = arguments;
          return new Promise(function(n6, i6) {
            var s7 = t5.apply(e8, r6);
            function o6(c5) {
              ug(s7, n6, i6, o6, a3, "next", c5);
            }
            function a3(c5) {
              ug(s7, n6, i6, o6, a3, "throw", c5);
            }
            o6(void 0);
          });
        };
      }
      ui.exports = gA, ui.exports.__esModule = true, ui.exports.default = ui.exports;
    });
    Ou = D((nW, li) => {
      A2();
      x2();
      I2();
      function bA(t5, e8) {
        this.v = t5, this.k = e8;
      }
      li.exports = bA, li.exports.__esModule = true, li.exports.default = li.exports;
    });
    Ru = D((dW, $t) => {
      A2();
      x2();
      I2();
      function Wo(t5, e8, r6, n6) {
        var i6 = Object.defineProperty;
        try {
          i6({}, "", {});
        } catch {
          i6 = 0;
        }
        $t.exports = Wo = function(o6, a3, c5, f3) {
          function h3(d3, w2) {
            Wo(o6, d3, function(y3) {
              return this._invoke(d3, w2, y3);
            });
          }
          a3 ? i6 ? i6(o6, a3, { value: c5, enumerable: !f3, configurable: !f3, writable: !f3 }) : o6[a3] = c5 : (h3("next", 0), h3("throw", 1), h3("return", 2));
        }, $t.exports.__esModule = true, $t.exports.default = $t.exports, Wo(t5, e8, r6, n6);
      }
      $t.exports = Wo, $t.exports.__esModule = true, $t.exports.default = $t.exports;
    });
    ku = D((EW, Ht) => {
      A2();
      x2();
      I2();
      var Rt = Ru();
      function cg() {
        var t5, e8, r6 = typeof Symbol == "function" ? Symbol : {}, n6 = r6.iterator || "@@iterator", i6 = r6.toStringTag || "@@toStringTag";
        function s7(y3, P2, E2, b3) {
          var m2 = P2 && P2.prototype instanceof a3 ? P2 : a3, v2 = Object.create(m2.prototype);
          return Rt(v2, "_invoke", (function(R2, T2, g2) {
            var O, _2, q, $2 = 0, j2 = g2 || [], J = false, W = { p: 0, n: 0, v: t5, a: H2, f: H2.bind(t5, 4), d: function(K, X) {
              return O = K, _2 = 0, q = t5, W.n = X, o6;
            } };
            function H2(G, K) {
              for (_2 = G, q = K, e8 = 0; !J && $2 && !X && e8 < j2.length; e8++) {
                var X, Q = j2[e8], V2 = W.p, te = Q[2];
                G > 3 ? (X = te === K) && (q = Q[(_2 = Q[4]) ? 5 : (_2 = 3, 3)], Q[4] = Q[5] = t5) : Q[0] <= V2 && ((X = G < 2 && V2 < Q[1]) ? (_2 = 0, W.v = K, W.n = Q[1]) : V2 < te && (X = G < 3 || Q[0] > K || K > te) && (Q[4] = G, Q[5] = K, W.n = te, _2 = 0));
              }
              if (X || G > 1) return o6;
              throw J = true, K;
            }
            return function(G, K, X) {
              if ($2 > 1) throw TypeError("Generator is already running");
              for (J && K === 1 && H2(K, X), _2 = K, q = X; (e8 = _2 < 2 ? t5 : q) || !J; ) {
                O || (_2 ? _2 < 3 ? (_2 > 1 && (W.n = -1), H2(_2, q)) : W.n = q : W.v = q);
                try {
                  if ($2 = 2, O) {
                    if (_2 || (G = "next"), e8 = O[G]) {
                      if (!(e8 = e8.call(O, q))) throw TypeError("iterator result is not an object");
                      if (!e8.done) return e8;
                      q = e8.value, _2 < 2 && (_2 = 0);
                    } else _2 === 1 && (e8 = O.return) && e8.call(O), _2 < 2 && (q = TypeError("The iterator does not provide a '" + G + "' method"), _2 = 1);
                    O = t5;
                  } else if ((e8 = (J = W.n < 0) ? q : R2.call(T2, W)) !== o6) break;
                } catch (Q) {
                  O = t5, _2 = 1, q = Q;
                } finally {
                  $2 = 1;
                }
              }
              return { value: e8, done: J };
            };
          })(y3, E2, b3), true), v2;
        }
        var o6 = {};
        function a3() {
        }
        function c5() {
        }
        function f3() {
        }
        e8 = Object.getPrototypeOf;
        var h3 = [][n6] ? e8(e8([][n6]())) : (Rt(e8 = {}, n6, function() {
          return this;
        }), e8), d3 = f3.prototype = a3.prototype = Object.create(h3);
        function w2(y3) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(y3, f3) : (y3.__proto__ = f3, Rt(y3, i6, "GeneratorFunction")), y3.prototype = Object.create(d3), y3;
        }
        return c5.prototype = f3, Rt(d3, "constructor", f3), Rt(f3, "constructor", c5), c5.displayName = "GeneratorFunction", Rt(f3, i6, "GeneratorFunction"), Rt(d3), Rt(d3, i6, "Generator"), Rt(d3, n6, function() {
          return this;
        }), Rt(d3, "toString", function() {
          return "[object Generator]";
        }), (Ht.exports = cg = function() {
          return { w: s7, m: w2 };
        }, Ht.exports.__esModule = true, Ht.exports.default = Ht.exports)();
      }
      Ht.exports = cg, Ht.exports.__esModule = true, Ht.exports.default = Ht.exports;
    });
    Mu = D((BW, ci) => {
      A2();
      x2();
      I2();
      var wA = Ou(), Cu = Ru();
      function Bu(t5, e8) {
        function r6(i6, s7, o6, a3) {
          try {
            var c5 = t5[i6](s7), f3 = c5.value;
            return f3 instanceof wA ? e8.resolve(f3.v).then(function(h3) {
              r6("next", h3, o6, a3);
            }, function(h3) {
              r6("throw", h3, o6, a3);
            }) : e8.resolve(f3).then(function(h3) {
              c5.value = h3, o6(c5);
            }, function(h3) {
              return r6("throw", h3, o6, a3);
            });
          } catch (h3) {
            a3(h3);
          }
        }
        var n6;
        this.next || (Cu(Bu.prototype), Cu(Bu.prototype, typeof Symbol == "function" && Symbol.asyncIterator || "@asyncIterator", function() {
          return this;
        })), Cu(this, "_invoke", function(i6, s7, o6) {
          function a3() {
            return new e8(function(c5, f3) {
              r6(i6, o6, c5, f3);
            });
          }
          return n6 = n6 ? n6.then(a3, a3) : a3();
        }, true);
      }
      ci.exports = Bu, ci.exports.__esModule = true, ci.exports.default = ci.exports;
    });
    Nu = D(($W, fi) => {
      A2();
      x2();
      I2();
      var mA = ku(), _A = Mu();
      function vA(t5, e8, r6, n6, i6) {
        return new _A(mA().w(t5, e8, r6, n6), i6 || Promise);
      }
      fi.exports = vA, fi.exports.__esModule = true, fi.exports.default = fi.exports;
    });
    fg = D((ZW, hi) => {
      A2();
      x2();
      I2();
      var SA = Nu();
      function EA(t5, e8, r6, n6, i6) {
        var s7 = SA(t5, e8, r6, n6, i6);
        return s7.next().then(function(o6) {
          return o6.done ? o6.value : s7.next();
        });
      }
      hi.exports = EA, hi.exports.__esModule = true, hi.exports.default = hi.exports;
    });
    hg = D((l4, di) => {
      A2();
      x2();
      I2();
      function AA(t5) {
        var e8 = Object(t5), r6 = [];
        for (var n6 in e8) r6.unshift(n6);
        return function i6() {
          for (; r6.length; ) if ((n6 = r6.pop()) in e8) return i6.value = n6, i6.done = false, i6;
          return i6.done = true, i6;
        };
      }
      di.exports = AA, di.exports.__esModule = true, di.exports.default = di.exports;
    });
    dg = D((m4, pi) => {
      A2();
      x2();
      I2();
      var IA = Xn().default;
      function xA(t5) {
        if (t5 != null) {
          var e8 = t5[typeof Symbol == "function" && Symbol.iterator || "@@iterator"], r6 = 0;
          if (e8) return e8.call(t5);
          if (typeof t5.next == "function") return t5;
          if (!isNaN(t5.length)) return { next: function() {
            return t5 && r6 >= t5.length && (t5 = void 0), { value: t5 && t5[r6++], done: !t5 };
          } };
        }
        throw new TypeError(IA(t5) + " is not iterable");
      }
      pi.exports = xA, pi.exports.__esModule = true, pi.exports.default = pi.exports;
    });
    yg = D((O4, Vt) => {
      A2();
      x2();
      I2();
      var TA = Ou(), PA = ku(), OA = fg(), RA = Nu(), kA = Mu(), CA = hg(), pg = dg();
      function qu() {
        "use strict";
        var t5 = PA(), e8 = t5.m(qu), r6 = (Object.getPrototypeOf ? Object.getPrototypeOf(e8) : e8.__proto__).constructor;
        function n6(o6) {
          var a3 = typeof o6 == "function" && o6.constructor;
          return !!a3 && (a3 === r6 || (a3.displayName || a3.name) === "GeneratorFunction");
        }
        var i6 = { throw: 1, return: 2, break: 3, continue: 3 };
        function s7(o6) {
          var a3, c5;
          return function(f3) {
            a3 || (a3 = { stop: function() {
              return c5(f3.a, 2);
            }, catch: function() {
              return f3.v;
            }, abrupt: function(d3, w2) {
              return c5(f3.a, i6[d3], w2);
            }, delegateYield: function(d3, w2, y3) {
              return a3.resultName = w2, c5(f3.d, pg(d3), y3);
            }, finish: function(d3) {
              return c5(f3.f, d3);
            } }, c5 = function(d3, w2, y3) {
              f3.p = a3.prev, f3.n = a3.next;
              try {
                return d3(w2, y3);
              } finally {
                a3.next = f3.n;
              }
            }), a3.resultName && (a3[a3.resultName] = f3.v, a3.resultName = void 0), a3.sent = f3.v, a3.next = f3.n;
            try {
              return o6.call(this, a3);
            } finally {
              f3.p = a3.prev, f3.n = a3.next;
            }
          };
        }
        return (Vt.exports = qu = function() {
          return { wrap: function(c5, f3, h3, d3) {
            return t5.w(s7(c5), f3, h3, d3 && d3.reverse());
          }, isGeneratorFunction: n6, mark: t5.m, awrap: function(c5, f3) {
            return new TA(c5, f3);
          }, AsyncIterator: kA, async: function(c5, f3, h3, d3, w2) {
            return (n6(f3) ? RA : OA)(s7(c5), f3, h3, d3, w2);
          }, keys: CA, values: pg };
        }, Vt.exports.__esModule = true, Vt.exports.default = Vt.exports)();
      }
      Vt.exports = qu, Vt.exports.__esModule = true, Vt.exports.default = Vt.exports;
    });
    bg = D((D4, gg) => {
      A2();
      x2();
      I2();
      var $o = yg()();
      gg.exports = $o;
      try {
        regeneratorRuntime = $o;
      } catch {
        typeof globalThis == "object" ? globalThis.regeneratorRuntime = $o : Function("r", "regeneratorRuntime = r")($o);
      }
    });
    mg = D((Ho, wg) => {
      A2();
      x2();
      I2();
      (function(t5, e8) {
        typeof Ho == "object" && typeof wg < "u" ? e8(Ho, Zy(), sg(), Pu(), lg(), bg()) : typeof define == "function" && define.amd ? define(["exports", "@babel/runtime/helpers/defineProperty", "@babel/runtime/helpers/slicedToArray", "fast-unique-numbers", "@babel/runtime/helpers/asyncToGenerator", "@babel/runtime/regenerator"], e8) : (t5 = typeof globalThis < "u" ? globalThis : t5 || self, e8(t5.brokerFactory = {}, t5._defineProperty, t5._slicedToArray, t5.fastUniqueNumbers, t5._asyncToGenerator, t5._regeneratorRuntime));
      })(Ho, function(t5, e8, r6, n6, i6, s7) {
        "use strict";
        var o6 = function(m2) {
          return typeof m2.start == "function";
        }, a3 = /* @__PURE__ */ new WeakMap();
        function c5(b3, m2) {
          var v2 = Object.keys(b3);
          if (Object.getOwnPropertySymbols) {
            var R2 = Object.getOwnPropertySymbols(b3);
            m2 && (R2 = R2.filter(function(T2) {
              return Object.getOwnPropertyDescriptor(b3, T2).enumerable;
            })), v2.push.apply(v2, R2);
          }
          return v2;
        }
        function f3(b3) {
          for (var m2 = 1; m2 < arguments.length; m2++) {
            var v2 = arguments[m2] != null ? arguments[m2] : {};
            m2 % 2 ? c5(Object(v2), true).forEach(function(R2) {
              e8(b3, R2, v2[R2]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(b3, Object.getOwnPropertyDescriptors(v2)) : c5(Object(v2)).forEach(function(R2) {
              Object.defineProperty(b3, R2, Object.getOwnPropertyDescriptor(v2, R2));
            });
          }
          return b3;
        }
        var h3 = function(m2) {
          return f3(f3({}, m2), {}, { connect: function(R2) {
            var T2 = R2.call;
            return i6(s7.mark(function g2() {
              var O, _2, q, $2;
              return s7.wrap(function(j2) {
                for (; ; ) switch (j2.prev = j2.next) {
                  case 0:
                    return O = new MessageChannel(), _2 = O.port1, q = O.port2, j2.next = 1, T2("connect", { port: _2 }, [_2]);
                  case 1:
                    return $2 = j2.sent, a3.set(q, $2), j2.abrupt("return", q);
                  case 2:
                  case "end":
                    return j2.stop();
                }
              }, g2);
            }));
          }, disconnect: function(R2) {
            var T2 = R2.call;
            return (function() {
              var g2 = i6(s7.mark(function O(_2) {
                var q;
                return s7.wrap(function($2) {
                  for (; ; ) switch ($2.prev = $2.next) {
                    case 0:
                      if (q = a3.get(_2), q !== void 0) {
                        $2.next = 1;
                        break;
                      }
                      throw new Error("The given port is not connected.");
                    case 1:
                      return $2.next = 2, T2("disconnect", { portId: q });
                    case 2:
                    case "end":
                      return $2.stop();
                  }
                }, O);
              }));
              return function(O) {
                return g2.apply(this, arguments);
              };
            })();
          }, isSupported: function(R2) {
            var T2 = R2.call;
            return function() {
              return T2("isSupported");
            };
          } });
        };
        function d3(b3, m2) {
          var v2 = Object.keys(b3);
          if (Object.getOwnPropertySymbols) {
            var R2 = Object.getOwnPropertySymbols(b3);
            m2 && (R2 = R2.filter(function(T2) {
              return Object.getOwnPropertyDescriptor(b3, T2).enumerable;
            })), v2.push.apply(v2, R2);
          }
          return v2;
        }
        function w2(b3) {
          for (var m2 = 1; m2 < arguments.length; m2++) {
            var v2 = arguments[m2] != null ? arguments[m2] : {};
            m2 % 2 ? d3(Object(v2), true).forEach(function(R2) {
              e8(b3, R2, v2[R2]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(b3, Object.getOwnPropertyDescriptors(v2)) : d3(Object(v2)).forEach(function(R2) {
              Object.defineProperty(b3, R2, Object.getOwnPropertyDescriptor(v2, R2));
            });
          }
          return b3;
        }
        var y3 = /* @__PURE__ */ new WeakMap(), P2 = function(m2) {
          if (y3.has(m2)) return y3.get(m2);
          var v2 = /* @__PURE__ */ new Map();
          return y3.set(m2, v2), v2;
        }, E2 = function(m2) {
          var v2 = h3(m2);
          return function(R2) {
            var T2 = P2(R2);
            R2.addEventListener("message", function(H2) {
              var G = H2.data, K = G.id;
              if (K !== null && T2.has(K)) {
                var X = T2.get(K), Q = X.reject, V2 = X.resolve;
                T2.delete(K), G.error === void 0 ? V2(G.result) : Q(new Error(G.error.message));
              }
            }), o6(R2) && R2.start();
            for (var g2 = function(G) {
              var K = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, X = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
              return new Promise(function(Q, V2) {
                var te = n6.generateUniqueNumber(T2);
                T2.set(te, { reject: V2, resolve: Q }), K === null ? R2.postMessage({ id: te, method: G }, X) : R2.postMessage({ id: te, method: G, params: K }, X);
              });
            }, O = function(G, K) {
              var X = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
              R2.postMessage({ id: null, method: G, params: K }, X);
            }, _2 = {}, q = 0, $2 = Object.entries(v2); q < $2.length; q++) {
              var j2 = r6($2[q], 2), J = j2[0], W = j2[1];
              _2 = w2(w2({}, _2), {}, e8({}, J, W({ call: g2, notify: O })));
            }
            return w2({}, _2);
          };
        };
        t5.createBroker = E2;
      });
    });
    vg = D((Vo, _g) => {
      A2();
      x2();
      I2();
      (function(t5, e8) {
        typeof Vo == "object" && typeof _g < "u" ? e8(Vo, Xn(), mg(), Pu()) : typeof define == "function" && define.amd ? define(["exports", "@babel/runtime/helpers/typeof", "broker-factory", "fast-unique-numbers"], e8) : (t5 = typeof globalThis < "u" ? globalThis : t5 || self, e8(t5.workerTimersBroker = {}, t5._typeof, t5.brokerFactory, t5.fastUniqueNumbers));
      })(Vo, function(t5, e8, r6, n6) {
        "use strict";
        var i6 = /* @__PURE__ */ new Map([[0, null]]), s7 = /* @__PURE__ */ new Map([[0, null]]), o6 = r6.createBroker({ clearInterval: function(f3) {
          var h3 = f3.call;
          return function(d3) {
            e8(i6.get(d3)) === "symbol" && (i6.set(d3, null), h3("clear", { timerId: d3, timerType: "interval" }).then(function() {
              i6.delete(d3);
            }));
          };
        }, clearTimeout: function(f3) {
          var h3 = f3.call;
          return function(d3) {
            e8(s7.get(d3)) === "symbol" && (s7.set(d3, null), h3("clear", { timerId: d3, timerType: "timeout" }).then(function() {
              s7.delete(d3);
            }));
          };
        }, setInterval: function(f3) {
          var h3 = f3.call;
          return function(d3) {
            for (var w2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, y3 = arguments.length, P2 = new Array(y3 > 2 ? y3 - 2 : 0), E2 = 2; E2 < y3; E2++) P2[E2 - 2] = arguments[E2];
            var b3 = Symbol(), m2 = n6.generateUniqueNumber(i6);
            i6.set(m2, b3);
            var v2 = function() {
              return h3("set", { delay: w2, now: performance.timeOrigin + performance.now(), timerId: m2, timerType: "interval" }).then(function() {
                var T2 = i6.get(m2);
                if (T2 === void 0) throw new Error("The timer is in an undefined state.");
                T2 === b3 && (d3.apply(void 0, P2), i6.get(m2) === b3 && v2());
              });
            };
            return v2(), m2;
          };
        }, setTimeout: function(f3) {
          var h3 = f3.call;
          return function(d3) {
            for (var w2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, y3 = arguments.length, P2 = new Array(y3 > 2 ? y3 - 2 : 0), E2 = 2; E2 < y3; E2++) P2[E2 - 2] = arguments[E2];
            var b3 = Symbol(), m2 = n6.generateUniqueNumber(s7);
            return s7.set(m2, b3), h3("set", { delay: w2, now: performance.timeOrigin + performance.now(), timerId: m2, timerType: "timeout" }).then(function() {
              var v2 = s7.get(m2);
              if (v2 === void 0) throw new Error("The timer is in an undefined state.");
              v2 === b3 && (s7.delete(m2), d3.apply(void 0, P2));
            }), m2;
          };
        } }), a3 = function(f3) {
          var h3 = new Worker(f3);
          return o6(h3);
        };
        t5.load = a3, t5.wrap = o6;
      });
    });
    Eg = D((Go, Sg) => {
      A2();
      x2();
      I2();
      (function(t5, e8) {
        typeof Go == "object" && typeof Sg < "u" ? e8(Go, vg()) : typeof define == "function" && define.amd ? define(["exports", "worker-timers-broker"], e8) : (t5 = typeof globalThis < "u" ? globalThis : t5 || self, e8(t5.workerTimers = {}, t5.workerTimersBroker));
      })(Go, function(t5, e8) {
        "use strict";
        var r6 = function(h3, d3) {
          var w2 = null;
          return function() {
            if (w2 !== null) return w2;
            var y3 = new Blob([d3], { type: "application/javascript; charset=utf-8" }), P2 = URL.createObjectURL(y3);
            return w2 = h3(P2), setTimeout(function() {
              return URL.revokeObjectURL(P2);
            }), w2;
          };
        }, n6 = `(()=>{var e={45:(e,t,r)=>{var n=r(738).default;e.exports=function(e,t){if("object"!=n(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!=n(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)},e.exports.__esModule=!0,e.exports.default=e.exports},79:e=>{e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n},e.exports.__esModule=!0,e.exports.default=e.exports},122:(e,t,r)=>{var n=r(79);e.exports=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}},e.exports.__esModule=!0,e.exports.default=e.exports},156:e=>{e.exports=function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,u,a,i=[],s=!0,c=!1;try{if(u=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;s=!1}else for(;!(s=(n=u.call(r)).done)&&(i.push(n.value),i.length!==t);s=!0);}catch(e){c=!0,o=e}finally{try{if(!s&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(c)throw o}}return i}},e.exports.__esModule=!0,e.exports.default=e.exports},172:e=>{e.exports=function(e,t){this.v=e,this.k=t},e.exports.__esModule=!0,e.exports.default=e.exports},293:e=>{function t(e,t,r,n,o,u,a){try{var i=e[u](a),s=i.value}catch(e){return void r(e)}i.done?t(s):Promise.resolve(s).then(n,o)}e.exports=function(e){return function(){var r=this,n=arguments;return new Promise((function(o,u){var a=e.apply(r,n);function i(e){t(a,o,u,i,s,"next",e)}function s(e){t(a,o,u,i,s,"throw",e)}i(void 0)}))}},e.exports.__esModule=!0,e.exports.default=e.exports},373:e=>{e.exports=function(e){var t=Object(e),r=[];for(var n in t)r.unshift(n);return function e(){for(;r.length;)if((n=r.pop())in t)return e.value=n,e.done=!1,e;return e.done=!0,e}},e.exports.__esModule=!0,e.exports.default=e.exports},389:function(e,t){!function(e){"use strict";var t=function(e){return function(t){var r=e(t);return t.add(r),r}},r=function(e){return function(t,r){return e.set(t,r),r}},n=void 0===Number.MAX_SAFE_INTEGER?9007199254740991:Number.MAX_SAFE_INTEGER,o=536870912,u=2*o,a=function(e,t){return function(r){var a=t.get(r),i=void 0===a?r.size:a<u?a+1:0;if(!r.has(i))return e(r,i);if(r.size<o){for(;r.has(i);)i=Math.floor(Math.random()*u);return e(r,i)}if(r.size>n)throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");for(;r.has(i);)i=Math.floor(Math.random()*n);return e(r,i)}},i=new WeakMap,s=r(i),c=a(s,i),f=t(c);e.addUniqueNumber=f,e.generateUniqueNumber=c}(t)},472:function(e,t,r){!function(e,t,r,n){"use strict";var o=function(e,t){return function(r){var o=t.get(r);if(void 0===o)return Promise.resolve(!1);var u=n(o,2),a=u[0],i=u[1];return e(a),t.delete(r),i(!1),Promise.resolve(!0)}},u=function(e,t){var r=function(n,o,u,a){var i=n-e.now();i>0?o.set(a,[t(r,i,n,o,u,a),u]):(o.delete(a),u(!0))};return r},a=function(e,t,r,n){return function(o,u,a){var i=o+u-t.timeOrigin,s=i-t.now();return new Promise((function(t){e.set(a,[r(n,s,i,e,t,a),t])}))}},i=new Map,s=o(globalThis.clearTimeout,i),c=new Map,f=o(globalThis.clearTimeout,c),l=u(performance,globalThis.setTimeout),p=a(i,performance,globalThis.setTimeout,l),d=a(c,performance,globalThis.setTimeout,l);r.createWorker(self,{clear:function(){var r=e(t.mark((function e(r){var n,o,u;return t.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.timerId,o=r.timerType,e.next=1,"interval"===o?s(n):f(n);case 1:return u=e.sent,e.abrupt("return",{result:u});case 2:case"end":return e.stop()}}),e)})));function n(e){return r.apply(this,arguments)}return n}(),set:function(){var r=e(t.mark((function e(r){var n,o,u,a,i;return t.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.delay,o=r.now,u=r.timerId,a=r.timerType,e.next=1,("interval"===a?p:d)(n,o,u);case 1:return i=e.sent,e.abrupt("return",{result:i});case 2:case"end":return e.stop()}}),e)})));function n(e){return r.apply(this,arguments)}return n}()})}(r(293),r(756),r(623),r(715))},546:e=>{function t(r,n,o,u){var a=Object.defineProperty;try{a({},"",{})}catch(r){a=0}e.exports=t=function(e,r,n,o){if(r)a?a(e,r,{value:n,enumerable:!o,configurable:!o,writable:!o}):e[r]=n;else{var u=function(r,n){t(e,r,(function(e){return this._invoke(r,n,e)}))};u("next",0),u("throw",1),u("return",2)}},e.exports.__esModule=!0,e.exports.default=e.exports,t(r,n,o,u)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports},579:(e,t,r)=>{var n=r(738).default;e.exports=function(e){if(null!=e){var t=e["function"==typeof Symbol&&Symbol.iterator||"@@iterator"],r=0;if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length))return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}}}throw new TypeError(n(e)+" is not iterable")},e.exports.__esModule=!0,e.exports.default=e.exports},623:function(e,t,r){!function(e,t,r,n,o){"use strict";var u={INTERNAL_ERROR:-32603,INVALID_PARAMS:-32602,METHOD_NOT_FOUND:-32601},a=function(e,t){return Object.assign(new Error(e),{status:t})},i=function(e){return a('The requested method called "'.concat(e,'" is not supported.'),u.METHOD_NOT_FOUND)},s=function(e){return a('The handler of the method called "'.concat(e,'" returned no required result.'),u.INTERNAL_ERROR)},c=function(e){return a('The handler of the method called "'.concat(e,'" returned an unexpected result.'),u.INTERNAL_ERROR)},f=function(e){return a('The specified parameter called "portId" with the given value "'.concat(e,'" does not identify a port connected to this worker.'),u.INVALID_PARAMS)},l=function(e,n){return function(){var o=t(r.mark((function t(o){var u,a,f,l,p,d,v,x,y,b,h,m,_,g,w;return r.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(u=o.data,a=u.id,f=u.method,l=u.params,p=n[f],t.prev=1,void 0!==p){t.next=2;break}throw i(f);case 2:if(void 0!==(d=void 0===l?p():p(l))){t.next=3;break}throw s(f);case 3:if(!(d instanceof Promise)){t.next=5;break}return t.next=4,d;case 4:g=t.sent,t.next=6;break;case 5:g=d;case 6:if(v=g,null!==a){t.next=8;break}if(void 0===v.result){t.next=7;break}throw c(f);case 7:t.next=10;break;case 8:if(void 0!==v.result){t.next=9;break}throw c(f);case 9:x=v.result,y=v.transferables,b=void 0===y?[]:y,e.postMessage({id:a,result:x},b);case 10:t.next=12;break;case 11:t.prev=11,w=t.catch(1),h=w.message,m=w.status,_=void 0===m?-32603:m,e.postMessage({error:{code:_,message:h},id:a});case 12:case"end":return t.stop()}}),t,null,[[1,11]])})));return function(e){return o.apply(this,arguments)}}()},p=function(){return new Promise((function(e){var t=new ArrayBuffer(0),r=new MessageChannel,n=r.port1,o=r.port2;n.onmessage=function(t){var r=t.data;return e(null!==r)},o.postMessage(t,[t])}))};function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var x=new Map,y=function(e,n,u){return v(v({},n),{},{connect:function(t){var r=t.port;r.start();var u=e(r,n),a=o.generateUniqueNumber(x);return x.set(a,(function(){u(),r.close(),x.delete(a)})),{result:a}},disconnect:function(e){var t=e.portId,r=x.get(t);if(void 0===r)throw f(t);return r(),{result:null}},isSupported:function(){var e=t(r.mark((function e(){var t,n,o;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=1,p();case 1:if(!e.sent){e.next=5;break}if(!((t=u())instanceof Promise)){e.next=3;break}return e.next=2,t;case 2:o=e.sent,e.next=4;break;case 3:o=t;case 4:return n=o,e.abrupt("return",{result:n});case 5:return e.abrupt("return",{result:!1});case 6:case"end":return e.stop()}}),e)})));function n(){return e.apply(this,arguments)}return n}()})},b=function(e,t){var r=y(b,t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){return!0}),n=l(e,r);return e.addEventListener("message",n),function(){return e.removeEventListener("message",n)}};e.createWorker=b,e.isSupported=p}(t,r(293),r(756),r(693),r(389))},633:(e,t,r)=>{var n=r(172),o=r(993),u=r(869),a=r(887),i=r(791),s=r(373),c=r(579);function f(){"use strict";var t=o(),r=t.m(f),l=(Object.getPrototypeOf?Object.getPrototypeOf(r):r.__proto__).constructor;function p(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===l||"GeneratorFunction"===(t.displayName||t.name))}var d={throw:1,return:2,break:3,continue:3};function v(e){var t,r;return function(n){t||(t={stop:function(){return r(n.a,2)},catch:function(){return n.v},abrupt:function(e,t){return r(n.a,d[e],t)},delegateYield:function(e,o,u){return t.resultName=o,r(n.d,c(e),u)},finish:function(e){return r(n.f,e)}},r=function(e,r,o){n.p=t.prev,n.n=t.next;try{return e(r,o)}finally{t.next=n.n}}),t.resultName&&(t[t.resultName]=n.v,t.resultName=void 0),t.sent=n.v,t.next=n.n;try{return e.call(this,t)}finally{n.p=t.prev,n.n=t.next}}}return(e.exports=f=function(){return{wrap:function(e,r,n,o){return t.w(v(e),r,n,o&&o.reverse())},isGeneratorFunction:p,mark:t.m,awrap:function(e,t){return new n(e,t)},AsyncIterator:i,async:function(e,t,r,n,o){return(p(t)?a:u)(v(e),t,r,n,o)},keys:s,values:c}},e.exports.__esModule=!0,e.exports.default=e.exports)()}e.exports=f,e.exports.__esModule=!0,e.exports.default=e.exports},693:(e,t,r)=>{var n=r(736);e.exports=function(e,t,r){return(t=n(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.__esModule=!0,e.exports.default=e.exports},715:(e,t,r)=>{var n=r(987),o=r(156),u=r(122),a=r(752);e.exports=function(e,t){return n(e)||o(e,t)||u(e,t)||a()},e.exports.__esModule=!0,e.exports.default=e.exports},736:(e,t,r)=>{var n=r(738).default,o=r(45);e.exports=function(e){var t=o(e,"string");return"symbol"==n(t)?t:t+""},e.exports.__esModule=!0,e.exports.default=e.exports},738:e=>{function t(r){return e.exports=t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,t(r)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports},752:e=>{e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},756:(e,t,r)=>{var n=r(633)();e.exports=n;try{regeneratorRuntime=n}catch(e){"object"==typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}},791:(e,t,r)=>{var n=r(172),o=r(546);e.exports=function e(t,r){function u(e,o,a,i){try{var s=t[e](o),c=s.value;return c instanceof n?r.resolve(c.v).then((function(e){u("next",e,a,i)}),(function(e){u("throw",e,a,i)})):r.resolve(c).then((function(e){s.value=e,a(s)}),(function(e){return u("throw",e,a,i)}))}catch(e){i(e)}}var a;this.next||(o(e.prototype),o(e.prototype,"function"==typeof Symbol&&Symbol.asyncIterator||"@asyncIterator",(function(){return this}))),o(this,"_invoke",(function(e,t,n){function o(){return new r((function(t,r){u(e,n,t,r)}))}return a=a?a.then(o,o):o()}),!0)},e.exports.__esModule=!0,e.exports.default=e.exports},869:(e,t,r)=>{var n=r(887);e.exports=function(e,t,r,o,u){var a=n(e,t,r,o,u);return a.next().then((function(e){return e.done?e.value:a.next()}))},e.exports.__esModule=!0,e.exports.default=e.exports},887:(e,t,r)=>{var n=r(993),o=r(791);e.exports=function(e,t,r,u,a){return new o(n().w(e,t,r,u),a||Promise)},e.exports.__esModule=!0,e.exports.default=e.exports},987:e=>{e.exports=function(e){if(Array.isArray(e))return e},e.exports.__esModule=!0,e.exports.default=e.exports},993:(e,t,r)=>{var n=r(546);function o(){var t,r,u="function"==typeof Symbol?Symbol:{},a=u.iterator||"@@iterator",i=u.toStringTag||"@@toStringTag";function s(e,o,u,a){var i=o&&o.prototype instanceof f?o:f,s=Object.create(i.prototype);return n(s,"_invoke",function(e,n,o){var u,a,i,s=0,f=o||[],l=!1,p={p:0,n:0,v:t,a:d,f:d.bind(t,4),d:function(e,r){return u=e,a=0,i=t,p.n=r,c}};function d(e,n){for(a=e,i=n,r=0;!l&&s&&!o&&r<f.length;r++){var o,u=f[r],d=p.p,v=u[2];e>3?(o=v===n)&&(i=u[(a=u[4])?5:(a=3,3)],u[4]=u[5]=t):u[0]<=d&&((o=e<2&&d<u[1])?(a=0,p.v=n,p.n=u[1]):d<v&&(o=e<3||u[0]>n||n>v)&&(u[4]=e,u[5]=n,p.n=v,a=0))}if(o||e>1)return c;throw l=!0,n}return function(o,f,v){if(s>1)throw TypeError("Generator is already running");for(l&&1===f&&d(f,v),a=f,i=v;(r=a<2?t:i)||!l;){u||(a?a<3?(a>1&&(p.n=-1),d(a,i)):p.n=i:p.v=i);try{if(s=2,u){if(a||(o="next"),r=u[o]){if(!(r=r.call(u,i)))throw TypeError("iterator result is not an object");if(!r.done)return r;i=r.value,a<2&&(a=0)}else 1===a&&(r=u.return)&&r.call(u),a<2&&(i=TypeError("The iterator does not provide a '"+o+"' method"),a=1);u=t}else if((r=(l=p.n<0)?i:e.call(n,p))!==c)break}catch(e){u=t,a=1,i=e}finally{s=1}}return{value:r,done:l}}}(e,u,a),!0),s}var c={};function f(){}function l(){}function p(){}r=Object.getPrototypeOf;var d=[][a]?r(r([][a]())):(n(r={},a,(function(){return this})),r),v=p.prototype=f.prototype=Object.create(d);function x(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,n(e,i,"GeneratorFunction")),e.prototype=Object.create(v),e}return l.prototype=p,n(v,"constructor",p),n(p,"constructor",l),l.displayName="GeneratorFunction",n(p,i,"GeneratorFunction"),n(v),n(v,i,"Generator"),n(v,a,(function(){return this})),n(v,"toString",(function(){return"[object Generator]"})),(e.exports=o=function(){return{w:s,m:x}},e.exports.__esModule=!0,e.exports.default=e.exports)()}e.exports=o,e.exports.__esModule=!0,e.exports.default=e.exports}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var u=t[n]={exports:{}};return e[n].call(u.exports,u,u.exports,r),u.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";r(472)})()})();`, i6 = r6(e8.load, n6), s7 = function(h3) {
          return i6().clearInterval(h3);
        }, o6 = function(h3) {
          return i6().clearTimeout(h3);
        }, a3 = function() {
          var h3;
          return (h3 = i6()).setInterval.apply(h3, arguments);
        }, c5 = function() {
          var h3;
          return (h3 = i6()).setTimeout.apply(h3, arguments);
        };
        t5.clearInterval = s7, t5.clearTimeout = o6, t5.setInterval = a3, t5.setTimeout = c5;
      });
    });
    yi = D((Fr) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(Fr, "__esModule", { value: true });
      Fr.isReactNativeBrowser = Fr.isWebWorker = void 0;
      var BA = () => typeof window < "u" ? typeof navigator < "u" && navigator.userAgent?.toLowerCase().indexOf(" electron/") > -1 && M2?.versions ? !Object.prototype.hasOwnProperty.call(M2.versions, "electron") : typeof window.document < "u" : false, Ag = () => !!(typeof self == "object" && self?.constructor?.name?.includes("WorkerGlobalScope")), Ig = () => typeof navigator < "u" && navigator.product === "ReactNative", MA = BA() || Ag() || Ig();
      Fr.isWebWorker = Ag();
      Fr.isReactNativeBrowser = Ig();
      Fr.default = MA;
    });
    Og = D((Gt) => {
      "use strict";
      A2();
      x2();
      I2();
      var NA = Gt && Gt.__createBinding || (Object.create ? function(t5, e8, r6, n6) {
        n6 === void 0 && (n6 = r6);
        var i6 = Object.getOwnPropertyDescriptor(e8, r6);
        (!i6 || ("get" in i6 ? !e8.__esModule : i6.writable || i6.configurable)) && (i6 = { enumerable: true, get: function() {
          return e8[r6];
        } }), Object.defineProperty(t5, n6, i6);
      } : function(t5, e8, r6, n6) {
        n6 === void 0 && (n6 = r6), t5[n6] = e8[r6];
      }), qA = Gt && Gt.__setModuleDefault || (Object.create ? function(t5, e8) {
        Object.defineProperty(t5, "default", { enumerable: true, value: e8 });
      } : function(t5, e8) {
        t5.default = e8;
      }), LA = Gt && Gt.__importStar || /* @__PURE__ */ (function() {
        var t5 = function(e8) {
          return t5 = Object.getOwnPropertyNames || function(r6) {
            var n6 = [];
            for (var i6 in r6) Object.prototype.hasOwnProperty.call(r6, i6) && (n6[n6.length] = i6);
            return n6;
          }, t5(e8);
        };
        return function(e8) {
          if (e8 && e8.__esModule) return e8;
          var r6 = {};
          if (e8 != null) for (var n6 = t5(e8), i6 = 0; i6 < n6.length; i6++) n6[i6] !== "default" && NA(r6, e8, n6[i6]);
          return qA(r6, e8), r6;
        };
      })();
      Object.defineProperty(Gt, "__esModule", { value: true });
      var xg = Eg(), Lu = LA(yi()), Tg = { set: xg.setInterval, clear: xg.clearInterval }, Pg = { set: (t5, e8) => setInterval(t5, e8), clear: (t5) => clearInterval(t5) }, UA = (t5) => {
        switch (t5) {
          case "native":
            return Pg;
          case "worker":
            return Tg;
          case "auto":
          default:
            return Lu.default && !Lu.isWebWorker && !Lu.isReactNativeBrowser ? Tg : Pg;
        }
      };
      Gt.default = UA;
    });
    Du = D((gi) => {
      "use strict";
      A2();
      x2();
      I2();
      var DA = gi && gi.__importDefault || function(t5) {
        return t5 && t5.__esModule ? t5 : { default: t5 };
      };
      Object.defineProperty(gi, "__esModule", { value: true });
      var jA = DA(Og()), Uu = class {
        constructor(e8, r6) {
          __publicField(this, "_keepalive");
          __publicField(this, "timerId");
          __publicField(this, "timer");
          __publicField(this, "destroyed", false);
          __publicField(this, "counter");
          __publicField(this, "client");
          __publicField(this, "_keepaliveTimeoutTimestamp");
          __publicField(this, "_intervalEvery");
          this.client = e8, this.timer = typeof r6 == "object" && "set" in r6 && "clear" in r6 ? r6 : (0, jA.default)(r6), this.setKeepalive(e8.options.keepalive);
        }
        get keepaliveTimeoutTimestamp() {
          return this._keepaliveTimeoutTimestamp;
        }
        get intervalEvery() {
          return this._intervalEvery;
        }
        get keepalive() {
          return this._keepalive;
        }
        clear() {
          this.timerId && (this.timer.clear(this.timerId), this.timerId = null);
        }
        setKeepalive(e8) {
          if (e8 *= 1e3, isNaN(e8) || e8 <= 0 || e8 > 2147483647) throw new Error(`Keepalive value must be an integer between 0 and 2147483647. Provided value is ${e8}`);
          this._keepalive = e8, this.reschedule(), this.client.log(`KeepaliveManager: set keepalive to ${e8}ms`);
        }
        destroy() {
          this.clear(), this.destroyed = true;
        }
        reschedule() {
          if (this.destroyed) return;
          this.clear(), this.counter = 0;
          let e8 = Math.ceil(this._keepalive * 1.5);
          this._keepaliveTimeoutTimestamp = Date.now() + e8, this._intervalEvery = Math.ceil(this._keepalive / 2), this.timerId = this.timer.set(() => {
            this.destroyed || (this.counter += 1, this.counter === 2 ? this.client.sendPing() : this.counter > 2 && this.client.onKeepaliveTimeout());
          }, this._intervalEvery);
        }
      };
      gi.default = Uu;
    });
    zo = D((yt) => {
      "use strict";
      var _a;
      A2();
      x2();
      I2();
      var FA = yt && yt.__createBinding || (Object.create ? function(t5, e8, r6, n6) {
        n6 === void 0 && (n6 = r6);
        var i6 = Object.getOwnPropertyDescriptor(e8, r6);
        (!i6 || ("get" in i6 ? !e8.__esModule : i6.writable || i6.configurable)) && (i6 = { enumerable: true, get: function() {
          return e8[r6];
        } }), Object.defineProperty(t5, n6, i6);
      } : function(t5, e8, r6, n6) {
        n6 === void 0 && (n6 = r6), t5[n6] = e8[r6];
      }), WA = yt && yt.__setModuleDefault || (Object.create ? function(t5, e8) {
        Object.defineProperty(t5, "default", { enumerable: true, value: e8 });
      } : function(t5, e8) {
        t5.default = e8;
      }), Mg = yt && yt.__importStar || /* @__PURE__ */ (function() {
        var t5 = function(e8) {
          return t5 = Object.getOwnPropertyNames || function(r6) {
            var n6 = [];
            for (var i6 in r6) Object.prototype.hasOwnProperty.call(r6, i6) && (n6[n6.length] = i6);
            return n6;
          }, t5(e8);
        };
        return function(e8) {
          if (e8 && e8.__esModule) return e8;
          var r6 = {};
          if (e8 != null) for (var n6 = t5(e8), i6 = 0; i6 < n6.length; i6++) n6[i6] !== "default" && FA(r6, e8, n6[i6]);
          return WA(r6, e8), r6;
        };
      })(), fr = yt && yt.__importDefault || function(t5) {
        return t5 && t5.__esModule ? t5 : { default: t5 };
      };
      Object.defineProperty(yt, "__esModule", { value: true });
      var ju = fr(iy()), $A = or(), Rg = fr(uy()), HA = fr(At()), kg = Mg(cy()), vn = fr(La()), VA = fr(zy()), GA = fr(Au()), zA = fr(Ky()), bi = Mr(), KA = Qy(), QA = fr(Du()), Cg = Mg(yi()), Fu = globalThis.setImmediate || ((...t5) => {
        let e8 = t5.shift();
        (0, bi.nextTick)(() => {
          e8(...t5);
        });
      }), Bg = { keepalive: 60, reschedulePings: true, protocolId: "MQTT", protocolVersion: 4, reconnectPeriod: 1e3, connectTimeout: 30 * 1e3, clean: true, resubscribe: true, subscribeBatchSize: null, writeCache: true, timerVariant: "auto" }, Wu = (_a = class extends KA.TypedEventEmitter {
        constructor(e8, r6) {
          super();
          __publicField(this, "connected");
          __publicField(this, "disconnecting");
          __publicField(this, "disconnected");
          __publicField(this, "reconnecting");
          __publicField(this, "incomingStore");
          __publicField(this, "outgoingStore");
          __publicField(this, "options");
          __publicField(this, "queueQoSZero");
          __publicField(this, "_reconnectCount");
          __publicField(this, "log");
          __publicField(this, "messageIdProvider");
          __publicField(this, "outgoing");
          __publicField(this, "messageIdToTopic");
          __publicField(this, "noop");
          __publicField(this, "keepaliveManager");
          __publicField(this, "stream");
          __publicField(this, "queue");
          __publicField(this, "streamBuilder");
          __publicField(this, "_resubscribeTopics");
          __publicField(this, "connackTimer");
          __publicField(this, "reconnectTimer");
          __publicField(this, "_storeProcessing");
          __publicField(this, "_packetIdsDuringStoreProcessing");
          __publicField(this, "_storeProcessingQueue");
          __publicField(this, "_firstConnection");
          __publicField(this, "topicAliasRecv");
          __publicField(this, "topicAliasSend");
          __publicField(this, "_deferredReconnect");
          __publicField(this, "connackPacket");
          this.options = r6 || {};
          for (let n6 in Bg) typeof this.options[n6] > "u" ? this.options[n6] = Bg[n6] : this.options[n6] = r6[n6];
          this.log = this.options.log || (0, HA.default)("mqttjs:client"), this.noop = this._noop.bind(this), this.log("MqttClient :: version:", _a.VERSION), Cg.isWebWorker ? this.log("MqttClient :: environment", "webworker") : this.log("MqttClient :: environment", Cg.default ? "browser" : "node"), this.log("MqttClient :: options.protocol", r6.protocol), this.log("MqttClient :: options.protocolVersion", r6.protocolVersion), this.log("MqttClient :: options.username", r6.username), this.log("MqttClient :: options.keepalive", r6.keepalive), this.log("MqttClient :: options.reconnectPeriod", r6.reconnectPeriod), this.log("MqttClient :: options.rejectUnauthorized", r6.rejectUnauthorized), this.log("MqttClient :: options.properties.topicAliasMaximum", r6.properties ? r6.properties.topicAliasMaximum : void 0), this.options.clientId = typeof r6.clientId == "string" ? r6.clientId : _a.defaultId(), this.log("MqttClient :: clientId", this.options.clientId), this.options.customHandleAcks = r6.protocolVersion === 5 && r6.customHandleAcks ? r6.customHandleAcks : (...n6) => {
            n6[3](null, 0);
          }, this.options.writeCache || (ju.default.writeToStream.cacheNumbers = false), this.streamBuilder = e8, this.messageIdProvider = typeof this.options.messageIdProvider > "u" ? new GA.default() : this.options.messageIdProvider, this.outgoingStore = r6.outgoingStore || new vn.default(), this.incomingStore = r6.incomingStore || new vn.default(), this.queueQoSZero = r6.queueQoSZero === void 0 ? true : r6.queueQoSZero, this._resubscribeTopics = {}, this.messageIdToTopic = {}, this.keepaliveManager = null, this.connected = false, this.disconnecting = false, this.reconnecting = false, this.queue = [], this.connackTimer = null, this.reconnectTimer = null, this._storeProcessing = false, this._packetIdsDuringStoreProcessing = {}, this._storeProcessingQueue = [], this.outgoing = {}, this._firstConnection = true, r6.properties && r6.properties.topicAliasMaximum > 0 && (r6.properties.topicAliasMaximum > 65535 ? this.log("MqttClient :: options.properties.topicAliasMaximum is out of range") : this.topicAliasRecv = new zA.default(r6.properties.topicAliasMaximum)), this.on("connect", () => {
            let { queue: n6 } = this, i6 = () => {
              let s7 = n6.shift();
              this.log("deliver :: entry %o", s7);
              let o6 = null;
              if (!s7) {
                this._resubscribe();
                return;
              }
              o6 = s7.packet, this.log("deliver :: call _sendPacket for %o", o6);
              let a3 = true;
              o6.messageId && o6.messageId !== 0 && (this.messageIdProvider.register(o6.messageId) || (a3 = false)), a3 ? this._sendPacket(o6, (c5) => {
                s7.cb && s7.cb(c5), i6();
              }) : (this.log("messageId: %d has already used. The message is skipped and removed.", o6.messageId), i6());
            };
            this.log("connect :: sending queued packets"), i6();
          }), this.on("close", () => {
            this.log("close :: connected set to `false`"), this.connected = false, this.log("close :: clearing connackTimer"), clearTimeout(this.connackTimer), this._destroyKeepaliveManager(), this.topicAliasRecv && this.topicAliasRecv.clear(), this.log("close :: calling _setupReconnect"), this._setupReconnect();
          }), this.options.manualConnect || (this.log("MqttClient :: setting up stream"), this.connect());
        }
        static defaultId() {
          return `mqttjs_${Math.random().toString(16).substr(2, 8)}`;
        }
        handleAuth(e8, r6) {
          r6();
        }
        handleMessage(e8, r6) {
          r6();
        }
        _nextId() {
          return this.messageIdProvider.allocate();
        }
        getLastMessageId() {
          return this.messageIdProvider.getLastAllocated();
        }
        connect() {
          let e8 = new $A.Writable(), r6 = ju.default.parser(this.options), n6 = null, i6 = [];
          this.log("connect :: calling method to clear reconnect"), this._clearReconnect(), this.disconnected && !this.reconnecting && (this.incomingStore = this.options.incomingStore || new vn.default(), this.outgoingStore = this.options.outgoingStore || new vn.default(), this.disconnecting = false, this.disconnected = false), this.log("connect :: using streamBuilder provided to client to create stream"), this.stream = this.streamBuilder(this), r6.on("packet", (f3) => {
            this.log("parser :: on packet push to packets array."), i6.push(f3);
          });
          let s7 = () => {
            this.log("work :: getting next packet in queue");
            let f3 = i6.shift();
            if (f3) this.log("work :: packet pulled from queue"), (0, VA.default)(this, f3, o6);
            else {
              this.log("work :: no packets in queue");
              let h3 = n6;
              n6 = null, this.log("work :: done flag is %s", !!h3), h3 && h3();
            }
          }, o6 = () => {
            if (i6.length) (0, bi.nextTick)(s7);
            else {
              let f3 = n6;
              n6 = null, f3();
            }
          };
          e8._write = (f3, h3, d3) => {
            n6 = d3, this.log("writable stream :: parsing buffer"), r6.parse(f3), s7();
          };
          let a3 = (f3) => {
            this.log("streamErrorHandler :: error", f3.message), f3.code ? (this.log("streamErrorHandler :: emitting error"), this.emit("error", f3)) : this.noop(f3);
          };
          this.log("connect :: pipe stream to writable stream"), this.stream.pipe(e8), this.stream.on("error", a3), this.stream.on("close", () => {
            this.log("(%s)stream :: on close", this.options.clientId), this._flushVolatile(), this.log("stream: emit close to MqttClient"), this.emit("close");
          }), this.log("connect: sending packet `connect`");
          let c5 = { cmd: "connect", protocolId: this.options.protocolId, protocolVersion: this.options.protocolVersion, clean: this.options.clean, clientId: this.options.clientId, keepalive: this.options.keepalive, username: this.options.username, password: this.options.password, properties: this.options.properties };
          if (this.options.will && (c5.will = { ...this.options.will, payload: this.options.will?.payload }), this.topicAliasRecv && (c5.properties || (c5.properties = {}), this.topicAliasRecv && (c5.properties.topicAliasMaximum = this.topicAliasRecv.max)), this._writePacket(c5), r6.on("error", this.emit.bind(this, "error")), this.options.properties) {
            if (!this.options.properties.authenticationMethod && this.options.properties.authenticationData) return this.end(() => this.emit("error", new Error("Packet has no Authentication Method"))), this;
            if (this.options.properties.authenticationMethod && this.options.authPacket && typeof this.options.authPacket == "object") {
              let f3 = { cmd: "auth", reasonCode: 0, ...this.options.authPacket };
              this._writePacket(f3);
            }
          }
          return this.stream.setMaxListeners(1e3), clearTimeout(this.connackTimer), this.connackTimer = setTimeout(() => {
            this.log("!!connectTimeout hit!! Calling _cleanUp with force `true`"), this.emit("error", new Error("connack timeout")), this._cleanUp(true);
          }, this.options.connectTimeout), this;
        }
        publish(e8, r6, n6, i6) {
          this.log("publish :: message `%s` to topic `%s`", r6, e8);
          let { options: s7 } = this;
          typeof n6 == "function" && (i6 = n6, n6 = null), n6 = n6 || {}, n6 = { ...{ qos: 0, retain: false, dup: false }, ...n6 };
          let { qos: a3, retain: c5, dup: f3, properties: h3, cbStorePut: d3 } = n6;
          if (this._checkDisconnecting(i6)) return this;
          let w2 = () => {
            let y3 = 0;
            if ((a3 === 1 || a3 === 2) && (y3 = this._nextId(), y3 === null)) return this.log("No messageId left"), false;
            let P2 = { cmd: "publish", topic: e8, payload: r6, qos: a3, retain: c5, messageId: y3, dup: f3 };
            switch (s7.protocolVersion === 5 && (P2.properties = h3), this.log("publish :: qos", a3), a3) {
              case 1:
              case 2:
                this.outgoing[P2.messageId] = { volatile: false, cb: i6 || this.noop }, this.log("MqttClient:publish: packet cmd: %s", P2.cmd), this._sendPacket(P2, void 0, d3);
                break;
              default:
                this.log("MqttClient:publish: packet cmd: %s", P2.cmd), this._sendPacket(P2, i6, d3);
                break;
            }
            return true;
          };
          return (this._storeProcessing || this._storeProcessingQueue.length > 0 || !w2()) && this._storeProcessingQueue.push({ invoke: w2, cbStorePut: n6.cbStorePut, callback: i6 }), this;
        }
        publishAsync(e8, r6, n6) {
          return new Promise((i6, s7) => {
            this.publish(e8, r6, n6, (o6, a3) => {
              o6 ? s7(o6) : i6(a3);
            });
          });
        }
        subscribe(e8, r6, n6) {
          let i6 = this.options.protocolVersion;
          typeof r6 == "function" && (n6 = r6), n6 = n6 || this.noop;
          let s7 = false, o6 = [];
          typeof e8 == "string" ? (e8 = [e8], o6 = e8) : Array.isArray(e8) ? o6 = e8 : typeof e8 == "object" && (s7 = e8.resubscribe, delete e8.resubscribe, o6 = Object.keys(e8));
          let a3 = kg.validateTopics(o6);
          if (a3 !== null) return Fu(n6, new Error(`Invalid topic ${a3}`)), this;
          if (this._checkDisconnecting(n6)) return this.log("subscribe: discconecting true"), this;
          let c5 = { qos: 0 };
          i6 === 5 && (c5.nl = false, c5.rap = false, c5.rh = 0), r6 = { ...c5, ...r6 };
          let { properties: f3 } = r6, h3 = [], d3 = (P2, E2) => {
            if (E2 = E2 || r6, !Object.prototype.hasOwnProperty.call(this._resubscribeTopics, P2) || this._resubscribeTopics[P2].qos < E2.qos || s7) {
              let b3 = { topic: P2, qos: E2.qos };
              i6 === 5 && (b3.nl = E2.nl, b3.rap = E2.rap, b3.rh = E2.rh, b3.properties = f3), this.log("subscribe: pushing topic `%s` and qos `%s` to subs list", b3.topic, b3.qos), h3.push(b3);
            }
          };
          if (Array.isArray(e8) ? e8.forEach((P2) => {
            this.log("subscribe: array topic %s", P2), d3(P2);
          }) : Object.keys(e8).forEach((P2) => {
            this.log("subscribe: object topic %s, %o", P2, e8[P2]), d3(P2, e8[P2]);
          }), !h3.length) return n6(null, []), this;
          let w2 = (P2, E2) => {
            let b3 = { cmd: "subscribe", subscriptions: P2, messageId: E2 };
            if (f3 && (b3.properties = f3), this.options.resubscribe) {
              this.log("subscribe :: resubscribe true");
              let v2 = [];
              P2.forEach((R2) => {
                if (this.options.reconnectPeriod > 0) {
                  let T2 = { qos: R2.qos };
                  i6 === 5 && (T2.nl = R2.nl || false, T2.rap = R2.rap || false, T2.rh = R2.rh || 0, T2.properties = R2.properties), this._resubscribeTopics[R2.topic] = T2, v2.push(R2.topic);
                }
              }), this.messageIdToTopic[b3.messageId] = v2;
            }
            let m2 = new Promise((v2, R2) => {
              this.outgoing[b3.messageId] = { volatile: true, cb(T2, g2) {
                if (!T2) {
                  let { granted: O } = g2;
                  for (let _2 = 0; _2 < O.length; _2 += 1) P2[_2].qos = O[_2];
                }
                T2 ? R2(new bi.ErrorWithSubackPacket(T2.message, g2)) : v2(g2);
              } };
            });
            return this.log("subscribe :: call _sendPacket"), this._sendPacket(b3), m2;
          }, y3 = () => {
            let P2 = this.options.subscribeBatchSize ?? h3.length, E2 = [];
            for (let b3 = 0; b3 < h3.length; b3 += P2) {
              let m2 = h3.slice(b3, b3 + P2), v2 = this._nextId();
              if (v2 === null) return this.log("No messageId left"), false;
              E2.push(w2(m2, v2));
            }
            return Promise.all(E2).then((b3) => {
              n6(null, h3, b3.at(-1));
            }).catch((b3) => {
              n6(b3, h3, b3.packet);
            }), true;
          };
          return (this._storeProcessing || this._storeProcessingQueue.length > 0 || !y3()) && this._storeProcessingQueue.push({ invoke: y3, callback: n6 }), this;
        }
        subscribeAsync(e8, r6) {
          return new Promise((n6, i6) => {
            this.subscribe(e8, r6, (s7, o6) => {
              s7 ? i6(s7) : n6(o6);
            });
          });
        }
        unsubscribe(e8, r6, n6) {
          typeof e8 == "string" && (e8 = [e8]), typeof r6 == "function" && (n6 = r6), n6 = n6 || this.noop;
          let i6 = kg.validateTopics(e8);
          if (i6 !== null) return Fu(n6, new Error(`Invalid topic ${i6}`)), this;
          if (this._checkDisconnecting(n6)) return this;
          let s7 = () => {
            let o6 = this._nextId();
            if (o6 === null) return this.log("No messageId left"), false;
            let a3 = { cmd: "unsubscribe", messageId: o6, unsubscriptions: [] };
            return typeof e8 == "string" ? a3.unsubscriptions = [e8] : Array.isArray(e8) && (a3.unsubscriptions = e8), this.options.resubscribe && a3.unsubscriptions.forEach((c5) => {
              delete this._resubscribeTopics[c5];
            }), typeof r6 == "object" && r6.properties && (a3.properties = r6.properties), this.outgoing[a3.messageId] = { volatile: true, cb: n6 }, this.log("unsubscribe: call _sendPacket"), this._sendPacket(a3), true;
          };
          return (this._storeProcessing || this._storeProcessingQueue.length > 0 || !s7()) && this._storeProcessingQueue.push({ invoke: s7, callback: n6 }), this;
        }
        unsubscribeAsync(e8, r6) {
          return new Promise((n6, i6) => {
            this.unsubscribe(e8, r6, (s7, o6) => {
              s7 ? i6(s7) : n6(o6);
            });
          });
        }
        end(e8, r6, n6) {
          this.log("end :: (%s)", this.options.clientId), (e8 == null || typeof e8 != "boolean") && (n6 = n6 || r6, r6 = e8, e8 = false), typeof r6 != "object" && (n6 = n6 || r6, r6 = null), this.log("end :: cb? %s", !!n6), (!n6 || typeof n6 != "function") && (n6 = this.noop);
          let i6 = () => {
            this.log("end :: closeStores: closing incoming and outgoing stores"), this.disconnected = true, this.incomingStore.close((o6) => {
              this.outgoingStore.close((a3) => {
                if (this.log("end :: closeStores: emitting end"), this.emit("end"), n6) {
                  let c5 = o6 || a3;
                  this.log("end :: closeStores: invoking callback with args"), n6(c5);
                }
              });
            }), this._deferredReconnect ? this._deferredReconnect() : (this.options.reconnectPeriod === 0 || this.options.manualConnect) && (this.disconnecting = false);
          }, s7 = () => {
            this.log("end :: (%s) :: finish :: calling _cleanUp with force %s", this.options.clientId, e8), this._cleanUp(e8, () => {
              this.log("end :: finish :: calling process.nextTick on closeStores"), (0, bi.nextTick)(i6);
            }, r6);
          };
          return this.disconnecting ? (n6(), this) : (this._clearReconnect(), this.disconnecting = true, !e8 && Object.keys(this.outgoing).length > 0 ? (this.log("end :: (%s) :: calling finish in 10ms once outgoing is empty", this.options.clientId), this.once("outgoingEmpty", setTimeout.bind(null, s7, 10))) : (this.log("end :: (%s) :: immediately calling finish", this.options.clientId), s7()), this);
        }
        endAsync(e8, r6) {
          return new Promise((n6, i6) => {
            this.end(e8, r6, (s7) => {
              s7 ? i6(s7) : n6();
            });
          });
        }
        removeOutgoingMessage(e8) {
          if (this.outgoing[e8]) {
            let { cb: r6 } = this.outgoing[e8];
            this._removeOutgoingAndStoreMessage(e8, () => {
              r6(new Error("Message removed"));
            });
          }
          return this;
        }
        reconnect(e8) {
          this.log("client reconnect");
          let r6 = () => {
            e8 ? (this.options.incomingStore = e8.incomingStore, this.options.outgoingStore = e8.outgoingStore) : (this.options.incomingStore = null, this.options.outgoingStore = null), this.incomingStore = this.options.incomingStore || new vn.default(), this.outgoingStore = this.options.outgoingStore || new vn.default(), this.disconnecting = false, this.disconnected = false, this._deferredReconnect = null, this._reconnect();
          };
          return this.disconnecting && !this.disconnected ? this._deferredReconnect = r6 : r6(), this;
        }
        _flushVolatile() {
          this.outgoing && (this.log("_flushVolatile :: deleting volatile messages from the queue and setting their callbacks as error function"), Object.keys(this.outgoing).forEach((e8) => {
            this.outgoing[e8].volatile && typeof this.outgoing[e8].cb == "function" && (this.outgoing[e8].cb(new Error("Connection closed")), delete this.outgoing[e8]);
          }));
        }
        _flush() {
          this.outgoing && (this.log("_flush: queue exists? %b", !!this.outgoing), Object.keys(this.outgoing).forEach((e8) => {
            typeof this.outgoing[e8].cb == "function" && (this.outgoing[e8].cb(new Error("Connection closed")), delete this.outgoing[e8]);
          }));
        }
        _removeTopicAliasAndRecoverTopicName(e8) {
          let r6;
          e8.properties && (r6 = e8.properties.topicAlias);
          let n6 = e8.topic.toString();
          if (this.log("_removeTopicAliasAndRecoverTopicName :: alias %d, topic %o", r6, n6), n6.length === 0) {
            if (typeof r6 > "u") return new Error("Unregistered Topic Alias");
            if (n6 = this.topicAliasSend.getTopicByAlias(r6), typeof n6 > "u") return new Error("Unregistered Topic Alias");
            e8.topic = n6;
          }
          r6 && delete e8.properties.topicAlias;
        }
        _checkDisconnecting(e8) {
          return this.disconnecting && (e8 && e8 !== this.noop ? e8(new Error("client disconnecting")) : this.emit("error", new Error("client disconnecting"))), this.disconnecting;
        }
        _reconnect() {
          this.log("_reconnect: emitting reconnect to client"), this.emit("reconnect"), this.connected ? (this.end(() => {
            this.connect();
          }), this.log("client already connected. disconnecting first.")) : (this.log("_reconnect: calling connect"), this.connect());
        }
        _setupReconnect() {
          !this.disconnecting && !this.reconnectTimer && this.options.reconnectPeriod > 0 ? (this.reconnecting || (this.log("_setupReconnect :: emit `offline` state"), this.emit("offline"), this.log("_setupReconnect :: set `reconnecting` to `true`"), this.reconnecting = true), this.log("_setupReconnect :: setting reconnectTimer for %d ms", this.options.reconnectPeriod), this.reconnectTimer = setInterval(() => {
            this.log("reconnectTimer :: reconnect triggered!"), this._reconnect();
          }, this.options.reconnectPeriod)) : this.log("_setupReconnect :: doing nothing...");
        }
        _clearReconnect() {
          this.log("_clearReconnect : clearing reconnect timer"), this.reconnectTimer && (clearInterval(this.reconnectTimer), this.reconnectTimer = null);
        }
        _cleanUp(e8, r6, n6 = {}) {
          if (r6 && (this.log("_cleanUp :: done callback provided for on stream close"), this.stream.on("close", r6)), this.log("_cleanUp :: forced? %s", e8), e8) this.options.reconnectPeriod === 0 && this.options.clean && this._flush(), this.log("_cleanUp :: (%s) :: destroying stream", this.options.clientId), this.stream.destroy();
          else {
            let i6 = { cmd: "disconnect", ...n6 };
            this.log("_cleanUp :: (%s) :: call _sendPacket with disconnect packet", this.options.clientId), this._sendPacket(i6, () => {
              this.log("_cleanUp :: (%s) :: destroying stream", this.options.clientId), Fu(() => {
                this.stream.end(() => {
                  this.log("_cleanUp :: (%s) :: stream destroyed", this.options.clientId);
                });
              });
            });
          }
          !this.disconnecting && !this.reconnecting && (this.log("_cleanUp :: client not disconnecting/reconnecting. Clearing and resetting reconnect."), this._clearReconnect(), this._setupReconnect()), this._destroyKeepaliveManager(), r6 && !this.connected && (this.log("_cleanUp :: (%s) :: removing stream `done` callback `close` listener", this.options.clientId), this.stream.removeListener("close", r6), r6());
        }
        _storeAndSend(e8, r6, n6) {
          this.log("storeAndSend :: store packet with cmd %s to outgoingStore", e8.cmd);
          let i6 = e8, s7;
          if (i6.cmd === "publish" && (i6 = (0, Rg.default)(e8), s7 = this._removeTopicAliasAndRecoverTopicName(i6), s7)) return r6 && r6(s7);
          this.outgoingStore.put(i6, (o6) => {
            if (o6) return r6 && r6(o6);
            n6(), this._writePacket(e8, r6);
          });
        }
        _applyTopicAlias(e8) {
          if (this.options.protocolVersion === 5 && e8.cmd === "publish") {
            let r6;
            e8.properties && (r6 = e8.properties.topicAlias);
            let n6 = e8.topic.toString();
            if (this.topicAliasSend) if (r6) {
              if (n6.length !== 0 && (this.log("applyTopicAlias :: register topic: %s - alias: %d", n6, r6), !this.topicAliasSend.put(n6, r6))) return this.log("applyTopicAlias :: error out of range. topic: %s - alias: %d", n6, r6), new Error("Sending Topic Alias out of range");
            } else n6.length !== 0 && (this.options.autoAssignTopicAlias ? (r6 = this.topicAliasSend.getAliasByTopic(n6), r6 ? (e8.topic = "", e8.properties = { ...e8.properties, topicAlias: r6 }, this.log("applyTopicAlias :: auto assign(use) topic: %s - alias: %d", n6, r6)) : (r6 = this.topicAliasSend.getLruAlias(), this.topicAliasSend.put(n6, r6), e8.properties = { ...e8.properties, topicAlias: r6 }, this.log("applyTopicAlias :: auto assign topic: %s - alias: %d", n6, r6))) : this.options.autoUseTopicAlias && (r6 = this.topicAliasSend.getAliasByTopic(n6), r6 && (e8.topic = "", e8.properties = { ...e8.properties, topicAlias: r6 }, this.log("applyTopicAlias :: auto use topic: %s - alias: %d", n6, r6))));
            else if (r6) return this.log("applyTopicAlias :: error out of range. topic: %s - alias: %d", n6, r6), new Error("Sending Topic Alias out of range");
          }
        }
        _noop(e8) {
          this.log("noop ::", e8);
        }
        _writePacket(e8, r6) {
          this.log("_writePacket :: packet: %O", e8), this.log("_writePacket :: emitting `packetsend`"), this.emit("packetsend", e8), this.log("_writePacket :: writing to stream");
          let n6 = ju.default.writeToStream(e8, this.stream, this.options);
          this.log("_writePacket :: writeToStream result %s", n6), !n6 && r6 && r6 !== this.noop ? (this.log("_writePacket :: handle events on `drain` once through callback."), this.stream.once("drain", r6)) : r6 && (this.log("_writePacket :: invoking cb"), r6());
        }
        _sendPacket(e8, r6, n6, i6) {
          this.log("_sendPacket :: (%s) ::  start", this.options.clientId), n6 = n6 || this.noop, r6 = r6 || this.noop;
          let s7 = this._applyTopicAlias(e8);
          if (s7) {
            r6(s7);
            return;
          }
          if (!this.connected) {
            if (e8.cmd === "auth") {
              this._writePacket(e8, r6);
              return;
            }
            this.log("_sendPacket :: client not connected. Storing packet offline."), this._storePacket(e8, r6, n6);
            return;
          }
          if (i6) {
            this._writePacket(e8, r6);
            return;
          }
          switch (e8.cmd) {
            case "publish":
              break;
            case "pubrel":
              this._storeAndSend(e8, r6, n6);
              return;
            default:
              this._writePacket(e8, r6);
              return;
          }
          switch (e8.qos) {
            case 2:
            case 1:
              this._storeAndSend(e8, r6, n6);
              break;
            case 0:
            default:
              this._writePacket(e8, r6);
              break;
          }
          this.log("_sendPacket :: (%s) ::  end", this.options.clientId);
        }
        _storePacket(e8, r6, n6) {
          this.log("_storePacket :: packet: %o", e8), this.log("_storePacket :: cb? %s", !!r6), n6 = n6 || this.noop;
          let i6 = e8;
          if (i6.cmd === "publish") {
            i6 = (0, Rg.default)(e8);
            let o6 = this._removeTopicAliasAndRecoverTopicName(i6);
            if (o6) return r6 && r6(o6);
          }
          let s7 = i6.qos || 0;
          s7 === 0 && this.queueQoSZero || i6.cmd !== "publish" ? this.queue.push({ packet: i6, cb: r6 }) : s7 > 0 ? (r6 = this.outgoing[i6.messageId] ? this.outgoing[i6.messageId].cb : null, this.outgoingStore.put(i6, (o6) => {
            if (o6) return r6 && r6(o6);
            n6();
          })) : r6 && r6(new Error("No connection to broker"));
        }
        _setupKeepaliveManager() {
          this.log("_setupKeepaliveManager :: keepalive %d (seconds)", this.options.keepalive), !this.keepaliveManager && this.options.keepalive && (this.keepaliveManager = new QA.default(this, this.options.timerVariant));
        }
        _destroyKeepaliveManager() {
          this.keepaliveManager && (this.log("_destroyKeepaliveManager :: destroying keepalive manager"), this.keepaliveManager.destroy(), this.keepaliveManager = null);
        }
        reschedulePing(e8 = false) {
          this.keepaliveManager && this.options.keepalive && (e8 || this.options.reschedulePings) && this._reschedulePing();
        }
        _reschedulePing() {
          this.log("_reschedulePing :: rescheduling ping"), this.keepaliveManager.reschedule();
        }
        sendPing() {
          this.log("_sendPing :: sending pingreq"), this._sendPacket({ cmd: "pingreq" });
        }
        onKeepaliveTimeout() {
          this.emit("error", new Error("Keepalive timeout")), this.log("onKeepaliveTimeout :: calling _cleanUp with force true"), this._cleanUp(true);
        }
        _resubscribe() {
          this.log("_resubscribe");
          let e8 = Object.keys(this._resubscribeTopics);
          if (!this._firstConnection && (this.options.clean || this.options.protocolVersion >= 4 && !this.connackPacket.sessionPresent) && e8.length > 0) if (this.options.resubscribe) if (this.options.protocolVersion === 5) {
            this.log("_resubscribe: protocolVersion 5");
            for (let r6 = 0; r6 < e8.length; r6++) {
              let n6 = {};
              n6[e8[r6]] = this._resubscribeTopics[e8[r6]], n6.resubscribe = true, this.subscribe(n6, { properties: n6[e8[r6]].properties });
            }
          } else this._resubscribeTopics.resubscribe = true, this.subscribe(this._resubscribeTopics);
          else this._resubscribeTopics = {};
          this._firstConnection = false;
        }
        _onConnect(e8) {
          if (this.disconnected) {
            this.emit("connect", e8);
            return;
          }
          this.connackPacket = e8, this.messageIdProvider.clear(), this._setupKeepaliveManager(), this.connected = true;
          let r6 = () => {
            let n6 = this.outgoingStore.createStream(), i6 = () => {
              n6.destroy(), n6 = null, this._flushStoreProcessingQueue(), s7();
            }, s7 = () => {
              this._storeProcessing = false, this._packetIdsDuringStoreProcessing = {};
            };
            this.once("close", i6), n6.on("error", (a3) => {
              s7(), this._flushStoreProcessingQueue(), this.removeListener("close", i6), this.emit("error", a3);
            });
            let o6 = () => {
              if (!n6) return;
              let a3 = n6.read(1), c5;
              if (!a3) {
                n6.once("readable", o6);
                return;
              }
              if (this._storeProcessing = true, this._packetIdsDuringStoreProcessing[a3.messageId]) {
                o6();
                return;
              }
              !this.disconnecting && !this.reconnectTimer ? (c5 = this.outgoing[a3.messageId] ? this.outgoing[a3.messageId].cb : null, this.outgoing[a3.messageId] = { volatile: false, cb(f3, h3) {
                c5 && c5(f3, h3), o6();
              } }, this._packetIdsDuringStoreProcessing[a3.messageId] = true, this.messageIdProvider.register(a3.messageId) ? this._sendPacket(a3, void 0, void 0, true) : this.log("messageId: %d has already used.", a3.messageId)) : n6.destroy && n6.destroy();
            };
            n6.on("end", () => {
              let a3 = true;
              for (let c5 in this._packetIdsDuringStoreProcessing) if (!this._packetIdsDuringStoreProcessing[c5]) {
                a3 = false;
                break;
              }
              this.removeListener("close", i6), a3 ? (s7(), this._invokeAllStoreProcessingQueue(), this.emit("connect", e8)) : r6();
            }), o6();
          };
          r6();
        }
        _invokeStoreProcessingQueue() {
          if (!this._storeProcessing && this._storeProcessingQueue.length > 0) {
            let e8 = this._storeProcessingQueue[0];
            if (e8 && e8.invoke()) return this._storeProcessingQueue.shift(), true;
          }
          return false;
        }
        _invokeAllStoreProcessingQueue() {
          for (; this._invokeStoreProcessingQueue(); ) ;
        }
        _flushStoreProcessingQueue() {
          for (let e8 of this._storeProcessingQueue) e8.cbStorePut && e8.cbStorePut(new Error("Connection closed")), e8.callback && e8.callback(new Error("Connection closed"));
          this._storeProcessingQueue.splice(0);
        }
        _removeOutgoingAndStoreMessage(e8, r6) {
          delete this.outgoing[e8], this.outgoingStore.del({ messageId: e8 }, (n6, i6) => {
            r6(n6, i6), this.messageIdProvider.deallocate(e8), this._invokeStoreProcessingQueue();
          });
        }
      }, __publicField(_a, "VERSION", bi.MQTTJS_VERSION), _a);
      yt.default = Wu;
    });
    Ng = D((Hu) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(Hu, "__esModule", { value: true });
      var YA = wu(), $u = class {
        constructor() {
          __publicField(this, "numberAllocator");
          __publicField(this, "lastId");
          this.numberAllocator = new YA.NumberAllocator(1, 65535);
        }
        allocate() {
          return this.lastId = this.numberAllocator.alloc(), this.lastId;
        }
        getLastAllocated() {
          return this.lastId;
        }
        register(e8) {
          return this.numberAllocator.use(e8);
        }
        deallocate(e8) {
          this.numberAllocator.free(e8);
        }
        clear() {
          this.numberAllocator.clear();
        }
      };
      Hu.default = $u;
    });
    Lg = ze(() => {
      A2();
      x2();
      I2();
      Vu = {}, qg = false;
      hr = JA(), w5 = hr.decode, m5 = hr.encode, _5 = hr.toASCII, v5 = hr.toUnicode, S5 = hr.ucs2, E5 = hr.version;
    });
    ub = ze(() => {
      A2();
      x2();
      I2();
      Gu = {}, Ug = false;
      zu = {}, Dg = false;
      Ku = {}, jg = false;
      Qu = {}, Fg = false;
      Yu = {}, Wg = false;
      Ju = {}, $g = false;
      Xu = {}, Hg = false;
      Zu = {}, Vg = false;
      el = {}, Gg = false;
      tl = {}, zg = false;
      rl = {}, Kg = false;
      nl = {}, Qg = false;
      il = {}, Yg = false;
      ol = {}, Jg = false;
      sl = {}, Xg = false;
      al = {}, Zg = false;
      ul = {}, eb = false;
      ll = {}, tb = false;
      cl = {}, rb = false;
      wi = {}, nb = false;
      fl = {}, ib = false;
    });
    _l = ze(() => {
      A2();
      x2();
      I2();
      zt = [], En = false, Ko = -1;
      cb.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      pI = "browser", yI = "x64", gI = "browser", bI = { PATH: "/usr/bin", LANG: navigator.language + ".UTF-8", PWD: "/", HOME: "/home", TMP: "/tmp" }, wI = ["/usr/bin/node"], mI = [], _I = "v16.8.0", vI = {}, SI = function(t5, e8) {
        console.warn((e8 ? e8 + ": " : "") + t5);
      }, EI = function(t5) {
        bl("binding");
      }, AI = function(t5) {
        return 0;
      }, II = function() {
        return "/";
      }, xI = function(t5) {
      }, TI = { name: "node", sourceUrl: "", headersUrl: "", libUrl: "" };
      PI = We, OI = [];
      kI = {}, CI = false, BI = {};
      LI = We, UI = We, wl = function() {
        return {};
      }, DI = wl, jI = wl, FI = We, WI = We, $I = We, HI = {};
      GI = { inspector: false, debug: false, uv: false, ipv6: false, tls_alpn: false, tls_sni: false, tls_ocsp: false, tls: false, cached_builtins: true }, zI = We, KI = We;
      YI = We, JI = We, XI = We, ZI = We, ex = We, tx = void 0, rx = void 0, nx = void 0, ix = We, ox = 2, sx = 1, ax = "/bin/usr/node", ux = 9229, lx = "node", cx = [], fx = We, dr = { now: typeof performance < "u" ? performance.now.bind(performance) : void 0, timing: typeof performance < "u" ? performance.timing : void 0 };
      dr.now === void 0 && (pl = Date.now(), dr.timing && dr.timing.navigationStart && (pl = dr.timing.navigationStart), dr.now = () => Date.now() - pl);
      yl = 1e9;
      gl.bigint = function(t5) {
        var e8 = gl(t5);
        return typeof BigInt > "u" ? e8[0] * yl + e8[1] : BigInt(e8[0] * yl) + BigInt(e8[1]);
      };
      dx = 10, px = {}, yx = 0;
      gx = pr, bx = pr, mx = pr, _x = pr, vx = pr, Sx = We, Ex = pr, Ax = pr;
      ml = { version: _I, versions: vI, arch: yI, platform: gI, release: TI, _rawDebug: PI, moduleLoadList: OI, binding: EI, _linkedBinding: RI, _events: px, _eventsCount: yx, _maxListeners: dx, on: pr, addListener: gx, once: bx, off: mx, removeListener: _x, removeAllListeners: vx, emit: Sx, prependListener: Ex, prependOnceListener: Ax, listeners: Ix, domain: kI, _exiting: CI, config: BI, dlopen: MI, uptime: hx, _getActiveRequests: NI, _getActiveHandles: qI, reallyExit: LI, _kill: UI, cpuUsage: wl, resourceUsage: DI, memoryUsage: jI, kill: FI, exit: WI, openStdin: $I, allowedNodeEnvironmentFlags: HI, assert: VI, features: GI, _fatalExceptions: zI, setUncaughtExceptionCaptureCallback: KI, hasUncaughtExceptionCaptureCallback: QI, emitWarning: SI, nextTick: dI, _tickCallback: YI, _debugProcess: JI, _debugEnd: XI, _startProfilerIdleNotifier: ZI, _stopProfilerIdleNotifier: ex, stdout: tx, stdin: nx, stderr: rx, abort: ix, umask: AI, chdir: xI, cwd: II, env: bI, title: pI, argv: wI, execArgv: mI, pid: ox, ppid: sx, execPath: ax, debugPort: ux, hrtime: gl, argv0: lx, _preload_modules: cx, setSourceMapsEnabled: fx };
    });
    hb = ze(() => {
      A2();
      x2();
      I2();
      _l();
      vl = {}, fb = false;
      Sl = xx();
    });
    Ab = {};
    Kr(Ab, { URL: () => jx, Url: () => Nx, default: () => Ge, fileURLToPath: () => Sb, format: () => qx, parse: () => Dx, pathToFileURL: () => Eb, resolve: () => Lx, resolveObject: () => Ux });
    Ib = ze(() => {
      A2();
      x2();
      I2();
      Lg();
      ub();
      hb();
      _l();
      Tx = Object.freeze(/* @__PURE__ */ Object.create(null)), El = {}, db = false, Al = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : global;
      Il = {}, pb = false;
      xl = {}, yb = false;
      Tl = {}, gb = false;
      Pl = {}, bb = false;
      Ol = {}, wb = false;
      Rl = {}, mb = false;
      Hr = {}, _b = false;
      Ge = Bx();
      Ge.parse;
      Ge.resolve;
      Ge.resolveObject;
      Ge.format;
      Ge.Url;
      Mx = typeof Deno < "u" ? Deno.build.os === "windows" ? "win32" : Deno.build.os : void 0;
      Ge.URL = typeof URL < "u" ? URL : null;
      Ge.pathToFileURL = Eb;
      Ge.fileURLToPath = Sb;
      Nx = Ge.Url, qx = Ge.format, Lx = Ge.resolve, Ux = Ge.resolveObject, Dx = Ge.parse, jx = Ge.URL, Fx = 92, Wx = 47, $x = 97, Hx = 122, kl = Mx === "win32", Vx = /\//g, Gx = /%/g, zx = /\\/g, Kx = /\n/g, Qx = /\r/g, Yx = /\t/g;
    });
    Tb = D((A9, xb) => {
      "use strict";
      A2();
      x2();
      I2();
      xb.exports = function() {
        throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object");
      };
    });
    Qo = D((mi) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(mi, "__esModule", { value: true });
      mi.BufferedDuplex = void 0;
      mi.writev = Ob;
      var Zx = or(), Pb = (ke(), me(qe));
      function Ob(t5, e8) {
        let r6 = new Array(t5.length);
        for (let n6 = 0; n6 < t5.length; n6++) typeof t5[n6].chunk == "string" ? r6[n6] = Pb.Buffer.from(t5[n6].chunk, "utf8") : r6[n6] = t5[n6].chunk;
        this._write(Pb.Buffer.concat(r6), "binary", e8);
      }
      var Bl = class extends Zx.Duplex {
        constructor(e8, r6, n6) {
          super({ objectMode: true });
          __publicField(this, "socket");
          __publicField(this, "proxy");
          __publicField(this, "isSocketOpen");
          __publicField(this, "writeQueue");
          this.proxy = r6, this.socket = n6, this.writeQueue = [], e8.objectMode || (this._writev = Ob.bind(this)), this.isSocketOpen = false, this.proxy.on("data", (i6) => {
            !this.destroyed && this.readable && this.push(i6);
          });
        }
        _read(e8) {
          this.proxy.read(e8);
        }
        _write(e8, r6, n6) {
          this.isSocketOpen ? this.writeToProxy(e8, r6, n6) : this.writeQueue.push({ chunk: e8, encoding: r6, cb: n6 });
        }
        _final(e8) {
          this.writeQueue = [], this.proxy.end(e8);
        }
        _destroy(e8, r6) {
          this.writeQueue = [], this.proxy.destroy(), r6(e8);
        }
        socketReady() {
          this.emit("connect"), this.isSocketOpen = true, this.processWriteQueue();
        }
        writeToProxy(e8, r6, n6) {
          this.proxy.write(e8, r6) === false ? this.proxy.once("drain", n6) : n6();
        }
        processWriteQueue() {
          for (; this.writeQueue.length > 0; ) {
            let { chunk: e8, encoding: r6, cb: n6 } = this.writeQueue.shift();
            this.writeToProxy(e8, r6, n6);
          }
        }
      };
      mi.BufferedDuplex = Bl;
    });
    _i = D((gr) => {
      "use strict";
      A2();
      x2();
      I2();
      var Nl = gr && gr.__importDefault || function(t5) {
        return t5 && t5.__esModule ? t5 : { default: t5 };
      };
      Object.defineProperty(gr, "__esModule", { value: true });
      gr.streamBuilder = gr.browserStreamBuilder = void 0;
      var Yo = (ke(), me(qe)), Rb = Nl(Tb()), eT = Nl(At()), tT = or(), rT = Nl(yi()), Ml = Qo(), yr = (0, eT.default)("mqttjs:ws"), nT = ["rejectUnauthorized", "ca", "cert", "key", "pfx", "passphrase"];
      function kb(t5, e8) {
        let r6 = `${t5.protocol}://${t5.hostname}:${t5.port}${t5.path}`;
        return typeof t5.transformWsUrl == "function" && (r6 = t5.transformWsUrl(r6, t5, e8)), r6;
      }
      function Cb(t5) {
        let e8 = t5;
        return t5.port || (t5.protocol === "wss" ? e8.port = 443 : e8.port = 80), t5.path || (e8.path = "/"), t5.wsOptions || (e8.wsOptions = {}), !rT.default && !t5.forceNativeWebSocket && t5.protocol === "wss" && nT.forEach((r6) => {
          Object.prototype.hasOwnProperty.call(t5, r6) && !Object.prototype.hasOwnProperty.call(t5.wsOptions, r6) && (e8.wsOptions[r6] = t5[r6]);
        }), e8;
      }
      function iT(t5) {
        let e8 = Cb(t5);
        if (e8.hostname || (e8.hostname = e8.host), !e8.hostname) {
          if (typeof document > "u") throw new Error("Could not determine host. Specify host manually.");
          let r6 = new URL(document.URL);
          e8.hostname = r6.hostname, e8.port || (e8.port = Number(r6.port));
        }
        return e8.objectMode === void 0 && (e8.objectMode = !(e8.binary === true || e8.binary === void 0)), e8;
      }
      function oT(t5, e8, r6) {
        yr("createWebSocket"), yr(`protocol: ${r6.protocolId} ${r6.protocolVersion}`);
        let n6 = r6.protocolId === "MQIsdp" && r6.protocolVersion === 3 ? "mqttv3.1" : "mqtt";
        yr(`creating new Websocket for url: ${e8} and protocol: ${n6}`);
        let i6;
        return r6.createWebsocket ? i6 = r6.createWebsocket(e8, [n6], r6) : i6 = new Rb.default(e8, [n6], r6.wsOptions), i6;
      }
      function sT(t5, e8) {
        let r6 = e8.protocolId === "MQIsdp" && e8.protocolVersion === 3 ? "mqttv3.1" : "mqtt", n6 = kb(e8, t5), i6;
        return e8.createWebsocket ? i6 = e8.createWebsocket(n6, [r6], e8) : i6 = new WebSocket(n6, [r6]), i6.binaryType = "arraybuffer", i6;
      }
      var aT = (t5, e8) => {
        yr("streamBuilder");
        let r6 = Cb(e8);
        r6.hostname = r6.hostname || r6.host || "localhost";
        let n6 = kb(r6, t5), i6 = oT(t5, n6, r6), s7 = Rb.default.createWebSocketStream(i6, r6.wsOptions);
        return s7.url = n6, i6.on("close", () => {
          s7.destroy();
        }), s7;
      };
      gr.streamBuilder = aT;
      var uT = (t5, e8) => {
        yr("browserStreamBuilder");
        let r6, i6 = iT(e8).browserBufferSize || 1024 * 512, s7 = e8.browserBufferTimeout || 1e3, o6 = !e8.objectMode, a3 = sT(t5, e8), c5 = h3(e8, E2, b3);
        e8.objectMode || (c5._writev = Ml.writev.bind(c5)), c5.on("close", () => {
          a3.close();
        });
        let f3 = typeof a3.addEventListener < "u";
        a3.readyState === a3.OPEN ? (r6 = c5, r6.socket = a3) : (r6 = new Ml.BufferedDuplex(e8, c5, a3), f3 ? a3.addEventListener("open", d3) : a3.onopen = d3), f3 ? (a3.addEventListener("close", w2), a3.addEventListener("error", y3), a3.addEventListener("message", P2)) : (a3.onclose = w2, a3.onerror = y3, a3.onmessage = P2);
        function h3(m2, v2, R2) {
          let T2 = new tT.Transform({ objectMode: m2.objectMode });
          return T2._write = v2, T2._flush = R2, T2;
        }
        function d3() {
          yr("WebSocket onOpen"), r6 instanceof Ml.BufferedDuplex && r6.socketReady();
        }
        function w2(m2) {
          yr("WebSocket onClose", m2), r6.end(), r6.destroy();
        }
        function y3(m2) {
          yr("WebSocket onError", m2);
          let v2 = new Error("WebSocket error");
          v2.event = m2, r6.destroy(v2);
        }
        async function P2(m2) {
          if (!c5 || c5.destroyed || !c5.readable) return;
          let { data: v2 } = m2;
          v2 instanceof ArrayBuffer ? v2 = Yo.Buffer.from(v2) : v2 instanceof Blob ? v2 = Yo.Buffer.from(await new Response(v2).arrayBuffer()) : v2 = Yo.Buffer.from(v2, "utf8"), c5.push(v2);
        }
        function E2(m2, v2, R2) {
          if (a3.bufferedAmount > i6) {
            setTimeout(E2, s7, m2, v2, R2);
            return;
          }
          o6 && typeof m2 == "string" && (m2 = Yo.Buffer.from(m2, "utf8"));
          try {
            a3.send(m2);
          } catch (T2) {
            return R2(T2);
          }
          R2();
        }
        function b3(m2) {
          a3.close(), m2();
        }
        return r6;
      };
      gr.browserStreamBuilder = uT;
    });
    ql = {};
    Kr(ql, { Server: () => Je, Socket: () => Je, Stream: () => Je, _createServerHandle: () => Je, _normalizeArgs: () => Je, _setSimultaneousAccepts: () => Je, connect: () => Je, createConnection: () => Je, createServer: () => Je, default: () => lT, isIP: () => Je, isIPv4: () => Je, isIPv6: () => Je });
    Ll = ze(() => {
      A2();
      x2();
      I2();
      lT = { _createServerHandle: Je, _normalizeArgs: Je, _setSimultaneousAccepts: Je, connect: Je, createConnection: Je, createServer: Je, isIP: Je, isIPv4: Je, isIPv6: Je, Server: Je, Socket: Je, Stream: Je };
    });
    Ul = D((lH, Bb) => {
      A2();
      x2();
      I2();
      Bb.exports = {};
    });
    jl = D((vi) => {
      "use strict";
      A2();
      x2();
      I2();
      var Dl = vi && vi.__importDefault || function(t5) {
        return t5 && t5.__esModule ? t5 : { default: t5 };
      };
      Object.defineProperty(vi, "__esModule", { value: true });
      var cT = Dl((Ll(), me(ql))), fT = Dl(At()), hT = Dl(Ul()), dT = (0, fT.default)("mqttjs:tcp"), pT = (t5, e8) => {
        if (e8.port = e8.port || 1883, e8.hostname = e8.hostname || e8.host || "localhost", e8.socksProxy) return (0, hT.default)(e8.hostname, e8.port, e8.socksProxy, { timeout: e8.socksTimeout });
        let { port: r6, path: n6 } = e8, i6 = e8.hostname;
        return dT("port %d and host %s", r6, i6), cT.default.createConnection({ port: r6, host: i6, path: n6 });
      };
      vi.default = pT;
    });
    Mb = {};
    Kr(Mb, { default: () => yT });
    Nb = ze(() => {
      A2();
      x2();
      I2();
      yT = {};
    });
    Wl = D((Si) => {
      "use strict";
      A2();
      x2();
      I2();
      var Fl = Si && Si.__importDefault || function(t5) {
        return t5 && t5.__esModule ? t5 : { default: t5 };
      };
      Object.defineProperty(Si, "__esModule", { value: true });
      var qb = (Nb(), me(Mb)), gT = Fl((Ll(), me(ql))), bT = Fl(At()), wT = Fl(Ul()), mT = (0, bT.default)("mqttjs:tls");
      function _T(t5) {
        let { host: e8, port: r6, socksProxy: n6, ...i6 } = t5;
        if (n6 !== void 0) {
          let s7 = (0, wT.default)(e8, r6, n6, { timeout: t5.socksTimeout });
          return (0, qb.connect)({ ...i6, socket: s7 });
        }
        return (0, qb.connect)(t5);
      }
      var vT = (t5, e8) => {
        e8.port = e8.port || 8883, e8.host = e8.hostname || e8.host || "localhost", gT.default.isIP(e8.host) === 0 && (e8.servername = e8.host), e8.rejectUnauthorized = e8.rejectUnauthorized !== false, delete e8.path, mT("port %d host %s rejectUnauthorized %b", e8.port, e8.host, e8.rejectUnauthorized);
        let r6 = _T(e8);
        r6.on("secureConnect", () => {
          e8.rejectUnauthorized && !r6.authorized ? r6.emit("error", new Error("TLS not authorized")) : r6.removeListener("error", n6);
        });
        function n6(i6) {
          e8.rejectUnauthorized && t5.emit("error", i6), r6.end();
        }
        return r6.on("error", n6), r6;
      };
      Si.default = vT;
    });
    Vl = D((Hl) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(Hl, "__esModule", { value: true });
      var Lb = (ke(), me(qe)), ST = or(), ET = Qo(), kt, $l, Xe;
      function AT() {
        let t5 = new ST.Transform();
        return t5._write = (e8, r6, n6) => {
          kt.send({ data: e8.buffer, success() {
            n6();
          }, fail(i6) {
            n6(new Error(i6));
          } });
        }, t5._flush = (e8) => {
          kt.close({ success() {
            e8();
          } });
        }, t5;
      }
      function IT(t5) {
        t5.hostname || (t5.hostname = "localhost"), t5.path || (t5.path = "/"), t5.wsOptions || (t5.wsOptions = {});
      }
      function xT(t5, e8) {
        let r6 = t5.protocol === "wxs" ? "wss" : "ws", n6 = `${r6}://${t5.hostname}${t5.path}`;
        return t5.port && t5.port !== 80 && t5.port !== 443 && (n6 = `${r6}://${t5.hostname}:${t5.port}${t5.path}`), typeof t5.transformWsUrl == "function" && (n6 = t5.transformWsUrl(n6, t5, e8)), n6;
      }
      function TT() {
        kt.onOpen(() => {
          Xe.socketReady();
        }), kt.onMessage((t5) => {
          let { data: e8 } = t5;
          e8 instanceof ArrayBuffer ? e8 = Lb.Buffer.from(e8) : e8 = Lb.Buffer.from(e8, "utf8"), $l.push(e8);
        }), kt.onClose(() => {
          Xe.emit("close"), Xe.end(), Xe.destroy();
        }), kt.onError((t5) => {
          let e8 = new Error(t5.errMsg);
          Xe.destroy(e8);
        });
      }
      var PT = (t5, e8) => {
        if (e8.hostname = e8.hostname || e8.host, !e8.hostname) throw new Error("Could not determine host. Specify host manually.");
        let r6 = e8.protocolId === "MQIsdp" && e8.protocolVersion === 3 ? "mqttv3.1" : "mqtt";
        IT(e8);
        let n6 = xT(e8, t5);
        kt = wx.connectSocket({ url: n6, protocols: [r6] }), $l = AT(), Xe = new ET.BufferedDuplex(e8, $l, kt), Xe._destroy = (s7, o6) => {
          kt.close({ success() {
            o6 && o6(s7);
          } });
        };
        let i6 = Xe.destroy;
        return Xe.destroy = (s7, o6) => (Xe.destroy = i6, setTimeout(() => {
          kt.close({ fail() {
            Xe._destroy(s7, o6);
          } });
        }, 0), Xe), TT(), Xe;
      };
      Hl.default = PT;
    });
    Kl = D((zl) => {
      "use strict";
      A2();
      x2();
      I2();
      Object.defineProperty(zl, "__esModule", { value: true });
      var Gl = (ke(), me(qe)), OT = or(), RT = Qo(), Kt, Ei, An, Ub = false;
      function kT() {
        let t5 = new OT.Transform();
        return t5._write = (e8, r6, n6) => {
          Kt.sendSocketMessage({ data: e8.buffer, success() {
            n6();
          }, fail() {
            n6(new Error());
          } });
        }, t5._flush = (e8) => {
          Kt.closeSocket({ success() {
            e8();
          } });
        }, t5;
      }
      function CT(t5) {
        t5.hostname || (t5.hostname = "localhost"), t5.path || (t5.path = "/"), t5.wsOptions || (t5.wsOptions = {});
      }
      function BT(t5, e8) {
        let r6 = t5.protocol === "alis" ? "wss" : "ws", n6 = `${r6}://${t5.hostname}${t5.path}`;
        return t5.port && t5.port !== 80 && t5.port !== 443 && (n6 = `${r6}://${t5.hostname}:${t5.port}${t5.path}`), typeof t5.transformWsUrl == "function" && (n6 = t5.transformWsUrl(n6, t5, e8)), n6;
      }
      function MT() {
        Ub || (Ub = true, Kt.onSocketOpen(() => {
          An.socketReady();
        }), Kt.onSocketMessage((t5) => {
          if (typeof t5.data == "string") {
            let e8 = Gl.Buffer.from(t5.data, "base64");
            Ei.push(e8);
          } else {
            let e8 = new FileReader();
            e8.addEventListener("load", () => {
              if (e8.result instanceof ArrayBuffer) {
                Ei.push(Gl.Buffer.from(e8.result));
                return;
              }
              Ei.push(Gl.Buffer.from(e8.result, "utf-8"));
            }), e8.readAsArrayBuffer(t5.data);
          }
        }), Kt.onSocketClose(() => {
          An.end(), An.destroy();
        }), Kt.onSocketError((t5) => {
          An.destroy(t5);
        }));
      }
      var NT = (t5, e8) => {
        if (e8.hostname = e8.hostname || e8.host, !e8.hostname) throw new Error("Could not determine host. Specify host manually.");
        let r6 = e8.protocolId === "MQIsdp" && e8.protocolVersion === 3 ? "mqttv3.1" : "mqtt";
        CT(e8);
        let n6 = BT(e8, t5);
        return Kt = e8.my, Kt.connectSocket({ url: n6, protocols: r6 }), Ei = kT(), An = new RT.BufferedDuplex(e8, Ei, Kt), MT(), An;
      };
      zl.default = NT;
    });
    Wb = D((In) => {
      "use strict";
      A2();
      x2();
      I2();
      var Jo = In && In.__importDefault || function(t5) {
        return t5 && t5.__esModule ? t5 : { default: t5 };
      };
      Object.defineProperty(In, "__esModule", { value: true });
      In.connectAsync = jT;
      var qT = Jo(At()), LT = Jo((Ib(), me(Ab))), UT = Jo(zo()), Db = Jo(yi());
      typeof M2?.nextTick != "function" && (M2.nextTick = setImmediate);
      var jb = (0, qT.default)("mqttjs"), Me = null;
      function DT(t5) {
        let e8;
        if (t5.auth) if (e8 = t5.auth.match(/^(.+):(.+)$/), e8) {
          let [, r6, n6] = e8;
          t5.username = r6, t5.password = n6;
        } else t5.username = t5.auth;
      }
      function Fb(t5, e8) {
        if (jb("connecting to an MQTT broker..."), typeof t5 == "object" && !e8 && (e8 = t5, t5 = ""), e8 = e8 || {}, t5 && typeof t5 == "string") {
          let i6 = LT.default.parse(t5, true), s7 = {};
          if (i6.port != null && (s7.port = Number(i6.port)), s7.host = i6.hostname, s7.query = i6.query, s7.auth = i6.auth, s7.protocol = i6.protocol, s7.path = i6.path, e8 = { ...s7, ...e8 }, !e8.protocol) throw new Error("Missing protocol");
          e8.protocol = e8.protocol.replace(/:$/, "");
        }
        if (e8.unixSocket = e8.unixSocket || e8.protocol?.includes("+unix"), e8.unixSocket ? e8.protocol = e8.protocol.replace("+unix", "") : !e8.protocol?.startsWith("ws") && !e8.protocol?.startsWith("wx") && delete e8.path, DT(e8), e8.query && typeof e8.query.clientId == "string" && (e8.clientId = e8.query.clientId), Db.default || e8.unixSocket ? e8.socksProxy = void 0 : e8.socksProxy === void 0 && typeof M2 < "u" && (e8.socksProxy = M2.env.MQTTJS_SOCKS_PROXY), e8.cert && e8.key) if (e8.protocol) {
          if (["mqtts", "wss", "wxs", "alis"].indexOf(e8.protocol) === -1) switch (e8.protocol) {
            case "mqtt":
              e8.protocol = "mqtts";
              break;
            case "ws":
              e8.protocol = "wss";
              break;
            case "wx":
              e8.protocol = "wxs";
              break;
            case "ali":
              e8.protocol = "alis";
              break;
            default:
              throw new Error(`Unknown protocol for secure connection: "${e8.protocol}"!`);
          }
        } else throw new Error("Missing secure protocol key");
        if (Me || (Me = {}, !Db.default && !e8.forceNativeWebSocket ? (Me.ws = _i().streamBuilder, Me.wss = _i().streamBuilder, Me.mqtt = jl().default, Me.tcp = jl().default, Me.ssl = Wl().default, Me.tls = Me.ssl, Me.mqtts = Wl().default) : (Me.ws = _i().browserStreamBuilder, Me.wss = _i().browserStreamBuilder, Me.wx = Vl().default, Me.wxs = Vl().default, Me.ali = Kl().default, Me.alis = Kl().default)), !Me[e8.protocol]) {
          let i6 = ["mqtts", "wss"].indexOf(e8.protocol) !== -1;
          e8.protocol = ["mqtt", "mqtts", "ws", "wss", "wx", "wxs", "ali", "alis"].filter((s7, o6) => i6 && o6 % 2 === 0 ? false : typeof Me[s7] == "function")[0];
        }
        if (e8.clean === false && !e8.clientId) throw new Error("Missing clientId for unclean clients");
        e8.protocol && (e8.defaultProtocol = e8.protocol);
        function r6(i6) {
          return e8.servers && ((!i6._reconnectCount || i6._reconnectCount === e8.servers.length) && (i6._reconnectCount = 0), e8.host = e8.servers[i6._reconnectCount].host, e8.port = e8.servers[i6._reconnectCount].port, e8.protocol = e8.servers[i6._reconnectCount].protocol ? e8.servers[i6._reconnectCount].protocol : e8.defaultProtocol, e8.hostname = e8.host, i6._reconnectCount++), jb("calling streambuilder for", e8.protocol), Me[e8.protocol](i6, e8);
        }
        let n6 = new UT.default(r6, e8);
        return n6.on("error", () => {
        }), n6;
      }
      function jT(t5, e8, r6 = true) {
        return new Promise((n6, i6) => {
          let s7 = Fb(t5, e8), o6 = { connect: (c5) => {
            a3(), n6(s7);
          }, end: () => {
            a3(), n6(s7);
          }, error: (c5) => {
            a3(), s7.end(), i6(c5);
          } };
          r6 === false && (o6.close = () => {
            o6.error(new Error("Couldn't connect to server"));
          });
          function a3() {
            Object.keys(o6).forEach((c5) => {
              s7.off(c5, o6[c5]);
            });
          }
          Object.keys(o6).forEach((c5) => {
            s7.on(c5, o6[c5]);
          });
        });
      }
      In.default = Fb;
    });
    Ql = D((we) => {
      "use strict";
      A2();
      x2();
      I2();
      var $b = we && we.__createBinding || (Object.create ? function(t5, e8, r6, n6) {
        n6 === void 0 && (n6 = r6);
        var i6 = Object.getOwnPropertyDescriptor(e8, r6);
        (!i6 || ("get" in i6 ? !e8.__esModule : i6.writable || i6.configurable)) && (i6 = { enumerable: true, get: function() {
          return e8[r6];
        } }), Object.defineProperty(t5, n6, i6);
      } : function(t5, e8, r6, n6) {
        n6 === void 0 && (n6 = r6), t5[n6] = e8[r6];
      }), FT = we && we.__setModuleDefault || (Object.create ? function(t5, e8) {
        Object.defineProperty(t5, "default", { enumerable: true, value: e8 });
      } : function(t5, e8) {
        t5.default = e8;
      }), WT = we && we.__importStar || /* @__PURE__ */ (function() {
        var t5 = function(e8) {
          return t5 = Object.getOwnPropertyNames || function(r6) {
            var n6 = [];
            for (var i6 in r6) Object.prototype.hasOwnProperty.call(r6, i6) && (n6[n6.length] = i6);
            return n6;
          }, t5(e8);
        };
        return function(e8) {
          if (e8 && e8.__esModule) return e8;
          var r6 = {};
          if (e8 != null) for (var n6 = t5(e8), i6 = 0; i6 < n6.length; i6++) n6[i6] !== "default" && $b(r6, e8, n6[i6]);
          return FT(r6, e8), r6;
        };
      })(), Hb = we && we.__exportStar || function(t5, e8) {
        for (var r6 in t5) r6 !== "default" && !Object.prototype.hasOwnProperty.call(e8, r6) && $b(e8, t5, r6);
      }, Ai = we && we.__importDefault || function(t5) {
        return t5 && t5.__esModule ? t5 : { default: t5 };
      };
      Object.defineProperty(we, "__esModule", { value: true });
      we.ReasonCodes = we.KeepaliveManager = we.UniqueMessageIdProvider = we.DefaultMessageIdProvider = we.Store = we.MqttClient = we.connectAsync = we.connect = we.Client = void 0;
      var Vb = Ai(zo());
      we.MqttClient = Vb.default;
      var $T = Ai(Au());
      we.DefaultMessageIdProvider = $T.default;
      var HT = Ai(Ng());
      we.UniqueMessageIdProvider = HT.default;
      var VT = Ai(La());
      we.Store = VT.default;
      var Gb = WT(Wb());
      we.connect = Gb.default;
      Object.defineProperty(we, "connectAsync", { enumerable: true, get: function() {
        return Gb.connectAsync;
      } });
      var GT = Ai(Du());
      we.KeepaliveManager = GT.default;
      we.Client = Vb.default;
      Hb(zo(), we);
      Hb(Mr(), we);
      var zT = zn();
      Object.defineProperty(we, "ReasonCodes", { enumerable: true, get: function() {
        return zT.ReasonCodes;
      } });
    });
    XT = D((ot) => {
      A2();
      x2();
      I2();
      var zb = ot && ot.__createBinding || (Object.create ? function(t5, e8, r6, n6) {
        n6 === void 0 && (n6 = r6);
        var i6 = Object.getOwnPropertyDescriptor(e8, r6);
        (!i6 || ("get" in i6 ? !e8.__esModule : i6.writable || i6.configurable)) && (i6 = { enumerable: true, get: function() {
          return e8[r6];
        } }), Object.defineProperty(t5, n6, i6);
      } : function(t5, e8, r6, n6) {
        n6 === void 0 && (n6 = r6), t5[n6] = e8[r6];
      }), KT = ot && ot.__setModuleDefault || (Object.create ? function(t5, e8) {
        Object.defineProperty(t5, "default", { enumerable: true, value: e8 });
      } : function(t5, e8) {
        t5.default = e8;
      }), QT = ot && ot.__importStar || /* @__PURE__ */ (function() {
        var t5 = function(e8) {
          return t5 = Object.getOwnPropertyNames || function(r6) {
            var n6 = [];
            for (var i6 in r6) Object.prototype.hasOwnProperty.call(r6, i6) && (n6[n6.length] = i6);
            return n6;
          }, t5(e8);
        };
        return function(e8) {
          if (e8 && e8.__esModule) return e8;
          var r6 = {};
          if (e8 != null) for (var n6 = t5(e8), i6 = 0; i6 < n6.length; i6++) n6[i6] !== "default" && zb(r6, e8, n6[i6]);
          return KT(r6, e8), r6;
        };
      })(), YT = ot && ot.__exportStar || function(t5, e8) {
        for (var r6 in t5) r6 !== "default" && !Object.prototype.hasOwnProperty.call(e8, r6) && zb(e8, t5, r6);
      };
      Object.defineProperty(ot, "__esModule", { value: true });
      var JT = QT(Ql());
      ot.default = JT;
      YT(Ql(), ot);
    });
    mqtt_esm_default = XT();
  }
});

// src/services/mqtt-service.ts
var MQTT_BROKER_URL, TOPIC_PREFIX, MqttService, mqttService;
var init_mqtt_service = __esm({
  "src/services/mqtt-service.ts"() {
    "use strict";
    init_mqtt_esm();
    MQTT_BROKER_URL = "ws://localhost:9001";
    TOPIC_PREFIX = "taniverse/devices";
    MqttService = class {
      constructor() {
        this.client = null;
        this.messageHandlers = /* @__PURE__ */ new Set();
        this.connectHandlers = /* @__PURE__ */ new Set();
        this.disconnectHandlers = /* @__PURE__ */ new Set();
        this.ready = false;
      }
      async connect() {
        if (this.ready) return;
        return new Promise((resolve, reject) => {
          this.client = mqtt_esm_default.connect(MQTT_BROKER_URL, {
            clean: true,
            reconnectPeriod: 2e3
          });
          this.client.on("connect", () => {
            this.ready = true;
            console.log("[mqttService] \u2705 Connected");
            this.connectHandlers.forEach((cb2) => cb2());
            resolve();
          });
          this.client.on("reconnect", () => {
            console.warn("[mqttService] \u{1F501} Reconnecting...");
          });
          this.client.on("close", () => {
            this.ready = false;
            console.warn("[mqttService] \u274C Disconnected");
            this.disconnectHandlers.forEach((cb2) => cb2());
          });
          this.client.on("message", (topic, payload) => {
            const msg = new TextDecoder().decode(payload).trim();
            this.messageHandlers.forEach((cb2) => cb2(topic, msg));
          });
          this.client.on("error", (err) => {
            console.error("[mqttService] \u274C Connection error:", err);
            reject(err);
          });
        });
      }
      isReady() {
        return this.ready;
      }
      publish(topic, message) {
        if (!this.ready || !this.client) return;
        this.client.publish(topic, message);
      }
      subscribeTopic(topic) {
        this.client?.subscribe(topic, {}, (err) => {
          if (err) console.error(`[mqttService] \u274C Gagal subscribe: ${topic}`, err);
          else console.log(`[mqttService] \u{1F4E1} Subscribed to ${topic}`);
        });
      }
      unsubscribeTopic(topic) {
        this.client?.unsubscribe(topic, {}, (err) => {
          if (err)
            console.error(`[mqttService] \u274C Gagal unsubscribe: ${topic}`, err);
          else console.log(`[mqttService] \u{1F6AB} Unsubscribed from ${topic}`);
        });
      }
      onMessage(handler) {
        this.messageHandlers.add(handler);
        return () => this.messageHandlers.delete(handler);
      }
      onConnect(cb2) {
        this.connectHandlers.add(cb2);
        return () => this.connectHandlers.delete(cb2);
      }
      onDisconnect(cb2) {
        this.disconnectHandlers.add(cb2);
        return () => this.disconnectHandlers.delete(cb2);
      }
    };
    mqttService = new MqttService();
  }
});

// src/services/devices-store.ts
function parseValue(s7) {
  if (/^-?\d+(\.\d+)?$/.test(s7)) return Number(s7);
  try {
    const o6 = JSON.parse(s7);
    if (typeof o6.value === "number") return o6.value;
  } catch {
  }
  return null;
}
function parseState(s7) {
  return s7.toUpperCase() === "ON" ? "ON" : "OFF";
}
var DevicesStore, devicesStore;
var init_devices_store = __esm({
  "src/services/devices-store.ts"() {
    "use strict";
    init_mqtt_service();
    init_mode();
    init_repository_factory();
    DevicesStore = class {
      constructor() {
        this.devices = /* @__PURE__ */ new Map();
        this.listeners = /* @__PURE__ */ new Set();
        this.ready = false;
        this.mqttClient = null;
        this.repo = getDeviceRepository();
      }
      // ===== INIT =====
      async init(force = false) {
        if (this.ready && !force) return;
        this.devices.clear();
        this.stopSimulation();
        const mode = getMode();
        await this.loadFromRepository();
        if (mode === "mqtt") {
          await this.connectMqtt();
        } else if (mode === "sim") {
          this.startSimulation();
        }
        this.ready = true;
        this.emit();
      }
      // ===== Load Data dari Repository (Mock/API/MQTT) =====
      async loadFromRepository() {
        try {
          const list = await this.repo.getAll();
          list.forEach((d3) => {
            this.updateStatus(d3);
            this.devices.set(d3.tagNumber, d3);
          });
        } catch (err) {
          console.error("[devicesStore] \u274C Gagal load data:", err);
        }
      }
      // ===== MQTT =====
      async connectMqtt() {
        if (isMockMode()) return;
        await mqttService.connect();
        mqttService.onMessage((topic, rawPayload) => {
          try {
            const msg = rawPayload.trim();
            const parts = topic.split("/");
            const tag = parts[2];
            const leaf = parts[3];
            const dev = this.devices.get(tag);
            if (!dev) return;
            if (dev.type === "sensor" && leaf === "value") {
              dev.value = parseValue(msg);
            } else if (dev.type === "actuator" && leaf === "state") {
              dev.state = parseState(msg);
            }
            this.updateStatus(dev);
            this.emit();
          } catch (err) {
            console.error("[devicesStore] \u274C Error parsing MQTT message:", err);
          }
        });
      }
      // ===== Simulasi (Sensor Random Value) =====
      startSimulation() {
        this.simulationInterval && clearInterval(this.simulationInterval);
        this.simulationInterval = window.setInterval(() => {
          this.devices.forEach((dev) => {
            if (dev.type === "sensor") {
              const low = dev.ranges?.low ?? 20;
              const high = dev.ranges?.high ?? 100;
              const mid = (low + high) / 2;
              const deviation = 0.05 * mid;
              const r6 = Math.random() * 2 - 1;
              const simulated = mid + r6 * deviation;
              dev.value = Number(simulated.toFixed(2));
              this.updateStatus(dev);
            }
          });
          this.emit();
        }, 2e3);
      }
      stopSimulation() {
        if (this.simulationInterval) {
          clearInterval(this.simulationInterval);
          this.simulationInterval = void 0;
        }
      }
      // ===== Status Logic =====
      updateStatus(dev) {
        const now = (/* @__PURE__ */ new Date()).toISOString();
        if (dev.type === "sensor") {
          const val = dev.value;
          const lo = dev.alarms?.low ?? null;
          const hi = dev.alarms?.high ?? null;
          const valueStatus = val === null || val === void 0 ? "sensor-fail" : lo !== null && val < lo ? "low-alarm" : hi !== null && val > hi ? "high-alarm" : "normal";
          dev.status = {
            mqtt: this.mqttClient ? "connected" : "disconnected",
            valueStatus,
            lastSeen: now
          };
        } else if (dev.type === "actuator") {
          dev.status = {
            mqtt: this.mqttClient ? "connected" : "disconnected",
            valueStatus: dev.state ? "normal" : "sensor-fail",
            lastSeen: now
          };
        } else {
          dev.status = {
            mqtt: "disconnected",
            valueStatus: "sensor-fail",
            lastSeen: now
          };
        }
      }
      // ===== Public API =====
      onChange(cb2) {
        this.listeners.add(cb2);
        return () => this.listeners.delete(cb2);
      }
      emit() {
        this.listeners.forEach((cb2) => cb2());
      }
      get(tag) {
        return this.devices.get(tag);
      }
      getAllTags() {
        return [...this.devices.keys()];
      }
      setActuatorState(tag, next) {
        const d3 = this.devices.get(tag);
        if (!d3 || d3.type !== "actuator") return;
        d3.state = next;
        this.emit();
        if (!isMockMode() && mqttService.isReady()) {
          mqttService.publish(`${TOPIC_PREFIX}/${tag}/set`, next);
        }
      }
      /** Untuk demo saat isMockMode() = true */
      setSensorValue(tag, value) {
        const d3 = this.devices.get(tag);
        if (d3 && d3.type === "sensor") {
          d3.value = value;
          this.updateStatus(d3);
          this.emit();
        }
      }
      getStatus(tag) {
        return this.devices.get(tag)?.status ?? {
          mqtt: "disconnected",
          valueStatus: "sensor-fail",
          lastSeen: void 0
        };
      }
      getMode() {
        return isMockMode() ? "mock" : "mqtt";
      }
      getSensorValue(tag) {
        const dev = this.devices.get(tag);
        return dev?.type === "sensor" ? dev.value ?? null : null;
      }
      getActuatorState(tag) {
        const dev = this.devices.get(tag);
        return dev?.type === "actuator" && (dev.state === "ON" || dev.state === "OFF") ? dev.state : "OFF";
      }
    };
    devicesStore = new DevicesStore();
  }
});

// src/components/cards/device-card.ts
var DeviceCard;
var init_device_card = __esm({
  "src/components/cards/device-card.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    DeviceCard = class extends i4 {
      constructor() {
        super(...arguments);
        this.openDetail = () => {
          const dlg = document.querySelector("device-dialog");
          dlg?.open?.(this.device.tagNumber);
        };
      }
      createRenderRoot() {
        return this;
      }
      getStatusClass(status) {
        switch (status) {
          case "normal":
            return "bg-green-100 text-green-700";
          case "low-alarm":
          case "high-alarm":
            return "bg-red-100 text-red-700";
          case "sensor-fail":
            return "bg-gray-100 text-gray-500";
          default:
            return "bg-yellow-100 text-yellow-800";
        }
      }
      render() {
        const {
          tagNumber,
          description,
          type,
          unit,
          display_precision,
          value,
          state,
          status
        } = this.device;
        const valueDisplay = type === "sensor" ? value !== void 0 ? `${value.toFixed(display_precision)} ${unit ?? ""}` : "--" : state ?? "--";
        const statusLabel = status.valueStatus ?? "unknown";
        const statusClass = this.getStatusClass(status.valueStatus);
        return x`
      <div
        class="p-4 rounded-xl shadow bg-gray-50 space-y-2 cursor-pointer hover:bg-gray-100 transition"
        @click=${this.openDetail}
      >
        <div class="text-lg font-semibold text-green-600">${tagNumber}</div>
        <div class="text-xs font-mono text-gray-800">${description}</div>
        <div class="text-sm text-gray-500 capitalize">${type}</div>

        <div class="text-xl font-bold">${valueDisplay}</div>

        <div
          class="text-xs px-2 py-1 rounded inline-block font-medium ${statusClass}"
        >
          Status: ${statusLabel}
        </div>
      </div>
    `;
      }
    };
    __decorateClass([
      n4({ type: Object })
    ], DeviceCard.prototype, "device", 2);
    DeviceCard = __decorateClass([
      t3("device-card")
    ], DeviceCard);
  }
});

// src/components/device-list.ts
var DeviceList;
var init_device_list = __esm({
  "src/components/device-list.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_device_service();
    init_devices_store();
    init_device_card();
    DeviceList = class extends i4 {
      constructor() {
        super(...arguments);
        this.devices = [];
      }
      createRenderRoot() {
        return this;
      }
      connectedCallback() {
        super.connectedCallback();
        devicesStore.onChange(() => {
          this.devices = this.devices.map((d3) => this.toView(d3));
          this.requestUpdate();
        });
        this.loadDevices();
      }
      async loadDevices() {
        const raw = await fetchAllDevices();
        this.devices = raw.map((dev) => this.toView(dev));
        this.requestUpdate();
      }
      toView(dev) {
        const live = devicesStore.get(dev.tagNumber);
        const status = live?.status ?? {
          mqtt: "disconnected",
          valueStatus: "sensor-fail",
          lastSeen: void 0
        };
        const value = live?.value ?? void 0;
        const state = live?.state ?? void 0;
        return {
          tagNumber: dev.tagNumber,
          description: dev.description,
          type: dev.type,
          unit: dev.unit,
          display_precision: dev.display_precision ?? 1,
          value,
          state,
          status
        };
      }
      render() {
        if (this.devices.length === 0) {
          return x`<div class="text-gray-500 text-sm">
        Tidak ada perangkat terdeteksi.
      </div>`;
        }
        return x`
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        ${this.devices.map(
          (device) => x`<device-card .device=${device}></device-card>`
        )}
      </div>
    `;
      }
    };
    __decorateClass([
      r5()
    ], DeviceList.prototype, "devices", 2);
    DeviceList = __decorateClass([
      t3("device-list")
    ], DeviceList);
  }
});

// src/context/mqtt-context.ts
function createMqttContext() {
  const mode = getMode();
  let mqttClient = null;
  let connected = false;
  let lastMessage = null;
  console.info("[mqttContext] \u{1F310} Creating context in mode:", mode);
  if (mode === "mqtt") {
    mqttClient = mqtt_esm_default.connect("ws://localhost:9001", {
      clean: true,
      reconnectPeriod: 2e3
    });
    mqttClient.on("connect", () => {
      connected = true;
      console.info("[mqtt] \u2705 Connected to broker");
    });
    mqttClient.on("close", () => {
      connected = false;
      console.warn("[mqtt] \u{1F50C} Connection closed");
    });
    mqttClient.on("error", (err) => {
      console.error("[mqtt] \u274C Error:", err);
    });
    mqttClient.on("message", (topic, payload) => {
      const msg = payload.toString().trim();
      lastMessage = { topic, payload: msg };
      console.debug("[mqtt] \u{1F4E9} Message received:", { topic, msg });
    });
  } else if (mode === "mock") {
    console.info("[mqttContext] \u{1F9EA} Running in MOCK mode");
  } else if (mode === "sim") {
    console.info("[mqttContext] \u{1F9EA} Running in SIMULATION mode");
  }
  function rotateMode(prev) {
    switch (prev) {
      case "mock":
        return "sim";
      case "sim":
        return "mqtt";
      case "mqtt":
      default:
        return "mock";
    }
  }
  return {
    mode,
    isConnected: connected,
    lastMessage,
    client: mqttClient,
    toggleMode() {
      const current = getMode();
      const next = rotateMode(current);
      console.warn(`[mqttContext] \u{1F501} Switching to: ${next}`);
      setMode(next);
      devicesStore.init();
      window.dispatchEvent(
        new CustomEvent(MQTT_CONTEXT_EVENT, {
          detail: createMqttContext()
        })
      );
    },
    setMode: (mode2) => {
      if (mode2 !== getMode()) {
        console.info(`[mqttContext] \u{1F527} setMode() to ${mode2}`);
        setMode(mode2);
        console.info("[mqttContext] \u{1F310} Mode changed to:", mode2);
        devicesStore.init(true);
        window.dispatchEvent(
          new CustomEvent("mqtt:context-updated", {
            detail: createMqttContext()
          })
        );
      }
    },
    publish(topic, payload) {
      if (mqttClient?.connected) {
        mqttClient.publish(topic, payload);
        console.info("[mqtt] \u{1F680} Published:", { topic, payload });
      } else {
        console.warn("[mqtt] \u274C Cannot publish \u2014 not connected");
      }
    }
  };
}
var mqttContext, MQTT_CONTEXT_EVENT;
var init_mqtt_context = __esm({
  "src/context/mqtt-context.ts"() {
    "use strict";
    init_context();
    init_mqtt_esm();
    init_mode();
    init_devices_store();
    mqttContext = n5("mqtt-context");
    MQTT_CONTEXT_EVENT = "mqtt:context-updated";
  }
});

// src/components/mode-selector.ts
var ModeSelector;
var init_mode_selector = __esm({
  "src/components/mode-selector.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_context();
    init_mqtt_context();
    ModeSelector = class extends i4 {
      constructor() {
        super(...arguments);
        this.saving = false;
      }
      createRenderRoot() {
        return this;
      }
      onChange(e8) {
        const value = e8.target.value;
        if (value !== this.mqttCtx?.mode) {
          console.info("[mode-selector] Mode changed to:", value);
          this.mqttCtx?.setMode?.(value);
        }
      }
      async onSaveClick() {
        this.dispatchEvent(
          new CustomEvent("save-db", {
            bubbles: true,
            composed: true
          })
        );
      }
      render() {
        return x`
      <div
        class="flex flex-wrap items-center gap-4 p-3 rounded-lg border bg-slate-50 text-sm"
      >
        <div class="flex items-center gap-2">
          <label for="mode" class="text-gray-700 font-medium">Mode:</label>
          <select
            id="mode"
            class="px-3 py-1.5 rounded border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            .value=${this.mqttCtx?.mode ?? "mock"}
            @change=${this.onChange}
          >
            <option value="mock">🧪 Mock</option>
            <option value="mqtt">📡 MQTT</option>
            <option value="sim">🌀 Simulasi</option>
          </select>
        </div>

        <div class="flex-1"></div>

        <button
          class="flex items-center gap-2 px-4 py-1.5 rounded bg-emerald-600 text-white hover:bg-emerald-700 text-sm"
          title="Simpan database (backup)"
          @click=${this.onSaveClick}
        >
          💾 Simpan DB
        </button>
      </div>
    `;
      }
    };
    __decorateClass([
      c4({ context: mqttContext, subscribe: true })
    ], ModeSelector.prototype, "mqttCtx", 2);
    __decorateClass([
      r5()
    ], ModeSelector.prototype, "saving", 2);
    ModeSelector = __decorateClass([
      t3("mode-selector")
    ], ModeSelector);
  }
});

// src/components/dashboard-mqtt.ts
var DashboardMqtt;
var init_dashboard_mqtt = __esm({
  "src/components/dashboard-mqtt.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_device_list();
    init_mode_selector();
    DashboardMqtt = class extends i4 {
      createRenderRoot() {
        return this;
      }
      render() {
        return x`
      <div class="p-4 space-y-4">
        <h1 class="text-xl font-bold text-gray-800">Dashboard MQTT</h1>
        <mode-selector></mode-selector>
        <device-list></device-list>
      </div>
    `;
      }
    };
    DashboardMqtt = __decorateClass([
      t3("dashboard-mqtt")
    ], DashboardMqtt);
  }
});

// src/mappers/fromHydroponicBatch.ts
function fromHydroponicBatch(batch) {
  return {
    id: batch.id,
    itemId: batch.plantId,
    domain: "hidroponik",
    location: batch.location,
    startDate: batch.startDate,
    expectedHarvestDate: batch.expectedHarvestDate,
    initialCount: batch.initialCount,
    currentCount: batch.currentCount,
    status: batch.status === "Planted" ? "Active" : batch.status,
    note: batch.note ?? "-"
  };
}
var init_fromHydroponicBatch = __esm({
  "src/mappers/fromHydroponicBatch.ts"() {
    "use strict";
  }
});

// src/utils/format-display.ts
function formatDate(value) {
  const date = typeof value === "string" ? new Date(value) : value;
  if (isNaN(date.getTime())) return value.toString();
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}
function formatDeviceValue(device) {
  if (!device) return "--";
  const live = devicesStore.get(device.tagNumber);
  if (!live) return "--";
  if (device.type === "sensor") {
    const raw = live.value;
    return raw == null ? "--" : typeof raw === "number" ? `${raw.toFixed(device.display_precision ?? 1)} ${device.unit ?? ""}`.trim() : `${raw} ${device.unit ?? ""}`.trim();
  }
  if (device.type === "actuator") {
    return live.state ?? "--";
  }
  return "--";
}
function formatKey(key) {
  return key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/_/g, " ").replace(/\b\w/g, (l3) => l3.toUpperCase());
}
var init_format_display = __esm({
  "src/utils/format-display.ts"() {
    "use strict";
    init_devices_store();
  }
});

// src/components/hydroponic-batch.ts
var HydroponicBatchTable;
var init_hydroponic_batch = __esm({
  "src/components/hydroponic-batch.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_format_display();
    HydroponicBatchTable = class extends i4 {
      constructor() {
        super(...arguments);
        this.batches = [];
        this.plants = [];
        this.map = {};
      }
      createRenderRoot() {
        return this;
      }
      updated(chg) {
        if (chg.has("plants")) {
          this.map = Object.fromEntries((this.plants || []).map((p3) => [p3.id, p3]));
        }
      }
      onPlantClick(plant, wantedId) {
        this.dispatchEvent(
          new CustomEvent("plant-click", {
            detail: { itemId: wantedId, plant },
            bubbles: true,
            composed: true
          })
        );
      }
      onBatchClick(batch) {
        this.dispatchEvent(
          new CustomEvent("batch-click", {
            detail: batch,
            bubbles: true,
            composed: true
          })
        );
      }
      badge(status) {
        const map = {
          Active: "bg-green-100 text-green-700",
          Harvested: "bg-blue-100 text-blue-700",
          Failed: "bg-red-100 text-red-700"
        };
        return x`<span
      class="px-2 py-1 rounded text-xs font-medium ${map[status] ?? "bg-gray-100 text-gray-700"}"
      >${status}</span
    >`;
      }
      render() {
        return x`
      <div class="overflow-auto border rounded-xl shadow-sm">
        <table class="table-auto border-collapse w-full text-sm text-left">
          <thead class="bg-emerald-100 text-emerald-900 text-sm font-semibold">
            <tr>
              <th class="px-4 py-2">🌱 Batch</th>
              <th class="px-4 py-2">🪴 Tanaman</th>
              <th class="px-4 py-2">💧 Sistem</th>
              <th class="px-4 py-2">📅 Mulai</th>
              <th class="px-4 py-2">🌾 Estimasi Panen</th>
              <th class="px-4 py-2 text-center">🌿 Jumlah</th>
              <th class="px-4 py-2">📊 Status</th>
            </tr>
          </thead>
          <tbody>
            ${this.batches.map((b3) => {
          const plant = this.map[b3.itemId];
          const [system, loc] = b3.location.split(" - ");
          return x`
                <tr class="hover:bg-gray-50 transition">
                  <td
                    class="px-4 py-2 font-mono text-blue-600 hover:underline cursor-pointer"
                    @click=${() => this.onBatchClick(b3)}
                  >
                    ${b3.id}
                  </td>
                  <td
                    class="px-4 py-2 text-blue-600 hover:underline cursor-pointer"
                    @click=${() => this.onPlantClick(plant, b3.itemId)}
                  >
                    ${plant?.name ?? b3.itemId}
                  </td>
                  <td class="px-4 py-2">${system} (${loc})</td>
                  <td class="px-4 py-2">${formatDate(b3.startDate)}</td>
                  <td class="px-4 py-2">
                    ${formatDate(b3.expectedHarvestDate)}
                  </td>
                  <td class="px-4 py-2 text-center font-medium">
                    ${b3.currentCount} / ${b3.initialCount}
                  </td>
                  <td class="px-4 py-2">${this.badge(b3.status)}</td>
                </tr>
              `;
        })}
          </tbody>
        </table>
      </div>
    `;
      }
    };
    __decorateClass([
      n4({ type: Array })
    ], HydroponicBatchTable.prototype, "batches", 2);
    __decorateClass([
      n4({ type: Array })
    ], HydroponicBatchTable.prototype, "plants", 2);
    __decorateClass([
      r5()
    ], HydroponicBatchTable.prototype, "map", 2);
    HydroponicBatchTable = __decorateClass([
      t3("hydroponic-batch")
    ], HydroponicBatchTable);
  }
});

// src/components/dialogs/entity-detail-dialog.ts
function formatValueSafe(v2) {
  if (v2 === null || v2 === void 0) return "\u2014";
  if (typeof v2 === "boolean") return v2 ? "Yes" : "No";
  if (typeof v2 === "number") return Number.isFinite(v2) ? String(v2) : "\u2014";
  if (typeof v2 === "string") return v2.trim() === "" ? "\u2014" : v2;
  if (Array.isArray(v2)) return v2.length ? JSON.stringify(v2) : "[]";
  if (typeof v2 === "object")
    return Object.keys(v2).length ? JSON.stringify(v2) : "{}";
  return String(v2);
}
var EntityDetailDialog;
var init_entity_detail_dialog = __esm({
  "src/components/dialogs/entity-detail-dialog.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_format_display();
    EntityDetailDialog = class extends i4 {
      constructor() {
        super(...arguments);
        this.visible = false;
        this.dlgTitle = "Detail";
        this.sections = [];
      }
      createRenderRoot() {
        return this;
      }
      // Terima: show(obj) atau show({ A: obj1, B: obj2 }, 'Title')
      show(data, title = "Detail") {
        this.dlgTitle = title;
        const isPlain = (v2) => v2 && typeof v2 === "object" && !Array.isArray(v2);
        if (isPlain(data) && Object.values(data).every(isPlain)) {
          this.sections = Object.entries(data);
        } else if (isPlain(data)) {
          this.sections = [["Detail", data]];
        } else {
          console.warn("[entity-detail-dialog] show() tipe tidak didukung:", data);
          this.sections = [];
        }
        console.groupCollapsed("[entity-detail-dialog] show() payload");
        console.log("title:", this.dlgTitle);
        this.sections.forEach(([t5, o6]) => {
          console.log(`section: ${t5}`, {
            keys: Object.keys(o6),
            sample: Object.entries(o6).slice(0, 5)
          });
        });
        console.groupEnd();
        this.visible = true;
      }
      close() {
        this.visible = false;
      }
      renderSection(title, obj) {
        const entries = Object.entries(obj ?? {});
        if (!entries.length) {
          return x`
        <div class="mt-4">
          <h3 class="font-semibold text-base mb-1">${title}</h3>
          <div class="text-sm italic text-gray-500">Tidak ada data.</div>
        </div>
      `;
        }
        return x`
      <div class="mt-4">
        <h3 class="font-semibold text-base mb-1">${title}</h3>
        <table class="w-full text-sm mb-2">
          <tbody>
            ${entries.map(
          ([key, val]) => x`
                <tr class="border-b">
                  <td class="py-1 px-2 font-medium text-gray-600 w-1/3">
                    ${formatKey(key)}
                  </td>
                  <td class="py-1 px-2">${formatValueSafe(val)}</td>
                </tr>
              `
        )}
          </tbody>
        </table>
      </div>
    `;
      }
      render() {
        if (!this.visible) return x``;
        return x`
      <div
        class="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50"
        @click=${this.close}
      >
        <div
          class="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl"
          @click=${(e8) => e8.stopPropagation()}
        >
          <div class="flex justify-between items-center mb-4">
            <div class="text-lg font-bold">${this.dlgTitle}</div>
            <button
              class="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full"
              @click=${this.close}
              title="Tutup"
            >
              ✕
            </button>
          </div>
          ${this.sections.map(([t5, o6]) => this.renderSection(t5, o6))}
        </div>
      </div>
    `;
      }
    };
    __decorateClass([
      r5()
    ], EntityDetailDialog.prototype, "visible", 2);
    __decorateClass([
      r5()
    ], EntityDetailDialog.prototype, "dlgTitle", 2);
    __decorateClass([
      r5()
    ], EntityDetailDialog.prototype, "sections", 2);
    EntityDetailDialog = __decorateClass([
      t3("entity-detail-dialog")
    ], EntityDetailDialog);
  }
});

// src/components/dialogs/device-dialog.ts
var DeviceDialog;
var init_device_dialog = __esm({
  "src/components/dialogs/device-dialog.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_devices_store();
    DeviceDialog = class extends i4 {
      constructor() {
        super(...arguments);
        this.close = () => {
          this.dlg?.close();
        };
      }
      createRenderRoot() {
        return this;
      }
      firstUpdated() {
        this.dlg = this.querySelector("dialog");
      }
      async open(tagNumber) {
        await devicesStore.init();
        this.dev = devicesStore.get(tagNumber);
        if (!this.dlg) this.dlg = this.querySelector("dialog");
        this.dlg?.showModal();
      }
      /** Cek apakah status bernilai 'ok' (string atau array) */
      isOk(status) {
        if (typeof status === "string") {
          return status === "ok";
        }
        if (Array.isArray(status)) {
          return status.every((s7) => s7 === "ok");
        }
        return false;
      }
      /** Tampilkan properti dinamis dari device */
      renderDynamic(d3) {
        return x`
      ${Object.entries(d3).map(([key, val]) => {
          const isStatusKey = key.toLowerCase().includes("status");
          const isNormal = isStatusKey ? this.isOk(val) : true;
          const valueStr = typeof val === "object" ? JSON.stringify(val) : Array.isArray(val) ? val.join(", ") : String(val);
          return x`
          <div class="flex justify-between text-sm py-1 gap-4">
            <div class="text-gray-500 font-medium">${key}</div>
            <div
              class="${isStatusKey ? isNormal ? "text-green-600 font-semibold" : "text-red-600 font-semibold" : "text-gray-800"} text-right break-all"
            >
              ${valueStr}
            </div>
          </div>
        `;
        })}
    `;
      }
      render() {
        const d3 = this.dev;
        const typeEmoji = d3?.type === "sensor" ? "\u{1F4DF}" : d3?.type === "actuator" ? "\u2699\uFE0F" : "\u{1F527}";
        return x`
      <dialog
        class="w-full max-w-md border-0 rounded-2xl p-0 
               [&::backdrop]:bg-black/40 [&::backdrop]:backdrop-blur-sm"
      >
        <section
          class="relative bg-white rounded-2xl shadow-2xl ring-1 ring-black/5
                 p-5 sm:p-6"
        >
          <button
            class="absolute top-2.5 right-2.5 inline-flex items-center justify-center
         h-8 w-8 rounded-full bg-red-500 text-white font-bold
         hover:bg-red-600 active:scale-95 transition cursor-pointer"
            @click=${this.close}
            aria-label="Tutup dialog"
            title="Tutup"
          >
            ✕
          </button>

          <header class="mb-4">
            <div class="flex items-center gap-2">
              <span class="text-xl">${typeEmoji}</span>
              <h3 class="text-lg font-semibold text-gray-800">
                ${d3 ? `${d3.description} (${d3.tagNumber})` : "Device"}
              </h3>
            </div>
            <p class="mt-0.5 text-xs text-gray-400">
              ${d3?.type === "sensor" ? "Sensor" : d3?.type === "actuator" ? "Aktuator" : "Perangkat"}
            </p>
          </header>

          ${d3 ? x`<div class="space-y-2">${this.renderDynamic(d3)}</div>` : x`<div class="text-sm text-gray-500">
                Device tidak ditemukan.
              </div>`}
        </section>
      </dialog>
    `;
      }
    };
    __decorateClass([
      r5()
    ], DeviceDialog.prototype, "dev", 2);
    DeviceDialog = __decorateClass([
      t3("device-dialog")
    ], DeviceDialog);
  }
});

// src/components/batch-result.ts
var BatchResultTable;
var init_batch_result = __esm({
  "src/components/batch-result.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_format_display();
    BatchResultTable = class extends i4 {
      constructor() {
        super(...arguments);
        this.harvests = [];
        this.batches = [];
      }
      createRenderRoot() {
        return this;
      }
      getBatchMap() {
        return Object.fromEntries((this.batches ?? []).map((b3) => [b3.id, b3]));
      }
      emitBatchClick(batchId, batch) {
        console.debug("[batch-result] emit batch-click", {
          batchId,
          found: !!batch
        });
        this.dispatchEvent(
          new CustomEvent("batch-click", {
            detail: { batchId, batch },
            // <-- kirim KEDUANYA
            bubbles: true,
            composed: true
          })
        );
      }
      // ... fmtInt, fmtRp, render header tetap
      render() {
        const batchMap = this.getBatchMap();
        if (!this.harvests?.length) {
          return x`<p class="italic text-gray-500">
        Belum ada data hasil panen…
      </p>`;
        }
        return x`
      <div class="overflow-auto border rounded-xl shadow-sm">
        <table class="table-auto border-collapse w-full text-sm text-left">
          <thead class="bg-yellow-100 text-yellow-900 text-sm font-semibold">
            <tr>
              <th class="px-4 py-2">🌿 Batch</th>
              <th class="px-4 py-2">🗓️ Tanggal Panen</th>
              <th class="px-4 py-2 text-right">⚖️ Berat (g)</th>
              <th class="px-4 py-2 text-right">🪙 Pendapatan (Rp)</th>
              <th class="px-4 py-2 text-right">📈 Laba Bersih (Rp)</th>
            </tr>
          </thead>
          <tbody>
            ${this.harvests.map((h3) => {
          const batch = batchMap[h3.batchId];
          return x`
                <tr class="hover:bg-gray-50 transition">
                  <td class="px-4 py-2">
                    <button
                      type="button"
                      class="text-blue-600 hover:underline font-semibold cursor-pointer"
                      @click=${() => this.emitBatchClick(h3.batchId, batch)}
                      title="Lihat detail batch"
                    >
                      ${batch?.id ?? h3.batchId}
                    </button>
                  </td>
                  <td class="px-4 py-2">${formatDate(h3.harvestDate)}</td>
                  <td class="px-4 py-2 text-right">
                    ${this.fmtInt(h3.totalWeightG)}
                  </td>
                  <td class="px-4 py-2 text-right text-green-700 font-semibold">
                    ${this.fmtRp(h3.revenue)}
                  </td>
                  <td class="px-4 py-2 text-right text-blue-700 font-semibold">
                    ${this.fmtRp(h3.netProfit)}
                  </td>
                </tr>
              `;
        })}
          </tbody>
        </table>
      </div>
    `;
      }
      fmtInt(n6) {
        if (n6 === null || n6 === void 0 || Number.isNaN(n6)) return "\u2014";
        return new Intl.NumberFormat("id-ID").format(n6);
      }
      fmtRp(n6) {
        if (n6 === null || n6 === void 0 || Number.isNaN(n6)) return "\u2014";
        return "Rp " + new Intl.NumberFormat("id-ID").format(n6);
      }
    };
    __decorateClass([
      n4({ type: Array })
    ], BatchResultTable.prototype, "harvests", 2);
    __decorateClass([
      n4({ type: Array })
    ], BatchResultTable.prototype, "batches", 2);
    BatchResultTable = __decorateClass([
      t3("batch-result")
    ], BatchResultTable);
  }
});

// src/components/cards/dashboard-device-card.ts
var DashboardDeviceCard;
var init_dashboard_device_card = __esm({
  "src/components/cards/dashboard-device-card.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    DashboardDeviceCard = class extends i4 {
      constructor() {
        super(...arguments);
        this.value = null;
        // fallback jika device belum tersedia
        this.handleClick = () => {
          const tag = this.device?.tagNumber ?? this.tag;
          if (tag) {
            this.dispatchEvent(
              new CustomEvent("device-click", {
                detail: { tag },
                bubbles: true,
                composed: true
              })
            );
          }
        };
      }
      createRenderRoot() {
        return this;
      }
      render() {
        const tagNumber = this.device?.tagNumber ?? this.tag ?? "--";
        const description = this.device?.description ?? "";
        const displayValue = this.value ?? "--";
        return x`
      <div
        class="flex items-center justify-between gap-4 px-4 py-2 border-b hover:bg-gray-50 cursor-pointer"
        @click=${this.handleClick}
        role="button"
        tabindex="0"
        @keydown=${(e8) => (e8.key === "Enter" || e8.key === " ") && this.handleClick()}
      >
        <div class="flex flex-col">
          <div class="text-sm font-semibold text-green-700">${tagNumber}</div>
          <div class="text-xs text-gray-500">${description}</div>
        </div>
        <div class="text-lg font-bold text-right text-gray-800 min-w-[60px]">
          ${displayValue}
        </div>
      </div>
    `;
      }
    };
    __decorateClass([
      n4({ type: Object })
    ], DashboardDeviceCard.prototype, "device", 2);
    __decorateClass([
      n4({ type: String })
    ], DashboardDeviceCard.prototype, "value", 2);
    __decorateClass([
      n4({ type: String })
    ], DashboardDeviceCard.prototype, "tag", 2);
    DashboardDeviceCard = __decorateClass([
      t3("dashboard-device-card")
    ], DashboardDeviceCard);
  }
});

// src/pages/produksi/views/hidroponik-devices.ts
var DashboardHidroponik;
var init_hidroponik_devices = __esm({
  "src/pages/produksi/views/hidroponik-devices.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_devices_store();
    init_dashboard_device_card();
    init_format_display();
    DashboardHidroponik = class extends i4 {
      constructor() {
        super(...arguments);
        this.pompaState = "OFF";
        this.statusMap = {};
        // 🏷️ Daftar TAG device yang ingin ditampilkan
        this.deviceTags = ["TI-001", "LI-004", "AI-005", "AI-006", "P-001"];
      }
      // Disable shadow DOM agar styling global tetap berpengaruh
      createRenderRoot() {
        return this;
      }
      // ⛓️ Lifecycle Hook: Saat komponen di-*attach* ke DOM
      async connectedCallback() {
        super.connectedCallback();
        await devicesStore.init();
        this.pull();
        this.off = devicesStore.onChange(() => this.pull());
      }
      // 🔌 Bersihkan listener saat komponen di-*detach*
      disconnectedCallback() {
        this.off?.();
        super.disconnectedCallback();
      }
      // 🔄 Tarik status terbaru dari devicesStore
      pull() {
        const statusMap = {};
        this.deviceTags.forEach((tag) => {
          statusMap[tag] = devicesStore.getStatus(tag);
        });
        this.statusMap = statusMap;
      }
      // 📥 Handler ketika user klik salah satu device
      handleDeviceClick(e8) {
        const tag = e8.detail.tag;
        const dlg = document.querySelector("device-dialog");
        dlg?.open?.(tag);
      }
      // 🎨 Render UI dashboard
      render() {
        return x`
      <section
        class="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
        @device-click=${this.handleDeviceClick}
      >
        <!-- 🧠 Header Seksi Dashboard -->
        <div class="mb-6">
          <h2
            class="text-xl font-semibold text-gray-800 flex items-center gap-3"
          >
            🌡️💧 Hidroponik Sensor & Aktuator
          </h2>
        </div>

        <!-- 📊 Grid Tampilan Perangkat -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${this.deviceTags.map((tag) => {
          const device = devicesStore.get(tag);
          if (!device) return null;
          const value = formatDeviceValue(device);
          return x`
              <dashboard-device-card
                .device=${device}
                .tag=${tag}
                .value=${value}
              ></dashboard-device-card>
            `;
        })}
        </div>
      </section>
    `;
      }
    };
    __decorateClass([
      r5()
    ], DashboardHidroponik.prototype, "pompaState", 2);
    __decorateClass([
      r5()
    ], DashboardHidroponik.prototype, "statusMap", 2);
    DashboardHidroponik = __decorateClass([
      t3("hidroponik-devices")
    ], DashboardHidroponik);
  }
});

// src/services/plant.service.ts
var repo2, fetchAllPlants;
var init_plant_service = __esm({
  "src/services/plant.service.ts"() {
    "use strict";
    init_repository_factory();
    repo2 = getPlantRepository();
    fetchAllPlants = () => repo2.getAll();
  }
});

// src/services/hydroponic-batch.service.ts
var repo3, fetchAllHydroponicBatches;
var init_hydroponic_batch_service = __esm({
  "src/services/hydroponic-batch.service.ts"() {
    "use strict";
    init_repository_factory();
    repo3 = getHydroponicBatchRepository();
    fetchAllHydroponicBatches = () => repo3.getAll();
  }
});

// src/pages/produksi/hidroponik.ts
var hidroponik_exports = {};
__export(hidroponik_exports, {
  PageProduksiHidroponik: () => PageProduksiHidroponik
});
var PageProduksiHidroponik;
var init_hidroponik = __esm({
  "src/pages/produksi/hidroponik.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_fromHydroponicBatch();
    init_hydroponic_batch();
    init_entity_detail_dialog();
    init_device_dialog();
    init_batch_result();
    init_hidroponik_devices();
    init_plant_service();
    init_hydroponic_batch_service();
    PageProduksiHidroponik = class extends i4 {
      constructor() {
        super(...arguments);
        this.plants = [];
        this.batches = [];
        this.harvests = [];
        this.onPlantClick = (e8) => {
          const { itemId, plant } = e8.detail;
          const dlg = document.querySelector("entity-detail-dialog");
          dlg?.show(
            { "\u{1F331} Tanaman": plant ?? { _warn: "not found", wantedId: itemId } },
            "Detail Tanaman"
          );
        };
        this.onBatchClick = (e8) => {
          const batch = e8.detail;
          const plant = this.plants.find((p3) => p3.id === batch.itemId);
          const dlg = document.querySelector("entity-detail-dialog");
          dlg?.show(
            { "\u{1F4E6} Batch": batch, "\u{1F331} Tanaman": plant ?? {} },
            "Detail Batch Hidroponik"
          );
        };
        // di render:
        this.handleHarvestBatchClick = (e8) => {
          const { batchId, batch } = e8.detail || {};
          console.groupCollapsed("[Page] handleHarvestBatchClick");
          console.log("payload:", e8.detail);
          console.groupEnd();
          const dlg = document.querySelector("entity-detail-dialog");
          if (!dlg) return;
          const resolved = batch ?? this.batches.find((b3) => b3.id === batchId);
          if (!resolved) {
            dlg.show(
              { "\u26A0\uFE0F Info": { message: "Batch tidak ditemukan", batchId } },
              "Detail Batch"
            );
            return;
          }
          dlg.show({ "\u{1F4E6} Batch": resolved }, "Detail Batch");
        };
      }
      createRenderRoot() {
        return this;
      }
      async connectedCallback() {
        super.connectedCallback();
        const plants = await fetchAllPlants();
        const raw = await fetchAllHydroponicBatches();
        this.plants = plants;
        this.batches = raw.map(fromHydroponicBatch);
        this.harvests = await (await fetch("./assets/mock/harvests.json")).json();
        console.groupCollapsed("[Hidroponik] mapped GenericBatch");
        console.table(
          this.batches.map((b3) => ({
            id: b3.id,
            itemId: b3.itemId,
            location: b3.location
          }))
        );
        console.groupEnd();
      }
      render() {
        const cardStyle = "display:block;margin-top:1.5rem;margin-bottom:1.5rem;";
        return x`
      <section class="p-4 space-y-4">
        <h1 class="text-2xl font-bold">💧 Produksi Hidroponik</h1>
        <div>
          <hydroponic-batch
            .batches=${this.batches}
            .plants=${this.plants}
            @plant-click=${this.onPlantClick}
            @batch-click=${this.onBatchClick}
          ></hydroponic-batch>
          <hidroponik-devices style=${cardStyle}></hidroponik-devices>
        </div>

        <batch-result
          .harvests=${this.harvests}
          .batches=${this.batches}
          @batch-click=${this.handleHarvestBatchClick}
        ></batch-result>

        <entity-detail-dialog></entity-detail-dialog>
      </section>
    `;
      }
    };
    __decorateClass([
      r5()
    ], PageProduksiHidroponik.prototype, "plants", 2);
    __decorateClass([
      r5()
    ], PageProduksiHidroponik.prototype, "batches", 2);
    __decorateClass([
      r5()
    ], PageProduksiHidroponik.prototype, "harvests", 2);
    PageProduksiHidroponik = __decorateClass([
      t3("hidroponik-page")
    ], PageProduksiHidroponik);
  }
});

// src/mappers/fromPlantingBatch.ts
function fromPlantingBatch(batch) {
  return {
    id: batch.id,
    itemId: batch.plantId,
    domain: "hortikultura",
    location: batch.location,
    startDate: batch.startDate,
    expectedHarvestDate: batch.expectedHarvestDate,
    initialCount: batch.totalPlants,
    currentCount: batch.totalPlants,
    status: batch.status === "Planted" ? "Active" : batch.status,
    note: batch.note
  };
}
var init_fromPlantingBatch = __esm({
  "src/mappers/fromPlantingBatch.ts"() {
    "use strict";
  }
});

// src/pages/produksi/views/hortikultura-devices.ts
var DashboardHortikultura;
var init_hortikultura_devices = __esm({
  "src/pages/produksi/views/hortikultura-devices.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_devices_store();
    init_dashboard_device_card();
    init_format_display();
    DashboardHortikultura = class extends i4 {
      constructor() {
        super(...arguments);
        this.statusMap = {};
        // 🌱 Daftar TAG perangkat hortikultura
        this.deviceTags = ["TI-401", "AI-401", "AI-402", "P-401", "P-402"];
      }
      createRenderRoot() {
        return this;
      }
      async connectedCallback() {
        super.connectedCallback();
        await devicesStore.init();
        this.pull();
        this.off = devicesStore.onChange(() => this.pull());
      }
      disconnectedCallback() {
        this.off?.();
        super.disconnectedCallback();
      }
      pull() {
        const statusMap = {};
        this.deviceTags.forEach((tag) => {
          statusMap[tag] = devicesStore.getStatus(tag);
        });
        this.statusMap = statusMap;
      }
      handleDeviceClick(e8) {
        const tag = e8.detail.tag;
        const dlg = document.querySelector("device-dialog");
        dlg?.open?.(tag);
      }
      render() {
        return x`
      <section
        class="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
        @device-click=${this.handleDeviceClick}
      >
        <div class="mb-6">
          <h2
            class="text-xl font-semibold text-gray-800 flex items-center gap-3"
          >
            🌾 Hortikultura Sensor & Aktuator
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${this.deviceTags.map((tag) => {
          const device = devicesStore.get(tag);
          if (!device) return null;
          const value = formatDeviceValue(device);
          return x`
              <dashboard-device-card
                .device=${device}
                .tag=${tag}
                .value=${value}
              ></dashboard-device-card>
            `;
        })}
        </div>
      </section>
    `;
      }
    };
    __decorateClass([
      r5()
    ], DashboardHortikultura.prototype, "statusMap", 2);
    DashboardHortikultura = __decorateClass([
      t3("hortikultura-devices")
    ], DashboardHortikultura);
  }
});

// src/components/plant-batch.ts
function isGenericBatch(x3) {
  return x3 && typeof x3 === "object" && "itemId" in x3 && "initialCount" in x3 && "currentCount" in x3;
}
var PlantBatchTable;
var init_plant_batch = __esm({
  "src/components/plant-batch.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_format_display();
    PlantBatchTable = class extends i4 {
      constructor() {
        super(...arguments);
        this.batches = [];
        this.plants = [];
        this.plantMap = {};
      }
      createRenderRoot() {
        return this;
      }
      connectedCallback() {
        super.connectedCallback();
        this.plantMap = Object.fromEntries(
          (this.plants || []).map((p3) => [p3.id, p3])
        );
      }
      updated(changed) {
        if (changed.has("plants")) {
          this.plantMap = Object.fromEntries(
            (this.plants || []).map((p3) => [p3.id, p3])
          );
        }
      }
      onPlantClick(plant) {
        this.dispatchEvent(
          new CustomEvent("plant-click", {
            detail: plant,
            bubbles: true,
            composed: true
          })
        );
      }
      onBatchClick(batch) {
        this.dispatchEvent(
          new CustomEvent("batch-click", {
            detail: batch,
            bubbles: true,
            composed: true
          })
        );
      }
      renderStatus(status) {
        const map = {
          Active: "bg-green-100 text-green-700",
          Harvested: "bg-blue-100 text-blue-700",
          Failed: "bg-red-100 text-red-700"
        };
        const cls = map[status] ?? "bg-gray-100 text-gray-700";
        return x`<span class="px-2 py-1 rounded text-xs font-medium ${cls}"
      >${status}</span
    >`;
      }
      render() {
        return x`
      <div class="overflow-auto border rounded-xl shadow-sm">
        <table class="table-auto border-collapse w-full text-sm text-left">
          <thead class="bg-green-200 text-green-900 text-sm font-semibold">
            <tr>
              <th class="px-4 py-2">🌱 Batch</th>
              <th class="px-4 py-2">🪴 Tanaman</th>
              <th class="px-4 py-2">📅 Mulai</th>
              <th class="px-4 py-2">🌾 Estimasi Panen</th>
              <th class="px-4 py-2 text-center">🌿 Jumlah</th>
              <th class="px-4 py-2">📍 Lokasi</th>
              <th class="px-4 py-2">📊 Status</th>
            </tr>
          </thead>
          <tbody>
            ${this.batches.map((b3) => {
          if (!isGenericBatch(b3)) {
            return x`
                  <tr class="bg-yellow-50">
                    <td class="px-4 py-2 font-mono text-red-600" colspan="7">
                      ⚠️ Komponen menerima tipe batch non-GenericBatch. Pastikan
                      map dengan fromPlantingBatch().
                    </td>
                  </tr>
                `;
          }
          const plant = this.plantMap[b3.itemId];
          return x`
                <tr class="hover:bg-gray-50 transition">
                  <td
                    class="px-4 py-2 font-mono text-blue-600 hover:underline cursor-pointer"
                    @click=${() => this.onBatchClick(b3)}
                  >
                    ${b3.id}
                  </td>
                  <td
                    class="px-4 py-2 cursor-pointer text-blue-600 hover:underline"
                    @click=${() => this.onPlantClick(plant)}
                  >
                    ${plant?.name ?? b3.itemId}
                  </td>
                  <td class="px-4 py-2 text-gray-700">
                    ${formatDate(b3.startDate)}
                  </td>
                  <td class="px-4 py-2 text-gray-700">
                    ${formatDate(b3.expectedHarvestDate)}
                  </td>
                  <td class="px-4 py-2 text-center font-medium">
                    ${b3.currentCount} / ${b3.initialCount}
                  </td>
                  <td class="px-4 py-2">${b3.location}</td>
                  <td class="px-4 py-2">${this.renderStatus(b3.status)}</td>
                </tr>
              `;
        })}
          </tbody>
        </table>
      </div>
    `;
      }
    };
    __decorateClass([
      n4({ type: Array })
    ], PlantBatchTable.prototype, "batches", 2);
    __decorateClass([
      n4({ type: Array })
    ], PlantBatchTable.prototype, "plants", 2);
    __decorateClass([
      r5()
    ], PlantBatchTable.prototype, "plantMap", 2);
    PlantBatchTable = __decorateClass([
      t3("plant-batch")
    ], PlantBatchTable);
  }
});

// src/services/horti-batch.service.ts
var repo4, fetchAllHortiBatches;
var init_horti_batch_service = __esm({
  "src/services/horti-batch.service.ts"() {
    "use strict";
    init_repository_factory();
    repo4 = getHortiBatchRepository();
    fetchAllHortiBatches = () => repo4.getAll();
  }
});

// src/pages/produksi/hortikultura.ts
var hortikultura_exports = {};
__export(hortikultura_exports, {
  PageProduksiHortikultura: () => PageProduksiHortikultura
});
var PageProduksiHortikultura;
var init_hortikultura = __esm({
  "src/pages/produksi/hortikultura.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_fromPlantingBatch();
    init_hortikultura_devices();
    init_plant_batch();
    init_entity_detail_dialog();
    init_plant_service();
    init_horti_batch_service();
    PageProduksiHortikultura = class extends i4 {
      constructor() {
        super(...arguments);
        this.plants = [];
        this.batches = [];
        this.harvests = [];
        this.handlePlantClick = (e8) => {
          console.groupCollapsed("[Horti] open plant dialog");
          console.log("plant payload:", e8.detail);
          console.groupEnd();
          const dlg = document.querySelector("entity-detail-dialog");
          dlg?.show({ "\u{1F331} Tanaman": e8.detail ?? {} }, "Detail Tanaman");
        };
        this.handleBatchClick = (e8) => {
          const batch = e8.detail;
          const plant = this.plants.find((p3) => p3.id === batch.itemId);
          console.groupCollapsed("[Horti] open batch dialog");
          console.log("batch payload:", batch);
          console.log("plant payload:", plant);
          console.groupEnd();
          const dlg = document.querySelector("entity-detail-dialog");
          dlg?.show(
            { "\u{1F4E6} Batch": batch, "\u{1F331} Tanaman": plant ?? {} },
            "Detail Batch Tanam"
          );
        };
        this.handleHarvestBatchClick = (e8) => {
          const { batchId, batch } = e8.detail || {};
          console.groupCollapsed("[Page] handleHarvestBatchClick");
          console.log("payload:", e8.detail);
          console.groupEnd();
          const dlg = document.querySelector("entity-detail-dialog");
          if (!dlg) return;
          const resolved = batch ?? this.batches.find((b3) => b3.id === batchId);
          if (!resolved) {
            dlg.show(
              { "\u26A0\uFE0F Info": { message: "Batch tidak ditemukan", batchId } },
              "Detail Batch"
            );
            return;
          }
          dlg.show({ "\u{1F4E6} Batch": resolved }, "Detail Batch");
        };
      }
      createRenderRoot() {
        return this;
      }
      async connectedCallback() {
        super.connectedCallback();
        const plants = await fetchAllPlants();
        const rawBatches = await fetchAllHortiBatches();
        this.plants = plants;
        this.batches = rawBatches.map(fromPlantingBatch);
        this.harvests = await (await fetch("./assets/mock/horti-harvests.json")).json();
        console.groupCollapsed("[Horti] mapped GenericBatch");
        console.table(
          this.batches.map((b3) => ({
            id: b3.id,
            itemId: b3.itemId,
            initial: b3.initialCount,
            current: b3.currentCount
          }))
        );
        console.groupEnd();
      }
      render() {
        const cardStyle = "display:block;margin-top:1.5rem;margin-bottom:1.5rem;";
        return x`
      <section class="p-4 space-y-4">
        <h1 class="text-2xl font-bold">🌿 Produksi Hortikultura</h1>

        <div>
          <plant-batch
            .batches=${this.batches}
            .plants=${this.plants}
            @plant-click=${this.handlePlantClick}
            @batch-click=${this.handleBatchClick}
          ></plant-batch>

          <hortikultura-devices style=${cardStyle}></hortikultura-devices>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">Hasil Panen</h2>
          <batch-result
            .harvests=${this.harvests}
            .batches=${this.batches}
            @batch-click=${this.handleHarvestBatchClick}
          ></batch-result>
        </div>

        <entity-detail-dialog></entity-detail-dialog>
      </section>
    `;
      }
    };
    __decorateClass([
      r5()
    ], PageProduksiHortikultura.prototype, "plants", 2);
    __decorateClass([
      r5()
    ], PageProduksiHortikultura.prototype, "batches", 2);
    __decorateClass([
      r5()
    ], PageProduksiHortikultura.prototype, "harvests", 2);
    PageProduksiHortikultura = __decorateClass([
      t3("hortikultura-page")
    ], PageProduksiHortikultura);
  }
});

// src/mappers/fromAquaticBatch.ts
function fromAquaticBatch(batch) {
  return {
    id: batch.id,
    itemId: batch.speciesId,
    domain: "akuakultur",
    location: batch.pond,
    startDate: batch.startDate,
    expectedHarvestDate: batch.expectedHarvestDate,
    initialCount: batch.initialPopulation,
    currentCount: batch.currentPopulation,
    status: batch.status === "Growing" ? "Active" : batch.status,
    note: batch.note ?? "-"
  };
}
var init_fromAquaticBatch = __esm({
  "src/mappers/fromAquaticBatch.ts"() {
    "use strict";
  }
});

// src/services/aquatic-batch.service.ts
var repo5, fetchAllAquaticBatches;
var init_aquatic_batch_service = __esm({
  "src/services/aquatic-batch.service.ts"() {
    "use strict";
    init_repository_factory();
    repo5 = getAquaticBatchRepository();
    fetchAllAquaticBatches = () => repo5.getAll();
  }
});

// src/services/aquatic-species.service.ts
var repo6, fetchAllAquaticSpecies;
var init_aquatic_species_service = __esm({
  "src/services/aquatic-species.service.ts"() {
    "use strict";
    init_repository_factory();
    repo6 = getAquaticSpeciesRepository();
    fetchAllAquaticSpecies = () => repo6.getAll();
  }
});

// src/components/aquaculture-batch.ts
var AquaticBatchTable;
var init_aquaculture_batch = __esm({
  "src/components/aquaculture-batch.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_format_display();
    AquaticBatchTable = class extends i4 {
      constructor() {
        super(...arguments);
        this.batches = [];
        this.species = [];
        this.map = {};
      }
      createRenderRoot() {
        return this;
      }
      updated(chg) {
        if (chg.has("species")) {
          this.map = Object.fromEntries(
            (this.species || []).map((s7) => [s7.id ?? s7.speciesId, s7])
          );
        }
      }
      onSpeciesClick(item, wantedId) {
        this.dispatchEvent(
          new CustomEvent("species-click", {
            detail: { itemId: wantedId, item },
            bubbles: true,
            composed: true
          })
        );
      }
      onBatchClick(batch) {
        this.dispatchEvent(
          new CustomEvent("batch-click", {
            detail: batch,
            bubbles: true,
            composed: true
          })
        );
      }
      badge(status) {
        const m2 = {
          Active: "bg-green-100 text-green-700",
          Harvested: "bg-blue-100 text-blue-700",
          Failed: "bg-red-100 text-red-700"
        };
        return x`<span
      class="px-2 py-1 rounded text-xs font-medium ${m2[status] ?? "bg-gray-100 text-gray-700"}"
      >${status}</span
    >`;
      }
      render() {
        return x`
      <div class="overflow-auto border rounded-xl shadow-sm">
        <table class="table-auto border-collapse w-full text-sm text-left">
          <thead class="bg-blue-100 text-blue-900 text-sm font-semibold">
            <tr>
              <th class="px-4 py-2">🐟 Batch</th>
              <th class="px-4 py-2">🦐 Spesies</th>
              <th class="px-4 py-2">📅 Mulai</th>
              <th class="px-4 py-2">🧺 Estimasi Panen</th>
              <th class="px-4 py-2 text-center">👥 Populasi</th>
              <th class="px-4 py-2">🏞️ Kolam</th>
              <th class="px-4 py-2">📊 Status</th>
            </tr>
          </thead>
          <tbody>
            ${this.batches.map((b3) => {
          const sp = this.map[b3.itemId];
          return x`
                <tr class="hover:bg-gray-50 transition">
                  <td
                    class="px-4 py-2 font-mono text-blue-600 hover:underline cursor-pointer"
                    @click=${() => this.onBatchClick(b3)}
                  >
                    ${b3.id}
                  </td>
                  <td
                    class="px-4 py-2 text-blue-600 hover:underline cursor-pointer"
                    @click=${() => this.onSpeciesClick(sp, b3.itemId)}
                  >
                    ${sp?.name ?? b3.itemId}
                  </td>
                  <td class="px-4 py-2">${formatDate(b3.startDate)}</td>
                  <td class="px-4 py-2">
                    ${formatDate(b3.expectedHarvestDate)}
                  </td>
                  <td class="px-4 py-2 text-center font-medium">
                    ${b3.currentCount} / ${b3.initialCount}
                  </td>
                  <td class="px-4 py-2">${b3.location}</td>
                  <td class="px-4 py-2">${this.badge(b3.status)}</td>
                </tr>
              `;
        })}
          </tbody>
        </table>
      </div>
    `;
      }
    };
    __decorateClass([
      n4({ type: Array })
    ], AquaticBatchTable.prototype, "batches", 2);
    __decorateClass([
      n4({ type: Array })
    ], AquaticBatchTable.prototype, "species", 2);
    __decorateClass([
      r5()
    ], AquaticBatchTable.prototype, "map", 2);
    AquaticBatchTable = __decorateClass([
      t3("aquatic-batch")
    ], AquaticBatchTable);
  }
});

// src/pages/produksi/views/aquakultur-devices.ts
var DashboardAquakultur;
var init_aquakultur_devices = __esm({
  "src/pages/produksi/views/aquakultur-devices.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_devices_store();
    init_dashboard_device_card();
    init_format_display();
    DashboardAquakultur = class extends i4 {
      constructor() {
        super(...arguments);
        this.statusMap = {};
        this.deviceTags = ["TI-101", "AI-105", "AI-106", "P-101"];
      }
      createRenderRoot() {
        return this;
      }
      async connectedCallback() {
        super.connectedCallback();
        await devicesStore.init(true);
        this.pull();
        this.off = devicesStore.onChange(() => this.pull());
      }
      disconnectedCallback() {
        this.off?.();
        super.disconnectedCallback();
      }
      pull() {
        const statusMap = {};
        this.deviceTags.forEach((tag) => {
          statusMap[tag] = devicesStore.getStatus(tag);
        });
        this.statusMap = statusMap;
      }
      handleDeviceClick(e8) {
        const tag = e8.detail.tag;
        const dlg = document.querySelector("device-dialog");
        dlg?.open?.(tag);
      }
      render() {
        return x`
      <section
        class="bg-white rounded shadow p-4"
        @device-click=${this.handleDeviceClick}
      >
        <!-- 🧠 Header Seksi Dashboard -->
        <div class="mb-6">
          <h2
            class="text-xl font-semibold text-gray-800 flex items-center gap-3"
          >
            🌡️💧 Akuakultur Sensor & Aktuator
          </h2>
        </div>

        <!-- 📊 Grid Tampilan Perangkat -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          ${this.deviceTags.map((tag) => {
          const device = devicesStore.get(tag);
          if (!device) return null;
          const value = formatDeviceValue(device);
          return x`
              <dashboard-device-card
                .device=${device}
                .tag=${tag}
                .value=${value}
              ></dashboard-device-card>
            `;
        })}
        </div>
      </section>
    `;
      }
    };
    __decorateClass([
      r5()
    ], DashboardAquakultur.prototype, "statusMap", 2);
    DashboardAquakultur = __decorateClass([
      t3("aquakultur-devices")
    ], DashboardAquakultur);
  }
});

// src/pages/produksi/akuakultur.ts
var akuakultur_exports = {};
__export(akuakultur_exports, {
  PageProduksiAkuakultur: () => PageProduksiAkuakultur
});
var PageProduksiAkuakultur;
var init_akuakultur = __esm({
  "src/pages/produksi/akuakultur.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_fromAquaticBatch();
    init_aquatic_batch_service();
    init_aquatic_species_service();
    init_aquaculture_batch();
    init_entity_detail_dialog();
    init_aquakultur_devices();
    PageProduksiAkuakultur = class extends i4 {
      constructor() {
        super(...arguments);
        this.species = [];
        this.batches = [];
        this.harvests = [];
        this.onSpeciesClick = (e8) => {
          const { itemId, item } = e8.detail;
          const dlg = document.querySelector("entity-detail-dialog");
          dlg?.show(
            { "\u{1F41F} Spesies": item ?? { _warn: "not found", wantedId: itemId } },
            "Detail Spesies"
          );
        };
        this.onBatchClick = (e8) => {
          const batch = e8.detail;
          const sp = this.species.find(
            (s7) => (s7.id ?? s7.speciesId) === batch.itemId
          );
          const dlg = document.querySelector("entity-detail-dialog");
          dlg?.show(
            { "\u{1F4E6} Batch": batch, "\u{1F41F} Spesies": sp ?? {} },
            "Detail Batch Akuakultur"
          );
        };
        this.handleHarvestBatchClick = (e8) => {
          const { batchId, batch } = e8.detail || {};
          console.groupCollapsed("[Page] handleHarvestBatchClick");
          console.log("payload:", e8.detail);
          console.groupEnd();
          const dlg = document.querySelector("entity-detail-dialog");
          if (!dlg) return;
          const resolved = batch ?? this.batches.find((b3) => b3.id === batchId);
          if (!resolved) {
            dlg.show(
              { "\u26A0\uFE0F Info": { message: "Batch tidak ditemukan", batchId } },
              "Detail Batch"
            );
            return;
          }
          dlg.show({ "\u{1F4E6} Batch": resolved }, "Detail Batch");
        };
      }
      createRenderRoot() {
        return this;
      }
      async connectedCallback() {
        super.connectedCallback();
        const raw = await fetchAllAquaticBatches();
        const species = await fetchAllAquaticSpecies();
        this.harvests = await (await fetch("./assets/mock/aqua-harvests.json")).json();
        this.species = species;
        this.batches = raw.map(fromAquaticBatch);
      }
      render() {
        const cardStyle = "display:block;margin-top:1.5rem;margin-bottom:1.5rem;";
        return x`
      <section class="p-4 space-y-4">
        <h1 class="text-2xl font-bold">🐟 Produksi Akuakultur</h1>
        <div>
          <aquatic-batch
            .batches=${this.batches}
            .species=${this.species}
            @species-click=${this.onSpeciesClick}
            @batch-click=${this.onBatchClick}
          ></aquatic-batch>
          <aquakultur-devices style=${cardStyle}></aquakultur-devices>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">Hasil Panen</h2>
          <batch-result
            .harvests=${this.harvests}
            .batches=${this.batches}
            @batch-click=${this.handleHarvestBatchClick}
          ></batch-result>
        </div>

        <entity-detail-dialog></entity-detail-dialog>
      </section>
    `;
      }
    };
    __decorateClass([
      r5()
    ], PageProduksiAkuakultur.prototype, "species", 2);
    __decorateClass([
      r5()
    ], PageProduksiAkuakultur.prototype, "batches", 2);
    __decorateClass([
      r5()
    ], PageProduksiAkuakultur.prototype, "harvests", 2);
    PageProduksiAkuakultur = __decorateClass([
      t3("akuakultur-page")
    ], PageProduksiAkuakultur);
  }
});

// src/mappers/fromLivestockBatch.ts
function fromLivestockBatch(batch) {
  return {
    id: batch.id,
    itemId: batch.livestockId,
    domain: "peternakan",
    location: batch.pen,
    startDate: batch.startDate,
    expectedHarvestDate: batch.expectedHarvestDate,
    initialCount: batch.initialCount,
    currentCount: batch.currentCount,
    status: batch.status === "Growing" ? "Active" : batch.status,
    note: batch.note ?? "-"
  };
}
var init_fromLivestockBatch = __esm({
  "src/mappers/fromLivestockBatch.ts"() {
    "use strict";
  }
});

// src/components/livestock-batch.ts
var LivestockBatchTable;
var init_livestock_batch = __esm({
  "src/components/livestock-batch.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_format_display();
    LivestockBatchTable = class extends i4 {
      constructor() {
        super(...arguments);
        this.batches = [];
        this.livestock = [];
        this.map = {};
      }
      createRenderRoot() {
        return this;
      }
      updated(chg) {
        if (chg.has("livestock")) {
          this.map = Object.fromEntries(
            (this.livestock || []).map((l3) => [l3.id, l3])
          );
        }
      }
      onAnimalClick(item) {
        this.dispatchEvent(
          new CustomEvent("animal-click", {
            detail: item,
            bubbles: true,
            composed: true
          })
        );
      }
      onBatchClick(batch) {
        this.dispatchEvent(
          new CustomEvent("batch-click", {
            detail: batch,
            bubbles: true,
            composed: true
          })
        );
      }
      badge(status) {
        const m2 = {
          Active: "bg-green-100 text-green-700",
          Harvested: "bg-blue-100 text-blue-700",
          Failed: "bg-red-100 text-red-700"
        };
        const cls = m2[status] ?? "bg-gray-100 text-gray-700";
        return x`<span class="px-2 py-1 rounded text-xs font-medium ${cls}"
      >${status}</span
    >`;
      }
      render() {
        return x`
      <div class="overflow-auto border rounded-xl shadow-sm">
        <table class="table-auto border-collapse w-full text-sm text-left">
          <thead class="bg-amber-100 text-amber-900 text-sm font-semibold">
            <tr>
              <th class="px-4 py-2">🐄 Batch</th>
              <th class="px-4 py-2">🐮 Ternak</th>
              <th class="px-4 py-2">📅 Mulai</th>
              <th class="px-4 py-2">🧺 Estimasi Panen</th>
              <th class="px-4 py-2 text-center">👥 Populasi</th>
              <th class="px-4 py-2">🏠 Kandang</th>
              <th class="px-4 py-2">📊 Status</th>
            </tr>
          </thead>
          <tbody>
            ${this.batches.map((b3) => {
          const item = this.map[b3.itemId];
          return x`
                <tr class="hover:bg-gray-50 transition">
                  <td
                    class="px-4 py-2 font-mono text-blue-600 hover:underline cursor-pointer"
                    @click=${() => this.onBatchClick(b3)}
                  >
                    ${b3.id}
                  </td>
                  <td
                    class="px-4 py-2 text-blue-600 hover:underline cursor-pointer"
                    @click=${() => this.onAnimalClick(item)}
                  >
                    ${item?.name ?? item?.code ?? b3.itemId}
                  </td>
                  <td class="px-4 py-2">${formatDate(b3.startDate)}</td>
                  <td class="px-4 py-2">
                    ${formatDate(b3.expectedHarvestDate)}
                  </td>
                  <td class="px-4 py-2 text-center font-medium">
                    ${b3.currentCount} / ${b3.initialCount}
                  </td>
                  <td class="px-4 py-2">${b3.location}</td>
                  <td class="px-4 py-2">${this.badge(b3.status)}</td>
                </tr>
              `;
        })}
          </tbody>
        </table>
      </div>
    `;
      }
    };
    __decorateClass([
      n4({ type: Array })
    ], LivestockBatchTable.prototype, "batches", 2);
    __decorateClass([
      n4({ type: Array })
    ], LivestockBatchTable.prototype, "livestock", 2);
    __decorateClass([
      r5()
    ], LivestockBatchTable.prototype, "map", 2);
    LivestockBatchTable = __decorateClass([
      t3("livestock-batch")
    ], LivestockBatchTable);
  }
});

// src/pages/produksi/views/peternakan-devices.ts
var PeternakanDevices;
var init_peternakan_devices = __esm({
  "src/pages/produksi/views/peternakan-devices.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_devices_store();
    init_format_display();
    init_dashboard_device_card();
    PeternakanDevices = class extends i4 {
      constructor() {
        super(...arguments);
        this.statusMap = {};
        // daftar device untuk kandang ayam
        this.deviceTags = ["TI-301", "AI-301", "AI-302", "H-301", "B-301"];
      }
      createRenderRoot() {
        return this;
      }
      async connectedCallback() {
        super.connectedCallback();
        await devicesStore.init(true);
        this.pull();
        this.off = devicesStore.onChange(() => this.pull());
      }
      disconnectedCallback() {
        this.off?.();
        super.disconnectedCallback();
      }
      pull() {
        const statusMap = {};
        this.deviceTags.forEach((tag) => {
          statusMap[tag] = devicesStore.getStatus(tag);
        });
        this.statusMap = statusMap;
      }
      handleDeviceClick(e8) {
        const tag = e8.detail.tag;
        const dlg = document.querySelector("device-dialog");
        dlg?.open?.(tag);
      }
      render() {
        return x`
      <section
        class="bg-white rounded shadow p-4"
        @device-click=${this.handleDeviceClick}
      >
        <!-- 🧠 Header Seksi Dashboard -->
        <div class="mb-6">
          <h2
            class="text-xl font-semibold text-gray-800 flex items-center gap-3"
          >
            🌡️💧 Peternakan Sensor & Aktuator
          </h2>
        </div>

        <!-- 📊 Grid Tampilan Perangkat -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          ${this.deviceTags.map((tag) => {
          const device = devicesStore.get(tag);
          if (!device) return null;
          const value = formatDeviceValue(device);
          return x`
              <dashboard-device-card
                .device=${device}
                .tag=${tag}
                .value=${value}
              ></dashboard-device-card>
            `;
        })}
        </div>
      </section>
    `;
      }
    };
    __decorateClass([
      r5()
    ], PeternakanDevices.prototype, "statusMap", 2);
    PeternakanDevices = __decorateClass([
      t3("peternakan-devices")
    ], PeternakanDevices);
  }
});

// src/services/livestock.service.ts
var repo7, fetchAllLivestock;
var init_livestock_service = __esm({
  "src/services/livestock.service.ts"() {
    "use strict";
    init_repository_factory();
    repo7 = getLivestockRepository();
    fetchAllLivestock = () => repo7.getAll();
  }
});

// src/services/livestock-batch.service.ts
var repo8, fetchAllLivestockBatches;
var init_livestock_batch_service = __esm({
  "src/services/livestock-batch.service.ts"() {
    "use strict";
    init_repository_factory();
    repo8 = getLivestockBatchRepository();
    fetchAllLivestockBatches = () => repo8.getAll();
  }
});

// src/pages/produksi/peternakan.ts
var peternakan_exports = {};
__export(peternakan_exports, {
  PeternakanPage: () => PeternakanPage
});
var PeternakanPage;
var init_peternakan = __esm({
  "src/pages/produksi/peternakan.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_fromLivestockBatch();
    init_entity_detail_dialog();
    init_device_dialog();
    init_livestock_batch();
    init_batch_result();
    init_peternakan_devices();
    init_livestock_service();
    init_livestock_batch_service();
    PeternakanPage = class extends i4 {
      constructor() {
        super(...arguments);
        this.animals = [];
        this.livestockList = [];
        this.batches = [];
        this.harvests = [];
        this.onAnimalClick = (e8) => {
          console.groupCollapsed("[Ternak] open animal dialog");
          console.log("animal payload:", e8.detail);
          console.groupEnd();
          const dlg = document.querySelector("entity-detail-dialog");
          dlg?.show({ "\u{1F42E} Ternak": e8.detail ?? {} }, "Detail Ternak");
        };
        this.onBatchClick = (e8) => {
          const batch = e8.detail;
          const animal = this.animals.find((a3) => a3.id === batch.itemId);
          console.groupCollapsed("[Horti] open batch dialog");
          console.log("batch payload:", batch);
          console.log("plant payload:", animal);
          console.groupEnd();
          const dlg = document.querySelector("entity-detail-dialog");
          dlg?.show(
            { "\u{1F4E6} Batch": batch, "\u{1F42E} Ternak": animal ?? {} },
            "Detail Batch Ternak"
          );
        };
        this.handleHarvestBatchClick = (e8) => {
          const { batchId, batch } = e8.detail || {};
          console.groupCollapsed("[Page] handleHarvestBatchClick");
          console.log("payload:", e8.detail);
          console.groupEnd();
          const dlg = document.querySelector("entity-detail-dialog");
          if (!dlg) return;
          const resolved = batch ?? this.batches.find((b3) => b3.id === batchId);
          if (!resolved) {
            dlg.show(
              { "\u26A0\uFE0F Info": { message: "Batch tidak ditemukan", batchId } },
              "Detail Batch"
            );
            return;
          }
          dlg.show({ "\u{1F4E6} Batch": resolved }, "Detail Batch");
        };
      }
      createRenderRoot() {
        return this;
      }
      async connectedCallback() {
        super.connectedCallback();
        const animals = await fetchAllLivestock();
        const raw = await fetchAllLivestockBatches();
        this.animals = animals;
        this.batches = raw.map(fromLivestockBatch);
        this.harvests = await (await fetch("./assets/mock/livestock-harvests.json")).json();
        console.groupCollapsed("[Peternakan] mapped GenericBatch");
        console.table(
          this.batches.map((b3) => ({
            id: b3.id,
            itemId: b3.itemId,
            init: b3.initialCount,
            curr: b3.currentCount,
            status: b3.status
          }))
        );
        console.groupEnd();
      }
      render() {
        const cardStyle = "display:block;margin-top:1.5rem;margin-bottom:1.5rem;";
        return x`
      <section class="p-4 space-y-4">
        <h1 class="text-2xl font-bold">🐄 Produksi Peternakan</h1>

        <livestock-batch
          .batches=${this.batches}
          .livestock=${this.animals}
          @animal-click=${this.onAnimalClick}
          @batch-click=${this.onBatchClick}
        ></livestock-batch>

        <peternakan-devices style=${cardStyle}></peternakan-devices>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">Hasil Panen</h2>
          <batch-result
            .harvests=${this.harvests}
            .batches=${this.batches}
          @batch-click=${this.handleHarvestBatchClick}
          ></batch-result>
        </div>
        <entity-detail-dialog></entity-detail-dialog>
       </section>
    `;
      }
    };
    __decorateClass([
      r5()
    ], PeternakanPage.prototype, "animals", 2);
    __decorateClass([
      r5()
    ], PeternakanPage.prototype, "livestockList", 2);
    __decorateClass([
      r5()
    ], PeternakanPage.prototype, "batches", 2);
    __decorateClass([
      r5()
    ], PeternakanPage.prototype, "harvests", 2);
    PeternakanPage = __decorateClass([
      t3("peternakan-page")
    ], PeternakanPage);
  }
});

// src/utils/color.utils.ts
function getRowColor(eventType) {
  switch (eventType.toUpperCase()) {
    case "ALARM_HI":
    case "ALARMHI":
    case "ALARM-HI":
      return "bg-red-100 text-red-800";
    case "ALARM_LO":
    case "ALARMLOW":
    case "ALARM-LO":
      return "bg-blue-100 text-blue-800";
    case "STATUS":
      return "bg-green-100 text-green-800";
    case "ERROR":
      return "bg-yellow-100 text-yellow-900";
    case "INFO":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-white";
  }
}
var init_color_utils = __esm({
  "src/utils/color.utils.ts"() {
    "use strict";
  }
});

// src/services/event.service.ts
var repo9, fetchAllEvents;
var init_event_service = __esm({
  "src/services/event.service.ts"() {
    "use strict";
    init_repository_factory();
    repo9 = getEventRepository();
    fetchAllEvents = () => repo9.getAll();
  }
});

// src/components/event-table.ts
var EventTable;
var init_event_table = __esm({
  "src/components/event-table.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_color_utils();
    init_event_service();
    EventTable = class extends i4 {
      constructor() {
        super(...arguments);
        this.events = [];
        this.filterId = "";
        this.filterType = "";
        this.filterStartTime = "";
        this.filterEndTime = "";
        this.highlightedKey = "";
      }
      createRenderRoot() {
        return this;
      }
      async connectedCallback() {
        super.connectedCallback();
        await this.loadMockEvents();
      }
      async loadMockEvents() {
        try {
          const data = await fetchAllEvents();
          const prevKey = this.events[0] ? this.getEventKey(this.events[0]) : "";
          const newKey = data[0] ? this.getEventKey(data[0]) : "";
          this.events = data;
          if (newKey && newKey !== prevKey) {
            this.highlightedKey = newKey;
            setTimeout(() => this.highlightedKey = "", 3e3);
          }
        } catch (err) {
          console.error("Load failed:", err);
        }
      }
      getEventKey(e8) {
        return `${e8.timestamp}_${e8.id}`;
      }
      formatDateTime(ts) {
        const date = new Date(ts);
        return date.toLocaleString("sv-SE").replace("T", " ");
      }
      get filteredEvents() {
        const start = this.filterStartTime ? new Date(this.filterStartTime).getTime() : null;
        const end = this.filterEndTime ? new Date(this.filterEndTime).getTime() : null;
        return this.events.filter((e8) => {
          const eventTime = new Date(e8.timestamp).getTime();
          const matchId = !this.filterId || e8.id.toLowerCase().includes(this.filterId.trim().toLowerCase());
          const matchType = !this.filterType || e8.event.toLowerCase() === this.filterType.trim().toLowerCase();
          const matchStart = !start || eventTime >= start;
          const matchEnd = !end || eventTime <= end;
          return matchId && matchType && matchStart && matchEnd;
        });
      }
      handleFilter(e8) {
        const t5 = e8.target;
        switch (t5.name) {
          case "filterId":
            this.filterId = t5.value;
            break;
          case "filterType":
            this.filterType = t5.value;
            break;
          case "filterStart":
            this.filterStartTime = t5.value;
            break;
          case "filterEnd":
            this.filterEndTime = t5.value;
            break;
        }
      }
      resetTimeFilter() {
        this.filterStartTime = "";
        this.filterEndTime = "";
        const startInput = this.renderRoot.querySelector(
          'input[name="filterStart"]'
        );
        const endInput = this.renderRoot.querySelector(
          'input[name="filterEnd"]'
        );
        if (startInput) startInput.value = "";
        if (endInput) endInput.value = "";
      }
      render() {
        return x`
      <div class="mb-4 flex flex-wrap gap-4 items-end">
        <!-- Filter by ID -->
        <div class="flex flex-col min-w-[160px]">
          <label class="text-xs font-bold text-gray-600 mb-1"
            >Filter by ID</label
          >
          <input
            name="filterId"
            type="text"
            class="border border-gray-300 px-3 py-1 rounded text-sm"
            placeholder="e.g. TANK01"
            @input=${this.handleFilter}
          />
        </div>

        <!-- Filter by Event -->
        <div class="flex flex-col min-w-[160px]">
          <label class="text-xs font-bold text-gray-600 mb-1">Event Type</label>
          <select
            name="filterType"
            class="border border-gray-300 px-3 py-1 rounded text-sm"
            @change=${this.handleFilter}
          >
            <option value="">All Events</option>
            <option>ALARM_HI</option>
            <option>ALARM_LO</option>
            <option>STATUS</option>
            <option>ERROR</option>
            <option>INFO</option>
          </select>
        </div>
        <div class="flex flex-row gap-4">
          <!-- Start Time -->
          <div class="flex flex-col min-w-[180px]">
            <label class="text-xs font-bold text-gray-600 mb-1"
              >Start Time</label
            >
            <input
              name="filterStart"
              type="datetime-local"
              class="border border-gray-300 px-3 py-1 rounded text-sm"
              @change=${this.handleFilter}
            />
          </div>

          <!-- End Time -->
          <div class="flex flex-col min-w-[180px]">
            <label class="text-xs font-bold text-gray-600 mb-1">End Time</label>
            <input
              name="filterEnd"
              type="datetime-local"
              class="border border-gray-300 px-3 py-1 rounded text-sm"
              @change=${this.handleFilter}
            />
          </div>

          <!-- Reset Time Button -->
          <div class="flex flex-col justify-end">
            <button
              class="h-[38px] px-3 text-sm bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded flex items-center"
              @click=${this.resetTimeFilter}
            >
              Reset Time
            </button>
          </div>
        </div>

        <div class="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table class="table-auto w-full text-sm">
            <thead
              class="bg-gray-100 text-left text-gray-700 uppercase tracking-wider"
            >
              <tr>
                <th class="px-4 py-2">Timestamp</th>
                <th class="px-4 py-2">ID</th>
                <th class="px-4 py-2">Event</th>
                <th class="px-4 py-2">Description</th>
                <th class="px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              ${this.filteredEvents.map((e8) => {
          const highlight = this.getEventKey(e8) === this.highlightedKey ? "animate-pulse ring-2 ring-yellow-400" : "";
          return x`
                  <tr class="${getRowColor(e8.event)} ${highlight}">
                    <td class="px-4 py-2">
                      ${this.formatDateTime(e8.timestamp)}
                    </td>
                    <td class="px-4 py-2">${e8.id}</td>
                    <td class="px-4 py-2 font-bold uppercase">${e8.event}</td>
                    <td class="px-4 py-2">${e8.description}</td>
                    <td class="px-4 py-2">${e8.value}</td>
                  </tr>
                `;
        })}
            </tbody>
          </table>
        </div>
      </div>
    `;
      }
    };
    __decorateClass([
      r5()
    ], EventTable.prototype, "events", 2);
    __decorateClass([
      r5()
    ], EventTable.prototype, "filterId", 2);
    __decorateClass([
      r5()
    ], EventTable.prototype, "filterType", 2);
    __decorateClass([
      r5()
    ], EventTable.prototype, "filterStartTime", 2);
    __decorateClass([
      r5()
    ], EventTable.prototype, "filterEndTime", 2);
    __decorateClass([
      r5()
    ], EventTable.prototype, "highlightedKey", 2);
    EventTable = __decorateClass([
      t3("event-table")
    ], EventTable);
  }
});

// src/pages/dashboard.ts
var dashboard_exports = {};
__export(dashboard_exports, {
  PageDashboard: () => PageDashboard
});
var PageDashboard;
var init_dashboard = __esm({
  "src/pages/dashboard.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_ui_tabs();
    init_dashboard_mqtt();
    init_hidroponik();
    init_hortikultura();
    init_akuakultur();
    init_peternakan();
    init_event_table();
    PageDashboard = class extends i4 {
      constructor() {
        super(...arguments);
        this.activeTab = "produksi";
        this.domain = "hidroponik";
      }
      createRenderRoot() {
        return this;
      }
      handleTabChange(e8) {
        this.activeTab = e8.detail.id;
      }
      handleDomainSelect(e8) {
        const selected = e8.target.value;
        this.domain = selected;
      }
      renderProduksiContent() {
        return x`
      <div class="mb-4">
        <label class="block mb-2 text-sm font-medium text-gray-700">
          Pilih Domain Produksi:
        </label>
        <select
          @change=${this.handleDomainSelect}
          class="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-800"
        >
          <option value="hidroponik" ?selected=${this.domain === "hidroponik"}>
            🌱 Hidroponik
          </option>
          <option
            value="hortikultura"
            ?selected=${this.domain === "hortikultura"}
          >
            🥬 Hortikultura
          </option>
          <option value="akuakultur" ?selected=${this.domain === "akuakultur"}>
            🐟 Akuakultur
          </option>
          <option value="peternakan" ?selected=${this.domain === "peternakan"}>
            🐔 Peternakan
          </option>
        </select>
      </div>

      <section>
        ${this.domain === "hidroponik" ? x`<hidroponik-page class="block mb-6"></hidroponik-page>` : this.domain === "hortikultura" ? x`<hortikultura-page class="block mb-6"></hortikultura-page>` : this.domain === "akuakultur" ? x`<akuakultur-page class="block mb-6"></akuakultur-page>` : this.domain === "peternakan" ? x`<peternakan-page class="block mb-6"></peternakan-page>` : null}
      </section>
    `;
      }
      // 🔌 Konten untuk tab "Devices" (dashboard-mqtt)
      renderMqttContent() {
        return x`
      <section class="space-y-6">
        <dashboard-mqtt class="block"></dashboard-mqtt>
      </section>
    `;
      }
      // 📜 Konten untuk tab "History"
      renderHistoryContent() {
        return x`
      <section class="space-y-6">
        <event-table class="block mt-6"></event-table>
      </section>
    `;
      }
      render() {
        return x`
      <div class="p-4 space-y-4">
        <ui-tabs
          .tabs=${[
          { id: "produksi", label: "Produksi", icon: "\u{1F3ED}" },
          { id: "devices", label: "Devices", icon: "\u{1F50C}" },
          { id: "history", label: "Event History", icon: "\u{1F4DC}" }
        ]}
          .active=${this.activeTab}
          @dev-tab-change=${this.handleTabChange}
        ></ui-tabs>

        ${this.activeTab === "produksi" ? this.renderProduksiContent() : this.activeTab === "devices" ? this.renderMqttContent() : this.renderHistoryContent()}
      </div>
    `;
      }
    };
    __decorateClass([
      r5()
    ], PageDashboard.prototype, "activeTab", 2);
    __decorateClass([
      r5()
    ], PageDashboard.prototype, "domain", 2);
    PageDashboard = __decorateClass([
      t3("page-dashboard")
    ], PageDashboard);
  }
});

// src/services/devices-config.service.ts
async function http(path, init) {
  const hasBody = init && "body" in init && init.body != null;
  const headers = hasBody ? { "Content-Type": "application/json", ...init?.headers } : init?.headers ?? {};
  const res = await fetch(`${API_BASE2}${path}`, {
    cache: "no-cache",
    ...init,
    headers
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
  }
  if (res.status === 204) return void 0;
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) return void 0;
  return res.json();
}
async function loadDevices() {
  if (USE_HTTP) {
    console.warn("[cfg] loadDevices via HTTP \u2192", API_BASE2);
    const list = await http("/devices");
    cache2.clear();
    list.forEach((d3) => cache2.set(d3.tagNumber, d3));
    return list;
  }
  const ls2 = localStorage.getItem(LS_KEY);
  if (ls2) {
    const arr2 = JSON.parse(ls2);
    cache2.clear();
    arr2.forEach((d3) => cache2.set(d3.tagNumber, d3));
    return arr2;
  }
  const arr = await readMockDevicesCfg();
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
  cache2.clear();
  arr.forEach((d3) => cache2.set(d3.tagNumber, d3));
  return arr;
}
function getByTag(tag) {
  return cache2.get(tag);
}
async function upsertDevice(device) {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  device.meta = {
    createdAt: device.meta?.createdAt ?? now,
    updatedAt: now
  };
  if (USE_HTTP) {
    const exists = cache2.has(device.tagNumber);
    const saved = exists ? await http(
      `/devices/${encodeURIComponent(device.tagNumber)}`,
      { method: "PUT", body: JSON.stringify(device) }
    ) : await http("/devices", {
      method: "POST",
      body: JSON.stringify(device)
    });
    cache2.set(saved.tagNumber, saved);
    return saved;
  }
  const arr = Array.from(cache2.values());
  const i6 = arr.findIndex((d3) => d3.tagNumber === device.tagNumber);
  if (i6 >= 0) arr[i6] = device;
  else arr.push(device);
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
  cache2.clear();
  arr.forEach((d3) => cache2.set(d3.tagNumber, d3));
  return device;
}
async function deleteDevice(tag) {
  await http(`/devices/${encodeURIComponent(tag)}`, {
    method: "DELETE"
  });
  cache2.delete(tag);
  return true;
}
async function readMockDevicesCfg() {
  const ENV = "pre-release";
  const BASE = ENV === "pre-release" ? "/taniverse/" : ENV === "production" ? "" : "/";
  const candidates = [
    `${BASE}assets/mock/devices.json`,
    `${BASE}src/assets/mock/devices.json`,
    `${BASE}mock/devices.json`,
    `${BASE}devices.json`
  ];
  for (const url of candidates) {
    try {
      const res = await fetch(url, { cache: "no-cache" });
      if (!res.ok) continue;
      const data = await res.json();
      const list = Array.isArray(data) ? data : Array.isArray(data?.devices) ? data.devices : null;
      if (Array.isArray(list)) return list;
    } catch {
    }
  }
  throw new Error("Tidak menemukan mock devices.json untuk CONFIG.");
}
var USE_HTTP, API_BASE2, LS_KEY, cache2;
var init_devices_config_service = __esm({
  "src/services/devices-config.service.ts"() {
    "use strict";
    USE_HTTP = false;
    API_BASE2 = import.meta?.env?.VITE_API_BASE || "http://localhost:8080/api";
    LS_KEY = "mock.devices.config";
    cache2 = /* @__PURE__ */ new Map();
  }
});

// src/components/device-events.ts
var DeviceEvents;
var init_device_events = __esm({
  "src/components/device-events.ts"() {
    "use strict";
    init_devices_config_service();
    DeviceEvents = class {
      static async handleTagPicked(tag, tags, setDevice) {
        let found = getByTag(tag);
        if (!found) {
          const list = await loadDevices();
          const f3 = list.find((d3) => d3.tagNumber === tag);
          if (f3) {
            setDevice(structuredClone(f3), "edit");
          }
          return;
        }
        setDevice(structuredClone(found), "edit");
      }
      static async loadAllDevices() {
        return await loadDevices();
      }
      static async handleDelete(tag, tags, onAfterDelete) {
        if (!tag) return false;
        const confirm1 = confirm(
          "Perubahan belum disimpan akan hilang.\nHapus device ini?"
        );
        const confirm2 = confirm(`Hapus device "${tag}"?`);
        if (!confirm1 || !confirm2) return false;
        try {
          await deleteDevice(tag);
          const updatedTags = tags.filter((t5) => t5 !== tag);
          const list = await loadDevices();
          const nextDev = list.find((d3) => d3.tagNumber === updatedTags[0]);
          if (nextDev) {
            onAfterDelete(structuredClone(nextDev), "edit");
          } else {
            onAfterDelete();
          }
          return true;
        } catch (err) {
          alert(`Gagal hapus: ${err?.message || err}`);
          return false;
        }
      }
      static async handleSave(device, mode, tags, onAfterSave) {
        const now = (/* @__PURE__ */ new Date()).toISOString();
        device.meta = {
          createdAt: device.meta?.createdAt ?? now,
          updatedAt: now
        };
        try {
          const saved = await upsertDevice(device);
          const newTags = tags.includes(saved.tagNumber) ? tags : [...tags, saved.tagNumber].sort();
          onAfterSave(structuredClone(saved), newTags, "edit");
          return true;
        } catch (err) {
          alert(`Gagal simpan: ${err?.message || err}`);
          return false;
        }
      }
      static async handleEditMode(currentTag, tags, onLoaded) {
        const sel = currentTag && tags.includes(currentTag) ? currentTag : tags[0] ?? "";
        if (!sel) return;
        const found = getByTag(sel);
        if (found) {
          onLoaded(structuredClone(found));
        } else {
          const list = await loadDevices();
          const f3 = list.find((d3) => d3.tagNumber === sel);
          if (f3) onLoaded(structuredClone(f3));
        }
      }
    };
  }
});

// src/components/form-builder-field.ts
function isObjectOption(opt) {
  return typeof opt === "object" && "value" in opt && "label" in opt;
}
var FormBuilder;
var init_form_builder_field = __esm({
  "src/components/form-builder-field.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    FormBuilder = class extends i4 {
      constructor() {
        super(...arguments);
        this.inputId = "";
        this.error = "";
        this.value = "";
      }
      createRenderRoot() {
        return this;
      }
      render() {
        const f3 = this.field;
        const span = f3.colSpan ?? 1;
        const base = `${f3.widthClass ?? "w-full"} px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500`;
        if (f3.type === "separator") {
          return x`
        <div class="col-span-2 border-b border-gray-300 mt-2 mb-1">
          ${f3.label ? x`<h3 class="text-sm font-semibold text-gray-600 mb-1">
                ${f3.label}
              </h3>` : null}
        </div>
      `;
        }
        const errorHtml = this.error ? x`<p class="text-sm text-red-600 mt-1">${this.error}</p>` : null;
        switch (f3.type) {
          case "textarea":
            return x`
          <div class="col-span-${span}">
            <label for=${this.inputId} class="block text-sm text-gray-700 mb-1">
              ${f3.label}${f3.required ? " *" : ""}
            </label>
            <textarea
              id=${this.inputId}
              class="${base} resize-none min-h-[90px]"
              .value=${this.value ?? ""}
              ?disabled=${f3.disabled ?? false}
              @input=${(e8) => this.onInput(e8, f3.key)}
            ></textarea>
            ${errorHtml}
          </div>
        `;
          case "select":
            return x`
          <div class="col-span-${span}">
            <label for=${this.inputId} class="block text-sm text-gray-700 mb-1">
              ${f3.label}${f3.required ? " *" : ""}
            </label>
            <select
              id=${this.inputId}
              class="${base}"
              .value=${String(this.value ?? "")}
              ?disabled=${f3.disabled ?? false}
              @change=${(e8) => this.onInput(e8, f3.key)}
            >
              <option value="">-- Pilih --</option>
              ${f3.options?.map(
              (opt) => isObjectOption(opt) ? x`
                      <option
                        value=${String(opt.value)}
                        ?selected=${String(this.value) === String(opt.value)}
                      >
                        ${opt.label}
                      </option>
                    ` : x`
                      <option
                        value=${String(opt)}
                        ?selected=${String(this.value) === String(opt)}
                      >
                        ${opt}
                      </option>
                    `
            )}
            </select>
            ${errorHtml}
          </div>
        `;
          default:
            return x`
          <div class="col-span-${span}">
            <label for=${this.inputId} class="block text-sm text-gray-700 mb-1">
              ${f3.label}${f3.required ? " *" : ""}
            </label>
            <input
              id=${this.inputId}
              type=${f3.type}
              class="${base}"
              .value=${this.value ?? ""}
              ?required=${f3.required ?? false}
              ?disabled=${f3.disabled ?? false}
              @input=${(e8) => this.onInput(e8, f3.key)}
            />
            ${errorHtml}
          </div>
        `;
        }
      }
    };
    __decorateClass([
      n4({ type: Object })
    ], FormBuilder.prototype, "field", 2);
    __decorateClass([
      n4({ type: String })
    ], FormBuilder.prototype, "inputId", 2);
    __decorateClass([
      n4({ attribute: false })
    ], FormBuilder.prototype, "onInput", 2);
    __decorateClass([
      n4({ type: String })
    ], FormBuilder.prototype, "error", 2);
    __decorateClass([
      n4({ type: Object })
    ], FormBuilder.prototype, "value", 2);
    FormBuilder = __decorateClass([
      t3("form-builder-field")
    ], FormBuilder);
  }
});

// src/components/form-builder-buttons.ts
var FormBuilderButtons;
var init_form_builder_buttons = __esm({
  "src/components/form-builder-buttons.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    FormBuilderButtons = class extends i4 {
      constructor() {
        super(...arguments);
        this.mode = "new";
      }
      createRenderRoot() {
        return this;
      }
      connectedCallback() {
        super.connectedCallback();
        console.log("[CRUD BUTTONS] mounted with kind:", this.mode);
      }
      emit(event) {
        this.dispatchEvent(
          new CustomEvent(event, { bubbles: false, composed: true })
        );
      }
      render() {
        return x`
      <div class="flex flex-wrap gap-3 pt-4">
        <button
          class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition cursor-pointer"
          @click=${() => this.emit("submit")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span class="text-sm font-semibold">Submit</span>
        </button>

        <button
          class="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md shadow hover:bg-gray-700 transition cursor-pointer"
          @click=${() => this.emit("cancel")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span class="text-sm font-semibold">Cancel</span>
        </button>

        ${this.mode === "edit" ? x`
              <button
                class="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition cursor-pointer"
                @click=${() => this.emit("delete")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7L5 7M10 11v6m4-6v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12"
                  />
                </svg>
                <span class="text-sm font-semibold">Delete</span>
              </button>
            ` : null}
      </div>
    `;
      }
    };
    __decorateClass([
      n4({ type: String })
    ], FormBuilderButtons.prototype, "mode", 2);
    FormBuilderButtons = __decorateClass([
      t3("form-builder-buttons")
    ], FormBuilderButtons);
  }
});

// src/components/form-builder-section.ts
var FormBuilderSection;
var init_form_builder_section = __esm({
  "src/components/form-builder-section.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    FormBuilderSection = class extends i4 {
      constructor() {
        super(...arguments);
        this.title = "";
        this.desc = "";
        this.fields = [];
        this.model = {};
        this.errors = {};
        this.cols = 2;
      }
      createRenderRoot() {
        return this;
      }
      render() {
        return x`
      <div class="mb-6">
        ${this.title ? x`<h2 class="text-lg font-semibold text-gray-800 mb-2">
              ${this.title}
            </h2>` : null}
        ${this.desc ? x`<p class="text-sm text-gray-600 mb-4">${this.desc}</p>` : null}

        <!-- ✅ Flat key → langsung akses model[key] -->
        <div class="grid grid-cols-1 sm:grid-cols-${this.cols} gap-x-4 gap-y-4">
          ${this.fields.map((field) => {
          const val = this.model[field.key];
          const err = this.errors[field.key] ?? "";
          const span = field.colSpan ?? 1;
          return x`
              <div class="col-span-${span}">
                <form-builder-field
                  .field=${field}
                  .value=${val}
                  .inputId=${`fld-${field.key}`}
                  .error=${err}
                  .onInput=${this.onFieldChange}
                ></form-builder-field>
              </div>
            `;
        })}
        </div>
      </div>
    `;
      }
    };
    __decorateClass([
      n4({ type: String })
    ], FormBuilderSection.prototype, "title", 2);
    __decorateClass([
      n4({ type: String })
    ], FormBuilderSection.prototype, "desc", 2);
    __decorateClass([
      n4({ type: Array })
    ], FormBuilderSection.prototype, "fields", 2);
    __decorateClass([
      n4({ type: Object })
    ], FormBuilderSection.prototype, "model", 2);
    __decorateClass([
      n4({ type: Object })
    ], FormBuilderSection.prototype, "errors", 2);
    __decorateClass([
      n4({ attribute: false })
    ], FormBuilderSection.prototype, "onFieldChange", 2);
    __decorateClass([
      n4({ type: Number })
    ], FormBuilderSection.prototype, "cols", 2);
    FormBuilderSection = __decorateClass([
      t3("form-builder-section")
    ], FormBuilderSection);
  }
});

// src/components/device-picker.ts
var DevicePicker;
var init_device_picker = __esm({
  "src/components/device-picker.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_device_service();
    DevicePicker = class extends i4 {
      constructor() {
        super(...arguments);
        this.devices = [];
        this.value = null;
      }
      createRenderRoot() {
        return this;
      }
      connectedCallback() {
        super.connectedCallback();
        fetchAllDevices().then((list) => {
          this.devices = list;
          this.requestUpdate();
        });
      }
      handleChange(e8) {
        const target = e8.target;
        const selected = target.value;
        this.value = selected;
        const pickedDevice = this.devices.find((d3) => d3.tagNumber === selected);
        console.log("[device-picker] Selected tagNumber:", selected);
        console.log("[device-picker] Selected device:", pickedDevice);
        this.dispatchEvent(
          new CustomEvent("device-select", {
            detail: {
              mode: selected === "" ? "new" : "edit",
              tagNumber: selected,
              device: pickedDevice
              // ✅ Kirim objek lengkap
            },
            bubbles: true,
            composed: true
          })
        );
      }
      render() {
        return x`
      <div class="flex flex-col space-y-1 w-full max-w-md">
        <label for="device-picker" class="text-sm font-medium text-gray-700">
          Pilih Perangkat
        </label>
        <select
          id="device-picker"
          class="form-select w-full border rounded-md px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          @change=${this.handleChange}
        >
          <option value="">🆕 Tambah Tagnumber Baru</option>
          ${this.devices.map(
          (dev) => x`
              <option
                value=${dev.tagNumber}
                ?selected=${this.value === dev.tagNumber}
              >
                ${dev.tagNumber} — ${dev.description}
              </option>
            `
        )}
        </select>
      </div>
    `;
      }
    };
    __decorateClass([
      r5()
    ], DevicePicker.prototype, "devices", 2);
    __decorateClass([
      n4({ type: String })
    ], DevicePicker.prototype, "value", 2);
    DevicePicker = __decorateClass([
      t3("device-picker")
    ], DevicePicker);
  }
});

// src/components/device-ui.ts
var DeviceUI;
var init_device_ui = __esm({
  "src/components/device-ui.ts"() {
    "use strict";
    DeviceUI = class {
      /**
       * Kelas Tailwind untuk segmented button (mode switch)
       */
      static btnCls(active) {
        const base = "relative px-3 md:px-4 py-1.5 rounded-md text-sm font-medium transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2";
        const on = "bg-white text-slate-900 shadow ring-1 ring-slate-200";
        const off = "text-slate-600 hover:text-slate-900 hover:bg-white/60";
        return `${base} ${active ? on : off}`;
      }
      /**
       * Tampilkan toast sementara (berbasis DOM langsung)
       */
      static showToast(msg, error = false, duration = 1600) {
        const el2 = document.createElement("div");
        el2.textContent = msg;
        el2.className = `fixed z-50 bottom-4 right-4 px-3 py-2 rounded shadow ${error ? "bg-rose-600 text-white" : "bg-emerald-600 text-white"}`;
        document.body.appendChild(el2);
        setTimeout(() => el2.remove(), duration);
      }
    };
  }
});

// ../models/device.model.ts
var STANDARD_UNITS;
var init_device_model = __esm({
  "../models/device.model.ts"() {
    "use strict";
    STANDARD_UNITS = [
      { label: "\xB0C - Suhu", value: "\xB0C" },
      { label: "% - Persentase", value: "%" },
      { label: "cm - Panjang, Level, Ketinggian", value: "cm" },
      { label: "RH% - Kelembaban", value: "RH%" },
      { label: "m/s - Kecepatan", value: "m/s" },
      { label: "lux - Intensitas Cahaya", value: "lux" },
      { label: "ppm - Konsentrasi Gas", value: "ppm" },
      { label: "kPa - Tekanan", value: "kPa" },
      { label: "mV - Tegangan", value: "mV" },
      { label: "\u03BCS/cm - Konduktivitas", value: "\u03BCS/cm" },
      { label: "pH - Keasaman", value: "pH" },
      { label: "NTU - Kekeruhan", value: "NTU" }
    ];
  }
});

// src/pages/konfigurasi/schema/device-config-fields.ts
var deviceConfigFields;
var init_device_config_fields = __esm({
  "src/pages/konfigurasi/schema/device-config-fields.ts"() {
    "use strict";
    init_device_model();
    deviceConfigFields = [
      {
        title: "Informasi Umum",
        fields: [
          {
            key: "tagNumber",
            label: "Tag Number",
            type: "text",
            required: true,
            helpText: "Kode unik perangkat",
            widthClass: "w-full max-w-md"
          },
          {
            key: "type",
            label: "Tipe",
            type: "select",
            required: true,
            options: [
              { value: "sensor", label: "Sensor" },
              { value: "actuator", label: "Actuator" }
            ],
            widthClass: "w-full max-w-md"
          },
          {
            key: "description",
            label: "Deskripsi",
            type: "textarea",
            widthClass: "w-full",
            colSpan: 2
          },
          {
            key: "unit",
            label: "Satuan",
            type: "select",
            options: STANDARD_UNITS,
            // value: string (mis. "°C", "%", "ppm", dll)
            widthClass: "w-full max-w-md"
          },
          {
            key: "writable",
            label: "Writable",
            type: "select",
            options: [
              { value: true, label: "Ya (Actuator)" },
              { value: false, label: "Tidak (Sensor)" }
            ],
            widthClass: "w-full max-w-md"
          },
          {
            key: "location",
            label: "Lokasi",
            type: "text",
            widthClass: "w-full",
            colSpan: 2
          }
        ]
      },
      // ✅ Range & Alarm → flattened
      {
        title: "Range & Alarm",
        fields: [
          {
            key: "ranges_low",
            label: "Min",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "ranges_high",
            label: "Max",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "alarms_low",
            label: "Alarm Rendah",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "alarms_high",
            label: "Alarm Tinggi",
            type: "number",
            widthClass: "w-full max-w-md"
          }
        ]
      },
      // ✅ IO → flattened
      {
        title: "Koneksi Fisik (IO)",
        fields: [
          {
            key: "io_bus",
            label: "Tipe Bus",
            type: "select",
            options: [
              { value: "gpio", label: "GPIO" },
              { value: "adc", label: "ADC" },
              { value: "i2c", label: "I2C" }
            ],
            widthClass: "w-full max-w-md",
            required: true
          },
          {
            key: "io_pin",
            label: "Pin (GPIO/ADC)",
            type: "number",
            helpText: "Pin fisik (jika GPIO atau ADC)",
            widthClass: "w-full max-w-md"
          },
          {
            key: "io_address",
            label: "I2C Address",
            type: "text",
            helpText: "Contoh: 0x40",
            widthClass: "w-full max-w-md"
          },
          {
            key: "io_channel",
            label: "Channel",
            type: "number",
            helpText: "Channel opsional (ADC multiplexer, dsb)",
            widthClass: "w-full max-w-md"
          }
        ]
      },
      // ✅ Sampling → flattened
      {
        title: "Sampling (Sensor)",
        fields: [
          {
            key: "sample_periodMs",
            label: "Periode Sampling (ms)",
            type: "number",
            helpText: "Interval pengambilan data sensor",
            widthClass: "w-full max-w-md"
          },
          {
            key: "sample_deadband",
            label: "Deadband",
            type: "number",
            helpText: "Perubahan minimum agar nilai dikirim",
            widthClass: "w-full max-w-md"
          }
        ]
      },
      // ✅ Display → flattened
      {
        title: "Display",
        fields: [
          {
            key: "display_precision",
            label: "Presisi Tampilan",
            type: "number",
            helpText: "Jumlah angka di belakang koma",
            widthClass: "w-full max-w-md"
          }
        ]
      },
      // ✅ Actuator control (allowedStates: string[])
      {
        title: "Kontrol Aktuator",
        fields: [
          {
            key: "allowedStates",
            label: "Daftar State Diizinkan",
            type: "text",
            helpText: "Pisahkan dengan koma, misal: ON,OFF,AUTO (akan di-parse menjadi array)",
            widthClass: "w-full",
            colSpan: 2
          },
          {
            key: "defaultState",
            label: "State Default",
            type: "text",
            helpText: "State awal saat startup",
            widthClass: "w-full max-w-md"
          }
        ]
      }
    ];
  }
});

// src/components/device-state-handler.ts
var DeviceStateHandler;
var init_device_state_handler = __esm({
  "src/components/device-state-handler.ts"() {
    "use strict";
    DeviceStateHandler = class {
      static newTemplate() {
        return {
          tagNumber: "",
          location: "",
          sensor: {
            ph: 0,
            ec: 0
          }
          // Tambah properti default lainnya
        };
      }
      static revalidate(model, isNew = false) {
        const errors = [];
        const errorsMap = {};
        if (!model.tagNumber) {
          errors.push("Tag tidak boleh kosong");
          errorsMap["tagNumber"] = "Wajib diisi";
        }
        return { errors, errorsMap };
      }
      static patch(model, path, value) {
        const keys = path.split(".");
        let current = model;
        keys.slice(0, -1).forEach((k2) => {
          if (!(k2 in current)) current[k2] = {};
          current = current[k2];
        });
        current[keys[keys.length - 1]] = value;
      }
    };
  }
});

// src/pages/konfigurasi/devices/device-config.ts
function setNestedValue(obj, path, value) {
  const keys = path.split(".");
  let current = obj;
  keys.slice(0, -1).forEach((k2) => {
    if (!(k2 in current)) current[k2] = {};
    current = current[k2];
  });
  current[keys[keys.length - 1]] = value;
}
var DeviceConfig;
var init_device_config = __esm({
  "src/pages/konfigurasi/devices/device-config.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_form_builder_field();
    init_form_builder_buttons();
    init_form_builder_section();
    init_device_picker();
    init_device_ui();
    init_device_config_fields();
    init_device_state_handler();
    init_device_events();
    DeviceConfig = class extends i4 {
      constructor() {
        super(...arguments);
        this.model = {};
        this.errors = {};
        this.tags = [];
        this.dirty = false;
        this.mode = "edit";
        this.handleFieldChange = (e8, key) => {
          const target = e8.target;
          const raw = target.value;
          const value = target.type === "number" && raw !== "" ? Number(raw) : raw;
          setNestedValue(this.model, key, value);
          this.dirty = true;
          this.revalidate();
        };
        this.handleSave = async () => {
          this.revalidate();
          if (Object.keys(this.errors).length) return;
          const success = await DeviceEvents.handleSave(
            this.model,
            this.mode,
            this.tags,
            (saved, updatedTags, mode) => {
              this.tags = updatedTags;
              this.setDevice(saved, mode);
            }
          );
          if (success) DeviceUI.showToast("Saved \u2705");
        };
        this.handleDelete = async () => {
          const success = await DeviceEvents.handleDelete(
            this.model.tagNumber,
            this.tags,
            (next, mode) => {
              if (next) {
                this.setDevice(next, mode || "edit");
                this.tags = this.tags.filter((t5) => t5 !== this.model.tagNumber);
              } else {
                const fresh = DeviceStateHandler.newTemplate();
                this.setDevice(fresh, "new");
                this.tags = [];
              }
            }
          );
          if (success) DeviceUI.showToast("Deleted \u{1F5D1}\uFE0F");
        };
        this.handleCancel = () => {
          if (this.dirty && !confirm("Perubahan belum disimpan. Tetap keluar?"))
            return;
          window.history.back();
        };
      }
      createRenderRoot() {
        return this;
      }
      async connectedCallback() {
        super.connectedCallback();
        await this.loadDevicesAndInit();
        const list = await DeviceEvents.loadAllDevices();
        this.tags = list.map((d3) => d3.tagNumber).filter(Boolean).sort();
        const tagParam = new URL(location.href).searchParams.get("tag");
        const picked = tagParam && this.tags.includes(tagParam) ? tagParam : this.tags[0] ?? "";
        const found = picked ? list.find((d3) => d3.tagNumber === picked) : void 0;
        if (found) {
          this.setDevice(found, "edit");
        } else {
          const fresh = DeviceStateHandler.newTemplate();
          this.setDevice(fresh, "new");
        }
      }
      async loadDevicesAndInit() {
        const list = await DeviceEvents.loadAllDevices();
        this.tags = list.map((d3) => d3.tagNumber).filter(Boolean).sort();
        const urlParams = new URL(location.href).searchParams;
        const tagParam = urlParams.get("tag");
        const picked = tagParam && this.tags.includes(tagParam) ? tagParam : this.tags[0] ?? "";
        const found = picked ? list.find((d3) => d3.tagNumber === picked) : void 0;
        if (found) {
          this.setDevice(structuredClone(found), "edit");
        } else {
          const fresh = DeviceStateHandler.newTemplate();
          this.setDevice(fresh, "new");
        }
      }
      setDevice(device, mode) {
        this.model = structuredClone(device);
        this.mode = mode;
        this.revalidate();
        this.dirty = false;
      }
      revalidate() {
        const { errors, errorsMap } = DeviceStateHandler.revalidate(
          this.model,
          this.mode === "new"
        );
        this.errors = errorsMap;
      }
      handleDevicePick(e8) {
        const { mode, device } = e8.detail;
        if (mode === "new") {
          const fresh = DeviceStateHandler.newTemplate();
          this.setDevice(fresh, "new");
        } else if (device) {
          this.setDevice(structuredClone(device), "edit");
        }
      }
      render() {
        return x`
      <div class="mb-6">
        <div class="mb-4">
          <device-picker
            .value=${this.model.tagNumber}
            @device-select=${this.handleDevicePick}
          >
          </device-picker>
        </div>

        <h2 class="text-lg font-semibold text-gray-800 mb-1">
          Konfigurasi Perangkat
        </h2>

        ${deviceConfigFields.map(
          (section) => x`
            <form-builder-section
              .title=${section.title}
              .desc=${section.desc ?? ""}
              .fields=${section.fields}
              .model=${this.model}
              .errors=${this.errors}
              .cols=${2}
              .onFieldChange=${this.handleFieldChange}
            ></form-builder-section>
          `
        )}

        <form-builder-buttons
          class="mt-4"
          .mode=${this.mode}
          @submit=${this.handleSave}
          @cancel=${this.handleCancel}
          @delete=${this.handleDelete}
        ></form-builder-buttons>
      </div>
    `;
      }
    };
    __decorateClass([
      r5()
    ], DeviceConfig.prototype, "model", 2);
    __decorateClass([
      r5()
    ], DeviceConfig.prototype, "errors", 2);
    __decorateClass([
      r5()
    ], DeviceConfig.prototype, "tags", 2);
    __decorateClass([
      r5()
    ], DeviceConfig.prototype, "dirty", 2);
    __decorateClass([
      r5()
    ], DeviceConfig.prototype, "mode", 2);
    DeviceConfig = __decorateClass([
      t3("device-config")
    ], DeviceConfig);
  }
});

// src/components/mqtt-control-panel.ts
var MqttControlPanel;
var init_mqtt_control_panel = __esm({
  "src/components/mqtt-control-panel.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    MqttControlPanel = class extends i4 {
      constructor() {
        super(...arguments);
        this.simulating = false;
      }
      createRenderRoot() {
        return this;
      }
      emit(name2) {
        this.dispatchEvent(
          new CustomEvent(name2, { bubbles: true, composed: true })
        );
      }
      render() {
        return x`
      <div class="flex flex-wrap gap-2 mt-4">
        <button
          class="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          @click=${() => this.emit("publish")}
        >
          📤 Publish Now
        </button>

        <button
          class="px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          @click=${() => this.emit("subscribe")}
        >
          📡 Subscribe
        </button>

        ${this.simulating ? x`
              <button
                class="px-3 py-2 rounded bg-rose-600 text-white hover:bg-rose-700"
                @click=${() => this.emit("stop-sim")}
              >
                ⏹️ Stop Simulation
              </button>
            ` : x`
              <button
                class="px-3 py-2 rounded bg-amber-500 text-white hover:bg-amber-600"
                @click=${() => this.emit("start-sim")}
              >
                ▶️ Start Simulation
              </button>
            `}
      </div>
    `;
      }
    };
    __decorateClass([
      n4({ type: Boolean })
    ], MqttControlPanel.prototype, "simulating", 2);
    MqttControlPanel = __decorateClass([
      t3("mqtt-control-panel")
    ], MqttControlPanel);
  }
});

// src/pages/konfigurasi/devices/dev-config-mqtt.ts
var DevConfigMqtt;
var init_dev_config_mqtt = __esm({
  "src/pages/konfigurasi/devices/dev-config-mqtt.ts"() {
    "use strict";
    init_lit();
    init_context();
    init_decorators();
    init_mqtt_esm();
    init_mqtt_context();
    init_devices_config_service();
    init_mqtt_control_panel();
    DevConfigMqtt = class extends i4 {
      constructor() {
        super(...arguments);
        this.allTags = [];
        this.selectedTags = /* @__PURE__ */ new Set();
        this.deviceList = [];
        this.client = null;
        this.simulating = false;
        this.logs = [];
      }
      createRenderRoot() {
        return this;
      }
      async connectedCallback() {
        super.connectedCallback();
        const list = await loadDevices();
        this.deviceList = list;
        this.allTags = list.map((d3) => d3.tagNumber).filter(Boolean).sort();
      }
      getDevice(tag) {
        return this.deviceList.find((d3) => d3.tagNumber === tag);
      }
      connectMQTT() {
        if (this.client) return;
        this.client = mqtt_esm_default.connect("ws://localhost:9001");
        this.client.on("connect", () => this.log("\u2705 MQTT connected"));
        this.client.on("error", (err) => this.log("\u274C MQTT error: " + err.message));
        this.client.on(
          "message",
          (topic, payload) => this.log(`\u{1F4E5} ${topic} \u2192 ${payload.toString()}`)
        );
      }
      log(msg) {
        this.logs = [
          `[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] ${msg}`,
          ...this.logs
        ].slice(0, 100);
      }
      toggleTag(tag, checked) {
        const tags = new Set(this.selectedTags);
        checked ? tags.add(tag) : tags.delete(tag);
        this.selectedTags = tags;
      }
      buildPayload(tag) {
        return JSON.stringify({
          tagNumber: tag,
          value: parseFloat((Math.random() * 100).toFixed(2)),
          timestamp: Date.now()
        });
      }
      generateTopic(tag, type) {
        const nodeId = "esp-node-1";
        const device = this.getDevice(tag);
        const location2 = (device?.location ?? "").toLowerCase().replace(/[\/\\ ]/g, "-");
        const suffix = type === "sensor" ? "value" : "state";
        return `${nodeId}/${location2}/${tag}/${suffix}`;
      }
      publishOnce() {
        this.connectMQTT();
        this.selectedTags.forEach((tag) => {
          const dev = this.getDevice(tag);
          if (!dev) return;
          const topic = this.generateTopic(tag, dev.type);
          const payload = this.buildPayload(tag);
          this.client?.publish(topic, payload);
          this.log(`\u{1F4E4} Published to ${topic}: ${payload}`);
        });
      }
      subscribeTopics() {
        this.connectMQTT();
        this.selectedTags.forEach((tag) => {
          const dev = this.getDevice(tag);
          if (!dev) return;
          const topic = this.generateTopic(tag, dev.type);
          this.client?.subscribe(topic);
          this.log(`\u{1F4E1} Subscribed to ${topic}`);
        });
      }
      startSimulation() {
        this.connectMQTT();
        if (this.simulating) return;
        this.simulating = true;
        this.log(`\u25B6\uFE0F Simulation started`);
        this.intervalHandle = setInterval(() => this.publishOnce(), 2e3);
      }
      stopSimulation() {
        if (!this.simulating) return;
        clearInterval(this.intervalHandle);
        this.simulating = false;
        this.log(`\u23F9\uFE0F Simulation stopped`);
      }
      render() {
        return x`
      <div class="space-y-4">
        <div>
          <label class="text-sm font-semibold">Device Tags</label>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            ${this.allTags.map(
          (tag) => x`
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    .checked=${this.selectedTags.has(tag)}
                    @change=${(e8) => this.toggleTag(tag, e8.target.checked)}
                  />
                  <span class="text-sm font-mono">${tag}</span>
                </label>
              `
        )}
          </div>
        </div>

        <mqtt-control-panel
          .simulating=${this.simulating}
          @publish=${this.publishOnce}
          @subscribe=${this.subscribeTopics}
          @start-sim=${this.startSimulation}
          @stop-sim=${this.stopSimulation}
        ></mqtt-control-panel>

        <div>
          <label class="text-sm font-semibold">Log</label>
          <div
            class="bg-slate-100 border rounded p-2 mt-1 text-xs font-mono max-h-40 overflow-y-auto"
          >
            ${this.logs.map((l3) => x`<div>${l3}</div>`)}
          </div>
        </div>
      </div>
    `;
      }
    };
    __decorateClass([
      r5()
    ], DevConfigMqtt.prototype, "allTags", 2);
    __decorateClass([
      r5()
    ], DevConfigMqtt.prototype, "selectedTags", 2);
    __decorateClass([
      r5()
    ], DevConfigMqtt.prototype, "deviceList", 2);
    __decorateClass([
      r5()
    ], DevConfigMqtt.prototype, "client", 2);
    __decorateClass([
      r5()
    ], DevConfigMqtt.prototype, "simulating", 2);
    __decorateClass([
      r5()
    ], DevConfigMqtt.prototype, "logs", 2);
    __decorateClass([
      c4({ context: mqttContext, subscribe: true }),
      r5()
    ], DevConfigMqtt.prototype, "ctx", 2);
    DevConfigMqtt = __decorateClass([
      t3("dev-config-mqtt")
    ], DevConfigMqtt);
  }
});

// src/pages/konfigurasi/entitas/entitas-list.ts
var EntitasList;
var init_entitas_list = __esm({
  "src/pages/konfigurasi/entitas/entitas-list.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    EntitasList = class extends i4 {
      constructor() {
        super(...arguments);
        this.kind = "tanaman";
        this.plants = [];
        this.fishes = [];
        this.poultry = [];
      }
      createRenderRoot() {
        return this;
      }
      handleAdd(kind) {
        this.dispatchEvent(
          new CustomEvent("add-item", {
            detail: { kind },
            bubbles: true,
            composed: true
          })
        );
      }
      handleEdit(item, kind) {
        this.dispatchEvent(
          new CustomEvent("edit-item", {
            detail: { item, kind },
            bubbles: true,
            composed: true
          })
        );
      }
      renderCard(title, emoji, kind, items) {
        return x`
      <div class="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-lg font-semibold">${emoji} ${title}</h3>
          <button
            class="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
            @click=${() => this.handleAdd(kind)}
          >
            ➕ Tambah
          </button>
        </div>
        ${items?.length ? x`
              <ul class="space-y-2">
                ${items.map(
          (item) => x`
                    <li
                      class="p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer"
                      @click=${() => this.handleEdit(item, kind)}
                    >
                      <div class="font-medium">${item.name}</div>
                      <div class="text-sm text-gray-500">${item.id}</div>
                    </li>
                  `
        )}
              </ul>
            ` : x`<div class="text-gray-500 text-sm italic">
              Belum ada data.
            </div>`}
      </div>
    `;
      }
      render() {
        return x`
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        ${this.renderCard("Tanaman", "\u{1F331}", "tanaman", this.plants)}
        ${this.renderCard("Ikan", "\u{1F41F}", "ikan", this.fishes)}
        ${this.renderCard("Ternak", "\u{1F413}", "ayam", this.poultry)}
      </div>
    `;
      }
    };
    __decorateClass([
      n4({ type: String })
    ], EntitasList.prototype, "kind", 2);
    __decorateClass([
      n4({ type: Array })
    ], EntitasList.prototype, "plants", 2);
    __decorateClass([
      n4({ type: Array })
    ], EntitasList.prototype, "fishes", 2);
    __decorateClass([
      n4({ type: Array })
    ], EntitasList.prototype, "poultry", 2);
    EntitasList = __decorateClass([
      t3("entitas-list")
    ], EntitasList);
  }
});

// src/pages/konfigurasi/schema/livestock-fields.ts
var livestockFormFields;
var init_livestock_fields = __esm({
  "src/pages/konfigurasi/schema/livestock-fields.ts"() {
    "use strict";
    livestockFormFields = [
      {
        title: "Informasi Umum",
        fields: [
          {
            key: "id",
            label: "ID Ayam",
            type: "text",
            widthClass: "w-full max-w-md"
          },
          {
            key: "name",
            label: "Nama Ternak",
            type: "text",
            required: true,
            widthClass: "w-full",
            colSpan: 2
          }
        ]
      },
      {
        title: "\u{1F4CA} Karakteristik",
        fields: [
          {
            key: "breed",
            label: "Ras / Jenis",
            type: "text",
            widthClass: "w-full",
            colSpan: 2
          },
          {
            key: "growthDaysMin",
            label: "Hari Tumbuh Min",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "growthDaysMax",
            label: "Hari Tumbuh Max",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "avgWeightKg",
            label: "Berat Rata-rata (kg)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "pricePerKg",
            label: "Harga per Kg",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "costPerUnit",
            label: "Biaya per Ekor",
            type: "number",
            widthClass: "w-full max-w-md"
          }
        ]
      },
      {
        title: "\u{1F4C8} Aspek Lingkungan",
        fields: [
          {
            key: "tempMinC",
            label: "Suhu Min (\xB0C)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "tempMaxC",
            label: "Suhu Max (\xB0C)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "phMin",
            label: "pH Min",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "phMax",
            label: "pH Max",
            type: "number",
            widthClass: "w-full max-w-md"
          }
        ]
      }
    ];
  }
});

// src/pages/konfigurasi/schema/aquatic-fields.ts
var aquaticFormFields;
var init_aquatic_fields = __esm({
  "src/pages/konfigurasi/schema/aquatic-fields.ts"() {
    "use strict";
    aquaticFormFields = [
      {
        title: "Informasi Umum",
        fields: [
          {
            key: "id",
            label: "ID Ikan",
            type: "text",
            widthClass: "w-full max-w-md"
          },
          {
            key: "name",
            label: "Nama Spesies",
            type: "text",
            required: true,
            widthClass: "w-full",
            colSpan: 2
          }
        ]
      },
      {
        title: "\u{1F4CA} Karakteristik",
        fields: [
          {
            key: "growthDaysMin",
            label: "Hari Tumbuh Min",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "growthDaysMax",
            label: "Hari Tumbuh Max",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "avgWeightG",
            label: "Berat Rata-rata (g)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "pricePerKg",
            label: "Harga per Kg",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "costPerUnit",
            label: "Biaya per Benih",
            type: "number",
            widthClass: "w-full max-w-md"
          }
        ]
      },
      {
        title: "\u{1F4C8} Parameter Lingkungan",
        fields: [
          {
            key: "minTempC",
            label: "Suhu Min (\xB0C)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "maxTempC",
            label: "Suhu Max (\xB0C)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "salinityMinPpt",
            label: "Salinitas Min (ppt)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "salinityMaxPpt",
            label: "Salinitas Max (ppt)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "phMin",
            label: "pH Min",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "phMax",
            label: "pH Max",
            type: "number",
            widthClass: "w-full max-w-md"
          }
        ]
      }
    ];
  }
});

// src/pages/konfigurasi/schema/plant-fields.ts
var plantFormFields;
var init_plant_fields = __esm({
  "src/pages/konfigurasi/schema/plant-fields.ts"() {
    "use strict";
    plantFormFields = [
      {
        title: "Informasi Umum",
        fields: [
          {
            key: "id",
            label: "ID Tanaman",
            type: "text",
            required: true,
            helpText: "Kode unik tanaman",
            widthClass: "w-full max-w-md"
          },
          {
            key: "name",
            label: "Nama Tanaman",
            type: "text",
            required: true,
            widthClass: "w-full",
            colSpan: 2
          }
        ]
      },
      {
        title: "\u{1F4CA} Karakteristik",
        fields: [
          {
            key: "growthDaysMin",
            label: "Hari Tumbuh Min",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "growthDaysMax",
            label: "Hari Tumbuh Max",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "pricePerKg",
            label: "Harga per Kg",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "costPerUnit",
            label: "Biaya per Tanaman",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "avgWeightG",
            label: "Berat Rata-rata (g)",
            type: "number",
            widthClass: "w-full max-w-md"
          }
        ]
      },
      {
        title: "Karakteristik",
        fields: [
          {
            key: "heightMinCm",
            label: "Tinggi Min (cm)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "heightMaxCm",
            label: "Tinggi Max (cm)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "spacingRowCm",
            label: "Jarak Baris (cm)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "spacingColCm",
            label: "Jarak Kolom (cm)",
            type: "number",
            widthClass: "w-full max-w-md"
          }
        ]
      },
      {
        title: "Parameter Lingkungan",
        fields: [
          {
            key: "ecMin",
            label: "EC Min",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "ecMax",
            label: "EC Max",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "phMin",
            label: "pH Min",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "phMax",
            label: "pH Max",
            type: "number",
            widthClass: "w-full max-w-md"
          }
        ]
      }
    ];
  }
});

// src/pages/konfigurasi/entitas/form-entitas.ts
var FormEntitas;
var init_form_entitas = __esm({
  "src/pages/konfigurasi/entitas/form-entitas.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_livestock_fields();
    init_aquatic_fields();
    init_plant_fields();
    init_form_builder_section();
    init_form_builder_buttons();
    FormEntitas = class extends i4 {
      constructor() {
        super(...arguments);
        this.mode = "new";
        this.value = {};
        this.draft = {};
        this.errors = {};
        this.handleFieldChange = (e8, key) => {
          const target = e8.target;
          const field = this.allFields.find((f3) => f3.key === key);
          let v2 = target.value;
          if (field?.type === "number") {
            const n6 = parseFloat(v2);
            v2 = Number.isNaN(n6) ? 0 : n6;
          }
          this.draft = { ...this.draft, [key]: v2 };
          if (field?.required && (v2 === "" || v2 === null || v2 === void 0)) {
            this.errors = {
              ...this.errors,
              [key]: `Field "${field.label}" wajib diisi.`
            };
          } else {
            const { [key]: _2, ...rest } = this.errors;
            this.errors = rest;
          }
        };
        this.handleSubmit = (e8) => {
          e8?.preventDefault();
          e8?.stopPropagation();
          const res = this.validate();
          if (!res.valid) {
            alert(res.message);
            return;
          }
          this.dispatchEvent(
            new CustomEvent("submit", {
              detail: this.draft,
              bubbles: true,
              composed: true
            })
          );
        };
        this.handleCancel = () => {
          this.dispatchEvent(new CustomEvent("cancel"));
          this.draft = { ...this.value };
        };
        this.handleDelete = () => {
          if (!confirm("Yakin ingin menghapus data ini?")) return;
          this.dispatchEvent(
            new CustomEvent("delete", {
              detail: {
                kind: this.kind,
                id: this.value?.id ?? this.value?.name
              },
              bubbles: true,
              composed: true
            })
          );
        };
      }
      createRenderRoot() {
        return this;
      }
      get formTitle() {
        switch (this.kind) {
          case "ayam":
            return { icon: "\u{1F414}", text: "Jenis Ternak Ayam", color: "yellow" };
          case "ikan":
            return { icon: "\u{1F41F}", text: "Jenis Ikan / Akuatik", color: "blue" };
          case "tanaman":
            return { icon: "\u{1F331}", text: "Jenis Tanaman", color: "green" };
          default:
            return { icon: "", text: "", color: "gray" };
        }
      }
      get formSections() {
        switch (this.kind) {
          case "ayam":
            return livestockFormFields;
          case "ikan":
            return aquaticFormFields;
          case "tanaman":
            return plantFormFields;
          // ✅ FIXED
          default:
            return [];
        }
      }
      get allFields() {
        return this.formSections.flatMap((section) => section.fields);
      }
      connectedCallback() {
        super.connectedCallback();
        console.log("[FORM ENTITAS] mounted with kind:", this.kind);
      }
      updated(changed) {
        if (changed.has("value")) {
          this.draft = { ...this.value };
        }
      }
      validate() {
        for (const f3 of this.allFields) {
          const val = this.draft[f3.key];
          if (f3.required && (val === void 0 || val === null || val === "")) {
            return { valid: false, message: `Field "${f3.label}" wajib diisi.` };
          }
        }
        return { valid: true };
      }
      render() {
        const { icon, text, color } = this.formTitle;
        const bgMap = {
          yellow: "border-yellow-300 bg-yellow-50",
          blue: "border-blue-300 bg-blue-50",
          green: "border-green-300 bg-green-50",
          gray: "border-gray-300 bg-gray-50"
        };
        const textMap = {
          yellow: "text-yellow-800",
          blue: "text-blue-800",
          green: "text-green-800",
          gray: "text-gray-800"
        };
        return x`
      <section class="border rounded-xl p-4 shadow-sm ${bgMap[color]}">
        <h2
          class="text-xl font-semibold mb-3 flex items-center gap-2 ${textMap[color]}"
        >
          ${icon} ${text}
        </h2>

        ${this.formSections.map(
          (section) => x`
            <form-builder-section
              .title=${section.title}
              .desc=${section.desc ?? ""}
              .fields=${section.fields}
              .model=${this.draft}
              .errors=${this.errors}
              .cols=${2}
              .onFieldChange=${this.handleFieldChange}
            ></form-builder-section>
          `
        )}

        <div class="col-span-2">
          <form-builder-buttons
            .mode=${this.mode}
            @submit=${this.handleSubmit}
            @cancel=${this.handleCancel}
            @delete=${this.handleDelete}
          ></form-builder-buttons>
        </div>
      </section>
    `;
      }
    };
    __decorateClass([
      n4({ type: String })
    ], FormEntitas.prototype, "mode", 2);
    __decorateClass([
      n4({ type: Object })
    ], FormEntitas.prototype, "value", 2);
    __decorateClass([
      n4({ type: String })
    ], FormEntitas.prototype, "kind", 2);
    __decorateClass([
      r5()
    ], FormEntitas.prototype, "draft", 2);
    __decorateClass([
      r5()
    ], FormEntitas.prototype, "errors", 2);
    FormEntitas = __decorateClass([
      t3("form-entitas")
    ], FormEntitas);
  }
});

// src/pages/konfigurasi/entitas/entitas-container.ts
var EntitasContainer;
var init_entitas_container = __esm({
  "src/pages/konfigurasi/entitas/entitas-container.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_plant_service();
    init_aquatic_species_service();
    init_livestock_service();
    init_entitas_list();
    init_form_entitas();
    EntitasContainer = class extends i4 {
      constructor() {
        super(...arguments);
        this.kind = "tanaman";
        this.view = "list";
        this.draft = {};
        this.mode = "new";
        this.plants = [];
        this.fishes = [];
        this.poultry = [];
        this.handleAdd = (e8) => {
          this.kind = e8.detail.kind;
          this.draft = {};
          this.mode = "new";
          this.view = "form";
          console.log("[ADD ENTITAS]", { kind: this.kind });
        };
        this.handleSubmit = (e8) => {
          console.log("[SUBMIT ENTITAS]", { kind: this.kind, data: e8.detail });
          this.view = "list";
        };
        this.handleDelete = (e8) => {
          const { id, kind } = e8.detail ?? {};
          if (!id || !kind) {
            console.warn("[DELETE ENTITAS] Event detail tidak valid:", e8.detail);
            return;
          }
          console.log("[DELETE ENTITAS]", { kind, id });
          switch (kind) {
            case "tanaman":
              this.plants = this.plants.filter((item) => item.id !== id);
              break;
            case "ikan":
              this.fishes = this.fishes.filter((item) => item.id !== id);
              break;
            case "ayam":
              this.poultry = this.poultry.filter((item) => item.id !== id);
              break;
          }
          this.view = "list";
        };
        this.handleEdit = (e8) => {
          const { item, kind } = e8.detail;
          this.kind = kind;
          this.draft = { ...item };
          this.mode = "edit";
          this.view = "form";
          console.log("[EDIT ENTITAS]", { kind: this.kind, draft: this.draft });
        };
        this.handleCancel = () => {
          this.view = "list";
        };
      }
      createRenderRoot() {
        return this;
      }
      connectedCallback() {
        super.connectedCallback();
        this.loadAll().catch(
          (err) => console.error("\u274C Gagal memuat data spesies:", err)
        );
      }
      async loadAll() {
        console.log("[LOAD ENTITAS] Memulai fetch semua data entitas...");
        try {
          console.log("[LOAD ENTITAS] \u2192 Memuat data tanaman...");
          this.plants = await fetchAllPlants();
          console.log("[LOAD ENTITAS] \u2713 Data tanaman terload:", this.plants);
        } catch (err) {
          console.error("\u274C Gagal memuat tanaman:", err);
        }
        try {
          console.log("[LOAD ENTITAS] \u2192 Memuat data ikan...");
          this.fishes = await fetchAllAquaticSpecies();
          console.log("[LOAD ENTITAS] \u2713 Data ikan terload:", this.fishes);
        } catch (err) {
          console.error("\u274C Gagal memuat ikan:", err);
        }
        try {
          console.log("[LOAD ENTITAS] \u2192 Memuat data ayam...");
          this.poultry = await fetchAllLivestock();
          console.log("[LOAD ENTITAS] \u2713 Data ayam terload:", this.poultry);
        } catch (err) {
          console.error("\u274C Gagal memuat ayam:", err);
        }
        console.log("[LOAD ENTITAS] Proses fetch selesai.");
      }
      render() {
        return x`
      ${this.view === "list" ? x`
            <entitas-list
              .kind=${this.kind}
              .plants=${this.plants}
              .fishes=${this.fishes}
              .poultry=${this.poultry}
              @add-item=${this.handleAdd}
              @edit-item=${this.handleEdit}
            ></entitas-list>
          ` : x`
            <form-entitas
              .kind=${this.kind}
              .mode=${this.mode}
              .value=${this.draft}
              @submit=${this.handleSubmit}
              @cancel=${this.handleCancel}
              @delete=${this.handleDelete}
            ></form-entitas>
          `}
    `;
      }
    };
    __decorateClass([
      n4({ type: String })
    ], EntitasContainer.prototype, "kind", 2);
    __decorateClass([
      r5()
    ], EntitasContainer.prototype, "view", 2);
    __decorateClass([
      r5()
    ], EntitasContainer.prototype, "draft", 2);
    __decorateClass([
      r5()
    ], EntitasContainer.prototype, "mode", 2);
    __decorateClass([
      r5()
    ], EntitasContainer.prototype, "plants", 2);
    __decorateClass([
      r5()
    ], EntitasContainer.prototype, "fishes", 2);
    __decorateClass([
      r5()
    ], EntitasContainer.prototype, "poultry", 2);
    EntitasContainer = __decorateClass([
      t3("entitas-container")
    ], EntitasContainer);
  }
});

// src/services/all-batch-services.ts
var init_all_batch_services = __esm({
  "src/services/all-batch-services.ts"() {
    "use strict";
    init_aquatic_batch_service();
    init_hydroponic_batch_service();
    init_horti_batch_service();
    init_livestock_batch_service();
  }
});

// src/pages/konfigurasi/schema/aquatic-batch-fields.ts
var aquaticBatchFields;
var init_aquatic_batch_fields = __esm({
  "src/pages/konfigurasi/schema/aquatic-batch-fields.ts"() {
    "use strict";
    aquaticBatchFields = [
      {
        title: "Informasi Umum",
        fields: [
          {
            key: "id",
            label: "Id Kolam",
            type: "text",
            required: true,
            widthClass: "w-full max-w-md"
          },
          {
            key: "location",
            label: "Lokasi",
            type: "text",
            required: true,
            widthClass: "w-full max-w-md"
          },
          {
            key: "description",
            label: "Deskripsi",
            type: "text",
            required: true,
            widthClass: "w-full",
            colSpan: 2
          },
          {
            key: "speciesId",
            label: "ID Spesies",
            type: "text",
            required: true,
            widthClass: "w-full max-w-md"
          }
        ]
      },
      {
        title: "\u{1F527} Pengaturan Produksi",
        fields: [
          {
            key: "initialPopulation",
            label: "Populasi Awal",
            type: "number",
            required: true,
            widthClass: "w-full max-w-md"
          },
          {
            key: "currentPopulation",
            label: "Populasi Saat Ini",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "startDate",
            label: "Tanggal Mulai",
            type: "date",
            required: true,
            widthClass: "w-full max-w-md"
          },
          {
            key: "expectedHarvestDate",
            label: "Estimasi Panen",
            type: "date",
            widthClass: "w-full max-w-md"
          }
        ]
      },
      {
        title: "\u{1F527} Dimensi Kolam",
        fields: [
          {
            key: "length",
            label: "Panjang Kolam (cm)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "width",
            label: "Lebar Kolam (cm)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "height",
            label: "Kedalaman Kolam (cm)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "note",
            label: "Catatan",
            type: "textarea",
            widthClass: "w-full",
            colSpan: 2
          }
        ]
      }
    ];
  }
});

// src/pages/konfigurasi/schema/hydroponic-batch-fields.ts
var hydroponicBatchFields;
var init_hydroponic_batch_fields = __esm({
  "src/pages/konfigurasi/schema/hydroponic-batch-fields.ts"() {
    "use strict";
    hydroponicBatchFields = [
      {
        title: "Informasi Umum",
        fields: [
          {
            key: "id",
            label: "Id Hidroponik",
            type: "text",
            required: true,
            widthClass: "w-full max-w-md"
          },
          {
            key: "location",
            label: "Lokasi",
            type: "text",
            required: true,
            widthClass: "w-full max-w-md"
          },
          {
            key: "description",
            label: "Deskripsi",
            type: "text",
            required: true,
            widthClass: "w-full",
            colSpan: 2
          },
          {
            key: "plantId",
            label: "ID Tanaman",
            type: "text",
            required: true,
            widthClass: "w-full max-w-md"
          }
        ]
      },
      {
        title: "\u{1F527} Pengaturan Produksi",
        fields: [
          {
            key: "system",
            label: "Sistem Hidroponik",
            type: "select",
            required: true,
            options: ["NFT", "DFT", "DWC", "Aeroponik"]
          },
          {
            key: "initialCount",
            label: "Jumlah Awal Lubang",
            type: "number",
            required: true
          },
          {
            key: "currentCount",
            label: "Jumlah Bibit",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "startDate",
            label: "Tanggal Mulai",
            type: "date",
            required: true,
            widthClass: "w-full max-w-md"
          },
          {
            key: "expectedHarvestDate",
            label: "Estimasi Panen",
            type: "date",
            widthClass: "w-full max-w-md"
          }
        ]
      },
      {
        title: "\u{1F527} Dimensi Hydroponic",
        fields: [
          {
            key: "__sep2",
            type: "separator",
            label: "\u{1F527} Pengaturan Hidroponik",
            widthClass: "w-full max-w-md"
          },
          {
            key: "length",
            label: "Panjang Hydroponic (cm)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "width",
            label: "Lebar Hydroponic (cm)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "height",
            label: "Kedalaman Hydroponic (cm)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "note",
            label: "Catatan",
            type: "textarea",
            widthClass: "w-full",
            colSpan: 2
          }
        ]
      }
    ];
  }
});

// src/pages/konfigurasi/schema/horti-batch-fields.ts
var hortiBatchFields;
var init_horti_batch_fields = __esm({
  "src/pages/konfigurasi/schema/horti-batch-fields.ts"() {
    "use strict";
    hortiBatchFields = [
      {
        title: "Informasi Umum",
        fields: [
          {
            key: "id",
            label: "Id Kebun",
            type: "text",
            required: true,
            widthClass: "w-full max-w-md"
          },
          {
            key: "location",
            label: "Lokasi",
            type: "text",
            required: true,
            widthClass: "w-full max-w-md"
          },
          {
            key: "description",
            label: "Deskripsi",
            type: "text",
            required: true,
            widthClass: "w-full",
            colSpan: 2
          }
        ]
      },
      {
        title: "\u{1F527} Pengaturan Produksi",
        fields: [
          {
            key: "plantId",
            label: "ID Tanaman",
            type: "text",
            required: true,
            widthClass: "w-full max-w-md"
          },
          {
            key: "initialCount",
            label: "Jumlah Awal",
            type: "number",
            required: true,
            widthClass: "w-full max-w-md"
          },
          {
            key: "totalPlants",
            label: "Jumlah Total",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "startDate",
            label: "Tanggal Mulai",
            type: "date",
            required: true,
            widthClass: "w-full max-w-md"
          },
          {
            key: "expectedHarvestDate",
            label: "Estimasi Panen",
            type: "date",
            widthClass: "w-full max-w-md"
          }
        ]
      },
      {
        title: "\u{1F527} Dimensi Bedengan",
        fields: [
          {
            key: "length",
            label: "Panjang Bedengan (cm)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "width",
            label: "Lebar Bedengan (cm)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "height",
            label: "Kedalaman Bedengan (cm)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "note",
            label: "Catatan",
            type: "textarea",
            widthClass: "w-full",
            colSpan: 2
          }
        ]
      }
    ];
  }
});

// src/pages/konfigurasi/schema/livestock-batch-fields.ts
var livestockBatchFields;
var init_livestock_batch_fields = __esm({
  "src/pages/konfigurasi/schema/livestock-batch-fields.ts"() {
    "use strict";
    livestockBatchFields = [
      {
        title: "Informasi Umum",
        fields: [
          {
            key: "id",
            label: "Id Kandang",
            type: "text",
            required: true,
            widthClass: "w-full max-w-md"
          },
          {
            key: "location",
            label: "Lokasi",
            type: "text",
            required: true,
            widthClass: "w-full max-w-md"
          },
          {
            key: "description",
            label: "Deskripsi",
            type: "text",
            required: true,
            widthClass: "w-full",
            colSpan: 2
          },
          {
            key: "livestockId",
            label: "ID Ternak",
            type: "text",
            required: true,
            widthClass: "w-full max-w-md"
          }
        ]
      },
      {
        title: "\u{1F527} Pengaturan Produksi",
        fields: [
          {
            key: "initialPopulation",
            label: "Populasi Awal",
            type: "number",
            required: true
          },
          {
            key: "currentPopulation",
            label: "Populasi Saat Ini",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "startDate",
            label: "Tanggal Mulai",
            type: "date",
            required: true,
            widthClass: "w-full max-w-md"
          },
          {
            key: "expectedHarvestDate",
            label: "Estimasi Panen",
            type: "date",
            widthClass: "w-full max-w-md"
          }
        ]
      },
      {
        title: "\u{1F527} Pengaturan Kandang",
        fields: [
          {
            key: "length",
            label: "Panjang Kandang (cm)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "width",
            label: "Lebar Kandang (cm)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "height",
            label: "Kedalaman Kandang (cm)",
            type: "number",
            widthClass: "w-full max-w-md"
          },
          {
            key: "note",
            label: "Catatan",
            type: "textarea",
            widthClass: "w-full",
            colSpan: 2
          }
        ]
      }
    ];
  }
});

// src/pages/konfigurasi/schema/all-batch-fields.ts
var init_all_batch_fields = __esm({
  "src/pages/konfigurasi/schema/all-batch-fields.ts"() {
    "use strict";
    init_aquatic_batch_fields();
    init_hydroponic_batch_fields();
    init_horti_batch_fields();
    init_livestock_batch_fields();
  }
});

// src/pages/konfigurasi/batch/form-batch.ts
var FormBatch;
var init_form_batch = __esm({
  "src/pages/konfigurasi/batch/form-batch.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_all_batch_fields();
    init_form_builder_section();
    init_form_builder_buttons();
    FormBatch = class extends i4 {
      constructor() {
        super(...arguments);
        this.mode = "new";
        this.value = {};
        this.draft = {};
        this.errors = {};
        this.handleFieldChange = (e8, key) => {
          const target = e8.target;
          const field = this.allFields.find((f3) => f3.key === key);
          let v2 = target.value;
          if (field?.type === "number") {
            const n6 = parseFloat(v2);
            v2 = Number.isNaN(n6) ? 0 : n6;
          }
          this.draft = { ...this.draft, [key]: v2 };
          if (field?.required && (v2 === "" || v2 === null || v2 === void 0)) {
            this.errors = {
              ...this.errors,
              [key]: `Field "${field.label}" wajib diisi.`
            };
          } else {
            const { [key]: _2, ...rest } = this.errors;
            this.errors = rest;
          }
        };
        this.handleSubmit = (e8) => {
          e8?.preventDefault();
          e8?.stopPropagation();
          const res = this.validate();
          if (!res.valid) {
            alert(res.message);
            return;
          }
          this.dispatchEvent(
            new CustomEvent("submit", {
              detail: this.draft,
              bubbles: true,
              composed: true
            })
          );
        };
        this.handleCancel = () => {
          this.dispatchEvent(new CustomEvent("cancel"));
          this.draft = { ...this.value };
        };
        this.handleDelete = () => {
          if (!confirm("Yakin ingin menghapus data ini?")) return;
          this.dispatchEvent(
            new CustomEvent("delete", {
              detail: {
                kind: this.kind,
                id: this.value?.id ?? this.value?.code
              },
              bubbles: true,
              composed: true
            })
          );
        };
      }
      createRenderRoot() {
        return this;
      }
      get formTitle() {
        switch (this.kind) {
          case "akuakultur":
            return { icon: "\u{1F41F}", text: "Batch Akuakultur", color: "blue" };
          case "hidroponik":
            return { icon: "\u{1F4A7}", text: "Batch Hidroponik", color: "green" };
          case "hortikultura":
            return { icon: "\u{1F33F}", text: "Batch Hortikultura", color: "green" };
          case "peternakan":
            return { icon: "\u{1F414}", text: "Batch Peternakan", color: "yellow" };
          default:
            return { icon: "", text: "", color: "gray" };
        }
      }
      get formSections() {
        switch (this.kind) {
          case "akuakultur":
            return aquaticBatchFields;
          case "hidroponik":
            return hydroponicBatchFields;
          case "hortikultura":
            return hortiBatchFields;
          case "peternakan":
            return livestockBatchFields;
          default:
            return [];
        }
      }
      get allFields() {
        return this.formSections.flatMap((section) => section.fields);
      }
      updated(changed) {
        if (changed.has("value")) {
          this.draft = { ...this.value };
        }
      }
      validate() {
        for (const f3 of this.allFields) {
          const val = this.draft[f3.key];
          if (f3.required && (val === void 0 || val === null || val === "")) {
            return { valid: false, message: `Field "${f3.label}" wajib diisi.` };
          }
        }
        return { valid: true };
      }
      render() {
        const { icon, text, color } = this.formTitle;
        const bgMap = {
          yellow: "border-yellow-300 bg-yellow-50",
          blue: "border-blue-300 bg-blue-50",
          green: "border-green-300 bg-green-50",
          gray: "border-gray-300 bg-gray-50"
        };
        const textMap = {
          yellow: "text-yellow-800",
          blue: "text-blue-800",
          green: "text-green-800",
          gray: "text-gray-800"
        };
        return x`
      <section class="border rounded-xl p-4 shadow-sm ${bgMap[color]}">
        <h2
          class="text-xl font-semibold mb-3 flex items-center gap-2 ${textMap[color]}"
        >
          ${icon} ${text}
        </h2>

        ${this.formSections.map(
          (section) => x`
            <form-builder-section
              .title=${section.title}
              .desc=${section.desc ?? ""}
              .fields=${section.fields}
              .model=${this.draft}
              .errors=${this.errors}
              .cols=${2}
              .onFieldChange=${this.handleFieldChange}
            ></form-builder-section>
          `
        )}

        <div class="col-span-2">
          <form-builder-buttons
            .mode=${this.mode}
            @submit=${this.handleSubmit}
            @cancel=${this.handleCancel}
            @delete=${this.handleDelete}
          ></form-builder-buttons>
        </div>
      </section>
    `;
      }
    };
    __decorateClass([
      n4({ type: String })
    ], FormBatch.prototype, "mode", 2);
    __decorateClass([
      n4({ type: Object })
    ], FormBatch.prototype, "value", 2);
    __decorateClass([
      n4({ type: String })
    ], FormBatch.prototype, "kind", 2);
    __decorateClass([
      r5()
    ], FormBatch.prototype, "draft", 2);
    __decorateClass([
      r5()
    ], FormBatch.prototype, "errors", 2);
    FormBatch = __decorateClass([
      t3("form-batch")
    ], FormBatch);
  }
});

// src/pages/konfigurasi/batch/batch-list.ts
var BatchList;
var init_batch_list = __esm({
  "src/pages/konfigurasi/batch/batch-list.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    BatchList = class extends i4 {
      constructor() {
        super(...arguments);
        this.kind = "akuakultur";
        this.akuakultur = [];
        this.hidroponik = [];
        this.hortikultura = [];
        this.peternakan = [];
      }
      createRenderRoot() {
        return this;
      }
      emitAdd(kind) {
        this.dispatchEvent(
          new CustomEvent("add-item", {
            detail: { kind },
            bubbles: true,
            composed: true
          })
        );
      }
      emitEdit(item, kind) {
        this.dispatchEvent(
          new CustomEvent("edit-item", {
            detail: { item, kind },
            bubbles: true,
            composed: true
          })
        );
      }
      renderCard(title, emoji, kind, items) {
        return x`
      <div class="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-lg font-semibold">${emoji} ${title}</h3>
          <button
            class="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
            @click=${() => this.emitAdd(kind)}
          >
            ➕ Tambah
          </button>
        </div>

        ${!items?.length ? x`
              <div class="text-gray-500 text-sm italic">Belum ada data.</div>
            ` : x`
              <ul class="space-y-2">
                ${items.map(
          (item) => x`
                    <li
                      class="p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer"
                      @click=${() => this.emitEdit(item, kind)}
                    >
                      <div class="font-medium">${item?.id ?? "Tanpa Id"}</div>
                      <div class="text-sm text-gray-500 flex gap-2">
                        <span
                          >${item?.speciesId ?? item?.plantId ?? item?.livestockId ?? "Tanpa nama"}</span
                        >
                        ${item?.startDate ? x`
                              <span
                                >• Mulai:
                                ${new Date(
            item.startDate
          ).toLocaleDateString()}</span
                              >
                            ` : ""}
                        ${item?.status ? x`<span>• ${item.status}</span>` : ""}
                      </div>
                    </li>
                  `
        )}
              </ul>
            `}
      </div>
    `;
      }
      render() {
        return x`
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        ${this.renderCard("Akuakultur", "\u{1F41F}", "akuakultur", this.akuakultur)}
        ${this.renderCard("Hidroponik", "\u{1F4A7}\u{1F33F}", "hidroponik", this.hidroponik)}
        ${this.renderCard(
          "Hortikultura",
          "\u{1F96C}",
          "hortikultura",
          this.hortikultura
        )}
        ${this.renderCard("Peternakan", "\u{1F404}", "peternakan", this.peternakan)}
      </div>
    `;
      }
    };
    __decorateClass([
      n4({ type: String })
    ], BatchList.prototype, "kind", 2);
    __decorateClass([
      n4({ type: Array })
    ], BatchList.prototype, "akuakultur", 2);
    __decorateClass([
      n4({ type: Array })
    ], BatchList.prototype, "hidroponik", 2);
    __decorateClass([
      n4({ type: Array })
    ], BatchList.prototype, "hortikultura", 2);
    __decorateClass([
      n4({ type: Array })
    ], BatchList.prototype, "peternakan", 2);
    BatchList = __decorateClass([
      t3("batch-list")
    ], BatchList);
  }
});

// src/pages/konfigurasi/batch/batch-container.ts
var BatchContainer;
var init_batch_container = __esm({
  "src/pages/konfigurasi/batch/batch-container.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_all_batch_services();
    init_form_batch();
    init_batch_list();
    BatchContainer = class extends i4 {
      constructor() {
        super(...arguments);
        this.kind = "akuakultur";
        this.view = "list";
        this.draft = {};
        this.mode = "new";
        this.aquatic = [];
        this.hydroponic = [];
        this.horti = [];
        this.livestock = [];
        this.handleAdd = (e8) => {
          this.kind = e8.detail.kind;
          this.draft = {};
          this.mode = "new";
          this.view = "form";
          console.log("[ADD BATCH]", { kind: this.kind });
        };
        this.handleEdit = (e8) => {
          this.kind = e8.detail.kind;
          this.draft = { ...e8.detail.item };
          this.mode = "edit";
          this.view = "form";
          console.log("[EDIT BATCH]", { kind: this.kind, draft: this.draft });
        };
        this.handleSubmit = (e8) => {
          console.log("[SUBMIT BATCH]", { kind: this.kind, data: e8.detail });
          this.view = "list";
        };
        this.handleDelete = (e8) => {
          const { id, kind } = e8.detail ?? {};
          if (!id || !kind) {
            console.warn("[DELETE BATCH] Event detail tidak valid:", e8.detail);
            return;
          }
          console.log("[DELETE BATCH]", { kind, id });
          switch (kind) {
            case "akuakultur":
              this.aquatic = this.aquatic.filter((item) => item.id !== id);
              break;
            case "hidroponik":
              this.hydroponic = this.hydroponic.filter((item) => item.id !== id);
              break;
            case "hortikultura":
              this.horti = this.horti.filter((item) => item.id !== id);
              break;
            case "peternakan":
              this.livestock = this.livestock.filter((item) => item.id !== id);
              break;
          }
          this.view = "list";
        };
        this.handleCancel = () => {
          this.view = "list";
        };
      }
      createRenderRoot() {
        return this;
      }
      connectedCallback() {
        super.connectedCallback();
        this.loadAll().catch(console.error);
      }
      async loadAll() {
        console.log("[LOAD BATCH] Fetch semua data...");
        try {
          this.aquatic = await fetchAllAquaticBatches();
          console.log("\u2713 Akuakultur loaded:", this.aquatic);
        } catch (e8) {
          console.error("\u274C Gagal memuat akuakultur:", e8);
        }
        try {
          this.hydroponic = await fetchAllHydroponicBatches();
          console.log("\u2713 Hidroponik loaded:", this.hydroponic);
        } catch (e8) {
          console.error("\u274C Gagal memuat hidroponik:", e8);
        }
        try {
          this.horti = await fetchAllHortiBatches();
          console.log("\u2713 Hortikultura loaded:", this.horti);
        } catch (e8) {
          console.error("\u274C Gagal memuat hortikultura:", e8);
        }
        try {
          this.livestock = await fetchAllLivestockBatches();
          console.log("\u2713 Peternakan loaded:", this.livestock);
        } catch (e8) {
          console.error("\u274C Gagal memuat peternakan:", e8);
        }
      }
      render() {
        return x`
      ${this.view === "list" ? x`
            <batch-list
              .kind=${this.kind}
              .akuakultur=${this.aquatic}
              .hidroponik=${this.hydroponic}
              .hortikultura=${this.horti}
              .peternakan=${this.livestock}
              @add-item=${this.handleAdd}
              @edit-item=${this.handleEdit}
            ></batch-list>
          ` : x`
            <form-batch
              .kind=${this.kind}
              .mode=${this.mode}
              .value=${this.draft}
              @submit=${this.handleSubmit}
              @cancel=${this.handleCancel}
              @delete=${this.handleDelete}
            ></form-batch>
          `}
    `;
      }
    };
    __decorateClass([
      n4({ type: String })
    ], BatchContainer.prototype, "kind", 2);
    __decorateClass([
      r5()
    ], BatchContainer.prototype, "view", 2);
    __decorateClass([
      r5()
    ], BatchContainer.prototype, "draft", 2);
    __decorateClass([
      r5()
    ], BatchContainer.prototype, "mode", 2);
    __decorateClass([
      r5()
    ], BatchContainer.prototype, "aquatic", 2);
    __decorateClass([
      r5()
    ], BatchContainer.prototype, "hydroponic", 2);
    __decorateClass([
      r5()
    ], BatchContainer.prototype, "horti", 2);
    __decorateClass([
      r5()
    ], BatchContainer.prototype, "livestock", 2);
    BatchContainer = __decorateClass([
      t3("batch-container")
    ], BatchContainer);
  }
});

// src/pages/config.ts
var config_exports = {};
__export(config_exports, {
  PageDeviceConfig: () => PageDeviceConfig
});
var PageDeviceConfig;
var init_config = __esm({
  "src/pages/config.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_device_events();
    init_ui_tabs();
    init_event_table();
    init_device_config();
    init_dev_config_mqtt();
    init_entitas_container();
    init_batch_container();
    PageDeviceConfig = class extends i4 {
      constructor() {
        super(...arguments);
        this.activeTab = "devices";
        this.mode = "edit";
        this.tags = [];
        this.TAB_KEY = "deviceConfig.activeTab";
      }
      createRenderRoot() {
        return this;
      }
      async connectedCallback() {
        super.connectedCallback();
        const list = await DeviceEvents.loadAllDevices();
        this.tags = list.map((d3) => d3.tagNumber).filter(Boolean).sort();
        const tabParam = new URL(location.href).searchParams.get("tab");
        this.activeTab = tabParam || sessionStorage.getItem(this.TAB_KEY) || "devices";
      }
      onTabChange(e8) {
        this.activeTab = e8.detail.id;
        sessionStorage.setItem(this.TAB_KEY, this.activeTab);
      }
      render() {
        return x`
      <section class="max-w-6xl mx-auto px-4 py-6">
        <ui-tabs
          .tabs=${[
          { id: "batch", label: "Batch", icon: "\u{1F3ED}" },
          { id: "entitas", label: "Entitas", icon: "\u{1F9EC}" },
          { id: "devices", label: "Devices", icon: "\u{1F9FE}" },
          { id: "mqtt", label: "MQTT", icon: "\u{1F4E1}" }
        ]}
          .active=${this.activeTab}
          @dev-tab-change=${this.onTabChange}
        ></ui-tabs>

        ${this.activeTab === "devices" ? x` <device-config></device-config> ` : this.activeTab === "batch" ? x`
              <div class="mt-4">
                <batch-container></batch-container>
              </div>
            ` : this.activeTab === "entitas" ? x`
              <div class="font-semibold text-lg mt-4 mb-2 text-gray-700">
                Konfigurasi - Entitas
              </div>
              <div class="mt-4">
                <entitas-container></entitas-container>
              </div>
            ` : this.activeTab === "mqtt" ? x`<dev-config-mqtt></dev-config-mqtt>` : null}
      </section>
    `;
      }
    };
    __decorateClass([
      r5()
    ], PageDeviceConfig.prototype, "device", 2);
    __decorateClass([
      r5()
    ], PageDeviceConfig.prototype, "activeTab", 2);
    __decorateClass([
      r5()
    ], PageDeviceConfig.prototype, "mode", 2);
    __decorateClass([
      r5()
    ], PageDeviceConfig.prototype, "tags", 2);
    PageDeviceConfig = __decorateClass([
      t3("page-config")
    ], PageDeviceConfig);
  }
});

// src/pages/about.ts
var about_exports = {};
__export(about_exports, {
  AboutPage: () => AboutPage
});
var AboutPage;
var init_about = __esm({
  "src/pages/about.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    AboutPage = class extends i4 {
      createRenderRoot() {
        return this;
      }
      render() {
        return x`
      <section class="p-6 md:p-10 max-w-5xl mx-auto">
        <h1 class="text-3xl font-bold text-center text-green-700 mb-6">
          Tentang TaniVerse
        </h1>

        <p class="text-base text-gray-700 leading-relaxed mb-4">
          <span class="font-semibold text-green-600">TaniVerse</span> adalah
          sistem pertanian presisi berbasis IoT yang dirancang untuk membantu
          petani dan pengelola lahan dalam memantau dan mengontrol kondisi
          lingkungan secara real-time. Dengan teknologi edge-computing dan
          komunikasi dua arah, sistem ini mendukung keberlanjutan dan efisiensi
          di sektor pertanian.
        </p>

        <p class="text-base text-gray-700 leading-relaxed mb-4">
          Kami berkomitmen untuk menghadirkan solusi yang dapat diandalkan,
          transparan, dan berbasis teknologi terbuka. Setiap bagian sistem ini
          dikembangkan melalui pendekatan modular dan riset teknologi terbaru.
        </p>

        <h2 class="text-xl font-semibold text-green-700 mt-8 mb-4">
          Sumber Daya & Teknologi
        </h2>

        <p class="text-base text-gray-700 leading-relaxed mb-2">
          Seluruh stack
          <span class="font-semibold text-green-600">TaniVerse</span> dibangun
          menggunakan teknologi open-source berbasis
          <span class="font-semibold">TypeScript</span> dan
          <span class="font-semibold">JavaScript</span> dari sisi frontend
          hingga backend.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 class="text-lg font-semibold text-green-600 mb-2">Frontend</h3>
            <ul class="list-disc list-inside text-gray-700">
              <li>Framework: <span class="font-medium">LitElement</span></li>
              <li>
                Styling: <span class="font-medium">Tailwind CSS (inline)</span>
              </li>
              <li>Build Tool: <span class="font-medium">esbuild</span></li>
              <li>
                Component Style:
                <span class="font-medium"
                  >Component-Driven Development (CDD)</span
                >
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-green-600 mb-2">Backend</h3>
            <ul class="list-disc list-inside text-gray-700">
              <li>
                Platform: <span class="font-medium">Node.js + TypeScript</span>
              </li>
              <li>Framework: <span class="font-medium">Fastify</span></li>
              <li>
                API: <span class="font-medium">RESTful</span> &
                <span class="font-medium">MQTT bridge</span>
              </li>
              <li>
                Database: <span class="font-medium">SQLite</span> (local,
                embedded)
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-green-600 mb-2">IoT Node</h3>
            <ul class="list-disc list-inside text-gray-700">
              <li>Device: <span class="font-medium">ESP32</span></li>
              <li>Firmware: <span class="font-medium">Arduino C++</span></li>
              <li>
                Protocol:
                <span class="font-medium">MQTT</span> (Publish/Subscribe)
              </li>
              <li>Transport: <span class="font-medium">WiFi</span></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-green-600 mb-2">
              Tools & DevOps
            </h3>
            <ul class="list-disc list-inside text-gray-700">
              <li>Hosting: <span class="font-medium">Raspberry Pi 4</span></li>
              <li>MQTT Broker: <span class="font-medium">Mosquitto</span></li>
              <li>Repository: <span class="font-medium">GitHub</span></li>
              <li>
                IDE: <span class="font-medium">Visual Studio Code</span> +
                Arduino CE
              </li>
            </ul>
          </div>
        </div>

        <h2 class="text-xl font-semibold text-green-700 mt-10 mb-4">
          Arsitektur Sistem IoT TaniVerse
        </h2>

        <p class="text-base text-gray-700 leading-relaxed mb-4">
          Untuk mendukung keberlanjutan dan skalabilitas, sistem TaniVerse
          dibangun dengan pendekatan
          <span class="font-semibold text-green-600"
            >Separation of Concern (SoC)</span
          >
          yang membagi tanggung jawab sistem menjadi tiga lapisan utama:
          firmware node IoT, komunikasi data, dan antarmuka pengguna (HMI).
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-green-600 mb-2">
              Firmware Node (ESP32)
            </h3>
            <ul class="list-disc list-inside text-gray-700 text-sm">
              <li>Bahasa: C++ (Object-Oriented)</li>
              <li>Platform: Arduino IDE + Arduino CE</li>
              <li>Komunikasi: MQTT (Pub/Sub), HTTP AJAX (opsional)</li>
              <li>Storage: SPIFFS / LittleFS</li>
              <li>Web Server lokal untuk konfigurasi & status</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-green-600 mb-2">
              Server & Komunikasi
            </h3>
            <ul class="list-disc list-inside text-gray-700 text-sm">
              <li>
                <span class="font-medium">Raspberry Pi 4</span> berperan sebagai
                pusat sistem
              </li>
              <li>
                Menjalankan
                <span class="font-medium">Mosquitto MQTT Broker</span>
              </li>
              <li>Hosting Web UI (HMI) berbasis LitElement</li>
              <li>Bridge komunikasi: MQTT ↔ WebSocket untuk frontend</li>
              <li>Mengelola koneksi semua node ESP melalui jaringan lokal</li>
              <li>Dapat berfungsi sebagai edge server (offline & online)</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-green-600 mb-2">
              Antarmuka Pengguna (HMI)
            </h3>
            <ul class="list-disc list-inside text-gray-700 text-sm">
              <li>Framework: LitElement (Web Components)</li>
              <li>Styling: Tailwind CSS</li>
              <li>Koneksi: MQTT over WebSocket ke Raspberry Pi</li>
              <li>Build Tool: esbuild (bundling & minify)</li>
              <li>Deployment: GitHub Pages / Raspberry Pi</li>
            </ul>
          </div>
        </div>

        <p class="text-base text-gray-700 leading-relaxed mt-4">
          Pendekatan ini memastikan bahwa sistem TaniVerse dapat dikembangkan
          secara modular dan efisien. Raspberry Pi berfungsi sebagai pusat
          komputasi ringan dan komunikasi, memungkinkan kontrol penuh terhadap
          seluruh ekosistem IoT pertanian dari satu perangkat edge server.
        </p>

        <h2 class="text-xl font-semibold text-green-700 mt-10 mb-4">Penutup</h2>

        <p class="text-base text-gray-700 leading-relaxed mb-2">
          Terima kasih telah bergabung dengan kami dalam perjalanan menuju
          pertanian masa depan yang lebih cerdas, efisien, dan berkelanjutan.
          Mari bersama-sama membangun ekosistem teknologi pertanian Indonesia
          yang tangguh dan adaptif.
        </p>
      </section>
    `;
      }
    };
    AboutPage = __decorateClass([
      t3("page-about")
    ], AboutPage);
  }
});

// src/pages/not-authorized.ts
var not_authorized_exports = {};
__export(not_authorized_exports, {
  PageNotAuthorized: () => PageNotAuthorized
});
var PageNotAuthorized;
var init_not_authorized = __esm({
  "src/pages/not-authorized.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_auth_service();
    PageNotAuthorized = class extends i4 {
      constructor() {
        super(...arguments);
        this.onHome = () => {
          location.href = "/";
        };
        this.onSwitchAccount = () => {
          AuthService.logout();
          sessionStorage.setItem("next_path", "/");
          location.href = "/login";
        };
      }
      createRenderRoot() {
        return this;
      }
      // pakai Tailwind global
      connectedCallback() {
        super.connectedCallback();
        if (!AuthService.isLoggedIn()) {
          sessionStorage.setItem("next_path", location.pathname + location.search);
          location.href = "/login";
        }
      }
      render() {
        return x`
      <!-- Background -->
      <section
        class="relative min-h-[80vh] flex items-center justify-center overflow-hidden
               bg-gradient-to-br from-emerald-50 via-white to-sky-50
               dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
      >
        <!-- Dekorasi blob -->
        <div
          class="pointer-events-none absolute -top-10 -left-10 h-72 w-72 rounded-full
                    bg-emerald-300/30 blur-3xl"
        ></div>
        <div
          class="pointer-events-none absolute -bottom-16 -right-16 h-80 w-80 rounded-full
                    bg-sky-300/30 blur-3xl"
        ></div>

        <!-- Card -->
        <div
          class="relative z-10 max-w-md w-full mx-4
                 rounded-3xl border border-white/40 bg-white/70
                 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(16,185,129,0.35)]
                 dark:bg-white/10 dark:border-white/10"
        >
          <!-- Header -->
          <div class="px-7 pt-7 text-center">
            <div
              class="mx-auto mb-4 grid place-items-center h-16 w-16 rounded-2xl
                     bg-gradient-to-br from-emerald-500 to-sky-500 text-white
                     shadow-lg shadow-emerald-500/30 animate-[pop_300ms_ease-out]"
              style="
                --tw-scale-x: 1;
                --tw-scale-y: 1;
              "
            >
              <!-- lock icon -->
              <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 10V8a5 5 0 1 1 10 0v2"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="10"
                  rx="2"
                  stroke="white"
                  stroke-width="2"
                />
                <circle cx="12" cy="15" r="1.8" fill="white" />
              </svg>
            </div>

            <h1
              class="text-2xl md:text-3xl font-extrabold
                     bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent
                     dark:from-emerald-400 dark:to-sky-400"
            >
              403 — Akses Ditolak
            </h1>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Kamu sudah login, tapi belum punya izin untuk membuka halaman ini.
              😥
            </p>
          </div>

          <!-- Tips / Info -->
          <div class="px-7 mt-4">
            <div
              class="rounded-2xl border border-emerald-200/60 bg-emerald-50/70
                     text-emerald-800 text-sm px-4 py-3
                     dark:bg-emerald-400/10 dark:border-emerald-300/20 dark:text-emerald-200"
            >
              Coba minta akses <span class="font-semibold">admin</span> ke
              halaman ini, atau gunakan akun lain yang punya role yang sesuai.
            </div>
          </div>

          <!-- Actions -->
          <div class="px-7 py-6 flex flex-col sm:flex-row gap-3">
            <button
              @click=${this.onHome}
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2
                     rounded-xl px-4 py-2.5 text-sm font-semibold
                     bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.99]
                     transition-colors"
            >
              <span>🏠 Kembali ke Beranda</span>
            </button>

            <button
              @click=${this.onSwitchAccount}
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2
                     rounded-xl px-4 py-2.5 text-sm font-semibold
                     bg-white text-slate-800 border border-slate-200
                     hover:bg-slate-50 active:scale-[0.99]
                     dark:bg-transparent dark:border-white/20 dark:text-slate-100"
            >
              <span>🔁 Ganti Akun</span>
            </button>
          </div>

          <!-- Footnote -->
          <div class="px-7 pb-6">
            <p
              class="text-[11px] text-slate-500 text-center dark:text-slate-400"
            >
              Butuh bantuan? Hubungi admin. ✨
            </p>
          </div>
        </div>
      </section>
    `;
      }
    };
    PageNotAuthorized = __decorateClass([
      t3("page-not-authorized")
    ], PageNotAuthorized);
  }
});

// src/pages/not-found.ts
var not_found_exports = {};
__export(not_found_exports, {
  PageNotFound: () => PageNotFound
});
var PageNotFound;
var init_not_found = __esm({
  "src/pages/not-found.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    PageNotFound = class extends i4 {
      createRenderRoot() {
        return this;
      }
      render() {
        return x`<div class="text-red-600">404 - Halaman tidak ditemukan</div>`;
      }
    };
    PageNotFound = __decorateClass([
      t3("page-not-found")
    ], PageNotFound);
  }
});

// src/components/layout/app-shell.ts
init_lit();
init_decorators();
init_context();

// src/components/layout/app-header.ts
init_lit();
init_decorators();
init_context();

// src/components/layout/app-nav.ts
init_lit();
init_decorators();
var AppNav = class extends i4 {
  constructor() {
    super(...arguments);
    this.currentPath = "/";
    this.menuOpen = false;
    this.produksiOpen = false;
    this._handleOutsideClick = (e8) => {
      const target = e8.target;
      if (!this.contains(target)) {
        this.produksiOpen = false;
      }
    };
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this._handleOutsideClick);
  }
  disconnectedCallback() {
    document.removeEventListener("click", this._handleOutsideClick);
    super.disconnectedCallback();
  }
  isActive(path) {
    return this.currentPath.endsWith(path) ? "bg-green-300 text-green-900 rounded px-2 py-1" : "hover:bg-green-200 rounded px-2 py-1";
  }
  _navigate(e8) {
    e8.preventDefault();
    const target = e8.currentTarget;
    const path = target.getAttribute("href");
    this.menuOpen = false;
    this.produksiOpen = false;
    if (path && path !== this.currentPath) {
      this.dispatchEvent(
        new CustomEvent("nav-changed", {
          detail: { path },
          bubbles: true,
          composed: true
        })
      );
    }
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  render() {
    return x`
      <header class=" text-green-900 font-medium">
        <div
          class="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center"
        >
          <a href="/" @click=${this._navigate} class=${this.isActive("")}>
            <img
              src="./assets/logo-88x45.png"
              alt="Logo"
              class="rounded-xl h-[30px]"
            />
          </a>
          <!-- Hamburger for small screens -->
          <button
            @click=${this.toggleMenu}
            class="md:hidden text-2xl focus:outline-none"
          >
            ☰
          </button>
          <!-- Desktop Nav -->
          <nav class="hidden md:flex gap-4">${this.renderLinks()}</nav>
        </div>
        <!-- Mobile Nav -->
        ${this.menuOpen ? x`
              <nav class="flex flex-col md:hidden gap-2 px-4 pb-4">
                ${this.renderLinks()}
              </nav>
            ` : ""}
      </header>
    `;
  }
  renderLinks() {
    return x`
      <a
        href="/dashboard"
        @click=${this._navigate}
        class=${this.isActive("dashboard")}
        >📊 Dashboard</a
      >
      <a
        href="/config"
        @click=${this._navigate}
        class=${this.isActive("config")}
        >⚙️ Konfigurasi</a
      >
    `;
  }
};
__decorateClass([
  n4({ type: String })
], AppNav.prototype, "currentPath", 2);
__decorateClass([
  r5()
], AppNav.prototype, "menuOpen", 2);
__decorateClass([
  r5()
], AppNav.prototype, "produksiOpen", 2);
AppNav = __decorateClass([
  t3("app-nav")
], AppNav);

// src/components/user-info.ts
init_lit();
init_decorators();
init_context();

// src/context/user-context.ts
init_context();
var userContext = n5("user-context");

// src/components/user-info.ts
var UserInfo = class extends i4 {
  constructor() {
    super(...arguments);
    this.user = null;
    this.open = false;
    this._toggle = (e8) => {
      e8?.stopPropagation();
      this.open = !this.open;
    };
    this._onOutsideClick = (e8) => {
      if (!this.open) return;
      const path = e8.composedPath();
      if (!path.includes(this)) this.open = false;
    };
    this._onKeydown = (e8) => {
      if (!this.open) return;
      if (e8.key === "Escape") this.open = false;
    };
    this._onProfile = () => {
      this.open = false;
      this.dispatchEvent(
        new CustomEvent("profile-click", { bubbles: true, composed: true })
      );
    };
    this._onLogout = () => {
      this.open = false;
      this.dispatchEvent(
        new CustomEvent("logout-click", { bubbles: true, composed: true })
      );
    };
    this._onLogin = () => {
      this.open = false;
      this.dispatchEvent(
        new CustomEvent("login-click", { bubbles: true, composed: true })
      );
    };
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("click", this._onOutsideClick, true);
    window.addEventListener("keydown", this._onKeydown, true);
  }
  disconnectedCallback() {
    window.removeEventListener("click", this._onOutsideClick, true);
    window.removeEventListener("keydown", this._onKeydown, true);
    super.disconnectedCallback();
  }
  render() {
    const isLoggedIn = !!this.user;
    const username = this.user?.username ?? "Guest";
    const avatarUrl = this.user?.avatarUrl ?? "";
    const avatar = avatarUrl ? x`<img
          src="${avatarUrl}"
          alt="Avatar"
          class="w-8 h-8 rounded-full border"
        />` : x`<div
          class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm"
        >
          ?
        </div>`;
    return x`
      <div class="relative">
        <!-- Trigger -->
        <button
          class="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          @click=${this._toggle}
          aria-haspopup="menu"
          aria-expanded=${this.open ? "true" : "false"}
        >
          ${avatar}
          <span class="text-sm font-medium truncate max-w-[10rem]"
            >${username}</span
          >
          <svg
            class="w-4 h-4 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Dropdown -->
        ${this.open ? x`
              <div
                class="absolute right-0 mt-2 w-44 rounded-lg border bg-white shadow-lg overflow-hidden z-[100]"
                role="menu"
              >
                ${isLoggedIn ? x`
                      <button
                        class="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                        @click=${this._onProfile}
                        role="menuitem"
                      >
                        <span>Detail Profil</span>
                      </button>
                      <button
                        class="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        @click=${this._onLogout}
                        role="menuitem"
                      >
                        <span>Logout</span>
                      </button>
                    ` : x`
                      <button
                        class="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                        @click=${this._onLogin}
                        role="menuitem"
                      >
                        <span>Login</span>
                      </button>
                    `}
              </div>
            ` : E}
      </div>
    `;
  }
};
__decorateClass([
  c4({ context: userContext, subscribe: true })
], UserInfo.prototype, "user", 2);
__decorateClass([
  r5()
], UserInfo.prototype, "open", 2);
UserInfo = __decorateClass([
  t3("user-info")
], UserInfo);

// src/context/theme-context.ts
init_context();
var themeContext = n5(Symbol("theme"));

// src/components/layout/app-header.ts
var AppHeader = class extends i4 {
  constructor() {
    super(...arguments);
    this.currentPath = window.location.pathname;
    this.username = "Guest";
    this.avatarUrl = "";
    this.isLoggedIn = false;
  }
  createRenderRoot() {
    return this;
  }
  _onNavChanged(e8) {
    this.dispatchEvent(
      new CustomEvent("nav-changed", {
        detail: e8.detail,
        bubbles: true,
        composed: true
      })
    );
  }
  _forward(type) {
    this.dispatchEvent(
      new CustomEvent(type, { bubbles: true, composed: true })
    );
  }
  _onToggleTheme() {
    this.dispatchEvent(
      new CustomEvent("toggle-theme", { bubbles: true, composed: true })
    );
  }
  render() {
    return x`
      <header
        class="w-full sticky top-0 z-50
             bg-white text-black
             transition-colors duration-300
             dark:bg-gray-900 dark:text-white
             shadow-sm backdrop-blur border-b"
      >
        <div class="mx-auto px-4 flex items-center justify-between gap-4 py-2">
          <app-nav
            class="flex-grow"
            .currentPath=${this.currentPath}
            @nav-changed=${this._onNavChanged}
          ></app-nav>

          <div class="flex items-center gap-3">
            <user-info
              .username=${this.username}
              .avatarUrl=${this.avatarUrl}
              .isLoggedIn=${this.isLoggedIn}
              @login-click=${() => this._forward("login-click")}
              @logout-click=${() => this._forward("logout-click")}
              @profile-click=${() => this._forward("profile-click")}
            ></user-info>

            <!-- Tombol toggle dark mode -->
            <button
              @click=${this._onToggleTheme}
              class="px-2 py-1 rounded text-sm text-white bg-accent hover:bg-opacity-80"
              title="Toggle Theme"
            >
              ${this.theme === "dark" ? "\u2600\uFE0F" : "\u{1F319}"}
            </button>
          </div>
        </div>
      </header>
    `;
  }
};
__decorateClass([
  n4({ type: String })
], AppHeader.prototype, "currentPath", 2);
__decorateClass([
  n4({ type: String })
], AppHeader.prototype, "username", 2);
__decorateClass([
  n4({ type: String })
], AppHeader.prototype, "avatarUrl", 2);
__decorateClass([
  n4({ type: Boolean })
], AppHeader.prototype, "isLoggedIn", 2);
__decorateClass([
  c4({ context: themeContext, subscribe: true })
], AppHeader.prototype, "theme", 2);
AppHeader = __decorateClass([
  t3("app-header")
], AppHeader);

// src/components/layout/app-footer.ts
init_lit();
init_decorators();
var AppFooter = class extends i4 {
  createRenderRoot() {
    return this;
  }
  render() {
    return x`
      <footer>
        <div class="container">
          <div>
            © ${(/* @__PURE__ */ new Date()).getFullYear()} Taniverse v${"1.0.1"}. All
            rights reserved.
          </div>
          <div>
            <a href="https://github.com/slametsampon/taniverse" target="_blank"
              >GitHub</a
            >
            <a href="about">About</a>
          </div>
        </div>
      </footer>
    `;
  }
};
AppFooter = __decorateClass([
  t3("app-footer")
], AppFooter);

// src/components/layout/app-main.ts
init_lit();
init_decorators();

// ../node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i6 = 0;
  while (i6 < str.length) {
    var char = str[i6];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i6, value: str[i6++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i6++, value: str[i6++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i6, value: str[i6++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i6, value: str[i6++] });
      continue;
    }
    if (char === ":") {
      var name2 = "";
      var j2 = i6 + 1;
      while (j2 < str.length) {
        var code = str.charCodeAt(j2);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name2 += str[j2++];
          continue;
        }
        break;
      }
      if (!name2)
        throw new TypeError("Missing parameter name at ".concat(i6));
      tokens.push({ type: "NAME", index: i6, value: name2 });
      i6 = j2;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j2 = i6 + 1;
      if (str[j2] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j2));
      }
      while (j2 < str.length) {
        if (str[j2] === "\\") {
          pattern += str[j2++] + str[j2++];
          continue;
        }
        if (str[j2] === ")") {
          count--;
          if (count === 0) {
            j2++;
            break;
          }
        } else if (str[j2] === "(") {
          count++;
          if (str[j2 + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j2));
          }
        }
        pattern += str[j2++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i6));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i6));
      tokens.push({ type: "PATTERN", index: i6, value: pattern });
      i6 = j2;
      continue;
    }
    tokens.push({ type: "CHAR", index: i6, value: str[i6++] });
  }
  tokens.push({ type: "END", index: i6, value: "" });
  return tokens;
}
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b2 = options.delimiter, delimiter = _b2 === void 0 ? "/#?" : _b2;
  var result = [];
  var key = 0;
  var i6 = 0;
  var path = "";
  var tryConsume = function(type) {
    if (i6 < tokens.length && tokens[i6].type === type)
      return tokens[i6++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i6], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i2 = 0, delimiter_1 = delimiter; _i2 < delimiter_1.length; _i2++) {
      var char2 = delimiter_1[_i2];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i6 < tokens.length) {
    var char = tryConsume("CHAR");
    var name2 = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name2 || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name2 || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x3) {
    return x3;
  } : _a, _b2 = options.validate, validate = _b2 === void 0 ? true : _b2;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path = "";
    for (var i6 = 0; i6 < tokens.length; i6++) {
      var token = tokens[i6];
      if (typeof token === "string") {
        path += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j2 = 0; j2 < value.length; j2++) {
          var segment = encode(value[j2], token);
          if (validate && !matches[i6].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i6].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path;
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b2 = options.start, start = _b2 === void 0 ? true : _b2, _c2 = options.end, end = _c2 === void 0 ? true : _c2, _d = options.encode, encode = _d === void 0 ? function(x3) {
    return x3;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f2 = options.endsWith, endsWith = _f2 === void 0 ? "" : _f2;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i2 = 0, tokens_1 = tokens; _i2 < tokens_1.length; _i2++) {
    var token = tokens_1[_i2];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}

// ../node_modules/@vaadin/router/dist/resolver/utils.js
function isObject(o6) {
  return typeof o6 === "object" && !!o6;
}
function isFunction(f3) {
  return typeof f3 === "function";
}
function isString(s7) {
  return typeof s7 === "string";
}
function toArray(value = []) {
  return Array.isArray(value) ? value : [value];
}
function log(msg) {
  return `[Vaadin.Router] ${msg}`;
}
var NotFoundError = class extends Error {
  constructor(context) {
    super(log(`Page not found (${context.pathname})`));
    __publicField(this, "code");
    __publicField(this, "context");
    this.context = context;
    this.code = 404;
  }
};
var notFoundResult = Symbol("NotFoundResult");
function getNotFoundError(context) {
  return new NotFoundError(context);
}
function resolvePath(path) {
  return (Array.isArray(path) ? path[0] : path) ?? "";
}
function getRoutePath(route) {
  return resolvePath(route?.path);
}
function unwrapChildren(children) {
  return Array.isArray(children) && children.length > 0 ? children : void 0;
}

// ../node_modules/@vaadin/router/dist/resolver/matchPath.js
var cache = /* @__PURE__ */ new Map();
cache.set("|false", {
  keys: [],
  pattern: /(?:)/u
});
function decodeParam(val) {
  try {
    return decodeURIComponent(val);
  } catch {
    return val;
  }
}
function matchPath(routePath, path, exact = false, parentKeys = [], parentParams) {
  const cacheKey = `${routePath}|${String(exact)}`;
  const _path = resolvePath(path);
  let regexp = cache.get(cacheKey);
  if (!regexp) {
    const keys = [];
    regexp = {
      keys,
      pattern: pathToRegexp(routePath, keys, {
        end: exact,
        strict: routePath === ""
      })
    };
    cache.set(cacheKey, regexp);
  }
  const m2 = regexp.pattern.exec(_path);
  if (!m2) {
    return null;
  }
  const params = { ...parentParams };
  for (let i6 = 1; i6 < m2.length; i6++) {
    const key = regexp.keys[i6 - 1];
    const prop = key.name;
    const value = m2[i6];
    if (value !== void 0 || !Object.hasOwn(params, prop)) {
      if (key.modifier === "+" || key.modifier === "*") {
        params[prop] = value ? value.split(/[/?#]/u).map(decodeParam) : [];
      } else {
        params[prop] = value ? decodeParam(value) : value;
      }
    }
  }
  return {
    keys: [...parentKeys, ...regexp.keys],
    params,
    path: m2[0]
  };
}
var matchPath_default = matchPath;

// ../node_modules/@vaadin/router/dist/resolver/matchRoute.js
function matchRoute(route, pathname, ignoreLeadingSlash, parentKeys, parentParams) {
  let match;
  let childMatches;
  let childIndex = 0;
  let routepath = getRoutePath(route);
  if (routepath.startsWith("/")) {
    if (ignoreLeadingSlash) {
      routepath = routepath.substring(1);
    }
    ignoreLeadingSlash = true;
  }
  return {
    next(routeToSkip) {
      if (route === routeToSkip) {
        return { done: true, value: void 0 };
      }
      route.__children ?? (route.__children = unwrapChildren(route.children));
      const children = route.__children ?? [];
      const exact = !route.__children && !route.children;
      if (!match) {
        match = matchPath_default(routepath, pathname, exact, parentKeys, parentParams);
        if (match) {
          return {
            value: {
              keys: match.keys,
              params: match.params,
              path: match.path,
              route
            }
          };
        }
      }
      if (match && children.length > 0) {
        while (childIndex < children.length) {
          if (!childMatches) {
            const childRoute = children[childIndex];
            childRoute.parent = route;
            let matchedLength = match.path.length;
            if (matchedLength > 0 && pathname.charAt(matchedLength) === "/") {
              matchedLength += 1;
            }
            childMatches = matchRoute(
              childRoute,
              pathname.substring(matchedLength),
              ignoreLeadingSlash,
              match.keys,
              match.params
            );
          }
          const childMatch = childMatches.next(routeToSkip);
          if (!childMatch.done) {
            return {
              done: false,
              value: childMatch.value
            };
          }
          childMatches = null;
          childIndex += 1;
        }
      }
      return { done: true, value: void 0 };
    }
  };
}
var matchRoute_default = matchRoute;

// ../node_modules/@vaadin/router/dist/resolver/resolveRoute.js
function resolveRoute(context) {
  if (isFunction(context.route.action)) {
    return context.route.action(context);
  }
  return void 0;
}

// ../node_modules/@vaadin/router/dist/resolver/resolver.js
function isDescendantRoute(route, maybeParent) {
  let _route = route;
  while (_route) {
    _route = _route.parent;
    if (_route === maybeParent) {
      return true;
    }
  }
  return false;
}
function isRouteContext(value) {
  return !!value && typeof value === "object" && "next" in value && "params" in value && "result" in value && "route" in value;
}
var ResolutionError = class extends Error {
  constructor(context, options) {
    let errorMessage = `Path '${context.pathname}' is not properly resolved due to an error.`;
    const routePath = getRoutePath(context.route);
    if (routePath) {
      errorMessage += ` Resolution had failed on route: '${routePath}'`;
    }
    super(errorMessage, options);
    __publicField(this, "code");
    __publicField(this, "context");
    this.code = options?.code;
    this.context = context;
  }
  warn() {
    console.warn(this.message);
  }
};
function updateChainForRoute(context, match) {
  const { path, route } = match;
  if (route && !route.__synthetic) {
    const item = { path, route };
    if (route.parent && context.chain) {
      for (let i6 = context.chain.length - 1; i6 >= 0; i6--) {
        if (context.chain[i6].route === route.parent) {
          break;
        }
        context.chain.pop();
      }
    }
    context.chain?.push(item);
  }
}
var _context, _root;
var Resolver = class {
  constructor(routes, { baseUrl = "", context, errorHandler, resolveRoute: resolveRoute2 = resolveRoute } = {}) {
    /**
     * The base URL for all routes in the router instance. By default,
     * if the base element exists in the `<head>`, vaadin-router
     * takes the `<base href>` attribute value, resolved against the current
     * `document.URL`.
     */
    __publicField(this, "baseUrl");
    __privateAdd(this, _context);
    __publicField(this, "errorHandler");
    __publicField(this, "resolveRoute");
    __privateAdd(this, _root);
    if (Object(routes) !== routes) {
      throw new TypeError("Invalid routes");
    }
    this.baseUrl = baseUrl;
    this.errorHandler = errorHandler;
    this.resolveRoute = resolveRoute2;
    if (Array.isArray(routes)) {
      __privateSet(this, _root, {
        __children: routes,
        __synthetic: true,
        action: () => void 0,
        path: ""
      });
    } else {
      __privateSet(this, _root, { ...routes, parent: void 0 });
    }
    __privateSet(this, _context, {
      ...context,
      hash: "",
      // eslint-disable-next-line @typescript-eslint/require-await
      async next() {
        return notFoundResult;
      },
      params: {},
      pathname: "",
      resolver: this,
      route: __privateGet(this, _root),
      search: "",
      chain: []
    });
  }
  get root() {
    return __privateGet(this, _root);
  }
  get context() {
    return __privateGet(this, _context);
  }
  /**
   * If the baseUrl property is set, transforms the baseUrl and returns the full
   * actual `base` string for using in the `new URL(path, base);` and for
   * prepernding the paths with. The returned base ends with a trailing slash.
   *
   * Otherwise, returns empty string.
   */
  get __effectiveBaseUrl() {
    return this.baseUrl ? new URL(this.baseUrl, document.baseURI || document.URL).href.replace(/[^/]*$/u, "") : "";
  }
  /**
   * Returns the current list of routes (as a shallow copy). Adding / removing
   * routes to / from the returned array does not affect the routing config,
   * but modifying the route objects does.
   *
   * @public
   */
  getRoutes() {
    return [...__privateGet(this, _root).__children ?? []];
  }
  /**
   * Removes all existing routes from the routing config.
   *
   * @public
   */
  removeRoutes() {
    __privateGet(this, _root).__children = [];
  }
  /**
   * Asynchronously resolves the given pathname, i.e. finds all routes matching
   * the pathname and tries resolving them one after another in the order they
   * are listed in the routes config until the first non-null result.
   *
   * Returns a promise that is fulfilled with the return value of an object that consists of the first
   * route handler result that returns something other than `null` or `undefined` and context used to get this result.
   *
   * If no route handlers return a non-null result, or if no route matches the
   * given pathname the returned promise is rejected with a 'page not found'
   * `Error`.
   *
   * @param pathnameOrContext - the pathname to
   *    resolve or a context object with a `pathname` property and other
   *    properties to pass to the route resolver functions.
   */
  async resolve(pathnameOrContext) {
    const self2 = this;
    const context = {
      ...__privateGet(this, _context),
      ...isString(pathnameOrContext) ? { pathname: pathnameOrContext } : pathnameOrContext,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      next
    };
    const match = matchRoute_default(
      __privateGet(this, _root),
      this.__normalizePathname(context.pathname) ?? context.pathname,
      !!this.baseUrl
    );
    const resolve = this.resolveRoute;
    let matches = null;
    let nextMatches = null;
    let currentContext = context;
    async function next(resume = false, parent = matches?.value?.route, prevResult) {
      const routeToSkip = prevResult === null ? matches?.value?.route : void 0;
      matches = nextMatches ?? match.next(routeToSkip);
      nextMatches = null;
      if (!resume) {
        if (!!matches.done || !isDescendantRoute(matches.value.route, parent)) {
          nextMatches = matches;
          return notFoundResult;
        }
      }
      if (matches.done) {
        throw getNotFoundError(context);
      }
      currentContext = {
        ...context,
        params: matches.value.params,
        route: matches.value.route,
        chain: currentContext.chain?.slice()
      };
      updateChainForRoute(currentContext, matches.value);
      const resolution = await resolve(currentContext);
      if (resolution !== null && resolution !== void 0 && resolution !== notFoundResult) {
        currentContext.result = isRouteContext(resolution) ? resolution.result : resolution;
        __privateSet(self2, _context, currentContext);
        return currentContext;
      }
      return await next(resume, parent, resolution);
    }
    try {
      return await next(true, __privateGet(this, _root));
    } catch (error) {
      const _error = error instanceof NotFoundError ? error : new ResolutionError(currentContext, { code: 500, cause: error });
      if (this.errorHandler) {
        currentContext.result = this.errorHandler(_error);
        return currentContext;
      }
      throw error;
    }
  }
  /**
   * Sets the routing config (replacing the existing one).
   *
   * @param routes - a single route or an array of those
   *    (the array is shallow copied)
   */
  setRoutes(routes) {
    __privateGet(this, _root).__children = [...toArray(routes)];
  }
  /**
   * If the baseUrl is set, matches the pathname with the router’s baseUrl,
   * and returns the local pathname with the baseUrl stripped out.
   *
   * If the pathname does not match the baseUrl, returns undefined.
   *
   * If the `baseUrl` is not set, returns the unmodified pathname argument.
   */
  __normalizePathname(pathname) {
    if (!this.baseUrl) {
      return pathname;
    }
    const base = this.__effectiveBaseUrl;
    const url = pathname.startsWith("/") ? new URL(base).origin + pathname : `./${pathname}`;
    const normalizedUrl = new URL(url, base).href;
    if (normalizedUrl.startsWith(base)) {
      return normalizedUrl.slice(base.length);
    }
    return void 0;
  }
  /**
   * Appends one or several routes to the routing config and returns the
   * effective routing config after the operation.
   *
   * @param routes - a single route or an array of those
   *    (the array is shallow copied)
   */
  addRoutes(routes) {
    __privateGet(this, _root).__children = [...__privateGet(this, _root).__children ?? [], ...toArray(routes)];
    return this.getRoutes();
  }
};
_context = new WeakMap();
_root = new WeakMap();

// ../node_modules/@vaadin/router/dist/resolver/generateUrls.js
function cacheRoutes(routesByName, route, routes, cacheKeyProvider) {
  const name2 = route.name ?? cacheKeyProvider?.(route);
  if (name2) {
    if (routesByName.has(name2)) {
      routesByName.get(name2)?.push(route);
    } else {
      routesByName.set(name2, [route]);
    }
  }
  if (Array.isArray(routes)) {
    for (const childRoute of routes) {
      childRoute.parent = route;
      cacheRoutes(routesByName, childRoute, childRoute.__children ?? childRoute.children, cacheKeyProvider);
    }
  }
}
function getRouteByName(routesByName, routeName) {
  const routes = routesByName.get(routeName);
  if (routes) {
    if (routes.length > 1) {
      throw new Error(`Duplicate route with name "${routeName}". Try seting unique 'name' route properties.`);
    }
    return routes[0];
  }
  return void 0;
}
function generateUrls(resolver, options = {}) {
  if (!(resolver instanceof Resolver)) {
    throw new TypeError("An instance of Resolver is expected");
  }
  const cache3 = /* @__PURE__ */ new Map();
  const routesByName = /* @__PURE__ */ new Map();
  return (routeName, params) => {
    let route = getRouteByName(routesByName, routeName);
    if (!route) {
      routesByName.clear();
      cacheRoutes(routesByName, resolver.root, resolver.root.__children, options.cacheKeyProvider);
      route = getRouteByName(routesByName, routeName);
      if (!route) {
        throw new Error(`Route "${routeName}" not found`);
      }
    }
    let cached = route.fullPath ? cache3.get(route.fullPath) : void 0;
    if (!cached) {
      let fullPath = getRoutePath(route);
      let rt = route.parent;
      while (rt) {
        const path = getRoutePath(rt);
        if (path) {
          fullPath = `${path.replace(/\/$/u, "")}/${fullPath.replace(/^\//u, "")}`;
        }
        rt = rt.parent;
      }
      const tokens = parse(fullPath);
      const keys = /* @__PURE__ */ Object.create(null);
      for (const item of tokens) {
        if (!isString(item)) {
          keys[item.name] = true;
        }
      }
      cached = { keys, tokens };
      cache3.set(fullPath, cached);
      route.fullPath = fullPath;
    }
    const toPath = tokensToFunction(cached.tokens, { encode: encodeURIComponent, ...options });
    let url = toPath(params) || "/";
    if (options.stringifyQueryParams && params) {
      const queryParams = {};
      for (const [key, value] of Object.entries(params)) {
        if (!(key in cached.keys) && value) {
          queryParams[key] = value;
        }
      }
      const query = options.stringifyQueryParams(queryParams);
      if (query) {
        url += query.startsWith("?") ? query : `?${query}`;
      }
    }
    return url;
  };
}
var generateUrls_default = generateUrls;

// ../node_modules/@vaadin/vaadin-development-mode-detector/vaadin-development-mode-detector.js
var DEV_MODE_CODE_REGEXP = /\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i;
var FlowClients = window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients;
function isMinified() {
  function test() {
    return true;
  }
  return uncommentAndRun(test);
}
function isDevelopmentMode() {
  try {
    if (isForcedDevelopmentMode()) {
      return true;
    }
    if (!isLocalhost()) {
      return false;
    }
    if (FlowClients) {
      return !isFlowProductionMode();
    }
    return !isMinified();
  } catch (e8) {
    return false;
  }
}
function isForcedDevelopmentMode() {
  return localStorage.getItem("vaadin.developmentmode.force");
}
function isLocalhost() {
  return ["localhost", "127.0.0.1"].indexOf(window.location.hostname) >= 0;
}
function isFlowProductionMode() {
  if (FlowClients) {
    const productionModeApps = Object.keys(FlowClients).map((key) => FlowClients[key]).filter((client) => client.productionMode);
    if (productionModeApps.length > 0) {
      return true;
    }
  }
  return false;
}
function uncommentAndRun(callback, args) {
  if (typeof callback !== "function") {
    return;
  }
  const match = DEV_MODE_CODE_REGEXP.exec(callback.toString());
  if (match) {
    try {
      callback = new Function(match[1]);
    } catch (e8) {
      console.log("vaadin-development-mode-detector: uncommentAndRun() failed", e8);
    }
  }
  return callback(args);
}
window["Vaadin"] = window["Vaadin"] || {};
var runIfDevelopmentMode = function(callback, args) {
  if (window.Vaadin.developmentMode) {
    return uncommentAndRun(callback, args);
  }
};
if (window.Vaadin.developmentMode === void 0) {
  window.Vaadin.developmentMode = isDevelopmentMode();
}

// ../node_modules/@vaadin/vaadin-usage-statistics/vaadin-usage-statistics-collect.js
function maybeGatherAndSendStats() {
}
var usageStatistics = function() {
  if (typeof runIfDevelopmentMode === "function") {
    return runIfDevelopmentMode(maybeGatherAndSendStats);
  }
};

// ../node_modules/@vaadin/router/dist/router-meta.js
function __REGISTER__(feature, vaadinObj = window.Vaadin ?? (window.Vaadin = {})) {
  vaadinObj.registrations ?? (vaadinObj.registrations = []);
  vaadinObj.registrations.push({
    is: feature ? `${"@vaadin/router"}/${feature}` : "@vaadin/router",
    version: "2.0.0"
  });
}
__REGISTER__();
usageStatistics();

// ../node_modules/@vaadin/router/dist/transitions/animate.js
var willAnimate = (elem) => {
  const name2 = getComputedStyle(elem).getPropertyValue("animation-name");
  return name2 && name2 !== "none";
};
var waitForAnimation = (elem, cb2) => {
  const listener = () => {
    elem.removeEventListener("animationend", listener);
    cb2();
  };
  elem.addEventListener("animationend", listener);
};
async function animate(elem, className) {
  elem.classList.add(className);
  return await new Promise((resolve) => {
    if (willAnimate(elem)) {
      const rect = elem.getBoundingClientRect();
      const size = `height: ${rect.bottom - rect.top}px; width: ${rect.right - rect.left}px`;
      elem.setAttribute("style", `position: absolute; ${size}`);
      waitForAnimation(elem, () => {
        elem.classList.remove(className);
        elem.removeAttribute("style");
        resolve();
      });
    } else {
      elem.classList.remove(className);
      resolve();
    }
  });
}
var animate_default = animate;

// ../node_modules/@vaadin/router/dist/utils.js
function ensureRoute(route) {
  if (!route || !isString(route.path)) {
    throw new Error(
      log(`Expected route config to be an object with a "path" string property, or an array of such objects`)
    );
  }
  if (!isFunction(route.action) && !Array.isArray(route.children) && !isFunction(route.children) && !isString(route.component) && !isString(route.redirect)) {
    throw new Error(
      log(
        `Expected route config "${route.path}" to include either "component, redirect" or "action" function but none found.`
      )
    );
  }
  if (route.redirect) {
    ["bundle", "component"].forEach((overriddenProp) => {
      if (overriddenProp in route) {
        console.warn(
          log(
            `Route config "${String(route.path)}" has both "redirect" and "${overriddenProp}" properties, and "redirect" will always override the latter. Did you mean to only use "${overriddenProp}"?`
          )
        );
      }
    });
  }
}
function ensureRoutes(routes) {
  toArray(routes).forEach((route) => ensureRoute(route));
}
function copyContextWithoutNext({
  next: _2,
  ...context
}) {
  return context;
}
function getPathnameForRouter(pathname, router) {
  const base = router.__effectiveBaseUrl;
  return base ? new URL(pathname.replace(/^\//u, ""), base).pathname : pathname;
}
function getMatchedPath(pathItems) {
  return pathItems.map((pathItem) => pathItem.path).reduce((a3, b3) => {
    if (b3.length) {
      return `${a3.replace(/\/$/u, "")}/${b3.replace(/^\//u, "")}`;
    }
    return a3;
  }, "");
}
function getRoutePath2(chain) {
  return getMatchedPath(chain.map((chainItem) => chainItem.route));
}
function createLocation({ chain = [], hash = "", params = {}, pathname = "", redirectFrom, resolver, search = "" }, route) {
  const routes = chain.map((item) => item.route);
  return {
    baseUrl: resolver?.baseUrl ?? "",
    getUrl: (userParams = {}) => resolver ? getPathnameForRouter(compile(getRoutePath2(chain))({ ...params, ...userParams }), resolver) : "",
    hash,
    params,
    pathname,
    redirectFrom,
    route: route ?? (Array.isArray(routes) ? routes.at(-1) : void 0) ?? null,
    routes,
    search,
    searchParams: new URLSearchParams(search)
  };
}
function createRedirect(context, pathname) {
  const params = { ...context.params };
  return {
    redirect: {
      from: context.pathname,
      params,
      pathname
    }
  };
}
function renderElement(context, element) {
  element.location = createLocation(context);
  if (context.chain) {
    const index = context.chain.map((item) => item.route).indexOf(context.route);
    context.chain[index].element = element;
  }
  return element;
}
function maybeCall(callback, thisArg, ...args) {
  if (typeof callback === "function") {
    return callback.apply(thisArg, args);
  }
  return void 0;
}
function amend(fn, obj, ...args) {
  return (result) => {
    if (result && isObject(result) && ("cancel" in result || "redirect" in result)) {
      return result;
    }
    return maybeCall(obj?.[fn], obj, ...args);
  };
}
function processNewChildren(newChildren, route) {
  if (!Array.isArray(newChildren) && !isObject(newChildren)) {
    throw new Error(
      log(
        `Incorrect "children" value for the route ${String(route.path)}: expected array or object, but got ${String(
          newChildren
        )}`
      )
    );
  }
  const children = toArray(newChildren);
  children.forEach((child) => ensureRoute(child));
  route.__children = children;
}
function fireRouterEvent(type, detail) {
  return !window.dispatchEvent(new CustomEvent(`vaadin-router-${type}`, { cancelable: type === "go", detail }));
}
function logValue(value) {
  if (typeof value !== "object") {
    return String(value);
  }
  const [stringType = "Unknown"] = / (.*)\]$/u.exec(String(value)) ?? [];
  if (stringType === "Object" || stringType === "Array") {
    return `${stringType} ${JSON.stringify(value)}`;
  }
  return stringType;
}

// ../node_modules/@vaadin/router/dist/triggers/click.js
function getAnchorOrigin(anchor) {
  const { port, protocol } = anchor;
  const defaultHttp = protocol === "http:" && port === "80";
  const defaultHttps = protocol === "https:" && port === "443";
  const host = defaultHttp || defaultHttps ? anchor.hostname : anchor.host;
  return `${protocol}//${host}`;
}
function getNormalizedNodeName(e8) {
  if (!(e8 instanceof Element)) {
    return void 0;
  }
  return e8.nodeName.toLowerCase();
}
function vaadinRouterGlobalClickHandler(event) {
  if (event.defaultPrevented) {
    return;
  }
  if (event.button !== 0) {
    return;
  }
  if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
    return;
  }
  let anchorCandidate = event.target;
  const path = event instanceof MouseEvent ? event.composedPath() : event.path ?? [];
  for (let i6 = 0; i6 < path.length; i6++) {
    const target = path[i6];
    if ("nodeName" in target && target.nodeName.toLowerCase() === "a") {
      anchorCandidate = target;
      break;
    }
  }
  while (anchorCandidate && anchorCandidate instanceof Node && getNormalizedNodeName(anchorCandidate) !== "a") {
    anchorCandidate = anchorCandidate.parentNode;
  }
  if (!anchorCandidate || getNormalizedNodeName(anchorCandidate) !== "a") {
    return;
  }
  const anchor = anchorCandidate;
  if (anchor.target && anchor.target.toLowerCase() !== "_self") {
    return;
  }
  if (anchor.hasAttribute("download")) {
    return;
  }
  if (anchor.hasAttribute("router-ignore")) {
    return;
  }
  if (anchor.pathname === window.location.pathname && anchor.hash !== "") {
    return;
  }
  const origin = anchor.origin || getAnchorOrigin(anchor);
  if (origin !== window.location.origin) {
    return;
  }
  const { hash, pathname, search } = anchor;
  if (fireRouterEvent("go", { hash, pathname, search }) && event instanceof MouseEvent) {
    event.preventDefault();
    if (event.type === "click") {
      window.scrollTo(0, 0);
    }
  }
}
var CLICK = {
  activate() {
    window.document.addEventListener("click", vaadinRouterGlobalClickHandler);
  },
  inactivate() {
    window.document.removeEventListener("click", vaadinRouterGlobalClickHandler);
  }
};
var click_default = CLICK;

// ../node_modules/@vaadin/router/dist/triggers/popstate.js
function vaadinRouterGlobalPopstateHandler(event) {
  if (event.state === "vaadin-router-ignore") {
    return;
  }
  const { hash, pathname, search } = window.location;
  fireRouterEvent("go", { hash, pathname, search });
}
var POPSTATE = {
  activate() {
    window.addEventListener("popstate", vaadinRouterGlobalPopstateHandler);
  },
  inactivate() {
    window.removeEventListener("popstate", vaadinRouterGlobalPopstateHandler);
  }
};
var popstate_default = POPSTATE;

// ../node_modules/@vaadin/router/dist/triggers/navigation.js
var triggers = [];
var DEFAULT_TRIGGERS = {
  CLICK: click_default,
  POPSTATE: popstate_default
};
function setNavigationTriggers(newTriggers = []) {
  triggers.forEach((trigger) => trigger.inactivate());
  newTriggers.forEach((trigger) => trigger.activate());
  triggers = newTriggers;
}

// ../node_modules/@vaadin/router/dist/router.js
var MAX_REDIRECT_COUNT = 256;
function prevent() {
  return { cancel: true };
}
var rootContext = {
  __renderId: -1,
  params: {},
  route: {
    __synthetic: true,
    children: [],
    path: "",
    action() {
      return void 0;
    }
  },
  pathname: "",
  // eslint-disable-next-line @typescript-eslint/require-await
  async next() {
    return notFoundResult;
  }
};
var _addedByRouter, _createdByRouter, _navigationEventHandler, _lastStartedRenderId, _outlet, _urlForName, _appearingContent, _disappearingContent, _Router_instances, resolveRoute_fn, doRender_fn, fullyResolveChain_fn, findComponentContextAfterAllRedirects_fn, amendWithOnBeforeCallbacks_fn, runOnBeforeCallbacks_fn, runOnBeforeLeaveCallbacks_fn, runOnBeforeEnterCallbacks_fn, isReusableElement_fn, isLatestRender_fn, redirect_fn, ensureOutlet_fn, updateBrowserHistory_fn, copyUnchangedElements_fn, addAppearingContent_fn, removeDisappearingContent_fn, removeAppearingContent_fn, runOnAfterLeaveCallbacks_fn, runOnAfterEnterCallbacks_fn, animateIfNeeded_fn, onNavigationEvent_fn;
var Router = class extends Resolver {
  /**
   * Creates a new Router instance with a given outlet, and
   * automatically subscribes it to navigation events on the `window`.
   * Using a constructor argument or a setter for outlet is equivalent:
   *
   * ```
   * const router = new Router();
   * router.setOutlet(outlet);
   * ```
   * @param outlet - a container to render the resolved route
   * @param options - an optional object with options
   */
  constructor(outlet, options) {
    const baseElement = document.head.querySelector("base");
    const baseHref = baseElement?.getAttribute("href");
    super([], {
      baseUrl: baseHref ? new URL(baseHref, document.URL).href.replace(/[^/]*$/u, "") : void 0,
      ...options,
      resolveRoute: async (context) => await __privateMethod(this, _Router_instances, resolveRoute_fn).call(this, context)
    });
    __privateAdd(this, _Router_instances);
    /**
     * Contains read-only information about the current router location:
     * pathname, active routes, parameters. See the
     * [Location type declaration](#/classes/RouterLocation)
     * for more details.
     */
    __publicField(this, "location", createLocation({ resolver: this }));
    /**
     * A promise that is settled after the current render cycle completes. If
     * there is no render cycle in progress the promise is immediately settled
     * with the last render cycle result.
     */
    __publicField(this, "ready", Promise.resolve(this.location));
    __privateAdd(this, _addedByRouter, /* @__PURE__ */ new WeakSet());
    __privateAdd(this, _createdByRouter, /* @__PURE__ */ new WeakSet());
    __privateAdd(this, _navigationEventHandler, __privateMethod(this, _Router_instances, onNavigationEvent_fn).bind(this));
    __privateAdd(this, _lastStartedRenderId, 0);
    __privateAdd(this, _outlet);
    __publicField(this, "__previousContext");
    __privateAdd(this, _urlForName);
    __privateAdd(this, _appearingContent, null);
    __privateAdd(this, _disappearingContent, null);
    setNavigationTriggers(Object.values(DEFAULT_TRIGGERS));
    this.setOutlet(outlet);
    this.subscribe();
  }
  /**
   * Sets the router outlet (the DOM node where the content for the current
   * route is inserted). Any content pre-existing in the router outlet is
   * removed at the end of each render pass.
   *
   * @remarks
   * This method is automatically invoked first time when creating a new Router
   * instance.
   *
   * @param outlet - the DOM node where the content for the current route is
   * inserted.
   */
  setOutlet(outlet) {
    if (outlet) {
      __privateMethod(this, _Router_instances, ensureOutlet_fn).call(this, outlet);
    }
    __privateSet(this, _outlet, outlet);
  }
  /**
   * Returns the current router outlet. The initial value is `undefined`.
   *
   * @returns the current router outlet (or `undefined`)
   */
  getOutlet() {
    return __privateGet(this, _outlet);
  }
  /**
   * Sets the routing config (replacing the existing one) and triggers a
   * navigation event so that the router outlet is refreshed according to the
   * current `window.location` and the new routing config.
   *
   * Each route object may have the following properties, listed here in the processing order:
   * * `path` – the route path (relative to the parent route if any) in the
   * [express.js syntax](https://expressjs.com/en/guide/routing.html#route-paths).
   *
   * * `children` – an array of nested routes or a function that provides this
   * array at the render time. The function can be synchronous or asynchronous:
   * in the latter case the render is delayed until the returned promise is
   * resolved. The `children` function is executed every time when this route is
   * being rendered. This allows for dynamic route structures (e.g. backend-defined),
   * but it might have a performance impact as well. In order to avoid calling
   * the function on subsequent renders, you can override the `children` property
   * of the route object and save the calculated array there
   * (via `context.route.children = [ route1, route2, ...];`).
   * Parent routes are fully resolved before resolving the children. Children
   * 'path' values are relative to the parent ones.
   *
   * * `action` – the action that is executed before the route is resolved.
   * The value for this property should be a function, accepting `context`
   * and `commands` parameters described below. If present, this function is
   * always invoked first, disregarding of the other properties' presence.
   * The action can return a result directly or within a `Promise`, which
   * resolves to the result. If the action result is an `HTMLElement` instance,
   * a `commands.component(name)` result, a `commands.redirect(path)` result,
   * or a `context.next()` result, the current route resolution is finished,
   * and other route config properties are ignored.
   * See also **Route Actions** section in [Live Examples](#/classes/Router/demos/demo/index.html).
   *
   * * `redirect` – other route's path to redirect to. Passes all route parameters to the redirect target.
   * The target route should also be defined.
   * See also **Redirects** section in [Live Examples](#/classes/Router/demos/demo/index.html).
   *
   * * `component` – the tag name of the Web Component to resolve the route to.
   * The property is ignored when either an `action` returns the result or `redirect` property is present.
   * If route contains the `component` property (or an action that return a component)
   * and its child route also contains the `component` property, child route's component
   * will be rendered as a light dom child of a parent component.
   *
   * * `name` – the string name of the route to use in the
   * [`router.urlForName(name, params)`](#/classes/Router#method-urlForName)
   * navigation helper method.
   *
   * For any route function (`action`, `children`) defined, the corresponding `route` object is available inside the
   * callback through the `this` reference. If you need to access it, make sure you define the callback as a non-arrow
   * function because arrow functions do not have their own `this` reference.
   *
   * `context` object that is passed to `action` function holds the following properties:
   * * `context.pathname` – string with the pathname being resolved
   *
   * * `context.search` – search query string
   *
   * * `context.hash` – hash string
   *
   * * `context.params` – object with route parameters
   *
   * * `context.route` – object that holds the route that is currently being rendered.
   *
   * * `context.next()` – function for asynchronously getting the next route
   * contents from the resolution chain (if any)
   *
   * `commands` object that is passed to `action` function has
   * the following methods:
   *
   * * `commands.redirect(path)` – function that creates a redirect data
   * for the path specified.
   *
   * * `commands.component(component)` – function that creates a new HTMLElement
   * with current context. Note: the component created by this function is reused if visiting the same path twice in
   * row.
   *
   * @param routes - a single route or an array of those
   * @param skipRender - configure the router but skip rendering the
   *     route corresponding to the current `window.location` values
   */
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async setRoutes(routes, skipRender = false) {
    this.__previousContext = void 0;
    __privateSet(this, _urlForName, void 0);
    ensureRoutes(routes);
    super.setRoutes(routes);
    if (!skipRender) {
      __privateMethod(this, _Router_instances, onNavigationEvent_fn).call(this);
    }
    return await this.ready;
  }
  addRoutes(routes) {
    ensureRoutes(routes);
    return super.addRoutes(routes);
  }
  /**
   * Asynchronously resolves the given pathname and renders the resolved route
   * component into the router outlet. If no router outlet is set at the time of
   * calling this method, or at the time when the route resolution is completed,
   * a `TypeError` is thrown.
   *
   * Returns a promise that is fulfilled with the router outlet DOM Element | DocumentFragment after
   * the route component is created and inserted into the router outlet, or
   * rejected if no route matches the given path.
   *
   * If another render pass is started before the previous one is completed, the
   * result of the previous render pass is ignored.
   *
   * @param pathnameOrContext - the pathname to render or a context object with
   * a `pathname` property, optional `search` and `hash` properties, and other
   * properties to pass to the resolver.
   * @param shouldUpdateHistory - update browser history with the rendered
   * location
   */
  async render(pathnameOrContext, shouldUpdateHistory = false) {
    __privateSet(this, _lastStartedRenderId, __privateGet(this, _lastStartedRenderId) + 1);
    const renderId = __privateGet(this, _lastStartedRenderId);
    const context = {
      ...rootContext,
      ...isString(pathnameOrContext) ? { hash: "", search: "", pathname: pathnameOrContext } : pathnameOrContext,
      __renderId: renderId
    };
    this.ready = __privateMethod(this, _Router_instances, doRender_fn).call(this, context, shouldUpdateHistory);
    return await this.ready;
  }
  /**
   * Subscribes this instance to navigation events on the `window`.
   *
   * NOTE: beware of resource leaks. For as long as a router instance is
   * subscribed to navigation events, it won't be garbage collected.
   */
  subscribe() {
    window.addEventListener("vaadin-router-go", __privateGet(this, _navigationEventHandler));
  }
  /**
   * Removes the subscription to navigation events created in the `subscribe()`
   * method.
   */
  unsubscribe() {
    window.removeEventListener("vaadin-router-go", __privateGet(this, _navigationEventHandler));
  }
  /**
   * Configures what triggers Router navigation events:
   *  - `POPSTATE`: popstate events on the current `window`
   *  - `CLICK`: click events on `<a>` links leading to the current page
   *
   * This method is invoked with the pre-configured values when creating a new Router instance.
   * By default, both `POPSTATE` and `CLICK` are enabled. This setup is expected to cover most of the use cases.
   *
   * See the `router-config.js` for the default navigation triggers config. Based on it, you can
   * create the own one and only import the triggers you need, instead of pulling in all the code,
   * e.g. if you want to handle `click` differently.
   *
   * See also **Navigation Triggers** section in [Live Examples](#/classes/Router/demos/demo/index.html).
   *
   * @param triggers - navigation triggers
   */
  static setTriggers(...triggers2) {
    setNavigationTriggers(triggers2);
  }
  /**
   * Generates a URL for the route with the given name, optionally performing
   * substitution of parameters.
   *
   * The route is searched in all the Router instances subscribed to
   * navigation events.
   *
   * **Note:** For child route names, only array children are considered.
   * It is not possible to generate URLs using a name for routes set with
   * a children function.
   *
   * @param name - The route name or the route’s `component` name.
   * @param params - Optional object with route path parameters.
   * Named parameters are passed by name (`params[name] = value`), unnamed
   * parameters are passed by index (`params[index] = value`).
   */
  urlForName(name2, params) {
    if (!__privateGet(this, _urlForName)) {
      __privateSet(this, _urlForName, generateUrls_default(this, {
        cacheKeyProvider(route) {
          return "component" in route && typeof route.component === "string" ? route.component : void 0;
        }
      }));
    }
    return getPathnameForRouter(__privateGet(this, _urlForName).call(this, name2, params ?? void 0), this);
  }
  /**
   * Generates a URL for the given route path, optionally performing
   * substitution of parameters.
   *
   * @param path - String route path declared in [express.js
   * syntax](https://expressjs.com/en/guide/routing.html#route-paths).
   * @param params - Optional object with route path parameters.
   * Named parameters are passed by name (`params[name] = value`), unnamed
   * parameters are passed by index (`params[index] = value`).
   */
  urlForPath(path, params) {
    return getPathnameForRouter(
      compile(path)(params ?? void 0),
      this
    );
  }
  /**
   * Triggers navigation to a new path. Returns a boolean without waiting until
   * the navigation is complete. Returns `true` if at least one `Router`
   * has handled the navigation (was subscribed and had `baseUrl` matching
   * the `path` argument), otherwise returns `false`.
   *
   * @param path - A new in-app path string, or an URL-like object with
   * `pathname` string property, and optional `search` and `hash` string
   * properties.
   */
  static go(path) {
    const { pathname, search, hash } = isString(path) ? new URL(path, "http://a") : path;
    return fireRouterEvent("go", { pathname, search, hash });
  }
};
_addedByRouter = new WeakMap();
_createdByRouter = new WeakMap();
_navigationEventHandler = new WeakMap();
_lastStartedRenderId = new WeakMap();
_outlet = new WeakMap();
_urlForName = new WeakMap();
_appearingContent = new WeakMap();
_disappearingContent = new WeakMap();
_Router_instances = new WeakSet();
resolveRoute_fn = async function(context) {
  const { route } = context;
  if (isFunction(route.children)) {
    let children = await route.children(copyContextWithoutNext(context));
    if (!isFunction(route.children)) {
      ({ children } = route);
    }
    processNewChildren(children, route);
  }
  const commands = {
    component: (component) => {
      const element = document.createElement(component);
      __privateGet(this, _createdByRouter).add(element);
      return element;
    },
    prevent,
    redirect: (path) => createRedirect(context, path)
  };
  return await Promise.resolve().then(async () => {
    if (__privateMethod(this, _Router_instances, isLatestRender_fn).call(this, context)) {
      return await maybeCall(route.action, route, context, commands);
    }
  }).then((result) => {
    if (result != null && (typeof result === "object" || typeof result === "symbol")) {
      if (result instanceof HTMLElement || result === notFoundResult || isObject(result) && "redirect" in result) {
        return result;
      }
    }
    if (isString(route.redirect)) {
      return commands.redirect(route.redirect);
    }
  }).then((result) => {
    if (result != null) {
      return result;
    }
    if (isString(route.component)) {
      return commands.component(route.component);
    }
  });
};
doRender_fn = async function(context, shouldUpdateHistory) {
  const { __renderId: renderId } = context;
  try {
    const ctx = await this.resolve(context);
    const contextWithChain = await __privateMethod(this, _Router_instances, fullyResolveChain_fn).call(this, ctx);
    if (!__privateMethod(this, _Router_instances, isLatestRender_fn).call(this, contextWithChain)) {
      return this.location;
    }
    const previousContext = this.__previousContext;
    if (contextWithChain === previousContext) {
      __privateMethod(this, _Router_instances, updateBrowserHistory_fn).call(this, previousContext, true);
      return this.location;
    }
    this.location = createLocation(contextWithChain);
    if (shouldUpdateHistory) {
      __privateMethod(this, _Router_instances, updateBrowserHistory_fn).call(this, contextWithChain, renderId === 1);
    }
    fireRouterEvent("location-changed", {
      router: this,
      location: this.location
    });
    if (contextWithChain.__skipAttach) {
      __privateMethod(this, _Router_instances, copyUnchangedElements_fn).call(this, contextWithChain, previousContext);
      this.__previousContext = contextWithChain;
      return this.location;
    }
    __privateMethod(this, _Router_instances, addAppearingContent_fn).call(this, contextWithChain, previousContext);
    const animationDone = __privateMethod(this, _Router_instances, animateIfNeeded_fn).call(this, contextWithChain);
    __privateMethod(this, _Router_instances, runOnAfterEnterCallbacks_fn).call(this, contextWithChain);
    __privateMethod(this, _Router_instances, runOnAfterLeaveCallbacks_fn).call(this, contextWithChain, previousContext);
    await animationDone;
    if (__privateMethod(this, _Router_instances, isLatestRender_fn).call(this, contextWithChain)) {
      __privateMethod(this, _Router_instances, removeDisappearingContent_fn).call(this);
      this.__previousContext = contextWithChain;
      return this.location;
    }
  } catch (error) {
    if (renderId === __privateGet(this, _lastStartedRenderId)) {
      if (shouldUpdateHistory) {
        __privateMethod(this, _Router_instances, updateBrowserHistory_fn).call(this, this.context);
      }
      for (const child of __privateGet(this, _outlet)?.children ?? []) {
        child.remove();
      }
      this.location = createLocation(Object.assign(context, { resolver: this }));
      fireRouterEvent("error", {
        router: this,
        error,
        ...context
      });
      throw error;
    }
  }
  return this.location;
};
fullyResolveChain_fn = async function(topOfTheChainContextBeforeRedirects, contextBeforeRedirects = topOfTheChainContextBeforeRedirects) {
  const contextAfterRedirects = await __privateMethod(this, _Router_instances, findComponentContextAfterAllRedirects_fn).call(this, contextBeforeRedirects);
  const redirectsHappened = contextAfterRedirects !== contextBeforeRedirects;
  const topOfTheChainContextAfterRedirects = redirectsHappened ? contextAfterRedirects : topOfTheChainContextBeforeRedirects;
  const matchedPath = getPathnameForRouter(getMatchedPath(contextAfterRedirects.chain ?? []), this);
  const isFound = matchedPath === contextAfterRedirects.pathname;
  const findNextContextIfAny = async (context, parent = context.route, prevResult) => {
    const nextContext2 = await context.next(false, parent, prevResult);
    if (nextContext2 === null || nextContext2 === notFoundResult) {
      if (isFound) {
        return context;
      } else if (parent.parent != null) {
        return await findNextContextIfAny(context, parent.parent, nextContext2);
      }
      return nextContext2;
    }
    return nextContext2;
  };
  const nextContext = await findNextContextIfAny(contextAfterRedirects);
  if (nextContext == null || nextContext === notFoundResult) {
    throw getNotFoundError(
      topOfTheChainContextAfterRedirects
    );
  }
  return nextContext !== contextAfterRedirects ? await __privateMethod(this, _Router_instances, fullyResolveChain_fn).call(this, topOfTheChainContextAfterRedirects, nextContext) : await __privateMethod(this, _Router_instances, amendWithOnBeforeCallbacks_fn).call(this, contextAfterRedirects);
};
findComponentContextAfterAllRedirects_fn = async function(context) {
  const { result } = context;
  if (result instanceof HTMLElement) {
    renderElement(context, result);
    return context;
  } else if (result && "redirect" in result) {
    const ctx = await __privateMethod(this, _Router_instances, redirect_fn).call(this, result.redirect, context.__redirectCount, context.__renderId);
    return await __privateMethod(this, _Router_instances, findComponentContextAfterAllRedirects_fn).call(this, ctx);
  }
  throw result instanceof Error ? result : new Error(
    log(
      `Invalid route resolution result for path "${context.pathname}". Expected redirect object or HTML element, but got: "${logValue(result)}". Double check the action return value for the route.`
    )
  );
};
amendWithOnBeforeCallbacks_fn = async function(contextWithFullChain) {
  return await __privateMethod(this, _Router_instances, runOnBeforeCallbacks_fn).call(this, contextWithFullChain).then(async (amendedContext) => {
    if (amendedContext === this.__previousContext || amendedContext === contextWithFullChain) {
      return amendedContext;
    }
    return await __privateMethod(this, _Router_instances, fullyResolveChain_fn).call(this, amendedContext);
  });
};
runOnBeforeCallbacks_fn = async function(newContext) {
  const previousContext = this.__previousContext ?? {};
  const previousChain = previousContext.chain ?? [];
  const newChain = newContext.chain ?? [];
  let callbacks = Promise.resolve(void 0);
  const redirect = (pathname) => createRedirect(newContext, pathname);
  newContext.__divergedChainIndex = 0;
  newContext.__skipAttach = false;
  if (previousChain.length) {
    for (let i6 = 0; i6 < Math.min(previousChain.length, newChain.length); newContext.__divergedChainIndex++, i6++) {
      if (previousChain[i6].route !== newChain[i6].route || previousChain[i6].path !== newChain[i6].path && previousChain[i6].element !== newChain[i6].element || !__privateMethod(this, _Router_instances, isReusableElement_fn).call(this, previousChain[i6].element, newChain[i6].element)) {
        break;
      }
    }
    newContext.__skipAttach = // Same route chain
    newChain.length === previousChain.length && newContext.__divergedChainIndex === newChain.length && // Same element
    __privateMethod(this, _Router_instances, isReusableElement_fn).call(this, newContext.result, previousContext.result);
    if (newContext.__skipAttach) {
      for (let i6 = newChain.length - 1; i6 >= 0; i6--) {
        callbacks = __privateMethod(this, _Router_instances, runOnBeforeLeaveCallbacks_fn).call(this, callbacks, newContext, { prevent }, previousChain[i6]);
      }
      for (let i6 = 0; i6 < newChain.length; i6++) {
        callbacks = __privateMethod(this, _Router_instances, runOnBeforeEnterCallbacks_fn).call(this, callbacks, newContext, {
          prevent,
          redirect
        }, newChain[i6]);
        previousChain[i6].element.location = createLocation(newContext, previousChain[i6].route);
      }
    } else {
      for (let i6 = previousChain.length - 1; i6 >= newContext.__divergedChainIndex; i6--) {
        callbacks = __privateMethod(this, _Router_instances, runOnBeforeLeaveCallbacks_fn).call(this, callbacks, newContext, { prevent }, previousChain[i6]);
      }
    }
  }
  if (!newContext.__skipAttach) {
    for (let i6 = 0; i6 < newChain.length; i6++) {
      if (i6 < newContext.__divergedChainIndex) {
        if (i6 < previousChain.length && previousChain[i6].element) {
          previousChain[i6].element.location = createLocation(newContext, previousChain[i6].route);
        }
      } else {
        callbacks = __privateMethod(this, _Router_instances, runOnBeforeEnterCallbacks_fn).call(this, callbacks, newContext, {
          prevent,
          redirect
        }, newChain[i6]);
        if (newChain[i6].element) {
          newChain[i6].element.location = createLocation(newContext, newChain[i6].route);
        }
      }
    }
  }
  return await callbacks.then(async (amendmentResult) => {
    if (amendmentResult && isObject(amendmentResult)) {
      if ("cancel" in amendmentResult && this.__previousContext) {
        this.__previousContext.__renderId = newContext.__renderId;
        return this.__previousContext;
      }
      if ("redirect" in amendmentResult) {
        return await __privateMethod(this, _Router_instances, redirect_fn).call(this, amendmentResult.redirect, newContext.__redirectCount, newContext.__renderId);
      }
    }
    return newContext;
  });
};
runOnBeforeLeaveCallbacks_fn = async function(callbacks, newContext, commands, chainElement) {
  const location2 = createLocation(newContext);
  let result = await callbacks;
  if (__privateMethod(this, _Router_instances, isLatestRender_fn).call(this, newContext)) {
    const beforeLeaveFunction = amend("onBeforeLeave", chainElement.element, location2, commands, this);
    result = beforeLeaveFunction(result);
  }
  if (!(isObject(result) && "redirect" in result)) {
    return result;
  }
};
runOnBeforeEnterCallbacks_fn = async function(callbacks, newContext, commands, chainElement) {
  const location2 = createLocation(newContext, chainElement.route);
  const result = await callbacks;
  if (__privateMethod(this, _Router_instances, isLatestRender_fn).call(this, newContext)) {
    const beforeEnterFunction = amend("onBeforeEnter", chainElement.element, location2, commands, this);
    return beforeEnterFunction(result);
  }
};
isReusableElement_fn = function(element, otherElement) {
  if (element instanceof Element && otherElement instanceof Element) {
    return __privateGet(this, _createdByRouter).has(element) && __privateGet(this, _createdByRouter).has(otherElement) ? element.localName === otherElement.localName : element === otherElement;
  }
  return false;
};
isLatestRender_fn = function(context) {
  return context.__renderId === __privateGet(this, _lastStartedRenderId);
};
redirect_fn = async function(redirectData, counter = 0, renderId = 0) {
  if (counter > MAX_REDIRECT_COUNT) {
    throw new Error(log(`Too many redirects when rendering ${redirectData.from}`));
  }
  return await this.resolve({
    ...rootContext,
    pathname: this.urlForPath(redirectData.pathname, redirectData.params),
    redirectFrom: redirectData.from,
    __redirectCount: counter + 1,
    __renderId: renderId
  });
};
ensureOutlet_fn = function(outlet = __privateGet(this, _outlet)) {
  if (!(outlet instanceof Element || outlet instanceof DocumentFragment)) {
    throw new TypeError(
      log(`Expected router outlet to be a valid DOM Element | DocumentFragment (but got ${outlet})`)
    );
  }
};
// eslint-disable-next-line @typescript-eslint/class-methods-use-this
updateBrowserHistory_fn = function({ pathname, search = "", hash = "" }, replace) {
  if (window.location.pathname !== pathname || window.location.search !== search || window.location.hash !== hash) {
    const changeState = replace ? "replaceState" : "pushState";
    window.history[changeState](null, document.title, pathname + search + hash);
    window.dispatchEvent(new PopStateEvent("popstate", { state: "vaadin-router-ignore" }));
  }
};
copyUnchangedElements_fn = function(context, previousContext) {
  let deepestCommonParent = __privateGet(this, _outlet);
  for (let i6 = 0; i6 < (context.__divergedChainIndex ?? 0); i6++) {
    const unchangedElement = previousContext?.chain?.[i6].element;
    if (unchangedElement) {
      if (unchangedElement.parentNode === deepestCommonParent) {
        context.chain[i6].element = unchangedElement;
        deepestCommonParent = unchangedElement;
      } else {
        break;
      }
    }
  }
  return deepestCommonParent;
};
addAppearingContent_fn = function(context, previousContext) {
  __privateMethod(this, _Router_instances, ensureOutlet_fn).call(this);
  __privateMethod(this, _Router_instances, removeAppearingContent_fn).call(this);
  const deepestCommonParent = __privateMethod(this, _Router_instances, copyUnchangedElements_fn).call(this, context, previousContext);
  __privateSet(this, _appearingContent, []);
  __privateSet(this, _disappearingContent, Array.from(deepestCommonParent?.children ?? []).filter(
    // Only remove layout content that was added by router
    (e8) => __privateGet(this, _addedByRouter).has(e8) && // Do not remove the result element to avoid flickering
    e8 !== context.result
  ));
  let parentElement = deepestCommonParent;
  for (let i6 = context.__divergedChainIndex ?? 0; i6 < (context.chain?.length ?? 0); i6++) {
    const elementToAdd = context.chain[i6].element;
    if (elementToAdd) {
      parentElement?.appendChild(elementToAdd);
      __privateGet(this, _addedByRouter).add(elementToAdd);
      if (parentElement === deepestCommonParent) {
        __privateGet(this, _appearingContent).push(elementToAdd);
      }
      parentElement = elementToAdd;
    }
  }
};
removeDisappearingContent_fn = function() {
  if (__privateGet(this, _disappearingContent)) {
    for (const element of __privateGet(this, _disappearingContent)) {
      element.remove();
    }
  }
  __privateSet(this, _disappearingContent, null);
  __privateSet(this, _appearingContent, null);
};
removeAppearingContent_fn = function() {
  if (__privateGet(this, _disappearingContent) && __privateGet(this, _appearingContent)) {
    for (const element of __privateGet(this, _appearingContent)) {
      element.remove();
    }
    __privateSet(this, _disappearingContent, null);
    __privateSet(this, _appearingContent, null);
  }
};
runOnAfterLeaveCallbacks_fn = function(currentContext, targetContext) {
  if (!targetContext?.chain || currentContext.__divergedChainIndex == null) {
    return;
  }
  for (let i6 = targetContext.chain.length - 1; i6 >= currentContext.__divergedChainIndex; i6--) {
    if (!__privateMethod(this, _Router_instances, isLatestRender_fn).call(this, currentContext)) {
      break;
    }
    const currentComponent = targetContext.chain[i6].element;
    if (!currentComponent) {
      continue;
    }
    try {
      const location2 = createLocation(currentContext);
      maybeCall(currentComponent.onAfterLeave, currentComponent, location2, {}, this);
    } finally {
      if (__privateGet(this, _disappearingContent)?.includes(currentComponent)) {
        for (const child of currentComponent.children) {
          child.remove();
        }
      }
    }
  }
};
runOnAfterEnterCallbacks_fn = function(currentContext) {
  if (!currentContext.chain || currentContext.__divergedChainIndex == null) {
    return;
  }
  for (let i6 = currentContext.__divergedChainIndex; i6 < currentContext.chain.length; i6++) {
    if (!__privateMethod(this, _Router_instances, isLatestRender_fn).call(this, currentContext)) {
      break;
    }
    const currentComponent = currentContext.chain[i6].element;
    if (currentComponent) {
      const location2 = createLocation(currentContext, currentContext.chain[i6].route);
      maybeCall(currentComponent.onAfterEnter, currentComponent, location2, {}, this);
    }
  }
};
animateIfNeeded_fn = async function(context) {
  const from = __privateGet(this, _disappearingContent)?.[0];
  const to = __privateGet(this, _appearingContent)?.[0];
  const promises = [];
  const { chain = [] } = context;
  let config;
  for (let i6 = chain.length - 1; i6 >= 0; i6--) {
    if (chain[i6].route.animate) {
      config = chain[i6].route.animate;
      break;
    }
  }
  if (from && to && config) {
    const leave = isObject(config) && config.leave ? config.leave : "leaving";
    const enter = isObject(config) && config.enter ? config.enter : "entering";
    promises.push(animate_default(from, leave));
    promises.push(animate_default(to, enter));
  }
  await Promise.all(promises);
  return context;
};
onNavigationEvent_fn = function(event) {
  const { pathname, search, hash } = event instanceof CustomEvent ? event.detail : window.location;
  if (isString(this.__normalizePathname(pathname))) {
    if (event?.preventDefault) {
      event.preventDefault();
    }
    void this.render({ pathname, search, hash }, true);
  }
};

// src/components/layout/app-main.ts
init_auth_service();

// src/pages/home.ts
init_lit();
init_decorators();

// src/components/cards/feature-card.ts
init_lit();
init_decorators();
var FeatureCard = class extends i4 {
  constructor() {
    super(...arguments);
    this.title = "";
    this.icon = "";
    this.color = "green";
    this.description = "";
  }
  createRenderRoot() {
    return this;
  }
  render() {
    const bgMap = {
      green: "bg-green-50 border-green-200",
      blue: "bg-blue-50 border-blue-200",
      yellow: "bg-yellow-50 border-yellow-200"
    };
    const bgClass = bgMap[this.color] || bgMap.green;
    return x`
      <div class="rounded-xl p-4 border shadow ${bgClass}">
        <h3 class="text-lg font-semibold flex items-center gap-2 mb-2">
          <span>${this.icon}</span> ${this.title}
        </h3>
        <p class="text-sm text-gray-700">${this.description}</p>
      </div>
    `;
  }
};
__decorateClass([
  n4()
], FeatureCard.prototype, "title", 2);
__decorateClass([
  n4()
], FeatureCard.prototype, "icon", 2);
__decorateClass([
  n4()
], FeatureCard.prototype, "color", 2);
__decorateClass([
  n4()
], FeatureCard.prototype, "description", 2);
FeatureCard = __decorateClass([
  t3("feature-card")
], FeatureCard);

// src/pages/home.ts
var PageHome = class extends i4 {
  createRenderRoot() {
    return this;
  }
  render() {
    return x`
      <section class="p-6 space-y-6">
        <div>
          <h1 class="text-2xl font-bold text-green-800 mb-2">
            🌿 Selamat Datang di TaniVerse
          </h1>
          <p class="text-gray-700">
            TaniVerse adalah platform monitoring dan kontrol berbasis IoT untuk
            sistem pertanian cerdas di berbagai sektor.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <feature-card
            title="Hidroponik"
            icon="🌱"
            color="green"
            description="Pantau suhu, pH, dan nutrisi secara real-time untuk mendukung pertumbuhan tanaman optimal tanpa tanah."
          ></feature-card>

          <feature-card
            title="Akuakultur"
            icon="🐟"
            color="blue"
            description="Monitor kualitas air, aerator, dan kondisi kolam untuk memastikan kesehatan ikan dan efisiensi budidaya."
          ></feature-card>

          <feature-card
            title="Peternakan"
            icon="🐔"
            color="yellow"
            description="Kendalikan suhu kandang, ventilasi, dan pencahayaan agar ternak tumbuh sehat dan produktif."
          ></feature-card>
        </div>

        <footer class="text-sm text-gray-500 mt-6">
          Gunakan menu navigasi di atas untuk menjelajahi dashboard
          masing-masing sektor.
        </footer>
      </section>
    `;
  }
};
PageHome = __decorateClass([
  t3("page-home")
], PageHome);

// src/components/layout/app-main.ts
var AppMain = class extends i4 {
  constructor() {
    super(...arguments);
    this.basePath = "/";
    this.currentPath = window.location.pathname;
    this._onPopState = () => {
      this.currentPath = window.location.pathname;
      this.dispatchEvent(
        new CustomEvent("route-changed", {
          detail: { path: this.currentPath },
          bubbles: true,
          composed: true
        })
      );
    };
    this.navigate = (path) => {
      const full = this.basePath === "/" ? path : `${this.basePath}${path.replace(/^\/+/, "")}`;
      Router.go(full);
    };
  }
  createRenderRoot() {
    return this;
  }
  firstUpdated() {
    this.router = new Router(this.outletEl, { baseUrl: this.basePath });
    const requireLogin = (ctx, commands) => {
      if (!AuthService.isLoggedIn()) {
        sessionStorage.setItem("next_path", ctx.pathname + (ctx.search || ""));
        return commands.redirect("/login");
      }
      return void 0;
    };
    const requireRoleAtLeast = (role) => (ctx, commands) => {
      const g2 = requireLogin(ctx, commands);
      if (g2) return g2;
      if (!AuthService.hasRoleAtLeast(role))
        return commands.redirect("/not-authorized");
      return void 0;
    };
    const requirePerm = (perm) => (ctx, commands) => {
      const g2 = requireLogin(ctx, commands);
      if (g2) return g2;
      if (!AuthService.can(perm))
        return commands.redirect("/not-authorized");
      return void 0;
    };
    this.router.setRoutes([
      {
        path: "/login",
        action: async () => {
          await Promise.resolve().then(() => (init_login(), login_exports));
        },
        component: "page-login"
      },
      {
        path: "/dashboard",
        // minimal operator
        action: async (ctx, commands) => {
          const g2 = requireRoleAtLeast("operator")(ctx, commands);
          if (g2) return g2;
          await Promise.resolve().then(() => (init_dashboard(), dashboard_exports));
        },
        component: "page-dashboard"
      },
      {
        path: "/config",
        // minimal engineer (admin juga boleh)
        action: async (ctx, commands) => {
          const g2 = requireRoleAtLeast("engineer")(ctx, commands);
          if (g2) return g2;
          await Promise.resolve().then(() => (init_config(), config_exports));
        },
        component: "page-config"
      },
      // {
      //   path: '/control', // perlu permission spesifik operate equipment
      //   action: async (ctx, commands) => {
      //     const g = requirePerm(PERMS.OPERATE_EQUIPMENT)(ctx, commands);
      //     if (g) return g;
      //     await import('../pages/control');
      //   },
      //   component: 'page-control',
      // },
      {
        path: "/about",
        action: async () => {
          await Promise.resolve().then(() => (init_about(), about_exports));
        },
        component: "page-about"
      },
      {
        path: "/not-authorized",
        action: async () => {
          await Promise.resolve().then(() => (init_not_authorized(), not_authorized_exports));
        },
        component: "page-not-authorized"
      },
      { path: "/", component: "page-home" },
      {
        path: "/produksi/hidroponik",
        action: async (ctx, commands) => {
          const g2 = requireRoleAtLeast("operator")(ctx, commands);
          if (g2) return g2;
          await Promise.resolve().then(() => (init_hidroponik(), hidroponik_exports));
        },
        component: "hidroponik-page"
      },
      {
        path: "/produksi/hortikultura",
        action: async (ctx, commands) => {
          const g2 = requireRoleAtLeast("operator")(ctx, commands);
          if (g2) return g2;
          await Promise.resolve().then(() => (init_hortikultura(), hortikultura_exports));
        },
        component: "hortikultura-page"
      },
      {
        path: "/produksi/akuakultur",
        action: async (ctx, commands) => {
          const g2 = requireRoleAtLeast("operator")(ctx, commands);
          if (g2) return g2;
          await Promise.resolve().then(() => (init_akuakultur(), akuakultur_exports));
        },
        component: "akuakultur-page"
      },
      {
        path: "/produksi/peternakan",
        action: async (ctx, commands) => {
          const g2 = requireRoleAtLeast("operator")(ctx, commands);
          if (g2) return g2;
          await Promise.resolve().then(() => (init_peternakan(), peternakan_exports));
        },
        component: "peternakan-page"
      },
      {
        path: "(.*)",
        action: async () => {
          await Promise.resolve().then(() => (init_not_found(), not_found_exports));
        },
        component: "page-not-found"
      }
    ]);
    window.addEventListener("popstate", this._onPopState);
  }
  disconnectedCallback() {
    window.removeEventListener("popstate", this._onPopState);
    super.disconnectedCallback();
  }
  render() {
    return x`
      <main
        class="max-w-7xl mx-auto px-4 py-6 pb-16 p-layout min-h-screen bg-background dark:bg-darkbg"
      >
        <div id="outlet" class="p-4"></div>
      </main>
    `;
  }
};
__decorateClass([
  n4({ type: String })
], AppMain.prototype, "basePath", 2);
__decorateClass([
  r5()
], AppMain.prototype, "currentPath", 2);
__decorateClass([
  e5("#outlet")
], AppMain.prototype, "outletEl", 2);
AppMain = __decorateClass([
  t3("app-main")
], AppMain);

// src/components/layout/app-shell.ts
init_auth_service();
init_mqtt_context();
var AppShell = class extends i4 {
  constructor() {
    super(...arguments);
    this.basePath = window.location.hostname === "127.0.0.1" ? "/" : "/taniverse/";
    this.currentPath = window.location.pathname;
    this.theme = "light";
    this.providedTheme = "light";
    this.currentUser = AuthService.getUserWithToken();
    this.mqttContextValue = createMqttContext();
    this._onMqttContextUpdated = (e8) => {
      const detail = e8.detail;
      console.info("[app-shell] \u{1F504} mqttContextValue updated via event:", detail);
      this.mqttContextValue = detail;
    };
    this._toggleTheme = () => {
      this.theme = this.theme === "dark" ? "light" : "dark";
      this.providedTheme = this.theme;
      this._applyTheme();
    };
    this._onPopState = () => {
      this.currentPath = window.location.pathname;
    };
    this._onNavigateTo = (e8) => {
      this.appMainEl?.navigate(e8.detail.path);
    };
    this._onNavChanged = (e8) => {
      const rawPath = e8.detail.path.replace(/^\/+/, "");
      const target = `/${rawPath}`;
      this.appMainEl?.navigate(target);
    };
    this._onLoginClick = () => {
      this.appMainEl?.navigate("/login");
    };
    this._onLogoutClick = () => {
      AuthService.logout();
      window.dispatchEvent(new Event("auth:changed"));
      this.appMainEl?.navigate("/");
    };
    this._onProfileClick = () => {
      this.appMainEl?.navigate("/dashboard");
    };
    this._onAuthChanged = () => {
      this.currentUser = AuthService.getUserWithToken();
      this.requestUpdate();
    };
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback();
    const saved = localStorage.getItem("theme");
    this.theme = saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    this.providedTheme = this.theme;
    this._applyTheme();
    window.addEventListener("popstate", this._onPopState);
    window.addEventListener("auth:changed", this._onAuthChanged);
    window.addEventListener("mqtt:context-updated", this._onMqttContextUpdated);
  }
  disconnectedCallback() {
    window.removeEventListener("popstate", this._onPopState);
    window.removeEventListener("auth:changed", this._onAuthChanged);
    window.removeEventListener(
      "mqtt:context-updated",
      this._onMqttContextUpdated
    );
    super.disconnectedCallback();
  }
  _applyTheme() {
    const isDark = this.theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
    document.body.classList.remove(
      "bg-white",
      "bg-gray-100",
      "text-black",
      "text-white",
      "dark:bg-gray-950"
    );
    document.body.classList.add(
      isDark ? "bg-gray-950" : "bg-white",
      isDark ? "text-white" : "text-black"
    );
    localStorage.setItem("theme", this.theme);
  }
  render() {
    return x`
      <app-header
        .currentPath=${this.currentPath}
        .username=${this.currentUser?.username ?? "Guest"}
        .avatarUrl=${this.currentUser?.avatarUrl ?? ""}
        .isLoggedIn=${!!this.currentUser}
        @nav-changed=${this._onNavChanged}
        @login-click=${this._onLoginClick}
        @logout-click=${this._onLogoutClick}
        @profile-click=${this._onProfileClick}
        @toggle-theme=${this._toggleTheme}
      ></app-header>

      <app-main
        .basePath=${this.basePath}
        @route-changed=${(ev) => {
      this.currentPath = ev.detail.path;
    }}
        @navigate-to=${this._onNavigateTo}
        @auth-changed=${this._onAuthChanged}
      ></app-main>

      <app-footer></app-footer>
    `;
  }
};
__decorateClass([
  r5()
], AppShell.prototype, "currentPath", 2);
__decorateClass([
  r5()
], AppShell.prototype, "theme", 2);
__decorateClass([
  e7({ context: themeContext })
], AppShell.prototype, "providedTheme", 2);
__decorateClass([
  e7({ context: userContext })
], AppShell.prototype, "currentUser", 2);
__decorateClass([
  r5(),
  e7({ context: mqttContext })
], AppShell.prototype, "mqttContextValue", 2);
__decorateClass([
  e5("app-main")
], AppShell.prototype, "appMainEl", 2);
AppShell = __decorateClass([
  t3("app-shell")
], AppShell);
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
@lit/context/lib/decorators/provide.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
@lit/context/lib/decorators/consume.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
@lit/context/lib/context-request-event.js:
@lit/context/lib/create-context.js:
@lit/context/lib/controllers/context-consumer.js:
@lit/context/lib/value-notifier.js:
@lit/context/lib/controllers/context-provider.js:
@lit/context/lib/context-root.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

mqtt/dist/mqtt.esm.js:
  (*! Bundled license information:
  
  @jspm/core/nodelibs/browser/chunk-DtuTasat.js:
    (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
  
  safe-buffer/index.js:
    (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
  
  @babel/runtime/helpers/regenerator.js:
    (*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE *)
  *)

@vaadin/vaadin-usage-statistics/vaadin-usage-statistics-collect.js:
  (*! vaadin-dev-mode:start
    (function () {
  'use strict';
  
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  
  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  
  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
  
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  
  var getPolymerVersion = function getPolymerVersion() {
    return window.Polymer && window.Polymer.version;
  };
  
  var StatisticsGatherer = function () {
    function StatisticsGatherer(logger) {
      classCallCheck(this, StatisticsGatherer);
  
      this.now = new Date().getTime();
      this.logger = logger;
    }
  
    createClass(StatisticsGatherer, [{
      key: 'frameworkVersionDetectors',
      value: function frameworkVersionDetectors() {
        return {
          'Flow': function Flow() {
            if (window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients) {
              var flowVersions = Object.keys(window.Vaadin.Flow.clients).map(function (key) {
                return window.Vaadin.Flow.clients[key];
              }).filter(function (client) {
                return client.getVersionInfo;
              }).map(function (client) {
                return client.getVersionInfo().flow;
              });
              if (flowVersions.length > 0) {
                return flowVersions[0];
              }
            }
          },
          'Vaadin Framework': function VaadinFramework() {
            if (window.vaadin && window.vaadin.clients) {
              var frameworkVersions = Object.values(window.vaadin.clients).filter(function (client) {
                return client.getVersionInfo;
              }).map(function (client) {
                return client.getVersionInfo().vaadinVersion;
              });
              if (frameworkVersions.length > 0) {
                return frameworkVersions[0];
              }
            }
          },
          'AngularJs': function AngularJs() {
            if (window.angular && window.angular.version && window.angular.version) {
              return window.angular.version.full;
            }
          },
          'Angular': function Angular() {
            if (window.ng) {
              var tags = document.querySelectorAll("[ng-version]");
              if (tags.length > 0) {
                return tags[0].getAttribute("ng-version");
              }
              return "Unknown";
            }
          },
          'Backbone.js': function BackboneJs() {
            if (window.Backbone) {
              return window.Backbone.VERSION;
            }
          },
          'React': function React() {
            var reactSelector = '[data-reactroot], [data-reactid]';
            if (!!document.querySelector(reactSelector)) {
              // React does not publish the version by default
              return "unknown";
            }
          },
          'Ember': function Ember() {
            if (window.Em && window.Em.VERSION) {
              return window.Em.VERSION;
            } else if (window.Ember && window.Ember.VERSION) {
              return window.Ember.VERSION;
            }
          },
          'jQuery': function (_jQuery) {
            function jQuery() {
              return _jQuery.apply(this, arguments);
            }
  
            jQuery.toString = function () {
              return _jQuery.toString();
            };
  
            return jQuery;
          }(function () {
            if (typeof jQuery === 'function' && jQuery.prototype.jquery !== undefined) {
              return jQuery.prototype.jquery;
            }
          }),
          'Polymer': function Polymer() {
            var version = getPolymerVersion();
            if (version) {
              return version;
            }
          },
          'LitElement': function LitElement() {
            var version = window.litElementVersions && window.litElementVersions[0];
            if (version) {
              return version;
            }
          },
          'LitHtml': function LitHtml() {
            var version = window.litHtmlVersions && window.litHtmlVersions[0];
            if (version) {
              return version;
            }
          },
          'Vue.js': function VueJs() {
            if (window.Vue) {
              return window.Vue.version;
            }
          }
        };
      }
    }, {
      key: 'getUsedVaadinElements',
      value: function getUsedVaadinElements(elements) {
        var version = getPolymerVersion();
        var elementClasses = void 0;
        // NOTE: In case you edit the code here, YOU MUST UPDATE any statistics reporting code in Flow.
        // Check all locations calling the method getEntries() in
        // https://github.com/vaadin/flow/blob/master/flow-server/src/main/java/com/vaadin/flow/internal/UsageStatistics.java#L106
        // Currently it is only used by BootstrapHandler.
        if (version && version.indexOf('2') === 0) {
          // Polymer 2: components classes are stored in window.Vaadin
          elementClasses = Object.keys(window.Vaadin).map(function (c) {
            return window.Vaadin[c];
          }).filter(function (c) {
            return c.is;
          });
        } else {
          // Polymer 3: components classes are stored in window.Vaadin.registrations
          elementClasses = window.Vaadin.registrations || [];
        }
        elementClasses.forEach(function (klass) {
          var version = klass.version ? klass.version : "0.0.0";
          elements[klass.is] = { version: version };
        });
      }
    }, {
      key: 'getUsedVaadinThemes',
      value: function getUsedVaadinThemes(themes) {
        ['Lumo', 'Material'].forEach(function (themeName) {
          var theme;
          var version = getPolymerVersion();
          if (version && version.indexOf('2') === 0) {
            // Polymer 2: themes are stored in window.Vaadin
            theme = window.Vaadin[themeName];
          } else {
            // Polymer 3: themes are stored in custom element registry
            theme = customElements.get('vaadin-' + themeName.toLowerCase() + '-styles');
          }
          if (theme && theme.version) {
            themes[themeName] = { version: theme.version };
          }
        });
      }
    }, {
      key: 'getFrameworks',
      value: function getFrameworks(frameworks) {
        var detectors = this.frameworkVersionDetectors();
        Object.keys(detectors).forEach(function (framework) {
          var detector = detectors[framework];
          try {
            var version = detector();
            if (version) {
              frameworks[framework] = { version: version };
            }
          } catch (e) {}
        });
      }
    }, {
      key: 'gather',
      value: function gather(storage) {
        var storedStats = storage.read();
        var gatheredStats = {};
        var types = ["elements", "frameworks", "themes"];
  
        types.forEach(function (type) {
          gatheredStats[type] = {};
          if (!storedStats[type]) {
            storedStats[type] = {};
          }
        });
  
        var previousStats = JSON.stringify(storedStats);
  
        this.getUsedVaadinElements(gatheredStats.elements);
        this.getFrameworks(gatheredStats.frameworks);
        this.getUsedVaadinThemes(gatheredStats.themes);
  
        var now = this.now;
        types.forEach(function (type) {
          var keys = Object.keys(gatheredStats[type]);
          keys.forEach(function (key) {
            if (!storedStats[type][key] || _typeof(storedStats[type][key]) != _typeof({})) {
              storedStats[type][key] = { firstUsed: now };
            }
            // Discards any previously logged version number
            storedStats[type][key].version = gatheredStats[type][key].version;
            storedStats[type][key].lastUsed = now;
          });
        });
  
        var newStats = JSON.stringify(storedStats);
        storage.write(newStats);
        if (newStats != previousStats && Object.keys(storedStats).length > 0) {
          this.logger.debug("New stats: " + newStats);
        }
      }
    }]);
    return StatisticsGatherer;
  }();
  
  var StatisticsStorage = function () {
    function StatisticsStorage(key) {
      classCallCheck(this, StatisticsStorage);
  
      this.key = key;
    }
  
    createClass(StatisticsStorage, [{
      key: 'read',
      value: function read() {
        var localStorageStatsString = localStorage.getItem(this.key);
        try {
          return JSON.parse(localStorageStatsString ? localStorageStatsString : '{}');
        } catch (e) {
          return {};
        }
      }
    }, {
      key: 'write',
      value: function write(data) {
        localStorage.setItem(this.key, data);
      }
    }, {
      key: 'clear',
      value: function clear() {
        localStorage.removeItem(this.key);
      }
    }, {
      key: 'isEmpty',
      value: function isEmpty() {
        var storedStats = this.read();
        var empty = true;
        Object.keys(storedStats).forEach(function (key) {
          if (Object.keys(storedStats[key]).length > 0) {
            empty = false;
          }
        });
  
        return empty;
      }
    }]);
    return StatisticsStorage;
  }();
  
  var StatisticsSender = function () {
    function StatisticsSender(url, logger) {
      classCallCheck(this, StatisticsSender);
  
      this.url = url;
      this.logger = logger;
    }
  
    createClass(StatisticsSender, [{
      key: 'send',
      value: function send(data, errorHandler) {
        var logger = this.logger;
  
        if (navigator.onLine === false) {
          logger.debug("Offline, can't send");
          errorHandler();
          return;
        }
        logger.debug("Sending data to " + this.url);
  
        var req = new XMLHttpRequest();
        req.withCredentials = true;
        req.addEventListener("load", function () {
          // Stats sent, nothing more to do
          logger.debug("Response: " + req.responseText);
        });
        req.addEventListener("error", function () {
          logger.debug("Send failed");
          errorHandler();
        });
        req.addEventListener("abort", function () {
          logger.debug("Send aborted");
          errorHandler();
        });
        req.open("POST", this.url);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(data);
      }
    }]);
    return StatisticsSender;
  }();
  
  var StatisticsLogger = function () {
    function StatisticsLogger(id) {
      classCallCheck(this, StatisticsLogger);
  
      this.id = id;
    }
  
    createClass(StatisticsLogger, [{
      key: '_isDebug',
      value: function _isDebug() {
        return localStorage.getItem("vaadin." + this.id + ".debug");
      }
    }, {
      key: 'debug',
      value: function debug(msg) {
        if (this._isDebug()) {
          console.info(this.id + ": " + msg);
        }
      }
    }]);
    return StatisticsLogger;
  }();
  
  var UsageStatistics = function () {
    function UsageStatistics() {
      classCallCheck(this, UsageStatistics);
  
      this.now = new Date();
      this.timeNow = this.now.getTime();
      this.gatherDelay = 10; // Delay between loading this file and gathering stats
      this.initialDelay = 24 * 60 * 60;
  
      this.logger = new StatisticsLogger("statistics");
      this.storage = new StatisticsStorage("vaadin.statistics.basket");
      this.gatherer = new StatisticsGatherer(this.logger);
      this.sender = new StatisticsSender("https://tools.vaadin.com/usage-stats/submit", this.logger);
    }
  
    createClass(UsageStatistics, [{
      key: 'maybeGatherAndSend',
      value: function maybeGatherAndSend() {
        var _this = this;
  
        if (localStorage.getItem(UsageStatistics.optOutKey)) {
          return;
        }
        this.gatherer.gather(this.storage);
        setTimeout(function () {
          _this.maybeSend();
        }, this.gatherDelay * 1000);
      }
    }, {
      key: 'lottery',
      value: function lottery() {
        return true;
      }
    }, {
      key: 'currentMonth',
      value: function currentMonth() {
        return this.now.getYear() * 12 + this.now.getMonth();
      }
    }, {
      key: 'maybeSend',
      value: function maybeSend() {
        var firstUse = Number(localStorage.getItem(UsageStatistics.firstUseKey));
        var monthProcessed = Number(localStorage.getItem(UsageStatistics.monthProcessedKey));
  
        if (!firstUse) {
          // Use a grace period to avoid interfering with tests, incognito mode etc
          firstUse = this.timeNow;
          localStorage.setItem(UsageStatistics.firstUseKey, firstUse);
        }
  
        if (this.timeNow < firstUse + this.initialDelay * 1000) {
          this.logger.debug("No statistics will be sent until the initial delay of " + this.initialDelay + "s has passed");
          return;
        }
        if (this.currentMonth() <= monthProcessed) {
          this.logger.debug("This month has already been processed");
          return;
        }
        localStorage.setItem(UsageStatistics.monthProcessedKey, this.currentMonth());
        // Use random sampling
        if (this.lottery()) {
          this.logger.debug("Congratulations, we have a winner!");
        } else {
          this.logger.debug("Sorry, no stats from you this time");
          return;
        }
  
        this.send();
      }
    }, {
      key: 'send',
      value: function send() {
        // Ensure we have the latest data
        this.gatherer.gather(this.storage);
  
        // Read, send and clean up
        var data = this.storage.read();
        data["firstUse"] = Number(localStorage.getItem(UsageStatistics.firstUseKey));
        data["usageStatisticsVersion"] = UsageStatistics.version;
        var info = 'This request contains usage statistics gathered from the application running in development mode. \n\nStatistics gathering is automatically disabled and excluded from production builds.\n\nFor details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.\n\n\n\n';
        var self = this;
        this.sender.send(info + JSON.stringify(data), function () {
          // Revert the 'month processed' flag
          localStorage.setItem(UsageStatistics.monthProcessedKey, self.currentMonth() - 1);
        });
      }
    }], [{
      key: 'version',
      get: function get$1() {
        return '2.1.2';
      }
    }, {
      key: 'firstUseKey',
      get: function get$1() {
        return 'vaadin.statistics.firstuse';
      }
    }, {
      key: 'monthProcessedKey',
      get: function get$1() {
        return 'vaadin.statistics.monthProcessed';
      }
    }, {
      key: 'optOutKey',
      get: function get$1() {
        return 'vaadin.statistics.optout';
      }
    }]);
    return UsageStatistics;
  }();
  
  try {
    window.Vaadin = window.Vaadin || {};
    window.Vaadin.usageStatsChecker = window.Vaadin.usageStatsChecker || new UsageStatistics();
    window.Vaadin.usageStatsChecker.maybeGatherAndSend();
  } catch (e) {
    // Intentionally ignored as this is not a problem in the app being developed
  }
  
  }());
  
    vaadin-dev-mode:end **)
*/
//# sourceMappingURL=/taniverse/main.js.map
