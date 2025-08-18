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
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
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
      constructor(t4, e6, o6) {
        if (this._$cssResult$ = true, o6 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t4, this.t = e6;
      }
      get styleSheet() {
        let t4 = this.o;
        const s4 = this.t;
        if (e && void 0 === t4) {
          const e6 = void 0 !== s4 && 1 === s4.length;
          e6 && (t4 = o.get(s4)), void 0 === t4 && ((this.o = t4 = new CSSStyleSheet()).replaceSync(this.cssText), e6 && o.set(s4, t4));
        }
        return t4;
      }
      toString() {
        return this.cssText;
      }
    };
    r = (t4) => new n("string" == typeof t4 ? t4 : t4 + "", void 0, s);
    i = (t4, ...e6) => {
      const o6 = 1 === t4.length ? t4[0] : e6.reduce((e7, s4, o7) => e7 + ((t5) => {
        if (true === t5._$cssResult$) return t5.cssText;
        if ("number" == typeof t5) return t5;
        throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
      })(s4) + t4[o7 + 1], t4[0]);
      return new n(o6, t4, s);
    };
    S = (s4, o6) => {
      if (e) s4.adoptedStyleSheets = o6.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet);
      else for (const e6 of o6) {
        const o7 = document.createElement("style"), n5 = t.litNonce;
        void 0 !== n5 && o7.setAttribute("nonce", n5), o7.textContent = e6.cssText, s4.appendChild(o7);
      }
    };
    c = e ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
      let e6 = "";
      for (const s4 of t5.cssRules) e6 += s4.cssText;
      return r(e6);
    })(t4) : t4;
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
    d = (t4, s4) => t4;
    u = { toAttribute(t4, s4) {
      switch (s4) {
        case Boolean:
          t4 = t4 ? l : null;
          break;
        case Object:
        case Array:
          t4 = null == t4 ? t4 : JSON.stringify(t4);
      }
      return t4;
    }, fromAttribute(t4, s4) {
      let i5 = t4;
      switch (s4) {
        case Boolean:
          i5 = null !== t4;
          break;
        case Number:
          i5 = null === t4 ? null : Number(t4);
          break;
        case Object:
        case Array:
          try {
            i5 = JSON.parse(t4);
          } catch (t5) {
            i5 = null;
          }
      }
      return i5;
    } };
    f = (t4, s4) => !i2(t4, s4);
    b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
    Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a.litPropertyMetadata ?? (a.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
    y = class extends HTMLElement {
      static addInitializer(t4) {
        this._$Ei(), (this.l ?? (this.l = [])).push(t4);
      }
      static get observedAttributes() {
        return this.finalize(), this._$Eh && [...this._$Eh.keys()];
      }
      static createProperty(t4, s4 = b) {
        if (s4.state && (s4.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t4) && ((s4 = Object.create(s4)).wrapped = true), this.elementProperties.set(t4, s4), !s4.noAccessor) {
          const i5 = Symbol(), h3 = this.getPropertyDescriptor(t4, i5, s4);
          void 0 !== h3 && e2(this.prototype, t4, h3);
        }
      }
      static getPropertyDescriptor(t4, s4, i5) {
        const { get: e6, set: r6 } = h(this.prototype, t4) ?? { get() {
          return this[s4];
        }, set(t5) {
          this[s4] = t5;
        } };
        return { get: e6, set(s5) {
          const h3 = e6?.call(this);
          r6?.call(this, s5), this.requestUpdate(t4, h3, i5);
        }, configurable: true, enumerable: true };
      }
      static getPropertyOptions(t4) {
        return this.elementProperties.get(t4) ?? b;
      }
      static _$Ei() {
        if (this.hasOwnProperty(d("elementProperties"))) return;
        const t4 = n2(this);
        t4.finalize(), void 0 !== t4.l && (this.l = [...t4.l]), this.elementProperties = new Map(t4.elementProperties);
      }
      static finalize() {
        if (this.hasOwnProperty(d("finalized"))) return;
        if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
          const t5 = this.properties, s4 = [...r2(t5), ...o2(t5)];
          for (const i5 of s4) this.createProperty(i5, t5[i5]);
        }
        const t4 = this[Symbol.metadata];
        if (null !== t4) {
          const s4 = litPropertyMetadata.get(t4);
          if (void 0 !== s4) for (const [t5, i5] of s4) this.elementProperties.set(t5, i5);
        }
        this._$Eh = /* @__PURE__ */ new Map();
        for (const [t5, s4] of this.elementProperties) {
          const i5 = this._$Eu(t5, s4);
          void 0 !== i5 && this._$Eh.set(i5, t5);
        }
        this.elementStyles = this.finalizeStyles(this.styles);
      }
      static finalizeStyles(s4) {
        const i5 = [];
        if (Array.isArray(s4)) {
          const e6 = new Set(s4.flat(1 / 0).reverse());
          for (const s5 of e6) i5.unshift(c(s5));
        } else void 0 !== s4 && i5.push(c(s4));
        return i5;
      }
      static _$Eu(t4, s4) {
        const i5 = s4.attribute;
        return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t4 ? t4.toLowerCase() : void 0;
      }
      constructor() {
        super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
      }
      _$Ev() {
        this._$ES = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t4) => t4(this));
      }
      addController(t4) {
        (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t4), void 0 !== this.renderRoot && this.isConnected && t4.hostConnected?.();
      }
      removeController(t4) {
        this._$EO?.delete(t4);
      }
      _$E_() {
        const t4 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
        for (const i5 of s4.keys()) this.hasOwnProperty(i5) && (t4.set(i5, this[i5]), delete this[i5]);
        t4.size > 0 && (this._$Ep = t4);
      }
      createRenderRoot() {
        const t4 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
        return S(t4, this.constructor.elementStyles), t4;
      }
      connectedCallback() {
        this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), this._$EO?.forEach((t4) => t4.hostConnected?.());
      }
      enableUpdating(t4) {
      }
      disconnectedCallback() {
        this._$EO?.forEach((t4) => t4.hostDisconnected?.());
      }
      attributeChangedCallback(t4, s4, i5) {
        this._$AK(t4, i5);
      }
      _$ET(t4, s4) {
        const i5 = this.constructor.elementProperties.get(t4), e6 = this.constructor._$Eu(t4, i5);
        if (void 0 !== e6 && true === i5.reflect) {
          const h3 = (void 0 !== i5.converter?.toAttribute ? i5.converter : u).toAttribute(s4, i5.type);
          this._$Em = t4, null == h3 ? this.removeAttribute(e6) : this.setAttribute(e6, h3), this._$Em = null;
        }
      }
      _$AK(t4, s4) {
        const i5 = this.constructor, e6 = i5._$Eh.get(t4);
        if (void 0 !== e6 && this._$Em !== e6) {
          const t5 = i5.getPropertyOptions(e6), h3 = "function" == typeof t5.converter ? { fromAttribute: t5.converter } : void 0 !== t5.converter?.fromAttribute ? t5.converter : u;
          this._$Em = e6;
          const r6 = h3.fromAttribute(s4, t5.type);
          this[e6] = r6 ?? this._$Ej?.get(e6) ?? r6, this._$Em = null;
        }
      }
      requestUpdate(t4, s4, i5) {
        if (void 0 !== t4) {
          const e6 = this.constructor, h3 = this[t4];
          if (i5 ?? (i5 = e6.getPropertyOptions(t4)), !((i5.hasChanged ?? f)(h3, s4) || i5.useDefault && i5.reflect && h3 === this._$Ej?.get(t4) && !this.hasAttribute(e6._$Eu(t4, i5)))) return;
          this.C(t4, s4, i5);
        }
        false === this.isUpdatePending && (this._$ES = this._$EP());
      }
      C(t4, s4, { useDefault: i5, reflect: e6, wrapped: h3 }, r6) {
        i5 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t4) && (this._$Ej.set(t4, r6 ?? s4 ?? this[t4]), true !== h3 || void 0 !== r6) || (this._$AL.has(t4) || (this.hasUpdated || i5 || (s4 = void 0), this._$AL.set(t4, s4)), true === e6 && this._$Em !== t4 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t4));
      }
      async _$EP() {
        this.isUpdatePending = true;
        try {
          await this._$ES;
        } catch (t5) {
          Promise.reject(t5);
        }
        const t4 = this.scheduleUpdate();
        return null != t4 && await t4, !this.isUpdatePending;
      }
      scheduleUpdate() {
        return this.performUpdate();
      }
      performUpdate() {
        if (!this.isUpdatePending) return;
        if (!this.hasUpdated) {
          if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
            for (const [t6, s5] of this._$Ep) this[t6] = s5;
            this._$Ep = void 0;
          }
          const t5 = this.constructor.elementProperties;
          if (t5.size > 0) for (const [s5, i5] of t5) {
            const { wrapped: t6 } = i5, e6 = this[s5];
            true !== t6 || this._$AL.has(s5) || void 0 === e6 || this.C(s5, void 0, i5, e6);
          }
        }
        let t4 = false;
        const s4 = this._$AL;
        try {
          t4 = this.shouldUpdate(s4), t4 ? (this.willUpdate(s4), this._$EO?.forEach((t5) => t5.hostUpdate?.()), this.update(s4)) : this._$EM();
        } catch (s5) {
          throw t4 = false, this._$EM(), s5;
        }
        t4 && this._$AE(s4);
      }
      willUpdate(t4) {
      }
      _$AE(t4) {
        this._$EO?.forEach((t5) => t5.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t4)), this.updated(t4);
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
      shouldUpdate(t4) {
        return true;
      }
      update(t4) {
        this._$Eq && (this._$Eq = this._$Eq.forEach((t5) => this._$ET(t5, this[t5]))), this._$EM();
      }
      updated(t4) {
      }
      firstUpdated(t4) {
      }
    };
    y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ?? (a.reactiveElementVersions = [])).push("2.1.1");
  }
});

// ../node_modules/lit-html/lit-html.js
function P(t4, i5) {
  if (!a2(t4) || !t4.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s2 ? s2.createHTML(i5) : i5;
}
function S2(t4, i5, s4 = t4, e6) {
  if (i5 === T) return i5;
  let h3 = void 0 !== e6 ? s4._$Co?.[e6] : s4._$Cl;
  const o6 = c3(i5) ? void 0 : i5._$litDirective$;
  return h3?.constructor !== o6 && (h3?._$AO?.(false), void 0 === o6 ? h3 = void 0 : (h3 = new o6(t4), h3._$AT(t4, s4, e6)), void 0 !== e6 ? (s4._$Co ?? (s4._$Co = []))[e6] = h3 : s4._$Cl = h3), void 0 !== h3 && (i5 = S2(t4, h3._$AS(t4, i5.values), h3, e6)), i5;
}
var t2, i3, s2, e3, h2, o3, n3, r3, l2, c3, a2, u2, d2, f2, v, _, m, p2, g, $, y2, x, b2, w, T, E, A, C, V, N, M, R, k, H, I, L, z, j, B;
var init_lit_html = __esm({
  "../node_modules/lit-html/lit-html.js"() {
    "use strict";
    t2 = globalThis;
    i3 = t2.trustedTypes;
    s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
    e3 = "$lit$";
    h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
    o3 = "?" + h2;
    n3 = `<${o3}>`;
    r3 = document;
    l2 = () => r3.createComment("");
    c3 = (t4) => null === t4 || "object" != typeof t4 && "function" != typeof t4;
    a2 = Array.isArray;
    u2 = (t4) => a2(t4) || "function" == typeof t4?.[Symbol.iterator];
    d2 = "[ 	\n\f\r]";
    f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
    v = /-->/g;
    _ = />/g;
    m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
    p2 = /'/g;
    g = /"/g;
    $ = /^(?:script|style|textarea|title)$/i;
    y2 = (t4) => (i5, ...s4) => ({ _$litType$: t4, strings: i5, values: s4 });
    x = y2(1);
    b2 = y2(2);
    w = y2(3);
    T = Symbol.for("lit-noChange");
    E = Symbol.for("lit-nothing");
    A = /* @__PURE__ */ new WeakMap();
    C = r3.createTreeWalker(r3, 129);
    V = (t4, i5) => {
      const s4 = t4.length - 1, o6 = [];
      let r6, l3 = 2 === i5 ? "<svg>" : 3 === i5 ? "<math>" : "", c4 = f2;
      for (let i6 = 0; i6 < s4; i6++) {
        const s5 = t4[i6];
        let a3, u3, d3 = -1, y3 = 0;
        for (; y3 < s5.length && (c4.lastIndex = y3, u3 = c4.exec(s5), null !== u3); ) y3 = c4.lastIndex, c4 === f2 ? "!--" === u3[1] ? c4 = v : void 0 !== u3[1] ? c4 = _ : void 0 !== u3[2] ? ($.test(u3[2]) && (r6 = RegExp("</" + u3[2], "g")), c4 = m) : void 0 !== u3[3] && (c4 = m) : c4 === m ? ">" === u3[0] ? (c4 = r6 ?? f2, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? m : '"' === u3[3] ? g : p2) : c4 === g || c4 === p2 ? c4 = m : c4 === v || c4 === _ ? c4 = f2 : (c4 = m, r6 = void 0);
        const x2 = c4 === m && t4[i6 + 1].startsWith("/>") ? " " : "";
        l3 += c4 === f2 ? s5 + n3 : d3 >= 0 ? (o6.push(a3), s5.slice(0, d3) + e3 + s5.slice(d3) + h2 + x2) : s5 + h2 + (-2 === d3 ? i6 : x2);
      }
      return [P(t4, l3 + (t4[s4] || "<?>") + (2 === i5 ? "</svg>" : 3 === i5 ? "</math>" : "")), o6];
    };
    N = class _N {
      constructor({ strings: t4, _$litType$: s4 }, n5) {
        let r6;
        this.parts = [];
        let c4 = 0, a3 = 0;
        const u3 = t4.length - 1, d3 = this.parts, [f3, v2] = V(t4, s4);
        if (this.el = _N.createElement(f3, n5), C.currentNode = this.el.content, 2 === s4 || 3 === s4) {
          const t5 = this.el.content.firstChild;
          t5.replaceWith(...t5.childNodes);
        }
        for (; null !== (r6 = C.nextNode()) && d3.length < u3; ) {
          if (1 === r6.nodeType) {
            if (r6.hasAttributes()) for (const t5 of r6.getAttributeNames()) if (t5.endsWith(e3)) {
              const i5 = v2[a3++], s5 = r6.getAttribute(t5).split(h2), e6 = /([.?@])?(.*)/.exec(i5);
              d3.push({ type: 1, index: c4, name: e6[2], strings: s5, ctor: "." === e6[1] ? H : "?" === e6[1] ? I : "@" === e6[1] ? L : k }), r6.removeAttribute(t5);
            } else t5.startsWith(h2) && (d3.push({ type: 6, index: c4 }), r6.removeAttribute(t5));
            if ($.test(r6.tagName)) {
              const t5 = r6.textContent.split(h2), s5 = t5.length - 1;
              if (s5 > 0) {
                r6.textContent = i3 ? i3.emptyScript : "";
                for (let i5 = 0; i5 < s5; i5++) r6.append(t5[i5], l2()), C.nextNode(), d3.push({ type: 2, index: ++c4 });
                r6.append(t5[s5], l2());
              }
            }
          } else if (8 === r6.nodeType) if (r6.data === o3) d3.push({ type: 2, index: c4 });
          else {
            let t5 = -1;
            for (; -1 !== (t5 = r6.data.indexOf(h2, t5 + 1)); ) d3.push({ type: 7, index: c4 }), t5 += h2.length - 1;
          }
          c4++;
        }
      }
      static createElement(t4, i5) {
        const s4 = r3.createElement("template");
        return s4.innerHTML = t4, s4;
      }
    };
    M = class {
      constructor(t4, i5) {
        this._$AV = [], this._$AN = void 0, this._$AD = t4, this._$AM = i5;
      }
      get parentNode() {
        return this._$AM.parentNode;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      u(t4) {
        const { el: { content: i5 }, parts: s4 } = this._$AD, e6 = (t4?.creationScope ?? r3).importNode(i5, true);
        C.currentNode = e6;
        let h3 = C.nextNode(), o6 = 0, n5 = 0, l3 = s4[0];
        for (; void 0 !== l3; ) {
          if (o6 === l3.index) {
            let i6;
            2 === l3.type ? i6 = new R(h3, h3.nextSibling, this, t4) : 1 === l3.type ? i6 = new l3.ctor(h3, l3.name, l3.strings, this, t4) : 6 === l3.type && (i6 = new z(h3, this, t4)), this._$AV.push(i6), l3 = s4[++n5];
          }
          o6 !== l3?.index && (h3 = C.nextNode(), o6++);
        }
        return C.currentNode = r3, e6;
      }
      p(t4) {
        let i5 = 0;
        for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t4, s4, i5), i5 += s4.strings.length - 2) : s4._$AI(t4[i5])), i5++;
      }
    };
    R = class _R {
      get _$AU() {
        return this._$AM?._$AU ?? this._$Cv;
      }
      constructor(t4, i5, s4, e6) {
        this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t4, this._$AB = i5, this._$AM = s4, this.options = e6, this._$Cv = e6?.isConnected ?? true;
      }
      get parentNode() {
        let t4 = this._$AA.parentNode;
        const i5 = this._$AM;
        return void 0 !== i5 && 11 === t4?.nodeType && (t4 = i5.parentNode), t4;
      }
      get startNode() {
        return this._$AA;
      }
      get endNode() {
        return this._$AB;
      }
      _$AI(t4, i5 = this) {
        t4 = S2(this, t4, i5), c3(t4) ? t4 === E || null == t4 || "" === t4 ? (this._$AH !== E && this._$AR(), this._$AH = E) : t4 !== this._$AH && t4 !== T && this._(t4) : void 0 !== t4._$litType$ ? this.$(t4) : void 0 !== t4.nodeType ? this.T(t4) : u2(t4) ? this.k(t4) : this._(t4);
      }
      O(t4) {
        return this._$AA.parentNode.insertBefore(t4, this._$AB);
      }
      T(t4) {
        this._$AH !== t4 && (this._$AR(), this._$AH = this.O(t4));
      }
      _(t4) {
        this._$AH !== E && c3(this._$AH) ? this._$AA.nextSibling.data = t4 : this.T(r3.createTextNode(t4)), this._$AH = t4;
      }
      $(t4) {
        const { values: i5, _$litType$: s4 } = t4, e6 = "number" == typeof s4 ? this._$AC(t4) : (void 0 === s4.el && (s4.el = N.createElement(P(s4.h, s4.h[0]), this.options)), s4);
        if (this._$AH?._$AD === e6) this._$AH.p(i5);
        else {
          const t5 = new M(e6, this), s5 = t5.u(this.options);
          t5.p(i5), this.T(s5), this._$AH = t5;
        }
      }
      _$AC(t4) {
        let i5 = A.get(t4.strings);
        return void 0 === i5 && A.set(t4.strings, i5 = new N(t4)), i5;
      }
      k(t4) {
        a2(this._$AH) || (this._$AH = [], this._$AR());
        const i5 = this._$AH;
        let s4, e6 = 0;
        for (const h3 of t4) e6 === i5.length ? i5.push(s4 = new _R(this.O(l2()), this.O(l2()), this, this.options)) : s4 = i5[e6], s4._$AI(h3), e6++;
        e6 < i5.length && (this._$AR(s4 && s4._$AB.nextSibling, e6), i5.length = e6);
      }
      _$AR(t4 = this._$AA.nextSibling, i5) {
        for (this._$AP?.(false, true, i5); t4 !== this._$AB; ) {
          const i6 = t4.nextSibling;
          t4.remove(), t4 = i6;
        }
      }
      setConnected(t4) {
        void 0 === this._$AM && (this._$Cv = t4, this._$AP?.(t4));
      }
    };
    k = class {
      get tagName() {
        return this.element.tagName;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      constructor(t4, i5, s4, e6, h3) {
        this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t4, this.name = i5, this._$AM = e6, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = E;
      }
      _$AI(t4, i5 = this, s4, e6) {
        const h3 = this.strings;
        let o6 = false;
        if (void 0 === h3) t4 = S2(this, t4, i5, 0), o6 = !c3(t4) || t4 !== this._$AH && t4 !== T, o6 && (this._$AH = t4);
        else {
          const e7 = t4;
          let n5, r6;
          for (t4 = h3[0], n5 = 0; n5 < h3.length - 1; n5++) r6 = S2(this, e7[s4 + n5], i5, n5), r6 === T && (r6 = this._$AH[n5]), o6 || (o6 = !c3(r6) || r6 !== this._$AH[n5]), r6 === E ? t4 = E : t4 !== E && (t4 += (r6 ?? "") + h3[n5 + 1]), this._$AH[n5] = r6;
        }
        o6 && !e6 && this.j(t4);
      }
      j(t4) {
        t4 === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t4 ?? "");
      }
    };
    H = class extends k {
      constructor() {
        super(...arguments), this.type = 3;
      }
      j(t4) {
        this.element[this.name] = t4 === E ? void 0 : t4;
      }
    };
    I = class extends k {
      constructor() {
        super(...arguments), this.type = 4;
      }
      j(t4) {
        this.element.toggleAttribute(this.name, !!t4 && t4 !== E);
      }
    };
    L = class extends k {
      constructor(t4, i5, s4, e6, h3) {
        super(t4, i5, s4, e6, h3), this.type = 5;
      }
      _$AI(t4, i5 = this) {
        if ((t4 = S2(this, t4, i5, 0) ?? E) === T) return;
        const s4 = this._$AH, e6 = t4 === E && s4 !== E || t4.capture !== s4.capture || t4.once !== s4.once || t4.passive !== s4.passive, h3 = t4 !== E && (s4 === E || e6);
        e6 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
      }
      handleEvent(t4) {
        "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t4) : this._$AH.handleEvent(t4);
      }
    };
    z = class {
      constructor(t4, i5, s4) {
        this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s4;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      _$AI(t4) {
        S2(this, t4);
      }
    };
    j = t2.litHtmlPolyfillSupport;
    j?.(N, R), (t2.litHtmlVersions ?? (t2.litHtmlVersions = [])).push("3.3.1");
    B = (t4, i5, s4) => {
      const e6 = s4?.renderBefore ?? i5;
      let h3 = e6._$litPart$;
      if (void 0 === h3) {
        const t5 = s4?.renderBefore ?? null;
        e6._$litPart$ = h3 = new R(i5.insertBefore(l2(), t5), t5, void 0, s4 ?? {});
      }
      return h3._$AI(t4), h3;
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
        const t4 = super.createRenderRoot();
        return (_a = this.renderOptions).renderBefore ?? (_a.renderBefore = t4.firstChild), t4;
      }
      update(t4) {
        const r6 = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this._$Do = B(r6, this.renderRoot, this.renderOptions);
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
    t3 = (t4) => (e6, o6) => {
      void 0 !== o6 ? o6.addInitializer(() => {
        customElements.define(t4, e6);
      }) : customElements.define(t4, e6);
    };
  }
});

// ../node_modules/@lit/reactive-element/decorators/property.js
function n4(t4) {
  return (e6, o6) => "object" == typeof o6 ? r4(t4, e6, o6) : ((t5, e7, o7) => {
    const r6 = e7.hasOwnProperty(o7);
    return e7.constructor.createProperty(o7, t5), r6 ? Object.getOwnPropertyDescriptor(e7, o7) : void 0;
  })(t4, e6, o6);
}
var o5, r4;
var init_property = __esm({
  "../node_modules/@lit/reactive-element/decorators/property.js"() {
    "use strict";
    init_reactive_element();
    o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
    r4 = (t4 = o5, e6, r6) => {
      const { kind: n5, metadata: i5 } = r6;
      let s4 = globalThis.litPropertyMetadata.get(i5);
      if (void 0 === s4 && globalThis.litPropertyMetadata.set(i5, s4 = /* @__PURE__ */ new Map()), "setter" === n5 && ((t4 = Object.create(t4)).wrapped = true), s4.set(r6.name, t4), "accessor" === n5) {
        const { name: o6 } = r6;
        return { set(r7) {
          const n6 = e6.get.call(this);
          e6.set.call(this, r7), this.requestUpdate(o6, n6, t4);
        }, init(e7) {
          return void 0 !== e7 && this.C(o6, void 0, t4, e7), e7;
        } };
      }
      if ("setter" === n5) {
        const { name: o6 } = r6;
        return function(r7) {
          const n6 = this[o6];
          e6.call(this, r7), this.requestUpdate(o6, n6, t4);
        };
      }
      throw Error("Unsupported decorator location: " + n5);
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
    e4 = (e6, t4, c4) => (c4.configurable = true, c4.enumerable = true, Reflect.decorate && "object" != typeof t4 && Object.defineProperty(e6, t4, c4), c4);
  }
});

// ../node_modules/@lit/reactive-element/decorators/query.js
function e5(e6, r6) {
  return (n5, s4, i5) => {
    const o6 = (t4) => t4.renderRoot?.querySelector(e6) ?? null;
    if (r6) {
      const { get: e7, set: r7 } = "object" == typeof s4 ? n5 : i5 ?? (() => {
        const t4 = Symbol();
        return { get() {
          return this[t4];
        }, set(e8) {
          this[t4] = e8;
        } };
      })();
      return e4(n5, s4, { get() {
        let t4 = e7.call(this);
        return void 0 === t4 && (t4 = o6(this), (null !== t4 || this.hasUpdated) && r7.call(this, t4)), t4;
      } });
    }
    return e4(n5, s4, { get() {
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

// src/components/auth-service.ts
var USER_MOCK, AuthService;
var init_auth_service = __esm({
  "src/components/auth-service.ts"() {
    "use strict";
    init_roles();
    USER_MOCK = true;
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
          const token = `mock-${found.username}-${Date.now()}`;
          const role2 = (found.role ?? "guest").toString().toLowerCase();
          const user = {
            username: found.username,
            avatarUrl: found.avatarUrl ?? "",
            role: role2
          };
          localStorage.setItem(this.KEY, token);
          localStorage.setItem(this.USER, JSON.stringify(user));
          return { ...user, token };
        }
        const res = await fetch("/api/login", {
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
        localStorage.setItem(this.KEY, data.token);
        localStorage.setItem(
          this.USER,
          JSON.stringify({
            username: data.username,
            avatarUrl: data.avatarUrl ?? "",
            role
          })
        );
        return {
          username: data.username,
          avatarUrl: data.avatarUrl ?? "",
          role,
          token: data.token
        };
      }
      static logout() {
        localStorage.removeItem(this.KEY);
        localStorage.removeItem(this.USER);
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
        const ENV = "development";
        const BASE = ENV === "pre-release" ? "/taniverse/" : ENV === "production" ? "" : "/";
        const candidates = [
          `${BASE}assets/mock/users.json`,
          // bila serve hasil build
          `${BASE}src/assets/mock/users.json`,
          // bila serve source (live-server dari frontend/)
          `${BASE}assets/mock/user.json`,
          // fallback nama file tunggal
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
    PageLogin = class extends i4 {
      constructor() {
        super(...arguments);
        this.username = "";
        this.password = "";
        this.loading = false;
        this.error = "";
        this.showPwd = false;
        this.remember = true;
        this.togglePwd = () => {
          this.showPwd = !this.showPwd;
        };
        this.fillDemo = () => {
          this.username = "admin";
          this.password = "admin123";
        };
      }
      createRenderRoot() {
        return this;
      }
      // gunakan Tailwind global
      // DEV ONLY: isi default untuk uji cepat
      firstUpdated() {
        this.username = "admin";
        this.password = "admin123";
      }
      async onSubmit(e6) {
        e6.preventDefault();
        if (this.loading) return;
        this.error = "";
        this.loading = true;
        try {
          const user = await AuthService.login(this.username.trim(), this.password);
          this.dispatchEvent(
            new CustomEvent("auth-changed", {
              detail: { user },
              bubbles: true,
              composed: true
            })
          );
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
                @input=${(e6) => this.username = e6.target.value}
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
                @input=${(e6) => this.password = e6.target.value}
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
                  @change=${(e6) => this.remember = !!e6.target.checked}
                />
                Ingat saya
              </label>
              <a
                class="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                href="#"
                @click=${(e6) => e6.preventDefault()}
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

            <!-- Quick demo (dev helper) -->
            <button
              type="button"
              class="w-full inline-flex items-center justify-center gap-2
                     py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50
                     text-slate-700 dark:text-slate-100 dark:bg-transparent dark:border-white/20"
              @click=${this.fillDemo}
            >
              🧪 Isi kredensial demo
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
      </section>
    `;
      }
    };
    // feel: on by default
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
    PageLogin = __decorateClass([
      t3("page-login")
    ], PageLogin);
  }
});

// src/components/devices-service.ts
function detectBasePath() {
  const ENV = typeof process !== "undefined" && "development" || "development";
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  const m2 = path.match(/^\/([^/]+)\//);
  const sub = m2 ? `/${m2[1]}/` : "/";
  if (ENV === "pre-release") return sub;
  if (ENV === "production") return "";
  return "/";
}
async function readMockDevices() {
  const BASE = detectBasePath();
  const candidates = [
    `${BASE}assets/mock/devices.json`,
    // hasil build (vite/esbuild)
    `${BASE}src/assets/mock/devices.json`,
    // serve source (live-server)
    `${BASE}mock/devices.json`,
    // folder publik
    `${BASE}devices.json`
    // root fallback
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
  throw new Error(
    "Tidak menemukan mock devices.json di lokasi kandidat mana pun."
  );
}
function parseValue(s4) {
  if (/^-?\d+(\.\d+)?$/.test(s4)) return Number(s4);
  try {
    const o6 = JSON.parse(s4);
    if (typeof o6.value === "number") return o6.value;
  } catch {
  }
  return null;
}
function parseState(s4) {
  return s4.toUpperCase() === "ON" ? "ON" : "OFF";
}
var DEVICES_MOCK, MQTT_BROKER_URL, TOPIC_PREFIX, DevicesStore, devicesStore;
var init_devices_service = __esm({
  "src/components/devices-service.ts"() {
    "use strict";
    DEVICES_MOCK = true;
    MQTT_BROKER_URL = "ws://localhost:8083/mqtt";
    TOPIC_PREFIX = "taniverse/devices";
    DevicesStore = class {
      constructor() {
        this.devices = /* @__PURE__ */ new Map();
        this.listeners = /* @__PURE__ */ new Set();
        this.ready = false;
        // MQTT (opsional)
        this.mqttClient = null;
      }
      /** Inisialisasi: selalu muat katalog dari mock, lalu opsional sambung MQTT */
      async init() {
        if (this.ready) return;
        await this.loadMock();
        if (!DEVICES_MOCK) {
          await this.connectMqtt();
        }
        this.ready = true;
        this.emit();
      }
      async loadMock() {
        try {
          const list = await readMockDevices();
          list.forEach((d3) => this.devices.set(d3.tagNumber, d3));
        } catch (err) {
          console.error("[devices] loadMock gagal:", err);
        }
      }
      async connectMqtt() {
        if (DEVICES_MOCK) return;
        if (!window.mqtt) {
          console.error(
            '[devices] MQTT tidak tersedia. Tambahkan <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"> di index.html'
          );
          return;
        }
        this.mqttClient = window.mqtt.connect(MQTT_BROKER_URL, {
          clean: true,
          reconnectPeriod: 2e3
        });
        this.mqttClient.on("connect", () => {
          this.mqttClient.subscribe(`${TOPIC_PREFIX}/+/value`);
          this.mqttClient.subscribe(`${TOPIC_PREFIX}/+/state`);
        });
        this.mqttClient.on("message", (topic, payload) => {
          try {
            const msg = new TextDecoder().decode(payload).trim();
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
            this.emit();
          } catch {
          }
        });
      }
      // ===== API untuk UI =====
      onChange(cb) {
        this.listeners.add(cb);
        return () => this.listeners.delete(cb);
      }
      emit() {
        this.listeners.forEach((cb) => cb());
      }
      get(tag) {
        return this.devices.get(tag);
      }
      setActuatorState(tag, next) {
        const d3 = this.devices.get(tag);
        if (!d3 || d3.type !== "actuator") return;
        d3.state = next;
        this.emit();
        if (!DEVICES_MOCK && this.mqttClient) {
          this.mqttClient.publish(`${TOPIC_PREFIX}/${tag}/set`, next);
        }
      }
      /** Untuk demo saat DEVICES_MOCK = true */
      setSensorValue(tag, value) {
        const d3 = this.devices.get(tag);
        if (d3 && d3.type === "sensor") {
          d3.value = value;
          this.emit();
        }
      }
      getMode() {
        return DEVICES_MOCK ? "mock" : "mqtt";
      }
    };
    devicesStore = new DevicesStore();
  }
});

// src/views/domains/hidroponik/dashboard-hidoponik.ts
var DashboardHidroponik;
var init_dashboard_hidoponik = __esm({
  "src/views/domains/hidroponik/dashboard-hidoponik.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_devices_service();
    DashboardHidroponik = class extends i4 {
      constructor() {
        super(...arguments);
        this.suhuAir = null;
        this.levelAir = null;
        this.phAir = null;
        this.kosentrasiNutrisi = null;
        this.pompaState = "OFF";
        this.openDetail = (tag) => {
          console.debug("[dashboard] openDetail clicked, tag =", tag);
          const isRegistered = !!customElements.get("device-dialog");
          console.debug("[dashboard] device-dialog registered =", isRegistered);
          const dlg = document.querySelector("device-dialog");
          console.debug("[dashboard] device-dialog instance =", dlg);
          if (!dlg) {
            console.error(
              "[dashboard] <device-dialog> instance NOT found in DOM. Did you add it to index.html?"
            );
            return;
          }
          if (typeof dlg.open !== "function") {
            console.error(
              "[dashboard] dlg.open() is not a function. Check component export/registration."
            );
            return;
          }
          const dev = devicesStore.get(tag);
          console.debug("[dashboard] deviceStore.get(tag) =", dev);
          if (!dev) {
            console.warn(
              `[dashboard] Device ${tag} tidak ditemukan di store (cek devices.json)`
            );
          }
          dlg.open(tag);
        };
        this.togglePompa = () => {
          const next = this.pompaState === "ON" ? "OFF" : "ON";
          devicesStore.setActuatorState("P-001", next);
        };
      }
      createRenderRoot() {
        return this;
      }
      async connectedCallback() {
        super.connectedCallback();
        console.debug("[dashboard] connected");
        await devicesStore.init();
        console.debug(
          "[dashboard] store initialized, mode =",
          devicesStore.getMode()
        );
        this.pull();
        this.off = devicesStore.onChange(() => {
          console.debug("[dashboard] store change event");
          this.pull();
        });
      }
      pull() {
        const tags = ["TI-001", "LI-004", "AI-006", "P-001"];
        const snapshot = tags.map((t4) => [t4, devicesStore.get(t4)]);
        console.debug("[dashboard] pull snapshot =", snapshot);
        const suhu = devicesStore.get("TI-001");
        const pmp = devicesStore.get("P-001");
        const level = devicesStore.get("LI-004");
        const nutrisi = devicesStore.get("AI-006");
        const ph = devicesStore.get("AI-005");
        this.suhuAir = suhu?.type === "sensor" ? suhu.value : null;
        this.levelAir = level?.type === "sensor" ? level.value : null;
        this.kosentrasiNutrisi = nutrisi?.type === "sensor" ? nutrisi.value : null;
        this.phAir = ph?.type === "sensor" ? ph.value : null;
        this.pompaState = pmp?.type === "actuator" ? pmp.state : "OFF";
      }
      disconnectedCallback() {
        this.off?.();
        super.disconnectedCallback();
      }
      render() {
        const aktif = this.pompaState === "ON";
        const warna = aktif ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";
        const suhuTxt = this.suhuAir == null ? "--" : `${this.suhuAir.toFixed(1)} \xB0C`;
        const levelTxt = this.levelAir == null ? "--" : `${this.levelAir.toFixed(1)} %`;
        const phTxt = this.phAir == null ? "--" : `${this.phAir.toFixed(1)} pH`;
        const konsentrasiTxt = this.kosentrasiNutrisi == null ? "--" : `${this.kosentrasiNutrisi.toFixed(0)} ppm`;
        const card = (label, value, click) => x`
      <div
        class="p-3 border rounded bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
        role="button"
        tabindex="0"
        @click=${click}
        @keydown=${(e6) => (e6.key === "Enter" || e6.key === " ") && click()}
      >
        <div class="text-sm text-gray-500">${label}</div>
        <div class="text-lg font-bold">${value}</div>
      </div>
    `;
        return x`
      <section class="bg-white rounded shadow p-4">
        <h2 class="text-xl font-semibold text-green-800 mb-4">
          🌱 Hidroponik
          <span class="ml-2 text-xs text-gray-500"
            >mode: ${devicesStore.getMode()}</span
          >
        </h2>

        <div class="grid grid-cols-2 gap-4 mb-4">
          ${card("\u{1F4A7} Suhu Air", suhuTxt, () => this.openDetail("TI-001"))}
          ${card(
          "\u{1F30A} Ketinggian Air",
          levelTxt,
          () => this.openDetail("LI-004")
        )}
          ${card("\u{1F9EA} Nutrisi", konsentrasiTxt, () => this.openDetail("AI-006"))}
          ${card("\u{1F33F} pH Air", phTxt, () => {
          this.openDetail("AI-005");
        })}
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm font-medium">Pompa Nutrisi (P-001):</div>
          <div class="flex items-center gap-2">
            <span class="text-sm px-2 py-1 rounded ${warna}"
              >${aktif ? "Aktif" : "Mati"}</span
            >
            <button
              class="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              @click=${this.togglePompa}
            >
              ${aktif ? "Matikan" : "Nyalakan"}
            </button>
          </div>
        </div>
      </section>
    `;
      }
    };
    __decorateClass([
      r5()
    ], DashboardHidroponik.prototype, "suhuAir", 2);
    __decorateClass([
      r5()
    ], DashboardHidroponik.prototype, "levelAir", 2);
    __decorateClass([
      r5()
    ], DashboardHidroponik.prototype, "phAir", 2);
    __decorateClass([
      r5()
    ], DashboardHidroponik.prototype, "kosentrasiNutrisi", 2);
    __decorateClass([
      r5()
    ], DashboardHidroponik.prototype, "pompaState", 2);
    DashboardHidroponik = __decorateClass([
      t3("dashboard-hidroponik")
    ], DashboardHidroponik);
  }
});

// src/views/domains/aquakultur/dashboard-aquakultur.ts
var DashboardAquakultur;
var init_dashboard_aquakultur = __esm({
  "src/views/domains/aquakultur/dashboard-aquakultur.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    DashboardAquakultur = class extends i4 {
      createRenderRoot() {
        return this;
      }
      render() {
        return x`
      <section
        class="bg-white rounded-xl shadow p-6 space-y-4 border border-blue-100"
      >
        <header class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-blue-800 flex items-center gap-2">
            🐟 Akuakultur
          </h2>
          <span class="text-sm text-gray-500">Zona 2</span>
        </header>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500 mb-1">💧 Suhu Air</p>
            <div class="text-lg font-semibold text-blue-700">28°C</div>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">⚡ Aerator</p>
            <div class="text-lg font-semibold text-green-600">Aktif</div>
          </div>

          <div>
            <p class="text-sm text-gray-500 mb-1">🌿 pH Air</p>
            <div class="text-lg font-semibold text-blue-600">7.2</div>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">🧪 Oksigen Terlarut</p>
            <div class="text-lg font-semibold text-blue-600">6.8 mg/L</div>
          </div>
        </div>

        <footer class="text-xs text-gray-400 text-right">
          Terakhir diperbarui: 07:34 WIB
        </footer>
      </section>
    `;
      }
    };
    DashboardAquakultur = __decorateClass([
      t3("dashboard-aquakultur")
    ], DashboardAquakultur);
  }
});

// src/views/domains/peternakan/dashboard-peternakan.ts
var DashboardPeternakan;
var init_dashboard_peternakan = __esm({
  "src/views/domains/peternakan/dashboard-peternakan.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    DashboardPeternakan = class extends i4 {
      createRenderRoot() {
        return this;
      }
      render() {
        return x`
      <section
        class="bg-white rounded-xl shadow p-6 space-y-4 border border-yellow-100"
      >
        <header class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-yellow-800 flex items-center gap-2">
            🐔 Peternakan
          </h2>
          <span class="text-sm text-gray-500">Kandang A</span>
        </header>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500 mb-1">🌡️ Suhu Kandang</p>
            <div class="text-lg font-semibold text-yellow-700">32°C</div>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">🌀 Ventilasi</p>
            <div class="text-lg font-semibold text-green-600">Aktif</div>
          </div>

          <div>
            <p class="text-sm text-gray-500 mb-1">💡 Penerangan</p>
            <div class="text-lg font-semibold text-yellow-600">On</div>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">🥚 Produksi Telur</p>
            <div class="text-lg font-semibold text-gray-700">82 butir/hari</div>
          </div>
        </div>

        <footer class="text-xs text-gray-400 text-right">
          Terakhir diperbarui: 07:34 WIB
        </footer>
      </section>
    `;
      }
    };
    DashboardPeternakan = __decorateClass([
      t3("dashboard-peternakan")
    ], DashboardPeternakan);
  }
});

// src/components/device-dialog.ts
var DeviceDialog;
var init_device_dialog = __esm({
  "src/components/device-dialog.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_devices_service();
    DeviceDialog = class extends i4 {
      constructor() {
        super(...arguments);
        this.close = () => {
          this.dlg?.close();
        };
      }
      // Light DOM supaya class Tailwind aktif
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
      renderRow(label, value) {
        return x`
      <div class="flex justify-between items-start gap-4 text-sm py-1">
        <div class="text-gray-500">${label}</div>
        <div class="font-medium text-gray-800 text-right">${value ?? "-"}</div>
      </div>
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
          <!-- Tombol X (kanan-atas) -->
          <button
            class="absolute top-2.5 right-2.5 inline-flex items-center justify-center
                   h-8 w-8 rounded-lg text-gray-400 hover:text-red-500
                   hover:bg-red-50 active:scale-95 transition"
            @click=${this.close}
            aria-label="Tutup dialog"
            title="Tutup"
          >
            ✕
          </button>

          <!-- Header -->
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

          <!-- Body -->
          ${d3 ? x`
                <div class="space-y-2">
                  ${this.renderRow("Kind", d3.kind)}
                  ${this.renderRow("Unit", d3.unit)}
                  ${d3.type === "sensor" ? this.renderRow(
          "Nilai",
          (d3.value ?? "-") + (d3.unit ? ` ${d3.unit}` : "")
        ) : this.renderRow("State", d3.state)}
                  ${d3.ranges ? this.renderRow(
          "Range",
          `${d3.ranges.low ?? "-"} .. ${d3.ranges.high ?? "-"}`
        ) : null}
                  ${d3.alarms ? this.renderRow(
          "Alarm",
          `${d3.alarms.low ?? "-"} / ${d3.alarms.high ?? "-"}`
        ) : null}
                </div>
              ` : x`
                <div class="text-sm text-gray-500">Device tidak ditemukan.</div>
              `}
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
    init_dashboard_hidoponik();
    init_dashboard_aquakultur();
    init_dashboard_peternakan();
    init_device_dialog();
    PageDashboard = class extends i4 {
      createRenderRoot() {
        return this;
      }
      render() {
        return x`
      <section class="space-y-6">
        <dashboard-hidroponik></dashboard-hidroponik>
        <dashboard-aquakultur></dashboard-aquakultur>
        <dashboard-peternakan></dashboard-peternakan>
      </section>
    `;
      }
    };
    PageDashboard = __decorateClass([
      t3("page-dashboard")
    ], PageDashboard);
  }
});

// src/pages/histori.ts
var histori_exports = {};
__export(histori_exports, {
  PageHistori: () => PageHistori
});
var PageHistori;
var init_histori = __esm({
  "src/pages/histori.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    PageHistori = class extends i4 {
      createRenderRoot() {
        return this;
      }
      render() {
        return x`
      <section class="bg-white shadow rounded p-6">
        <div class="mb-4">
          <h2 class="text-2xl font-bold text-green-800">📜 Riwayat Sensor</h2>
          <p class="text-gray-500 text-sm">
            Histori pembacaan data sensor hidroponik
          </p>
        </div>

        <div class="flex justify-between items-center mb-3">
          <label class="text-sm text-gray-600 font-medium"
            >Filter tanggal:
            <input
              type="date"
              class="ml-2 border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </label>
          <button
            class="bg-green-600 text-white text-sm px-4 py-1 rounded hover:bg-green-700 transition"
          >
            🔄 Refresh
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full text-sm text-left border">
            <thead class="bg-gray-100 text-gray-700 font-semibold border-b">
              <tr>
                <th class="px-4 py-2">⏱ Waktu</th>
                <th class="px-4 py-2">🌡 Suhu</th>
                <th class="px-4 py-2">💧 pH</th>
                <th class="px-4 py-2">🌿 Nutrisi</th>
                <th class="px-4 py-2">📶 Status</th>
              </tr>
            </thead>
            <tbody class="text-gray-700">
              ${this.renderRow(
          "2025-07-29 09:12",
          "25.3\xB0C",
          "6.1",
          "890 ppm",
          "Normal"
        )}
              ${this.renderRow(
          "2025-07-29 08:45",
          "26.0\xB0C",
          "6.5",
          "870 ppm",
          "Normal"
        )}
              ${this.renderRow(
          "2025-07-29 08:15",
          "28.4\xB0C",
          "6.9",
          "1020 ppm",
          "\u26A0\uFE0F Tinggi"
        )}
            </tbody>
          </table>
        </div>
      </section>
    `;
      }
      renderRow(waktu, suhu, ph, nutrisi, status) {
        const statusColor = status.includes("Tinggi") ? "text-red-600" : "text-green-700";
        return x`
      <tr class="border-b">
        <td class="px-4 py-2">${waktu}</td>
        <td class="px-4 py-2">${suhu}</td>
        <td class="px-4 py-2">${ph}</td>
        <td class="px-4 py-2">${nutrisi}</td>
        <td class="px-4 py-2 font-medium ${statusColor}">${status}</td>
      </tr>
    `;
      }
    };
    PageHistori = __decorateClass([
      t3("page-histori")
    ], PageHistori);
  }
});

// src/components/devices-config.service.ts
async function loadDevices() {
  if (_cache) return _cache;
  const ls = localStorage.getItem(LS_KEY);
  if (ls) {
    _cache = JSON.parse(ls);
    return _cache;
  }
  _cache = await readMockDevicesCfg();
  localStorage.setItem(LS_KEY, JSON.stringify(_cache));
  return _cache;
}
function getByTag(tag) {
  return _cache?.find((d3) => d3.tagNumber === tag);
}
function upsertDevice(device) {
  if (!_cache) throw new Error("loadDevices() belum dipanggil");
  const i5 = _cache.findIndex((d3) => d3.tagNumber === device.tagNumber);
  const now = (/* @__PURE__ */ new Date()).toISOString();
  if (i5 >= 0) device.meta = { ...device.meta, updatedAt: now };
  else device.meta = device.meta ?? { createdAt: now, updatedAt: now };
  if (i5 >= 0) _cache[i5] = device;
  else _cache.push(device);
  localStorage.setItem(LS_KEY, JSON.stringify(_cache));
}
function validateDevice(d3, isNew) {
  const errs = [];
  if (!d3.tagNumber) errs.push({ field: "tagNumber", message: "Tag wajib" });
  if (isNew && _cache?.some((x2) => x2.tagNumber === d3.tagNumber))
    errs.push({ field: "tagNumber", message: "Tag sudah dipakai" });
  if (!d3.type) errs.push({ field: "type", message: "Type wajib" });
  if (d3.ranges) {
    const lo = d3.ranges.low ?? null, hi = d3.ranges.high ?? null;
    if (lo !== null && hi !== null && Number(lo) >= Number(hi))
      errs.push({ field: "ranges.high", message: "High harus > Low" });
  }
  if (d3.alarms && d3.ranges && d3.ranges.low !== null && d3.ranges.high !== null) {
    const { low: rL, high: rH } = d3.ranges;
    const { low: aL, high: aH } = d3.alarms;
    if (aL !== null && (aL < rL || aL > rH))
      errs.push({ field: "alarms.low", message: "Alarm low di luar range" });
    if (aH !== null && (aH < rL || aH > rH))
      errs.push({ field: "alarms.high", message: "Alarm high di luar range" });
    if (aL !== null && aH !== null && aL >= aH)
      errs.push({
        field: "alarms.high",
        message: "Alarm high harus > alarm low"
      });
  }
  if (!d3.mqtt?.topic)
    errs.push({ field: "mqtt.topic", message: "MQTT topic wajib" });
  if (d3.type === "actuator") {
    if (!d3.allowedStates || d3.allowedStates.length === 0)
      errs.push({ field: "allowedStates", message: "allowedStates wajib" });
    if (d3.defaultState && d3.allowedStates && !d3.allowedStates.includes(d3.defaultState))
      errs.push({
        field: "defaultState",
        message: "defaultState harus ada di allowedStates"
      });
    if (!d3.writable)
      errs.push({ field: "writable", message: "Actuator harus writable" });
  }
  if (!d3.io?.bus) errs.push({ field: "io.bus", message: "Bus wajib" });
  if (d3.io.bus === "gpio" && (d3.io.pin === null || Number.isNaN(d3.io.pin)))
    errs.push({ field: "io.pin", message: "GPIO pin wajib" });
  if (d3.io.bus === "i2c" && !d3.io.address)
    errs.push({ field: "io.address", message: "I2C address wajib" });
  if (d3.io.bus === "adc" && (d3.io.channel === null || Number.isNaN(d3.io.channel)))
    errs.push({ field: "io.channel", message: "ADC channel wajib" });
  return errs;
}
async function readMockDevicesCfg() {
  const ENV = "development";
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
var LS_KEY, _cache;
var init_devices_config_service = __esm({
  "src/components/devices-config.service.ts"() {
    "use strict";
    LS_KEY = "mock.devices.config";
    _cache = null;
  }
});

// src/views/ui-tabs.ts
var UiTabs;
var init_ui_tabs = __esm({
  "src/views/ui-tabs.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    UiTabs = class extends i4 {
      constructor() {
        super(...arguments);
        this.tabs = [];
        this.active = "general";
        this.badges = {};
      }
      // Tailwind global → light DOM
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
        <ul class="flex gap-2 -mb-px px-2">
          ${this.tabs.map((t4) => {
          const is = t4.id === this.active;
          const badge = this.badges[t4.id] ?? 0;
          return x`
              <li>
                <button
                  class="px-4 py-2 text-sm rounded-t-md border transition
                         ${is ? "bg-white border-slate-300 border-b-white" : "border-transparent hover:bg-slate-50"}
                         inline-flex items-center gap-2"
                  @click=${() => this.onClick(t4.id)}
                >
                  ${t4.icon ? x`<span>${t4.icon}</span>` : null}
                  <span>${t4.label}</span>
                  ${badge > 0 ? x`<span
                        class="ml-1 grid place-items-center w-5 h-5 rounded-full bg-red-500 text-white text-xs"
                        >${badge}</span
                      >` : null}
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
      n4({ attribute: false })
    ], UiTabs.prototype, "tabs", 2);
    __decorateClass([
      n4()
    ], UiTabs.prototype, "active", 2);
    __decorateClass([
      n4({ attribute: false })
    ], UiTabs.prototype, "badges", 2);
    UiTabs = __decorateClass([
      t3("ui-tabs")
    ], UiTabs);
  }
});

// src/views/dev-config-general.ts
var DevConfigGeneral;
var init_dev_config_general = __esm({
  "src/views/dev-config-general.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    DevConfigGeneral = class extends i4 {
      constructor() {
        super(...arguments);
        this.errors = {};
        this.mode = "edit";
        this.tags = [];
        // daftar Tag untuk dropdown
        // ==== UI helpers ====
        this.inputCls = "mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";
        this.e = (f3) => this.errors[f3];
        this.num = (v2) => v2 === "" ? null : Number(v2);
        // ==== Initial pick (sekali) saat mode EDIT ====
        this._initPicked = false;
      }
      // pakai light DOM supaya Tailwind global berlaku
      createRenderRoot() {
        return this;
      }
      emit(path, value) {
        this.dispatchEvent(
          new CustomEvent("dev-field-change", {
            detail: { path, value },
            bubbles: true,
            composed: true
          })
        );
      }
      updated(_c) {
        if (!this._initPicked && this.mode === "edit" && this.tags?.length) {
          const initial = this.model.tagNumber || this.tags[0];
          console.warn("[dev-config-general] init pick \u2192", {
            mode: this.mode,
            tags: this.tags,
            modelTag: this.model.tagNumber,
            initial
          });
          if (initial) {
            this.dispatchEvent(
              new CustomEvent("dev-tag-picked", {
                detail: { tag: initial },
                bubbles: true,
                composed: true
              })
            );
            this._initPicked = true;
          }
        }
      }
      render() {
        const d3 = this.model;
        const statesCsv = (d3.allowedStates ?? []).join(",");
        return x`
      <section class="p-4 space-y-6">
        <!-- Identitas -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label class="block">
            <span class="text-sm font-medium text-slate-700">Tag Number</span>

            ${this.mode === "edit" ? (() => {
          const selectValue = this.model.tagNumber || (this.tags[0] ?? "");
          console.warn(
            "[dev-config-general] render EDIT, mode =",
            this.mode,
            "| selectValue =",
            selectValue,
            "| tags =",
            this.tags
          );
          return x`
                    <select
                      class="${this.inputCls}"
                      .value=${selectValue}
                      @change=${(e6) => {
            const val = e6.currentTarget.value;
            console.warn("[dev-config-general] tag-change \u2192", val);
            if (!val) return;
            this.emit("tagNumber", val);
            this.dispatchEvent(
              new CustomEvent("dev-tag-picked", {
                detail: { tag: val },
                bubbles: true,
                composed: true
              })
            );
          }}
                    >
                      ${this.tags.map(
            (t4) => x`<option value=${t4}>${t4}</option>`
          )}
                    </select>
                  `;
        })() : (() => {
          console.warn(
            "[dev-config-general] render NEW, mode =",
            this.mode,
            "| initial input =",
            this.model.tagNumber ?? ""
          );
          return x`
                    <!-- NEW: input bebas -->
                    <input
                      class="${this.inputCls}"
                      .value=${d3.tagNumber ?? ""}
                      placeholder="Ketik tag baru…"
                      @input=${(e6) => {
            const val = e6.currentTarget.value.trim();
            console.warn(
              "[dev-config-general] new-tag typing \u2192",
              val
            );
            this.emit("tagNumber", val);
          }}
                    />
                  `;
        })()}
            ${this.e("tagNumber") ? x`<p class="text-xs text-red-600 mt-1">
                  ${this.e("tagNumber")}
                </p>` : null}
          </label>

          <label class="block">
            <span class="text-sm font-medium text-slate-700">Type</span>
            <select
              class="${this.inputCls}"
              .value=${d3.type}
              @change=${(e6) => this.emit("type", e6.currentTarget.value)}
            >
              <option value="sensor">sensor</option>
              <option value="actuator">actuator</option>
            </select>
          </label>

          <label class="block">
            <span class="text-sm font-medium text-slate-700">Description</span>
            <input
              class="${this.inputCls}"
              .value=${d3.description ?? ""}
              @input=${(e6) => this.emit(
          "description",
          e6.currentTarget.value
        )}
            />
          </label>

          <label class="block">
            <span class="text-sm font-medium text-slate-700">Unit</span>
            <input
              class="${this.inputCls}"
              .value=${d3.unit ?? ""}
              placeholder="DegC, %, kPa, ..."
              @input=${(e6) => this.emit("unit", e6.currentTarget.value)}
            />
          </label>
        </div>

        ${d3.type === "sensor" ? x`
              <!-- Pengukuran -->
              <div class="space-y-3">
                <h3 class="text-sm font-semibold text-slate-700">Pengukuran</h3>

                <div class="grid grid-cols-2 gap-4">
                  <label class="block">
                    <span class="text-sm font-medium text-slate-700"
                      >Range Low</span
                    >
                    <input
                      type="number"
                      class="${this.inputCls}"
                      .value=${d3.ranges?.low ?? ""}
                      @input=${(e6) => this.emit(
          "ranges.low",
          this.num(e6.currentTarget.value)
        )}
                    />
                  </label>

                  <label class="block">
                    <span class="text-sm font-medium text-slate-700"
                      >Range High</span
                    >
                    <input
                      type="number"
                      class="${this.inputCls}"
                      .value=${d3.ranges?.high ?? ""}
                      @input=${(e6) => this.emit(
          "ranges.high",
          this.num(e6.currentTarget.value)
        )}
                    />
                    ${this.e("ranges.high") ? x`<p class="text-xs text-red-600 mt-1">
                          ${this.e("ranges.high")}
                        </p>` : null}
                  </label>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <label class="block">
                    <span class="text-sm font-medium text-slate-700"
                      >Alarm Low</span
                    >
                    <input
                      type="number"
                      class="${this.inputCls}"
                      .value=${d3.alarms?.low ?? ""}
                      @input=${(e6) => this.emit(
          "alarms.low",
          this.num(e6.currentTarget.value)
        )}
                    />
                    ${this.e("alarms.low") ? x`<p class="text-xs text-red-600 mt-1">
                          ${this.e("alarms.low")}
                        </p>` : null}
                  </label>

                  <label class="block">
                    <span class="text-sm font-medium text-slate-700"
                      >Alarm High</span
                    >
                    <input
                      type="number"
                      class="${this.inputCls}"
                      .value=${d3.alarms?.high ?? ""}
                      @input=${(e6) => this.emit(
          "alarms.high",
          this.num(e6.currentTarget.value)
        )}
                    />
                    ${this.e("alarms.high") ? x`<p class="text-xs text-red-600 mt-1">
                          ${this.e("alarms.high")}
                        </p>` : null}
                  </label>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <label class="block">
                    <span class="text-sm font-medium text-slate-700"
                      >Sample Period (ms)</span
                    >
                    <input
                      type="number"
                      class="${this.inputCls}"
                      .value=${d3.sample?.periodMs ?? 1e3}
                      @input=${(e6) => this.emit(
          "sample.periodMs",
          this.num(e6.currentTarget.value)
        )}
                    />
                  </label>

                  <label class="block">
                    <span class="text-sm font-medium text-slate-700"
                      >Deadband</span
                    >
                    <input
                      type="number"
                      step="0.001"
                      class="${this.inputCls}"
                      .value=${d3.sample?.deadband ?? ""}
                      @input=${(e6) => {
          const t4 = e6.currentTarget;
          const v2 = t4.value === "" ? null : Number(t4.value);
          this.emit("sample.deadband", v2);
        }}
                    />
                  </label>
                </div>

                <label class="block">
                  <span class="text-sm font-medium text-slate-700"
                    >Display Precision</span
                  >
                  <input
                    type="number"
                    class="${this.inputCls}"
                    .value=${d3.display?.precision ?? 0}
                    @input=${(e6) => this.emit(
          "display.precision",
          this.num(e6.currentTarget.value)
        )}
                  />
                </label>
              </div>
            ` : x`
              <!-- Kontrol (Actuator) -->
              <div class="space-y-3">
                <h3 class="text-sm font-semibold text-slate-700">Kontrol</h3>

                <label class="block">
                  <span class="text-sm font-medium text-slate-700">Kind</span>
                  <input
                    class="${this.inputCls}"
                    .value=${d3.kind ?? ""}
                    placeholder="fan, relay, ..."
                    @input=${(e6) => this.emit(
          "kind",
          e6.currentTarget.value
        )}
                  />
                </label>

                <label class="block">
                  <span class="text-sm font-medium text-slate-700"
                    >Allowed States (comma)</span
                  >
                  <input
                    class="${this.inputCls}"
                    .value=${statesCsv}
                    placeholder="OFF,ON"
                    @input=${(e6) => this.emit(
          "allowedStatesCsv",
          e6.currentTarget.value
        )}
                  />
                  ${this.e("allowedStates") ? x`<p class="text-xs text-red-600 mt-1">
                        ${this.e("allowedStates")}
                      </p>` : null}
                </label>

                <div class="grid grid-cols-2 gap-4">
                  <label class="block">
                    <span class="text-sm font-medium text-slate-700"
                      >Default State</span
                    >
                    <input
                      class="${this.inputCls}"
                      .value=${d3.defaultState ?? ""}
                      @input=${(e6) => this.emit(
          "defaultState",
          e6.currentTarget.value
        )}
                    />
                    ${this.e("defaultState") ? x`<p class="text-xs text-red-600 mt-1">
                          ${this.e("defaultState")}
                        </p>` : null}
                  </label>

                  <label class="inline-flex items-center gap-2 mt-7">
                    <input
                      type="checkbox"
                      .checked=${!!d3.writable}
                      @change=${(e6) => this.emit(
          "writable",
          e6.currentTarget.checked
        )}
                    />
                    <span class="text-sm text-slate-700">Writable</span>
                    ${this.e("writable") ? x`<span class="text-xs text-red-600 ml-2"
                          >${this.e("writable")}</span
                        >` : null}
                  </label>
                </div>
              </div>
            `}

        <!-- Status (RO) -->
        <div class="border rounded p-3 bg-slate-50">
          <h3 class="text-sm font-semibold text-slate-700 mb-2">Status</h3>
          ${d3.type === "sensor" ? x`<div class="text-sm">
                Value:
                <span class="font-medium">${d3.value ?? "-"}</span>
              </div>` : x`<div class="text-sm">
                State:
                <span class="font-medium">${d3.state ?? "-"}</span>
              </div>`}
        </div>
      </section>
    `;
      }
    };
    __decorateClass([
      n4({ attribute: false })
    ], DevConfigGeneral.prototype, "model", 2);
    __decorateClass([
      n4({ attribute: false })
    ], DevConfigGeneral.prototype, "errors", 2);
    __decorateClass([
      n4()
    ], DevConfigGeneral.prototype, "mode", 2);
    __decorateClass([
      n4({ attribute: false })
    ], DevConfigGeneral.prototype, "tags", 2);
    DevConfigGeneral = __decorateClass([
      t3("dev-config-general")
    ], DevConfigGeneral);
  }
});

// src/views/dev-config-hw-comm.ts
var DevConfigHwComm;
var init_dev_config_hw_comm = __esm({
  "src/views/dev-config-hw-comm.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    DevConfigHwComm = class extends i4 {
      constructor() {
        super(...arguments);
        this.errors = {};
        this.inputCls = "mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";
        this.e = (f3) => this.errors[f3];
        this.num = (v2) => v2 === "" ? null : Number(v2);
      }
      createRenderRoot() {
        return this;
      }
      emit(path, value) {
        this.dispatchEvent(
          new CustomEvent("dev-field-change", {
            detail: { path, value },
            bubbles: true,
            composed: true
          })
        );
      }
      render() {
        const d3 = this.model;
        const showGPIO = d3.io.bus === "gpio";
        const showI2C = d3.io.bus === "i2c";
        const showADC = d3.io.bus === "adc";
        return x`
      <section class="p-4 space-y-6">
        <!-- I/O (Hardware) -->
        <div class="space-y-3">
          <h3 class="text-sm font-semibold text-slate-700">I/O (Hardware)</h3>
          <label class="block">
            <span class="text-sm font-medium text-slate-700">Bus</span>
            <select
              class="${this.inputCls}"
              .value=${d3.io.bus}
              @change=${(e6) => this.emit("io.bus", e6.target.value)}
            >
              <option value="adc">adc</option>
              <option value="i2c">i2c</option>
              <option value="gpio">gpio</option>
            </select>
            ${this.e("io.bus") ? x`<p class="text-xs text-red-600 mt-1">
                  ${this.e("io.bus")}
                </p>` : null}
          </label>

          ${showGPIO ? x` <label class="block">
                <span class="text-sm font-medium text-slate-700">GPIO Pin</span>
                <input
                  type="number"
                  class="${this.inputCls}"
                  .value=${String(d3.io.pin ?? "")}
                  @input=${(e6) => this.emit("io.pin", this.num(e6.target.value))}
                />
                ${this.e("io.pin") ? x`<p class="text-xs text-red-600 mt-1">
                      ${this.e("io.pin")}
                    </p>` : null}
              </label>` : null}
          ${showI2C ? x` <label class="block">
                <span class="text-sm font-medium text-slate-700"
                  >I2C Address</span
                >
                <input
                  class="${this.inputCls}"
                  .value=${d3.io.address ?? ""}
                  placeholder="0x40"
                  @input=${(e6) => this.emit("io.address", e6.target.value)}
                />
                ${this.e("io.address") ? x`<p class="text-xs text-red-600 mt-1">
                      ${this.e("io.address")}
                    </p>` : null}
              </label>` : null}
          ${showADC ? x` <label class="block">
                <span class="text-sm font-medium text-slate-700"
                  >ADC Channel</span
                >
                <input
                  type="number"
                  class="${this.inputCls}"
                  .value=${String(d3.io.channel ?? "")}
                  @input=${(e6) => this.emit("io.channel", this.num(e6.target.value))}
                />
                ${this.e("io.channel") ? x`<p class="text-xs text-red-600 mt-1">
                      ${this.e("io.channel")}
                    </p>` : null}
              </label>` : null}
        </div>

        <!-- Komunikasi (MQTT) -->
        <div class="space-y-3">
          <h3 class="text-sm font-semibold text-slate-700">
            Komunikasi (MQTT)
          </h3>
          <label class="block">
            <span class="text-sm font-medium text-slate-700">MQTT Topic</span>
            <input
              class="${this.inputCls}"
              .value=${d3.mqtt.topic ?? ""}
              @input=${(e6) => this.emit("mqtt.topic", e6.target.value)}
            />
            ${this.e("mqtt.topic") ? x`<p class="text-xs text-red-600 mt-1">
                  ${this.e("mqtt.topic")}
                </p>` : null}
          </label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="block">
              <span class="text-sm font-medium text-slate-700">Read Cmd</span>
              <input
                class="${this.inputCls}"
                .value=${d3.mqtt.readCmd ?? ""}
                placeholder="state / null"
                @input=${(e6) => this.emit("mqtt.readCmd", e6.target.value)}
              />
            </label>
            <label class="block">
              <span class="text-sm font-medium text-slate-700">Write Cmd</span>
              <input
                class="${this.inputCls}"
                .value=${d3.mqtt.writeCmd ?? ""}
                placeholder="set / null"
                @input=${(e6) => this.emit("mqtt.writeCmd", e6.target.value)}
              />
            </label>
          </div>
        </div>
      </section>
    `;
      }
    };
    __decorateClass([
      n4({ attribute: false })
    ], DevConfigHwComm.prototype, "model", 2);
    __decorateClass([
      n4({ attribute: false })
    ], DevConfigHwComm.prototype, "errors", 2);
    DevConfigHwComm = __decorateClass([
      t3("dev-config-hw-comm")
    ], DevConfigHwComm);
  }
});

// src/views/dev-config-loc-meta.ts
var DevConfigLocMeta;
var init_dev_config_loc_meta = __esm({
  "src/views/dev-config-loc-meta.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    DevConfigLocMeta = class extends i4 {
      constructor() {
        super(...arguments);
        this.inputCls = "mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";
      }
      createRenderRoot() {
        return this;
      }
      emit(path, value) {
        this.dispatchEvent(
          new CustomEvent("dev-field-change", {
            detail: { path, value },
            bubbles: true,
            composed: true
          })
        );
      }
      render() {
        const d3 = this.model;
        return x`
      <section class="p-4 space-y-6">
        <div class="space-y-3">
          <h3 class="text-sm font-semibold text-slate-700">Lokasi</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="block">
              <span class="text-sm font-medium text-slate-700">Area</span>
              <input
                class="${this.inputCls}"
                .value=${d3.location.area ?? ""}
                @input=${(e6) => this.emit("location.area", e6.target.value)}
              />
            </label>
            <label class="block">
              <span class="text-sm font-medium text-slate-700">Position</span>
              <input
                class="${this.inputCls}"
                .value=${d3.location.position ?? ""}
                @input=${(e6) => this.emit("location.position", e6.target.value)}
              />
            </label>
          </div>
        </div>

        <div class="space-y-1">
          <h3 class="text-sm font-semibold text-slate-700">Metadata</h3>
          <div class="text-xs text-slate-600">
            <div>Created At: <code>${d3.meta.createdAt}</code></div>
            <div>Updated At: <code>${d3.meta.updatedAt}</code></div>
          </div>
        </div>
      </section>
    `;
      }
    };
    __decorateClass([
      n4({ attribute: false })
    ], DevConfigLocMeta.prototype, "model", 2);
    DevConfigLocMeta = __decorateClass([
      t3("dev-config-loc-meta")
    ], DevConfigLocMeta);
  }
});

// src/pages/device-config.ts
var device_config_exports = {};
__export(device_config_exports, {
  PageDeviceConfig: () => PageDeviceConfig
});
var PageDeviceConfig;
var init_device_config = __esm({
  "src/pages/device-config.ts"() {
    "use strict";
    init_lit();
    init_decorators();
    init_devices_config_service();
    init_ui_tabs();
    init_dev_config_general();
    init_dev_config_hw_comm();
    init_dev_config_loc_meta();
    PageDeviceConfig = class extends i4 {
      constructor() {
        super(...arguments);
        this.errors = [];
        this.errorsMap = {};
        this.activeTab = "general";
        this.mode = "edit";
        this.tags = [];
        this.dirty = false;
        this._debug = false;
        // HUD ?debug=1
        this.TAB_KEY = "deviceConfig.activeTab";
        this.beforeUnload = (e6) => {
          if (!this.dirty) return;
          e6.preventDefault();
          e6.returnValue = "";
        };
        /* ====== EVENTS ====== */
        this.onTabChange = (e6) => {
          this.activeTab = e6.detail.id;
          sessionStorage.setItem(this.TAB_KEY, this.activeTab);
          const url = new URL(window.location.href);
          url.searchParams.set("tab", this.activeTab);
          history.replaceState({}, "", url.toString());
        };
        this.onChangeMode = (mode) => {
          if (this.mode === mode) return;
          this.mode = mode;
          this.log("mode changed \u2192", mode);
          if (mode === "edit") {
            const sel = this.device?.tagNumber && this.tags.includes(this.device.tagNumber) ? this.device.tagNumber : this.tags[0] ?? "";
            if (!sel) {
              this.log("edit mode but no tags");
              return;
            }
            let found = getByTag(sel);
            if (!found) {
              loadDevices().then((list) => {
                const f3 = list.find((d3) => d3.tagNumber === sel);
                if (f3) {
                  this.device = structuredClone(f3);
                  this.pristine = structuredClone(f3);
                  this.requestUpdate();
                }
              });
            } else {
              this.device = structuredClone(found);
              this.pristine = structuredClone(found);
            }
            const u3 = new URL(window.location.href);
            u3.searchParams.set("tag", sel);
            history.replaceState({}, "", u3.toString());
          } else {
            this.device = this.newTemplate();
            this.pristine = structuredClone(this.device);
            const u3 = new URL(window.location.href);
            u3.searchParams.delete("tag");
            history.replaceState({}, "", u3.toString());
          }
          this.dirty = false;
          this.revalidate(false);
        };
        this.onTagPicked = (e6) => {
          const tag = e6.detail.tag;
          this.log("tag picked \u2192", tag);
          let found = getByTag(tag);
          if (!found) {
            loadDevices().then((list) => {
              const f3 = list.find((d3) => d3.tagNumber === tag);
              if (f3) {
                this.mode = "edit";
                this.device = structuredClone(f3);
                this.pristine = structuredClone(f3);
                this.revalidate(false);
                this.requestUpdate();
              }
            });
            return;
          }
          this.mode = "edit";
          this.device = structuredClone(found);
          this.pristine = structuredClone(found);
          const url = new URL(window.location.href);
          url.searchParams.set("tag", tag);
          history.replaceState({}, "", url.toString());
          this.dirty = false;
          this.revalidate(false);
        };
        this.onFieldChange = (e6) => {
          var _a, _b;
          this.patch(this.device, e6.detail.path, e6.detail.value);
          if (e6.detail.path === "type") {
            if (e6.detail.value === "sensor") {
              this.device.writable = false;
              this.device.allowedStates = null;
              this.device.defaultState = null;
              this.device.kind = null;
              (_a = this.device).sample ?? (_a.sample = { periodMs: 1e3, deadband: 0 });
              (_b = this.device).display ?? (_b.display = { precision: 0 });
            } else {
              this.device.writable = true;
              delete this.device.sample;
              delete this.device.display;
            }
          }
          if (e6.detail.path === "io.bus") {
            const bus = e6.detail.value;
            if (bus === "gpio")
              this.device.io = { bus: "gpio", pin: 0, address: null, channel: null };
            if (bus === "i2c")
              this.device.io = {
                bus: "i2c",
                pin: null,
                address: "0x40",
                channel: null
              };
            if (bus === "adc")
              this.device.io = { bus: "adc", pin: null, address: null, channel: 0 };
          }
          if (e6.detail.path === "allowedStatesCsv") {
            const arr = String(e6.detail.value).split(",").map((s4) => s4.trim()).filter(Boolean);
            this.device.allowedStates = arr.length ? arr : null;
          }
          this.dirty = true;
          this.revalidate(false);
          this.requestUpdate();
        };
        this.onSave = () => {
          const wasNew = this.mode === "new";
          this.revalidate(true);
          if (this.errors.length) {
            this.log("save blocked: validation errors", this.errors);
            return;
          }
          upsertDevice(this.device);
          this.pristine = structuredClone(this.device);
          this.dirty = false;
          if (!this.tags.includes(this.device.tagNumber)) {
            this.tags = [...this.tags, this.device.tagNumber].sort();
          }
          if (wasNew) {
            this.mode = "edit";
            const url = new URL(window.location.href);
            url.searchParams.set("tag", this.device.tagNumber);
            history.replaceState({}, "", url.toString());
          }
          this.log("saved", this.device.tagNumber);
        };
        this.onReset = () => {
          this.device = structuredClone(this.pristine);
          this.errors = [];
          this.errorsMap = {};
          this.dirty = false;
          this.log("reset to pristine");
        };
        this.onBack = () => {
          if (this.dirty && !confirm("Perubahan belum disimpan. Tetap keluar?"))
            return;
          window.history.back();
        };
      }
      // Tailwind dari global, jadi pakai light DOM
      createRenderRoot() {
        return this;
      }
      /* ====== LOGGER (aman meski console di-trim) ====== */
      log(...args) {
        window.__tvdbg__ = window.__tvdbg__ || [];
        window.__tvdbg__.push(args);
        console.warn("[page-device-config]", ...args);
      }
      /* ====== LIFECYCLE ====== */
      async connectedCallback() {
        super.connectedCallback();
        this._debug = new URL(window.location.href).searchParams.get("debug") === "1";
        this.setAttribute("data-connected", (/* @__PURE__ */ new Date()).toISOString());
        window.dispatchEvent(
          new CustomEvent("taniverse:cc", {
            detail: { who: "page-device-config", ts: Date.now() }
          })
        );
        this.log("connectedCallback() CALLED | href=", location.href);
        const list = await loadDevices();
        this.tags = Array.from(new Set(list.map((d3) => d3.tagNumber))).filter(Boolean).sort();
        this.log("step#1 loadDevices \u2192", { count: list.length, tags: this.tags });
        const url = new URL(window.location.href);
        const tabParam = url.searchParams.get("tab") || sessionStorage.getItem(this.TAB_KEY) || "general";
        this.activeTab = ["general", "hw-comm", "loc-meta"].includes(
          tabParam
        ) ? tabParam : "general";
        this.log("step#2 activeTab \u2192", this.activeTab);
        const tagParam = url.searchParams.get("tag");
        const picked = tagParam && this.tags.includes(tagParam) ? tagParam : this.tags[0] ?? "";
        this.log(
          "step#3 picked tag \u2192",
          picked || "(none)",
          "(from url:",
          tagParam,
          ")"
        );
        const found = picked ? list.find((d3) => d3.tagNumber === picked) : void 0;
        this.log(
          "step#4 found? \u2192",
          !!found,
          found ? { tag: found.tagNumber, type: found.type } : null
        );
        if (found) {
          this.mode = "edit";
          this.device = structuredClone(found);
          this.pristine = structuredClone(found);
          url.searchParams.set("tag", picked);
          history.replaceState({}, "", url.toString());
          this.revalidate(false);
          this.log("step#5 SET EDIT with", this.device.tagNumber);
          return;
        }
        this.mode = "new";
        this.device = this.newTemplate();
        this.pristine = structuredClone(this.device);
        this.revalidate(false);
        this.log("step#5 SET NEW (no devices available)");
      }
      disconnectedCallback() {
        window.removeEventListener("beforeunload", this.beforeUnload);
        super.disconnectedCallback();
      }
      /* ====== HELPERS ====== */
      newTemplate() {
        const now = (/* @__PURE__ */ new Date()).toISOString();
        return {
          tagNumber: "",
          type: "sensor",
          description: "",
          unit: "",
          ranges: { low: 0, high: 100 },
          alarms: { low: null, high: null },
          kind: null,
          allowedStates: null,
          defaultState: null,
          writable: false,
          io: { bus: "adc", pin: null, address: null, channel: 0 },
          mqtt: { topic: "", readCmd: null, writeCmd: null },
          sample: { periodMs: 1e3, deadband: 0 },
          display: { precision: 0 },
          location: { area: "", position: "" },
          meta: { createdAt: now, updatedAt: now }
        };
      }
      patch(obj, path, value) {
        if (path === "allowedStatesCsv") return;
        const keys = path.split(".");
        let ref = obj;
        for (let i5 = 0; i5 < keys.length - 1; i5++) {
          const k2 = keys[i5];
          ref[k2] = { ...ref[k2] ?? {} };
          ref = ref[k2];
        }
        ref[keys[keys.length - 1]] = value;
      }
      revalidate(_strict) {
        const errs = validateDevice(this.device, this.mode === "new");
        this.errors = errs;
        this.errorsMap = {};
        for (const e6 of errs)
          if (!this.errorsMap[e6.field]) this.errorsMap[e6.field] = e6.message;
      }
      fieldTab(path) {
        if (path.startsWith("io.") || path.startsWith("mqtt.")) return "hw-comm";
        if (path.startsWith("location.") || path.startsWith("meta."))
          return "loc-meta";
        return "general";
      }
      errorsByTab() {
        const by = {
          general: 0,
          "hw-comm": 0,
          "loc-meta": 0
        };
        for (const e6 of this.errors) by[this.fieldTab(e6.field)]++;
        return by;
      }
      /** Kelas Tailwind untuk tombol segmented control */
      btnCls(active) {
        const base = "relative px-3 md:px-4 py-1.5 rounded-md text-sm font-medium transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2";
        const on = "bg-white text-slate-900 shadow ring-1 ring-slate-200";
        const off = "text-slate-600 hover:text-slate-900 hover:bg-white/60";
        return `${base} ${active ? on : off}`;
      }
      /* ====== RENDER ====== */
      render() {
        if (!this.device) return null;
        const badges = this.errorsByTab();
        return x`
      <section class="max-w-6xl mx-auto">
        ${this._debug ? x` <div
              class="m-2 p-2 text-xs rounded border border-amber-300 bg-amber-50 text-amber-800"
            >
              <div>
                <b>DBG</b> mode=<code>${this.mode}</code>,
                tags=${this.tags.length}, current=<code
                  >${this.device?.tagNumber ?? "-"}</code
                >
              </div>
            </div>` : null}

        <!-- Mode switch: segmented control -->
        <div class="flex items-center justify-between px-2 py-3">
          <div
            class="inline-flex items-center gap-1 rounded-lg bg-slate-100/80 p-1 shadow-inner ring-1 ring-slate-200"
            role="group"
            aria-label="Switch form mode"
          >
            <!-- EDIT button -->
            <button
              class="${this.btnCls(this.mode === "edit")}"
              aria-pressed="${this.mode === "edit"}"
              title="Edit device yang sudah ada"
              @click=${() => this.onChangeMode("edit")}
            >
              <span class="inline-flex items-center gap-2">
                <span aria-hidden="true">✏️</span>
                <span>Edit</span>
              </span>
              ${this.mode === "edit" ? x`
                    <span
                      class="absolute -bottom-1.5 left-2 right-2 h-0.5 rounded bg-indigo-500"
                    ></span>
                  ` : null}
            </button>

            <!-- NEW button -->
            <button
              class="${this.btnCls(this.mode === "new")}"
              aria-pressed="${this.mode === "new"}"
              title="Buat device baru"
              @click=${() => this.onChangeMode("new")}
            >
              <span class="inline-flex items-center gap-2">
                <span aria-hidden="true">🆕</span>
                <span>New</span>
              </span>
              ${this.mode === "new" ? x`
                    <span
                      class="absolute -bottom-1.5 left-2 right-2 h-0.5 rounded bg-indigo-500"
                    ></span>
                  ` : null}
            </button>
          </div>

          <!-- status mode kecil di kanan (opsional, kesan “tech”) -->
          <div class="hidden md:flex items-center gap-2 text-xs text-slate-500">
            <span
              class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 ring-1 ring-slate-200"
            >
              <span
                class="w-1.5 h-1.5 rounded-full ${this.mode === "edit" ? "bg-emerald-500" : "bg-indigo-500"}"
              ></span>
              Mode: <code class="font-mono">${this.mode}</code>
            </span>
          </div>
        </div>

        <ui-tabs
          .tabs=${[
          { id: "general", label: "General", icon: "\u{1F9FE}" },
          { id: "hw-comm", label: "H/W & Comm", icon: "\u{1F50C}" },
          { id: "loc-meta", label: "Lokasi & Metadata", icon: "\u{1F4CD}" }
        ]}
          .active=${this.activeTab}
          .badges=${badges}
          @dev-tab-change=${this.onTabChange}
        >
        </ui-tabs>

        <div class="bg-white border border-slate-200 rounded-b-md p-2 md:p-4">
          ${this.activeTab === "general" ? x`
                <dev-config-general
                  .model=${this.device}
                  .errors=${this.errorsMap}
                  .mode=${this.mode}
                  .tags=${this.tags}
                  @dev-field-change=${this.onFieldChange}
                  @dev-tag-picked=${this.onTagPicked}
                >
                </dev-config-general>
              ` : this.activeTab === "hw-comm" ? x`
                <dev-config-hw-comm
                  .model=${this.device}
                  .errors=${this.errorsMap}
                  @dev-field-change=${this.onFieldChange}
                >
                </dev-config-hw-comm>
              ` : x`
                <dev-config-loc-meta
                  .model=${this.device}
                  @dev-field-change=${this.onFieldChange}
                >
                </dev-config-loc-meta>
              `}
        </div>

        <div
          class="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-slate-200 mt-4 p-3 flex gap-2 justify-end"
        >
          <button
            class="px-3 py-2 rounded bg-slate-100 hover:bg-slate-200"
            @click=${this.onBack}
          >
            Kembali
          </button>
          <button
            class="px-3 py-2 rounded bg-amber-100 hover:bg-amber-200"
            @click=${this.onReset}
          >
            Cancel
          </button>
          <button
            class="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            @click=${this.onSave}
          >
            Save
          </button>
          ${this.dirty ? x`<span class="self-center text-xs text-amber-600"
                >unsaved changes…</span
              >` : null}
        </div>
      </section>
    `;
      }
    };
    __decorateClass([
      r5()
    ], PageDeviceConfig.prototype, "device", 2);
    __decorateClass([
      r5()
    ], PageDeviceConfig.prototype, "pristine", 2);
    __decorateClass([
      r5()
    ], PageDeviceConfig.prototype, "errors", 2);
    __decorateClass([
      r5()
    ], PageDeviceConfig.prototype, "errorsMap", 2);
    __decorateClass([
      r5()
    ], PageDeviceConfig.prototype, "activeTab", 2);
    __decorateClass([
      r5()
    ], PageDeviceConfig.prototype, "mode", 2);
    __decorateClass([
      r5()
    ], PageDeviceConfig.prototype, "tags", 2);
    __decorateClass([
      r5()
    ], PageDeviceConfig.prototype, "dirty", 2);
    __decorateClass([
      r5()
    ], PageDeviceConfig.prototype, "_debug", 2);
    PageDeviceConfig = __decorateClass([
      t3("page-device-config")
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

// src/components/app-shell.ts
init_lit();
init_decorators();

// src/components/app-header.ts
init_lit();
init_decorators();

// src/components/app-nav.ts
init_lit();
init_decorators();
var AppNav = class extends i4 {
  constructor() {
    super(...arguments);
    this.currentPath = "/";
    this.menuOpen = false;
  }
  createRenderRoot() {
    return this;
  }
  isActive(path) {
    return this.currentPath.endsWith(path) ? "bg-green-300 text-green-900 rounded px-2 py-1" : "hover:bg-green-200 rounded px-2 py-1";
  }
  _navigate(e6) {
    e6.preventDefault();
    const target = e6.currentTarget;
    const path = target.getAttribute("href");
    this.menuOpen = false;
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
        href="/histori"
        @click=${this._navigate}
        class=${this.isActive("histori")}
        >📈 Histori</a
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
AppNav = __decorateClass([
  t3("app-nav")
], AppNav);

// src/components/user-info.ts
init_lit();
init_decorators();
var UserInfo = class extends i4 {
  constructor() {
    super(...arguments);
    this.username = "Guest";
    this.avatarUrl = "";
    this.isLoggedIn = false;
    this.open = false;
    this._toggle = (e6) => {
      e6?.stopPropagation();
      this.open = !this.open;
    };
    this._onOutsideClick = (e6) => {
      if (!this.open) return;
      const path = e6.composedPath();
      if (!path.includes(this)) this.open = false;
    };
    this._onKeydown = (e6) => {
      if (!this.open) return;
      if (e6.key === "Escape") this.open = false;
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
    const avatar = this.avatarUrl ? x`<img
          src="${this.avatarUrl}"
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
            >${this.username}</span
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
                ${this.isLoggedIn ? x`
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
  n4({ type: String })
], UserInfo.prototype, "username", 2);
__decorateClass([
  n4({ type: String })
], UserInfo.prototype, "avatarUrl", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UserInfo.prototype, "isLoggedIn", 2);
__decorateClass([
  r5()
], UserInfo.prototype, "open", 2);
UserInfo = __decorateClass([
  t3("user-info")
], UserInfo);

// src/components/app-header.ts
var AppHeader = class extends i4 {
  constructor() {
    super(...arguments);
    this.currentPath = window.location.pathname;
    this.username = "Guest";
    this.avatarUrl = "";
    this.isLoggedIn = false;
  }
  // pakai light DOM agar Tailwind/Global CSS tetap nempel
  createRenderRoot() {
    return this;
  }
  _onNavChanged(e6) {
    this.dispatchEvent(
      new CustomEvent("nav-changed", {
        detail: e6.detail,
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
  render() {
    return x`
      <header
        class="w-full sticky top-0 z-50 bg-green-100 shadow-sm backdrop-blur border-b"
      >
        <div class="mx-auto px-4 flex items-center justify-between">
          <!-- Kiri: Navigation -->
          <app-nav
            class="flex-grow"
            .currentPath=${this.currentPath}
            @nav-changed=${this._onNavChanged}
          ></app-nav>

          <!-- Kanan: User Login Info -->
          <user-info
            .username=${this.username}
            .avatarUrl=${this.avatarUrl}
            .isLoggedIn=${this.isLoggedIn}
            @login-click=${() => this._forward("login-click")}
            @logout-click=${() => this._forward("logout-click")}
            @profile-click=${() => this._forward("profile-click")}
          ></user-info>
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
AppHeader = __decorateClass([
  t3("app-header")
], AppHeader);

// src/components/app-footer.ts
init_lit();
init_decorators();
var AppFooter = class extends i4 {
  createRenderRoot() {
    return this;
  }
  render() {
    return x`
      <footer
        class="fixed bottom-0 left-0 w-full border-t border-slate-200 bg-white z-50"
      >
        <div
          class="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between text-sm text-slate-600"
        >
          <div>
            © ${(/* @__PURE__ */ new Date()).getFullYear()} Taniverse. All rights reserved.
          </div>
          <div class="flex items-center gap-4">
            <a
              class="hover:underline"
              href="https://github.com/slametsampon/taniverse"
              target="_blank"
              rel="noreferrer"
              >GitHub</a
            >
            <a class="hover:underline" href="/about">About</a>
          </div>
        </div>
      </footer>
    `;
  }
};
AppFooter = __decorateClass([
  t3("app-footer")
], AppFooter);

// src/components/app-main.ts
init_lit();
init_decorators();

// ../node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i5 = 0;
  while (i5 < str.length) {
    var char = str[i5];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i5, value: str[i5++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i5++, value: str[i5++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i5, value: str[i5++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i5, value: str[i5++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j2 = i5 + 1;
      while (j2 < str.length) {
        var code = str.charCodeAt(j2);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j2++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i5));
      tokens.push({ type: "NAME", index: i5, value: name });
      i5 = j2;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j2 = i5 + 1;
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
        throw new TypeError("Unbalanced pattern at ".concat(i5));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i5));
      tokens.push({ type: "PATTERN", index: i5, value: pattern });
      i5 = j2;
      continue;
    }
    tokens.push({ type: "CHAR", index: i5, value: str[i5++] });
  }
  tokens.push({ type: "END", index: i5, value: "" });
  return tokens;
}
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i5 = 0;
  var path = "";
  var tryConsume = function(type) {
    if (i5 < tokens.length && tokens[i5].type === type)
      return tokens[i5++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i5], nextType = _a2.type, index = _a2.index;
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
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
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
  while (i5 < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
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
        name: name || key++,
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
  var _a = options.encode, encode = _a === void 0 ? function(x2) {
    return x2;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path = "";
    for (var i5 = 0; i5 < tokens.length; i5++) {
      var token = tokens[i5];
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
          if (validate && !matches[i5].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i5].test(segment)) {
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
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x2) {
    return x2;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
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
function isString(s4) {
  return typeof s4 === "string";
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
  for (let i5 = 1; i5 < m2.length; i5++) {
    const key = regexp.keys[i5 - 1];
    const prop = key.name;
    const value = m2[i5];
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
      for (let i5 = context.chain.length - 1; i5 >= 0; i5--) {
        if (context.chain[i5].route === route.parent) {
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
    const self = this;
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
        __privateSet(self, _context, currentContext);
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
  const name = route.name ?? cacheKeyProvider?.(route);
  if (name) {
    if (routesByName.has(name)) {
      routesByName.get(name)?.push(route);
    } else {
      routesByName.set(name, [route]);
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
  const cache2 = /* @__PURE__ */ new Map();
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
    let cached = route.fullPath ? cache2.get(route.fullPath) : void 0;
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
      cache2.set(fullPath, cached);
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
  } catch (e6) {
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
    } catch (e6) {
      console.log("vaadin-development-mode-detector: uncommentAndRun() failed", e6);
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
  const name = getComputedStyle(elem).getPropertyValue("animation-name");
  return name && name !== "none";
};
var waitForAnimation = (elem, cb) => {
  const listener = () => {
    elem.removeEventListener("animationend", listener);
    cb();
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
function getNormalizedNodeName(e6) {
  if (!(e6 instanceof Element)) {
    return void 0;
  }
  return e6.nodeName.toLowerCase();
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
  for (let i5 = 0; i5 < path.length; i5++) {
    const target = path[i5];
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
  urlForName(name, params) {
    if (!__privateGet(this, _urlForName)) {
      __privateSet(this, _urlForName, generateUrls_default(this, {
        cacheKeyProvider(route) {
          return "component" in route && typeof route.component === "string" ? route.component : void 0;
        }
      }));
    }
    return getPathnameForRouter(__privateGet(this, _urlForName).call(this, name, params ?? void 0), this);
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
    for (let i5 = 0; i5 < Math.min(previousChain.length, newChain.length); newContext.__divergedChainIndex++, i5++) {
      if (previousChain[i5].route !== newChain[i5].route || previousChain[i5].path !== newChain[i5].path && previousChain[i5].element !== newChain[i5].element || !__privateMethod(this, _Router_instances, isReusableElement_fn).call(this, previousChain[i5].element, newChain[i5].element)) {
        break;
      }
    }
    newContext.__skipAttach = // Same route chain
    newChain.length === previousChain.length && newContext.__divergedChainIndex === newChain.length && // Same element
    __privateMethod(this, _Router_instances, isReusableElement_fn).call(this, newContext.result, previousContext.result);
    if (newContext.__skipAttach) {
      for (let i5 = newChain.length - 1; i5 >= 0; i5--) {
        callbacks = __privateMethod(this, _Router_instances, runOnBeforeLeaveCallbacks_fn).call(this, callbacks, newContext, { prevent }, previousChain[i5]);
      }
      for (let i5 = 0; i5 < newChain.length; i5++) {
        callbacks = __privateMethod(this, _Router_instances, runOnBeforeEnterCallbacks_fn).call(this, callbacks, newContext, {
          prevent,
          redirect
        }, newChain[i5]);
        previousChain[i5].element.location = createLocation(newContext, previousChain[i5].route);
      }
    } else {
      for (let i5 = previousChain.length - 1; i5 >= newContext.__divergedChainIndex; i5--) {
        callbacks = __privateMethod(this, _Router_instances, runOnBeforeLeaveCallbacks_fn).call(this, callbacks, newContext, { prevent }, previousChain[i5]);
      }
    }
  }
  if (!newContext.__skipAttach) {
    for (let i5 = 0; i5 < newChain.length; i5++) {
      if (i5 < newContext.__divergedChainIndex) {
        if (i5 < previousChain.length && previousChain[i5].element) {
          previousChain[i5].element.location = createLocation(newContext, previousChain[i5].route);
        }
      } else {
        callbacks = __privateMethod(this, _Router_instances, runOnBeforeEnterCallbacks_fn).call(this, callbacks, newContext, {
          prevent,
          redirect
        }, newChain[i5]);
        if (newChain[i5].element) {
          newChain[i5].element.location = createLocation(newContext, newChain[i5].route);
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
  for (let i5 = 0; i5 < (context.__divergedChainIndex ?? 0); i5++) {
    const unchangedElement = previousContext?.chain?.[i5].element;
    if (unchangedElement) {
      if (unchangedElement.parentNode === deepestCommonParent) {
        context.chain[i5].element = unchangedElement;
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
    (e6) => __privateGet(this, _addedByRouter).has(e6) && // Do not remove the result element to avoid flickering
    e6 !== context.result
  ));
  let parentElement = deepestCommonParent;
  for (let i5 = context.__divergedChainIndex ?? 0; i5 < (context.chain?.length ?? 0); i5++) {
    const elementToAdd = context.chain[i5].element;
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
  for (let i5 = targetContext.chain.length - 1; i5 >= currentContext.__divergedChainIndex; i5--) {
    if (!__privateMethod(this, _Router_instances, isLatestRender_fn).call(this, currentContext)) {
      break;
    }
    const currentComponent = targetContext.chain[i5].element;
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
  for (let i5 = currentContext.__divergedChainIndex; i5 < currentContext.chain.length; i5++) {
    if (!__privateMethod(this, _Router_instances, isLatestRender_fn).call(this, currentContext)) {
      break;
    }
    const currentComponent = currentContext.chain[i5].element;
    if (currentComponent) {
      const location2 = createLocation(currentContext, currentContext.chain[i5].route);
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
  for (let i5 = chain.length - 1; i5 >= 0; i5--) {
    if (chain[i5].route.animate) {
      config = chain[i5].route.animate;
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

// src/components/app-main.ts
init_auth_service();

// src/pages/home.ts
init_lit();
init_decorators();

// src/components/feature-card.ts
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
        <header>
          <h1 class="text-2xl font-bold text-green-800 mb-2">
            🌿 Selamat Datang di TaniVerse
          </h1>
          <p class="text-gray-700">
            TaniVerse adalah platform monitoring dan kontrol berbasis IoT untuk
            sistem pertanian cerdas di berbagai sektor.
          </p>
        </header>

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

// src/components/app-main.ts
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
        path: "/histori",
        // operator+ bisa
        action: async (ctx, commands) => {
          const g2 = requireRoleAtLeast("operator")(ctx, commands);
          if (g2) return g2;
          await Promise.resolve().then(() => (init_histori(), histori_exports));
        },
        component: "page-histori"
      },
      {
        path: "/config",
        // minimal engineer (admin juga boleh)
        action: async (ctx, commands) => {
          const g2 = requireRoleAtLeast("engineer")(ctx, commands);
          if (g2) return g2;
          await Promise.resolve().then(() => (init_device_config(), device_config_exports));
        },
        component: "page-device-config"
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
      <main class="max-w-7xl mx-auto px-4 py-6 pb-16">
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

// src/components/app-shell.ts
init_auth_service();
var AppShell = class extends i4 {
  constructor() {
    super(...arguments);
    // Tentukan basePath untuk local dan GitHub Pages
    this.basePath = window.location.hostname === "127.0.0.1" ? "/" : "/taniverse/";
    this.currentPath = window.location.pathname;
    this._onPopState = () => {
      this.currentPath = window.location.pathname;
    };
    // Dari app-header: { detail: { path: '/dashboard' } }
    this._onNavChanged = (e6) => {
      const rawPath = e6.detail.path.replace(/^\/+/, "");
      const target = `/${rawPath}`;
      this.appMainEl?.navigate(target);
    };
    // Event dari user-info (dikirim lewat app-header)
    this._onLoginClick = () => this.appMainEl?.navigate("/login");
    this._onLogoutClick = () => {
      AuthService.logout();
      this.appMainEl?.navigate("/");
      this.requestUpdate();
    };
    this._onProfileClick = () => this.appMainEl?.navigate("/dashboard");
    // Event dari page-login
    this._onNavigateTo = (e6) => this.appMainEl?.navigate(e6.detail.path);
    this._onAuthChanged = () => this.requestUpdate();
  }
  // gunakan light DOM agar Tailwind global tetap berlaku
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("popstate", this._onPopState);
  }
  disconnectedCallback() {
    window.removeEventListener("popstate", this._onPopState);
    super.disconnectedCallback();
  }
  render() {
    return x`
      <app-header
        .currentPath=${this.currentPath}
        .username=${AuthService.getUser()?.username ?? "Guest"}
        .avatarUrl=${AuthService.getUser()?.avatarUrl ?? ""}
        .isLoggedIn=${AuthService.isLoggedIn()}
        @nav-changed=${this._onNavChanged}
        @login-click=${this._onLoginClick}
        @logout-click=${this._onLogoutClick}
        @profile-click=${this._onProfileClick}
      >
      </app-header>

      <app-main
        .basePath=${this.basePath}
        @route-changed=${(ev) => {
      this.currentPath = ev.detail.path;
    }}
        @navigate-to=${this._onNavigateTo}
        @auth-changed=${this._onAuthChanged}
      >
      </app-main>

      <app-footer></app-footer>
    `;
  }
};
__decorateClass([
  r5()
], AppShell.prototype, "currentPath", 2);
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
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
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
