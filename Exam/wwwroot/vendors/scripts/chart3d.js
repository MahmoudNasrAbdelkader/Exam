﻿/*
 Highcharts JS v10.3.3 (2023-01-20)

 3D features for Highcharts JS

 License: www.highcharts.com/license
*/
(function (a) { "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/highcharts-3d", ["highcharts"], function (D) { a(D); a.Highcharts = D; return a }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function (a) {
    function D(a, y, r, F) { a.hasOwnProperty(y) || (a[y] = F.apply(null, r), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", { detail: { path: y, module: a[y] } }))) } a = a ? a._modules : {}; D(a, "Core/Math3D.js",
        [a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, y) {
            function r(n, f, k, c) {
                var b = f.options.chart.options3d, a = m(c, k ? f.inverted : !1), g = { x: f.plotWidth / 2, y: f.plotHeight / 2, z: b.depth / 2, vd: m(b.depth, 1) * m(b.viewDistance, 0) }, C = f.scale3d || 1; c = G * b.beta * (a ? -1 : 1); b = G * b.alpha * (a ? -1 : 1); var q = Math.cos(b), t = Math.cos(-c), z = Math.sin(b), v = Math.sin(-c); k || (g.x += f.plotLeft, g.y += f.plotTop); return n.map(function (b) {
                    var f = (a ? b.y : b.x) - g.x; var c = (a ? b.x : b.y) - g.y; b = (b.z || 0) - g.z; f = {
                        x: t * f - v * b, y: -z * v * f + q * c - t * z * b, z: q * v * f + z * c +
                            q * t * b
                    }; c = A(f, g, g.vd); c.x = c.x * C + g.x; c.y = c.y * C + g.y; c.z = f.z * C + g.z; return { x: a ? c.y : c.x, y: a ? c.x : c.y, z: c.z }
                })
            } function A(a, f, k) { f = 0 < k && k < Number.POSITIVE_INFINITY ? k / (a.z + f.z + k) : 1; return { x: a.x * f, y: a.y * f } } function n(a) { var f = 0, k; for (k = 0; k < a.length; k++) { var c = (k + 1) % a.length; f += a[k].x * a[c].y - a[c].x * a[k].y } return f / 2 } var G = a.deg2rad, m = y.pick; return {
                perspective: r, perspective3D: A, pointCameraDistance: function (a, f) {
                    var k = f.options.chart.options3d, c = f.plotWidth / 2; f = f.plotHeight / 2; k = m(k.depth, 1) * m(k.viewDistance, 0) +
                        k.depth; return Math.sqrt(Math.pow(c - m(a.plotX, a.x), 2) + Math.pow(f - m(a.plotY, a.y), 2) + Math.pow(k - m(a.plotZ, a.z), 2))
                }, shapeArea: n, shapeArea3D: function (a, f, k) { return n(r(a, f, k)) }
            }
        }); D(a, "Core/Renderer/SVG/SVGElement3D.js", [a["Core/Color/Color.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]], function (a, y, r) {
            var A = a.parse, n = r.defined; a = r.merge; var G = r.objectEach, m = r.pick, z = {
                base: {
                    initArgs: function (f) {
                        var a = this, c = a.renderer, b = c[a.pathType + "Path"](f), n = b.zIndexes; a.parts.forEach(function (g) {
                            var f =
                                { "class": "highcharts-3d-" + g, zIndex: n[g] || 0 }; c.styledMode && ("top" === g ? f.filter = "url(#highcharts-brighter)" : "side" === g && (f.filter = "url(#highcharts-darker)")); a[g] = c.path(b[g]).attr(f).add(a)
                        }); a.attr({ "stroke-linejoin": "round", zIndex: n.group }); a.originalDestroy = a.destroy; a.destroy = a.destroyParts; a.forcedSides = b.forcedSides
                    }, singleSetterForParts: function (a, n, c, b, l, g) {
                        var f = {}; b = [null, null, b || "attr", l, g]; var q = c && c.zIndexes; c ? (q && q.group && this.attr({ zIndex: q.group }), G(c, function (b, g) {
                            f[g] = {}; f[g][a] =
                                b; q && (f[g].zIndex = c.zIndexes[g] || 0)
                        }), b[1] = f) : (f[a] = n, b[0] = f); return this.processParts.apply(this, b)
                    }, processParts: function (a, n, c, b, l) { var g = this; g.parts.forEach(function (f) { n && (a = m(n[f], !1)); if (!1 !== a) g[f][c](a, b, l) }); return g }, destroyParts: function () { this.processParts(null, null, "destroy"); return this.originalDestroy() }
                }
            }; z.cuboid = a(z.base, {
                parts: ["front", "top", "side"], pathType: "cuboid", attr: function (a, k, c, b) {
                    if ("string" === typeof a && "undefined" !== typeof k) { var f = a; a = {}; a[f] = k } return a.shapeArgs ||
                        n(a.x) ? this.singleSetterForParts("d", null, this.renderer[this.pathType + "Path"](a.shapeArgs || a)) : y.prototype.attr.call(this, a, void 0, c, b)
                }, animate: function (a, k, c) { if (n(a.x) && n(a.y)) { a = this.renderer[this.pathType + "Path"](a); var b = a.forcedSides; this.singleSetterForParts("d", null, a, "animate", k, c); this.attr({ zIndex: a.zIndexes.group }); b !== this.forcedSides && (this.forcedSides = b, this.renderer.styledMode || z.cuboid.fillSetter.call(this, this.fill)) } else y.prototype.animate.call(this, a, k, c); return this }, fillSetter: function (a) {
                    this.forcedSides =
                    this.forcedSides || []; this.singleSetterForParts("fill", null, { front: a, top: A(a).brighten(0 <= this.forcedSides.indexOf("top") ? 0 : .1).get(), side: A(a).brighten(0 <= this.forcedSides.indexOf("side") ? 0 : -.1).get() }); this.color = this.fill = a; return this
                }
            }); return z
        }); D(a, "Core/Renderer/SVG/SVGRenderer3D.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Math3D.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Renderer/SVG/SVGElement3D.js"], a["Core/Renderer/SVG/SVGRenderer.js"],
        a["Core/Utilities.js"]], function (a, y, r, F, n, G, m, z) {
            var f = this && this.__extends || function () { var a = function (h, b) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, e) { a.__proto__ = e } || function (a, e) { for (var u in e) e.hasOwnProperty(u) && (a[u] = e[u]) }; return a(h, b) }; return function (h, b) { function g() { this.constructor = h } a(h, b); h.prototype = null === b ? Object.create(b) : (g.prototype = b.prototype, new g) } }(), k = a.animObject, c = y.parse, b = r.charts, l = r.deg2rad, g = F.perspective, C = F.shapeArea, q = z.defined, t = z.extend,
            x = z.merge, v = z.pick, A = Math.cos, E = Math.sin, I = Math.PI, N = 4 * (Math.sqrt(2) - 1) / 3 / (I / 2); return function (a) {
                function h() { return null !== a && a.apply(this, arguments) || this } f(h, a); h.compose = function (a) { a = a.prototype; var b = h.prototype; a.elements3d = G; a.arc3d = b.arc3d; a.arc3dPath = b.arc3dPath; a.cuboid = b.cuboid; a.cuboidPath = b.cuboidPath; a.element3d = b.element3d; a.face3d = b.face3d; a.polyhedron = b.polyhedron; a.toLinePath = b.toLinePath; a.toLineSegments = b.toLineSegments }; h.curveTo = function (a, b, e, u, d, p, w, B) {
                    var h = [], g = p - d; return p >
                        d && p - d > Math.PI / 2 + .0001 ? (h = h.concat(this.curveTo(a, b, e, u, d, d + Math.PI / 2, w, B)), h = h.concat(this.curveTo(a, b, e, u, d + Math.PI / 2, p, w, B))) : p < d && d - p > Math.PI / 2 + .0001 ? (h = h.concat(this.curveTo(a, b, e, u, d, d - Math.PI / 2, w, B)), h = h.concat(this.curveTo(a, b, e, u, d - Math.PI / 2, p, w, B))) : [["C", a + e * Math.cos(d) - e * N * g * Math.sin(d) + w, b + u * Math.sin(d) + u * N * g * Math.cos(d) + B, a + e * Math.cos(p) + e * N * g * Math.sin(p) + w, b + u * Math.sin(p) - u * N * g * Math.cos(p) + B, a + e * Math.cos(p) + w, b + u * Math.sin(p) + B]]
                }; h.prototype.toLinePath = function (a, b) {
                    var e = []; a.forEach(function (a) {
                        e.push(["L",
                            a.x, a.y])
                    }); a.length && (e[0][0] = "M", b && e.push(["Z"])); return e
                }; h.prototype.toLineSegments = function (a) { var b = [], e = !0; a.forEach(function (a) { b.push(e ? ["M", a.x, a.y] : ["L", a.x, a.y]); e = !e }); return b }; h.prototype.face3d = function (a) {
                    var h = this, e = this.createElement("path"); e.vertexes = []; e.insidePlotArea = !1; e.enabled = !0; e.attr = function (e) {
                        if ("object" === typeof e && (q(e.enabled) || q(e.vertexes) || q(e.insidePlotArea))) {
                            this.enabled = v(e.enabled, this.enabled); this.vertexes = v(e.vertexes, this.vertexes); this.insidePlotArea =
                                v(e.insidePlotArea, this.insidePlotArea); delete e.enabled; delete e.vertexes; delete e.insidePlotArea; var d = g(this.vertexes, b[h.chartIndex], this.insidePlotArea), p = h.toLinePath(d, !0); d = C(d); e.d = p; e.visibility = this.enabled && 0 < d ? "inherit" : "hidden"
                        } return n.prototype.attr.apply(this, arguments)
                    }; e.animate = function (e) {
                        if ("object" === typeof e && (q(e.enabled) || q(e.vertexes) || q(e.insidePlotArea))) {
                            this.enabled = v(e.enabled, this.enabled); this.vertexes = v(e.vertexes, this.vertexes); this.insidePlotArea = v(e.insidePlotArea,
                                this.insidePlotArea); delete e.enabled; delete e.vertexes; delete e.insidePlotArea; var d = g(this.vertexes, b[h.chartIndex], this.insidePlotArea), p = h.toLinePath(d, !0); d = C(d); d = this.enabled && 0 < d ? "visible" : "hidden"; e.d = p; this.attr("visibility", d)
                        } return n.prototype.animate.apply(this, arguments)
                    }; return e.attr(a)
                }; h.prototype.polyhedron = function (a) {
                    var b = this, e = this.g(), h = e.destroy; this.styledMode || e.attr({ "stroke-linejoin": "round" }); e.faces = []; e.destroy = function () {
                        for (var d = 0; d < e.faces.length; d++)e.faces[d].destroy();
                        return h.call(this)
                    }; e.attr = function (d, p, a, h) { if ("object" === typeof d && q(d.faces)) { for (; e.faces.length > d.faces.length;)e.faces.pop().destroy(); for (; e.faces.length < d.faces.length;)e.faces.push(b.face3d().add(e)); for (var w = 0; w < d.faces.length; w++)b.styledMode && delete d.faces[w].fill, e.faces[w].attr(d.faces[w], null, a, h); delete d.faces } return n.prototype.attr.apply(this, arguments) }; e.animate = function (d, p, a) {
                        if (d && d.faces) {
                            for (; e.faces.length > d.faces.length;)e.faces.pop().destroy(); for (; e.faces.length < d.faces.length;)e.faces.push(b.face3d().add(e));
                            for (var w = 0; w < d.faces.length; w++)e.faces[w].animate(d.faces[w], p, a); delete d.faces
                        } return n.prototype.animate.apply(this, arguments)
                    }; return e.attr(a)
                }; h.prototype.element3d = function (a, b) { var e = this.g(); t(e, this.elements3d[a]); e.initArgs(b); return e }; h.prototype.cuboid = function (a) { return this.element3d("cuboid", a) }; h.prototype.cuboidPath = function (a) {
                    function h(e) {
                        return 0 === w && 1 < e && 6 > e ? { x: H[e].x, y: H[e].y + 10, z: H[e].z } : H[0].x === H[7].x && 4 <= e ? { x: H[e].x + 10, y: H[e].y, z: H[e].z } : 0 === c && 2 > e || 5 < e ? {
                            x: H[e].x, y: H[e].y,
                            z: H[e].z + 10
                        } : H[e]
                    } function e(e) { return H[e] } var u = a.x || 0, d = a.y || 0, p = a.z || 0, w = a.height || 0, B = a.width || 0, c = a.depth || 0, f = b[this.chartIndex], n = f.options.chart.options3d.alpha, q = 0, H = [{ x: u, y: d, z: p }, { x: u + B, y: d, z: p }, { x: u + B, y: d + w, z: p }, { x: u, y: d + w, z: p }, { x: u, y: d + w, z: p + c }, { x: u + B, y: d + w, z: p + c }, { x: u + B, y: d, z: p + c }, { x: u, y: d, z: p + c }], k = []; H = g(H, f, a.insidePlotArea); var M = function (d, a, p) {
                        var w = [[], -1], b = d.map(e), u = a.map(e); d = d.map(h); a = a.map(h); 0 > C(b) ? w = [b, 0] : 0 > C(u) ? w = [u, 1] : p && (k.push(p), w = 0 > C(d) ? [b, 0] : 0 > C(a) ? [u, 1] : [b, 0]);
                        return w
                    }; var l = M([3, 2, 1, 0], [7, 6, 5, 4], "front"); a = l[0]; var K = l[1]; l = M([1, 6, 7, 0], [4, 5, 2, 3], "top"); B = l[0]; var t = l[1]; l = M([1, 2, 5, 6], [0, 7, 4, 3], "side"); M = l[0]; l = l[1]; 1 === l ? q += 1E6 * (f.plotWidth - u) : l || (q += 1E6 * u); q += 10 * (!t || 0 <= n && 180 >= n || 360 > n && 357.5 < n ? f.plotHeight - d : 10 + d); 1 === K ? q += 100 * p : K || (q += 100 * (1E3 - p)); return { front: this.toLinePath(a, !0), top: this.toLinePath(B, !0), side: this.toLinePath(M, !0), zIndexes: { group: Math.round(q) }, forcedSides: k, isFront: K, isTop: t }
                }; h.prototype.arc3d = function (a) {
                    function b(e) {
                        var a =
                            !1, p = {}, b; e = x(e); for (b in e) -1 !== d.indexOf(b) && (p[b] = e[b], delete e[b], a = !0); return a ? [p, e] : !1
                    } var e = this.g(), h = e.renderer, d = "x y r innerR start end depth".split(" "); a = x(a); a.alpha = (a.alpha || 0) * l; a.beta = (a.beta || 0) * l; e.top = h.path(); e.side1 = h.path(); e.side2 = h.path(); e.inn = h.path(); e.out = h.path(); e.onAdd = function () { var d = e.parentGroup, a = e.attr("class"); e.top.add(e);["out", "inn", "side1", "side2"].forEach(function (p) { e[p].attr({ "class": a + " highcharts-3d-side" }).add(d) }) };["addClass", "removeClass"].forEach(function (d) {
                        e[d] =
                        function () { var a = arguments;["top", "out", "inn", "side1", "side2"].forEach(function (p) { e[p][d].apply(e[p], a) }) }
                    }); e.setPaths = function (d) { var a = e.renderer.arc3dPath(d), p = 100 * a.zTop; e.attribs = d; e.top.attr({ d: a.top, zIndex: a.zTop }); e.inn.attr({ d: a.inn, zIndex: a.zInn }); e.out.attr({ d: a.out, zIndex: a.zOut }); e.side1.attr({ d: a.side1, zIndex: a.zSide1 }); e.side2.attr({ d: a.side2, zIndex: a.zSide2 }); e.zIndex = p; e.attr({ zIndex: p }); d.center && (e.top.setRadialReference(d.center), delete d.center) }; e.setPaths(a); e.fillSetter =
                        function (e) { var d = c(e).brighten(-.1).get(); this.fill = e; this.side1.attr({ fill: d }); this.side2.attr({ fill: d }); this.inn.attr({ fill: d }); this.out.attr({ fill: d }); this.top.attr({ fill: e }); return this };["opacity", "translateX", "translateY", "visibility"].forEach(function (d) { e[d + "Setter"] = function (d, a) { e[a] = d;["out", "inn", "side1", "side2", "top"].forEach(function (p) { e[p].attr(a, d) }) } }); e.attr = function (d) {
                            var a; if ("object" === typeof d && (a = b(d))) { var p = a[0]; arguments[0] = a[1]; t(e.attribs, p); e.setPaths(e.attribs) } return n.prototype.attr.apply(e,
                                arguments)
                        }; e.animate = function (d, a, h) {
                            var p = this.attribs, u = "data-" + Math.random().toString(26).substring(2, 9); delete d.center; delete d.z; delete d.alpha; delete d.beta; var w = k(v(a, this.renderer.globalAnimation)); if (w.duration) { a = b(d); e[u] = 0; d[u] = 1; e[u + "Setter"] = r.noop; if (a) { var B = a[0]; w.step = function (d, e) { function a(d) { return p[d] + (v(B[d], p[d]) - p[d]) * e.pos } e.prop === u && e.elem.setPaths(x(p, { x: a("x"), y: a("y"), r: a("r"), innerR: a("innerR"), start: a("start"), end: a("end"), depth: a("depth") })) } } a = w } return n.prototype.animate.call(this,
                                d, a, h)
                        }; e.destroy = function () { this.top.destroy(); this.out.destroy(); this.inn.destroy(); this.side1.destroy(); this.side2.destroy(); return n.prototype.destroy.call(this) }; e.hide = function () { this.top.hide(); this.out.hide(); this.inn.hide(); this.side1.hide(); this.side2.hide() }; e.show = function (d) { this.top.show(d); this.out.show(d); this.inn.show(d); this.side1.show(d); this.side2.show(d) }; return e
                }; h.prototype.arc3dPath = function (a) {
                    function b(d) { d %= 2 * Math.PI; d > Math.PI && (d = 2 * Math.PI - d); return d } var e = a.x || 0, u =
                        a.y || 0, d = a.start || 0, p = (a.end || 0) - .00001, w = a.r || 0, B = a.innerR || 0, g = a.depth || 0, c = a.alpha || 0, f = a.beta || 0, n = Math.cos(d), q = Math.sin(d); a = Math.cos(p); var k = Math.sin(p), l = w * Math.cos(f); w *= Math.cos(c); var t = B * Math.cos(f), v = B * Math.cos(c); B = g * Math.sin(f); var m = g * Math.sin(c); g = [["M", e + l * n, u + w * q]]; g = g.concat(h.curveTo(e, u, l, w, d, p, 0, 0)); g.push(["L", e + t * a, u + v * k]); g = g.concat(h.curveTo(e, u, t, v, p, d, 0, 0)); g.push(["Z"]); var C = 0 < f ? Math.PI / 2 : 0; f = 0 < c ? 0 : Math.PI / 2; C = d > -C ? d : p > -C ? -C : d; var x = p < I - f ? p : d < I - f ? I - f : p, z = 2 * I - f; c = [["M",
                            e + l * A(C), u + w * E(C)]]; c = c.concat(h.curveTo(e, u, l, w, C, x, 0, 0)); p > z && d < z ? (c.push(["L", e + l * A(x) + B, u + w * E(x) + m]), c = c.concat(h.curveTo(e, u, l, w, x, z, B, m)), c.push(["L", e + l * A(z), u + w * E(z)]), c = c.concat(h.curveTo(e, u, l, w, z, p, 0, 0)), c.push(["L", e + l * A(p) + B, u + w * E(p) + m]), c = c.concat(h.curveTo(e, u, l, w, p, z, B, m)), c.push(["L", e + l * A(z), u + w * E(z)]), c = c.concat(h.curveTo(e, u, l, w, z, x, 0, 0))) : p > I - f && d < I - f && (c.push(["L", e + l * Math.cos(x) + B, u + w * Math.sin(x) + m]), c = c.concat(h.curveTo(e, u, l, w, x, p, B, m)), c.push(["L", e + l * Math.cos(p), u + w * Math.sin(p)]),
                                c = c.concat(h.curveTo(e, u, l, w, p, x, 0, 0))); c.push(["L", e + l * Math.cos(x) + B, u + w * Math.sin(x) + m]); c = c.concat(h.curveTo(e, u, l, w, x, C, B, m)); c.push(["Z"]); f = [["M", e + t * n, u + v * q]]; f = f.concat(h.curveTo(e, u, t, v, d, p, 0, 0)); f.push(["L", e + t * Math.cos(p) + B, u + v * Math.sin(p) + m]); f = f.concat(h.curveTo(e, u, t, v, p, d, B, m)); f.push(["Z"]); n = [["M", e + l * n, u + w * q], ["L", e + l * n + B, u + w * q + m], ["L", e + t * n + B, u + v * q + m], ["L", e + t * n, u + v * q], ["Z"]]; e = [["M", e + l * a, u + w * k], ["L", e + l * a + B, u + w * k + m], ["L", e + t * a + B, u + v * k + m], ["L", e + t * a, u + v * k], ["Z"]]; k = Math.atan2(m,
                                    -B); u = Math.abs(p + k); a = Math.abs(d + k); d = Math.abs((d + p) / 2 + k); u = b(u); a = b(a); d = b(d); d *= 1E5; p = 1E5 * a; u *= 1E5; return { top: g, zTop: 1E5 * Math.PI + 1, out: c, zOut: Math.max(d, p, u), inn: f, zInn: Math.max(d, p, u), side1: n, zSide1: .99 * u, side2: e, zSide2: .99 * p }
                }; return h
            }(m)
        }); D(a, "Core/Chart/Chart3D.js", [a["Core/Color/Color.js"], a["Core/Defaults.js"], a["Core/Math3D.js"], a["Core/Utilities.js"]], function (a, y, r, F) {
            var n = a.parse, A = y.defaultOptions, m = r.perspective, z = r.shapeArea3D, f = F.addEvent, k = F.isArray, c = F.merge, b = F.pick, l = F.wrap,
            g; (function (a) {
                function g(a) { this.is3d() && "scatter" === a.options.type && (a.options.type = "scatter3d") } function t() {
                    if (this.chart3d && this.is3d()) {
                        var a = this.renderer, b = this.options.chart.options3d, d = this.chart3d.get3dFrame(), p = this.plotLeft, h = this.plotLeft + this.plotWidth, g = this.plotTop, c = this.plotTop + this.plotHeight; b = b.depth; var f = p - (d.left.visible ? d.left.size : 0), l = h + (d.right.visible ? d.right.size : 0), q = g - (d.top.visible ? d.top.size : 0), k = c + (d.bottom.visible ? d.bottom.size : 0), t = 0 - (d.front.visible ? d.front.size :
                            0), m = b + (d.back.visible ? d.back.size : 0), v = this.hasRendered ? "animate" : "attr"; this.chart3d.frame3d = d; this.frameShapes || (this.frameShapes = { bottom: a.polyhedron().add(), top: a.polyhedron().add(), left: a.polyhedron().add(), right: a.polyhedron().add(), back: a.polyhedron().add(), front: a.polyhedron().add() }); this.frameShapes.bottom[v]({
                                "class": "highcharts-3d-frame highcharts-3d-frame-bottom", zIndex: d.bottom.frontFacing ? -1E3 : 1E3, faces: [{
                                    fill: n(d.bottom.color).brighten(.1).get(), vertexes: [{ x: f, y: k, z: t }, { x: l, y: k, z: t },
                                    { x: l, y: k, z: m }, { x: f, y: k, z: m }], enabled: d.bottom.visible
                                }, { fill: n(d.bottom.color).brighten(.1).get(), vertexes: [{ x: p, y: c, z: b }, { x: h, y: c, z: b }, { x: h, y: c, z: 0 }, { x: p, y: c, z: 0 }], enabled: d.bottom.visible }, { fill: n(d.bottom.color).brighten(-.1).get(), vertexes: [{ x: f, y: k, z: t }, { x: f, y: k, z: m }, { x: p, y: c, z: b }, { x: p, y: c, z: 0 }], enabled: d.bottom.visible && !d.left.visible }, { fill: n(d.bottom.color).brighten(-.1).get(), vertexes: [{ x: l, y: k, z: m }, { x: l, y: k, z: t }, { x: h, y: c, z: 0 }, { x: h, y: c, z: b }], enabled: d.bottom.visible && !d.right.visible }, {
                                    fill: n(d.bottom.color).get(),
                                    vertexes: [{ x: l, y: k, z: t }, { x: f, y: k, z: t }, { x: p, y: c, z: 0 }, { x: h, y: c, z: 0 }], enabled: d.bottom.visible && !d.front.visible
                                }, { fill: n(d.bottom.color).get(), vertexes: [{ x: f, y: k, z: m }, { x: l, y: k, z: m }, { x: h, y: c, z: b }, { x: p, y: c, z: b }], enabled: d.bottom.visible && !d.back.visible }]
                            }); this.frameShapes.top[v]({
                                "class": "highcharts-3d-frame highcharts-3d-frame-top", zIndex: d.top.frontFacing ? -1E3 : 1E3, faces: [{ fill: n(d.top.color).brighten(.1).get(), vertexes: [{ x: f, y: q, z: m }, { x: l, y: q, z: m }, { x: l, y: q, z: t }, { x: f, y: q, z: t }], enabled: d.top.visible },
                                { fill: n(d.top.color).brighten(.1).get(), vertexes: [{ x: p, y: g, z: 0 }, { x: h, y: g, z: 0 }, { x: h, y: g, z: b }, { x: p, y: g, z: b }], enabled: d.top.visible }, { fill: n(d.top.color).brighten(-.1).get(), vertexes: [{ x: f, y: q, z: m }, { x: f, y: q, z: t }, { x: p, y: g, z: 0 }, { x: p, y: g, z: b }], enabled: d.top.visible && !d.left.visible }, { fill: n(d.top.color).brighten(-.1).get(), vertexes: [{ x: l, y: q, z: t }, { x: l, y: q, z: m }, { x: h, y: g, z: b }, { x: h, y: g, z: 0 }], enabled: d.top.visible && !d.right.visible }, {
                                    fill: n(d.top.color).get(), vertexes: [{ x: f, y: q, z: t }, { x: l, y: q, z: t }, {
                                        x: h, y: g,
                                        z: 0
                                    }, { x: p, y: g, z: 0 }], enabled: d.top.visible && !d.front.visible
                                }, { fill: n(d.top.color).get(), vertexes: [{ x: l, y: q, z: m }, { x: f, y: q, z: m }, { x: p, y: g, z: b }, { x: h, y: g, z: b }], enabled: d.top.visible && !d.back.visible }]
                            }); this.frameShapes.left[v]({
                                "class": "highcharts-3d-frame highcharts-3d-frame-left", zIndex: d.left.frontFacing ? -1E3 : 1E3, faces: [{ fill: n(d.left.color).brighten(.1).get(), vertexes: [{ x: f, y: k, z: t }, { x: p, y: c, z: 0 }, { x: p, y: c, z: b }, { x: f, y: k, z: m }], enabled: d.left.visible && !d.bottom.visible }, {
                                    fill: n(d.left.color).brighten(.1).get(),
                                    vertexes: [{ x: f, y: q, z: m }, { x: p, y: g, z: b }, { x: p, y: g, z: 0 }, { x: f, y: q, z: t }], enabled: d.left.visible && !d.top.visible
                                }, { fill: n(d.left.color).brighten(-.1).get(), vertexes: [{ x: f, y: k, z: m }, { x: f, y: q, z: m }, { x: f, y: q, z: t }, { x: f, y: k, z: t }], enabled: d.left.visible }, { fill: n(d.left.color).brighten(-.1).get(), vertexes: [{ x: p, y: g, z: b }, { x: p, y: c, z: b }, { x: p, y: c, z: 0 }, { x: p, y: g, z: 0 }], enabled: d.left.visible }, { fill: n(d.left.color).get(), vertexes: [{ x: f, y: k, z: t }, { x: f, y: q, z: t }, { x: p, y: g, z: 0 }, { x: p, y: c, z: 0 }], enabled: d.left.visible && !d.front.visible },
                                { fill: n(d.left.color).get(), vertexes: [{ x: f, y: q, z: m }, { x: f, y: k, z: m }, { x: p, y: c, z: b }, { x: p, y: g, z: b }], enabled: d.left.visible && !d.back.visible }]
                            }); this.frameShapes.right[v]({
                                "class": "highcharts-3d-frame highcharts-3d-frame-right", zIndex: d.right.frontFacing ? -1E3 : 1E3, faces: [{ fill: n(d.right.color).brighten(.1).get(), vertexes: [{ x: l, y: k, z: m }, { x: h, y: c, z: b }, { x: h, y: c, z: 0 }, { x: l, y: k, z: t }], enabled: d.right.visible && !d.bottom.visible }, {
                                    fill: n(d.right.color).brighten(.1).get(), vertexes: [{ x: l, y: q, z: t }, { x: h, y: g, z: 0 }, {
                                        x: h,
                                        y: g, z: b
                                    }, { x: l, y: q, z: m }], enabled: d.right.visible && !d.top.visible
                                }, { fill: n(d.right.color).brighten(-.1).get(), vertexes: [{ x: h, y: g, z: 0 }, { x: h, y: c, z: 0 }, { x: h, y: c, z: b }, { x: h, y: g, z: b }], enabled: d.right.visible }, { fill: n(d.right.color).brighten(-.1).get(), vertexes: [{ x: l, y: k, z: t }, { x: l, y: q, z: t }, { x: l, y: q, z: m }, { x: l, y: k, z: m }], enabled: d.right.visible }, { fill: n(d.right.color).get(), vertexes: [{ x: l, y: q, z: t }, { x: l, y: k, z: t }, { x: h, y: c, z: 0 }, { x: h, y: g, z: 0 }], enabled: d.right.visible && !d.front.visible }, {
                                    fill: n(d.right.color).get(),
                                    vertexes: [{ x: l, y: k, z: m }, { x: l, y: q, z: m }, { x: h, y: g, z: b }, { x: h, y: c, z: b }], enabled: d.right.visible && !d.back.visible
                                }]
                            }); this.frameShapes.back[v]({
                                "class": "highcharts-3d-frame highcharts-3d-frame-back", zIndex: d.back.frontFacing ? -1E3 : 1E3, faces: [{ fill: n(d.back.color).brighten(.1).get(), vertexes: [{ x: l, y: k, z: m }, { x: f, y: k, z: m }, { x: p, y: c, z: b }, { x: h, y: c, z: b }], enabled: d.back.visible && !d.bottom.visible }, {
                                    fill: n(d.back.color).brighten(.1).get(), vertexes: [{ x: f, y: q, z: m }, { x: l, y: q, z: m }, { x: h, y: g, z: b }, { x: p, y: g, z: b }], enabled: d.back.visible &&
                                        !d.top.visible
                                }, { fill: n(d.back.color).brighten(-.1).get(), vertexes: [{ x: f, y: k, z: m }, { x: f, y: q, z: m }, { x: p, y: g, z: b }, { x: p, y: c, z: b }], enabled: d.back.visible && !d.left.visible }, { fill: n(d.back.color).brighten(-.1).get(), vertexes: [{ x: l, y: q, z: m }, { x: l, y: k, z: m }, { x: h, y: c, z: b }, { x: h, y: g, z: b }], enabled: d.back.visible && !d.right.visible }, { fill: n(d.back.color).get(), vertexes: [{ x: p, y: g, z: b }, { x: h, y: g, z: b }, { x: h, y: c, z: b }, { x: p, y: c, z: b }], enabled: d.back.visible }, {
                                    fill: n(d.back.color).get(), vertexes: [{ x: f, y: k, z: m }, { x: l, y: k, z: m },
                                    { x: l, y: q, z: m }, { x: f, y: q, z: m }], enabled: d.back.visible
                                }]
                            }); this.frameShapes.front[v]({
                                "class": "highcharts-3d-frame highcharts-3d-frame-front", zIndex: d.front.frontFacing ? -1E3 : 1E3, faces: [{ fill: n(d.front.color).brighten(.1).get(), vertexes: [{ x: f, y: k, z: t }, { x: l, y: k, z: t }, { x: h, y: c, z: 0 }, { x: p, y: c, z: 0 }], enabled: d.front.visible && !d.bottom.visible }, { fill: n(d.front.color).brighten(.1).get(), vertexes: [{ x: l, y: q, z: t }, { x: f, y: q, z: t }, { x: p, y: g, z: 0 }, { x: h, y: g, z: 0 }], enabled: d.front.visible && !d.top.visible }, {
                                    fill: n(d.front.color).brighten(-.1).get(),
                                    vertexes: [{ x: f, y: q, z: t }, { x: f, y: k, z: t }, { x: p, y: c, z: 0 }, { x: p, y: g, z: 0 }], enabled: d.front.visible && !d.left.visible
                                }, { fill: n(d.front.color).brighten(-.1).get(), vertexes: [{ x: l, y: k, z: t }, { x: l, y: q, z: t }, { x: h, y: g, z: 0 }, { x: h, y: c, z: 0 }], enabled: d.front.visible && !d.right.visible }, { fill: n(d.front.color).get(), vertexes: [{ x: h, y: g, z: 0 }, { x: p, y: g, z: 0 }, { x: p, y: c, z: 0 }, { x: h, y: c, z: 0 }], enabled: d.front.visible }, { fill: n(d.front.color).get(), vertexes: [{ x: l, y: k, z: t }, { x: f, y: k, z: t }, { x: f, y: q, z: t }, { x: l, y: q, z: t }], enabled: d.front.visible }]
                            })
                    }
                }
                function x() { this.styledMode && [{ name: "darker", slope: .6 }, { name: "brighter", slope: 1.4 }].forEach(function (a) { this.renderer.definition({ tagName: "filter", attributes: { id: "highcharts-" + a.name }, children: [{ tagName: "feComponentTransfer", children: [{ tagName: "feFuncR", attributes: { type: "linear", slope: a.slope } }, { tagName: "feFuncG", attributes: { type: "linear", slope: a.slope } }, { tagName: "feFuncB", attributes: { type: "linear", slope: a.slope } }] }] }) }, this) } function v() {
                    var a = this.options; this.is3d() && (a.series || []).forEach(function (e) {
                        "scatter" ===
                        (e.type || a.chart.type || a.chart.defaultSeriesType) && (e.type = "scatter3d")
                    })
                } function C() {
                    var a = this.options.chart.options3d; if (this.chart3d && this.is3d()) {
                        a && (a.alpha = a.alpha % 360 + (0 <= a.alpha ? 0 : 360), a.beta = a.beta % 360 + (0 <= a.beta ? 0 : 360)); var b = this.inverted, d = this.clipBox, h = this.margin; d[b ? "y" : "x"] = -(h[3] || 0); d[b ? "x" : "y"] = -(h[0] || 0); d[b ? "height" : "width"] = this.chartWidth + (h[3] || 0) + (h[1] || 0); d[b ? "width" : "height"] = this.chartHeight + (h[0] || 0) + (h[2] || 0); this.scale3d = 1; !0 === a.fitToPlot && (this.scale3d = this.chart3d.getScale(a.depth));
                        this.chart3d.frame3d = this.chart3d.get3dFrame()
                    }
                } function E() { this.is3d() && (this.isDirtyBox = !0) } function r() { this.chart3d && this.is3d() && (this.chart3d.frame3d = this.chart3d.get3dFrame()) } function y() { this.chart3d || (this.chart3d = new L(this)) } function O(a) { return this.is3d() || a.apply(this, [].slice.call(arguments, 1)) } function h(a) { var e = this.series.length; if (this.is3d()) for (; e--;)a = this.series[e], a.translate(), a.render(); else a.call(this) } function K(a) {
                    a.apply(this, [].slice.call(arguments, 1)); this.is3d() &&
                        (this.container.className += " highcharts-3d-chart")
                } var L = function () {
                    function a(a) { this.frame3d = void 0; this.chart = a } a.prototype.get3dFrame = function () {
                        var a = this.chart, d = a.options.chart.options3d, e = d.frame, h = a.plotLeft, g = a.plotLeft + a.plotWidth, c = a.plotTop, f = a.plotTop + a.plotHeight, l = d.depth, q = function (d) { d = z(d, a); return .5 < d ? 1 : -.5 > d ? -1 : 0 }, k = q([{ x: h, y: f, z: l }, { x: g, y: f, z: l }, { x: g, y: f, z: 0 }, { x: h, y: f, z: 0 }]), t = q([{ x: h, y: c, z: 0 }, { x: g, y: c, z: 0 }, { x: g, y: c, z: l }, { x: h, y: c, z: l }]), n = q([{ x: h, y: c, z: 0 }, { x: h, y: c, z: l }, {
                            x: h,
                            y: f, z: l
                        }, { x: h, y: f, z: 0 }]), v = q([{ x: g, y: c, z: l }, { x: g, y: c, z: 0 }, { x: g, y: f, z: 0 }, { x: g, y: f, z: l }]), x = q([{ x: h, y: f, z: 0 }, { x: g, y: f, z: 0 }, { x: g, y: c, z: 0 }, { x: h, y: c, z: 0 }]); q = q([{ x: h, y: c, z: l }, { x: g, y: c, z: l }, { x: g, y: f, z: l }, { x: h, y: f, z: l }]); var L = !1, C = !1, E = !1, A = !1;[].concat(a.xAxis, a.yAxis, a.zAxis).forEach(function (a) { a && (a.horiz ? a.opposite ? C = !0 : L = !0 : a.opposite ? A = !0 : E = !0) }); var r = function (a, d, e) {
                            for (var h = ["size", "color", "visible"], g = {}, c = 0; c < h.length; c++)for (var f = h[c], l = 0; l < a.length; l++)if ("object" === typeof a[l]) {
                                var q = a[l][f];
                                if ("undefined" !== typeof q && null !== q) { g[f] = q; break }
                            } a = e; !0 === g.visible || !1 === g.visible ? a = g.visible : "auto" === g.visible && (a = 0 < d); return { size: b(g.size, 1), color: b(g.color, "none"), frontFacing: 0 < d, visible: a }
                        }; e = { axes: {}, bottom: r([e.bottom, e.top, e], k, L), top: r([e.top, e.bottom, e], t, C), left: r([e.left, e.right, e.side, e], n, E), right: r([e.right, e.left, e.side, e], v, A), back: r([e.back, e.front, e], q, !0), front: r([e.front, e.back, e], x, !1) }; "auto" === d.axisLabelPosition ? (v = function (a, d) {
                            return a.visible !== d.visible || a.visible &&
                                d.visible && a.frontFacing !== d.frontFacing
                        }, d = [], v(e.left, e.front) && d.push({ y: (c + f) / 2, x: h, z: 0, xDir: { x: 1, y: 0, z: 0 } }), v(e.left, e.back) && d.push({ y: (c + f) / 2, x: h, z: l, xDir: { x: 0, y: 0, z: -1 } }), v(e.right, e.front) && d.push({ y: (c + f) / 2, x: g, z: 0, xDir: { x: 0, y: 0, z: 1 } }), v(e.right, e.back) && d.push({ y: (c + f) / 2, x: g, z: l, xDir: { x: -1, y: 0, z: 0 } }), k = [], v(e.bottom, e.front) && k.push({ x: (h + g) / 2, y: f, z: 0, xDir: { x: 1, y: 0, z: 0 } }), v(e.bottom, e.back) && k.push({ x: (h + g) / 2, y: f, z: l, xDir: { x: -1, y: 0, z: 0 } }), t = [], v(e.top, e.front) && t.push({
                            x: (h + g) / 2, y: c, z: 0,
                            xDir: { x: 1, y: 0, z: 0 }
                        }), v(e.top, e.back) && t.push({ x: (h + g) / 2, y: c, z: l, xDir: { x: -1, y: 0, z: 0 } }), n = [], v(e.bottom, e.left) && n.push({ z: (0 + l) / 2, y: f, x: h, xDir: { x: 0, y: 0, z: -1 } }), v(e.bottom, e.right) && n.push({ z: (0 + l) / 2, y: f, x: g, xDir: { x: 0, y: 0, z: 1 } }), f = [], v(e.top, e.left) && f.push({ z: (0 + l) / 2, y: c, x: h, xDir: { x: 0, y: 0, z: -1 } }), v(e.top, e.right) && f.push({ z: (0 + l) / 2, y: c, x: g, xDir: { x: 0, y: 0, z: 1 } }), h = function (d, e, h) {
                            if (0 === d.length) return null; if (1 === d.length) return d[0]; for (var b = m(d, a, !1), g = 0, c = 1; c < b.length; c++)h * b[c][e] > h * b[g][e] ? g =
                                c : h * b[c][e] === h * b[g][e] && b[c].z < b[g].z && (g = c); return d[g]
                        }, e.axes = { y: { left: h(d, "x", -1), right: h(d, "x", 1) }, x: { top: h(t, "y", -1), bottom: h(k, "y", 1) }, z: { top: h(f, "y", -1), bottom: h(n, "y", 1) } }) : e.axes = { y: { left: { x: h, z: 0, xDir: { x: 1, y: 0, z: 0 } }, right: { x: g, z: 0, xDir: { x: 0, y: 0, z: 1 } } }, x: { top: { y: c, z: 0, xDir: { x: 1, y: 0, z: 0 } }, bottom: { y: f, z: 0, xDir: { x: 1, y: 0, z: 0 } } }, z: { top: { x: E ? g : h, y: c, xDir: E ? { x: 0, y: 0, z: 1 } : { x: 0, y: 0, z: -1 } }, bottom: { x: E ? g : h, y: f, xDir: E ? { x: 0, y: 0, z: 1 } : { x: 0, y: 0, z: -1 } } } }; return e
                    }; a.prototype.getScale = function (a) {
                        var d =
                            this.chart, e = d.plotLeft, h = d.plotWidth + e, b = d.plotTop, g = d.plotHeight + b, c = e + d.plotWidth / 2, f = b + d.plotHeight / 2, l = Number.MAX_VALUE, q = -Number.MAX_VALUE, k = Number.MAX_VALUE, t = -Number.MAX_VALUE, n = 1; var v = [{ x: e, y: b, z: 0 }, { x: e, y: b, z: a }];[0, 1].forEach(function (a) { v.push({ x: h, y: v[a].y, z: v[a].z }) });[0, 1, 2, 3].forEach(function (a) { v.push({ x: v[a].x, y: g, z: v[a].z }) }); v = m(v, d, !1); v.forEach(function (a) { l = Math.min(l, a.x); q = Math.max(q, a.x); k = Math.min(k, a.y); t = Math.max(t, a.y) }); e > l && (n = Math.min(n, 1 - Math.abs((e + c) / (l + c)) % 1));
                        h < q && (n = Math.min(n, (h - c) / (q - c))); b > k && (n = 0 > k ? Math.min(n, (b + f) / (-k + b + f)) : Math.min(n, 1 - (b + f) / (k + f) % 1)); g < t && (n = Math.min(n, Math.abs((g - f) / (t - f)))); return n
                    }; return a
                }(); a.Composition = L; a.defaultOptions = { chart: { options3d: { enabled: !1, alpha: 0, beta: 0, depth: 100, fitToPlot: !0, viewDistance: 25, axisLabelPosition: null, frame: { visible: "default", size: 1, bottom: {}, top: {}, left: {}, right: {}, back: {}, front: {} } } } }; a.compose = function (e, b) {
                    var d = e.prototype; b = b.prototype; d.is3d = function () {
                        return !(!this.options.chart.options3d ||
                            !this.options.chart.options3d.enabled)
                    }; d.propsRequireDirtyBox.push("chart.options3d"); d.propsRequireUpdateSeries.push("chart.options3d"); b.matrixSetter = function () { if (1 > this.pos && (k(this.start) || k(this.end))) { var a = this.start || [1, 0, 0, 1, 0, 0], d = this.end || [1, 0, 0, 1, 0, 0]; var e = []; for (var h = 0; 6 > h; h++)e.push(this.pos * d[h] + (1 - this.pos) * a[h]) } else e = this.end; this.elem.attr(this.prop, e, null, !0) }; c(!0, A, a.defaultOptions); f(e, "init", y); f(e, "addSeries", g); f(e, "afterDrawChartBox", t); f(e, "afterGetContainer", x);
                    f(e, "afterInit", v); f(e, "afterSetChartSize", C); f(e, "beforeRedraw", E); f(e, "beforeRender", r); l(d, "isInsidePlot", O); l(d, "renderSeries", h); l(d, "setClassName", K)
                }
            })(g || (g = {})); ""; return g
        }); D(a, "Core/Axis/ZAxis.js", [a["Core/Axis/Axis.js"], a["Core/Utilities.js"]], function (a, y) {
            function r(a) { return new c(this, a) } function A() { var a = this, c = this.options.zAxis = f(this.options.zAxis || {}); this.is3d() && (this.zAxis = [], c.forEach(function (b, c) { b.index = c; b.isX = !0; a.addZAxis(b).setScale() })) } var n = this && this.__extends ||
                function () { var a = function (b, c) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, b) { a.__proto__ = b } || function (a, b) { for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]) }; return a(b, c) }; return function (b, c) { function g() { this.constructor = b } a(b, c); b.prototype = null === c ? Object.create(c) : (g.prototype = c.prototype, new g) } }(), G = y.addEvent, m = y.merge, z = y.pick, f = y.splat, k = [], c = function (a) {
                    function b(b, c) { b = a.call(this, b, c) || this; b.isZAxis = !0; return b } n(b, a); b.compose = function (a) {
                        -1 === k.indexOf(a) &&
                        (k.push(a), G(a, "afterGetAxes", A), a = a.prototype, a.addZAxis = r, a.collectionsWithInit.zAxis = [a.addZAxis], a.collectionsWithUpdate.push("zAxis"))
                    }; b.prototype.getSeriesExtremes = function () {
                        var a = this, b = this.chart; this.hasVisibleSeries = !1; this.dataMin = this.dataMax = this.ignoreMinPadding = this.ignoreMaxPadding = void 0; this.stacking && this.stacking.buildStacks(); this.series.forEach(function (c) {
                            if (c.visible || !b.options.chart.ignoreHiddenSeries) a.hasVisibleSeries = !0, c = c.zData, c.length && (a.dataMin = Math.min(z(a.dataMin,
                                c[0]), Math.min.apply(null, c)), a.dataMax = Math.max(z(a.dataMax, c[0]), Math.max.apply(null, c)))
                        })
                    }; b.prototype.setAxisSize = function () { var b = this.chart; a.prototype.setAxisSize.call(this); this.width = this.len = b.options.chart.options3d && b.options.chart.options3d.depth || 0; this.right = b.chartWidth - this.width - this.left }; b.prototype.setOptions = function (b) { b = m({ offset: 0, lineWidth: 0 }, b); this.isZAxis = !0; a.prototype.setOptions.call(this, b); this.coll = "zAxis" }; return b
                }(a); return c
        }); D(a, "Core/Axis/Axis3DDefaults.js",
            [], function () { return { labels: { position3d: "offset", skew3d: !1 }, title: { position3d: null, skew3d: null } } }); D(a, "Core/Axis/Tick3DComposition.js", [a["Core/Utilities.js"]], function (a) {
                function A(a) { var f = this.axis.axis3D; f && n(a.pos, f.fix3dPosition(a.pos)) } function r(a) { var f = this.axis.axis3D, k = a.apply(this, [].slice.call(arguments, 1)); if (f) { var c = k[0], b = k[1]; if ("M" === c[0] && "L" === b[0]) return f = [f.fix3dPosition({ x: c[1], y: c[2], z: 0 }), f.fix3dPosition({ x: b[1], y: b[2], z: 0 })], this.axis.chart.renderer.toLineSegments(f) } return k }
                var F = a.addEvent, n = a.extend, G = a.wrap, m = []; return { compose: function (a) { -1 === m.indexOf(a) && (m.push(a), F(a, "afterGetLabelPosition", A), G(a.prototype, "getMarkPath", r)) } }
            }); D(a, "Core/Axis/Axis3DComposition.js", [a["Core/Axis/Axis3DDefaults.js"], a["Core/Globals.js"], a["Core/Math3D.js"], a["Core/Axis/Tick3DComposition.js"], a["Core/Utilities.js"]], function (a, y, r, F, n) {
                function A() {
                    var a = this.chart, b = this.options; a.is3d && a.is3d() && "colorAxis" !== this.coll && (b.tickWidth = J(b.tickWidth, 0), b.gridLineWidth = J(b.gridLineWidth,
                        1))
                } function m(a) { this.chart.is3d() && "colorAxis" !== this.coll && a.point && (a.point.crosshairPos = this.isXAxis ? a.point.axisXpos : this.len - a.point.axisYpos) } function z() { this.axis3D || (this.axis3D = new D(this)) } function f(a) { return this.chart.is3d() && "colorAxis" !== this.coll ? [] : a.apply(this, [].slice.call(arguments, 1)) } function k(a) {
                    if (!this.chart.is3d() || "colorAxis" === this.coll) return a.apply(this, [].slice.call(arguments, 1)); var b = arguments, c = b[2], f = []; b = this.getPlotLinePath({ value: b[1] }); c = this.getPlotLinePath({ value: c });
                    if (b && c) for (var e = 0; e < b.length; e += 2) { var g = b[e], d = b[e + 1], l = c[e], k = c[e + 1]; "M" === g[0] && "L" === d[0] && "M" === l[0] && "L" === k[0] && f.push(g, d, k, ["L", l[1], l[2]], ["Z"]) } return f
                } function c(a) {
                    var b = this.axis3D, c = this.chart, f = a.apply(this, [].slice.call(arguments, 1)); if ("colorAxis" === this.coll || !c.chart3d || !c.is3d() || null === f) return f; var e = c.options.chart.options3d, g = this.isZAxis ? c.plotWidth : e.depth; e = c.chart3d.frame3d; var d = f[0], l = f[1]; f = []; "M" === d[0] && "L" === l[0] && (b = [b.swapZ({ x: d[1], y: d[2], z: 0 }), b.swapZ({
                        x: d[1],
                        y: d[2], z: g
                    }), b.swapZ({ x: l[1], y: l[2], z: 0 }), b.swapZ({ x: l[1], y: l[2], z: g })], this.horiz ? (this.isZAxis ? (e.left.visible && f.push(b[0], b[2]), e.right.visible && f.push(b[1], b[3])) : (e.front.visible && f.push(b[0], b[2]), e.back.visible && f.push(b[1], b[3])), e.top.visible && f.push(b[0], b[1]), e.bottom.visible && f.push(b[2], b[3])) : (e.front.visible && f.push(b[0], b[2]), e.back.visible && f.push(b[1], b[3]), e.left.visible && f.push(b[0], b[1]), e.right.visible && f.push(b[2], b[3])), f = C(f, this.chart, !1)); return c.renderer.toLineSegments(f)
                }
                function b(a, b) {
                    var c = this.chart, h = this.ticks, e = this.gridGroup; if (this.categories && c.frameShapes && c.is3d() && e && b && b.label) {
                        e = e.element.childNodes[0].getBBox(); var f = c.frameShapes.left.getBBox(), d = c.options.chart.options3d; c = { x: c.plotWidth / 2, y: c.plotHeight / 2, z: d.depth / 2, vd: J(d.depth, 1) * J(d.viewDistance, 0) }; d = b.pos; var g = h[d - 1], l = h[d + 1], k = h = void 0; 0 !== d && g && g.label && g.label.xy && (h = q({ x: g.label.xy.x, y: g.label.xy.y, z: null }, c, c.vd)); l && l.label && l.label.xy && (k = q({ x: l.label.xy.x, y: l.label.xy.y, z: null }, c,
                            c.vd)); d = { x: b.label.xy.x, y: b.label.xy.y, z: null }; d = q(d, c, c.vd); return Math.abs(h ? d.x - h.x : k ? k.x - d.x : e.x - f.x)
                    } return a.apply(this, [].slice.call(arguments, 1))
                } function l(a) { var b = a.apply(this, [].slice.call(arguments, 1)); return this.axis3D ? this.axis3D.fix3dPosition(b, !0) : b } var g = y.deg2rad, C = r.perspective, q = r.perspective3D, t = r.shapeArea, x = n.addEvent, v = n.merge, J = n.pick, E = n.wrap, I = [], D = function () {
                    function q(a) { this.axis = a } q.compose = function (h, g) {
                        F.compose(g); -1 === I.indexOf(h) && (I.push(h), v(!0, h.defaultOptions,
                            a), h.keepProps.push("axis3D"), x(h, "init", z), x(h, "afterSetOptions", A), x(h, "drawCrosshair", m), h = h.prototype, E(h, "getLinePath", f), E(h, "getPlotBandPath", k), E(h, "getPlotLinePath", c), E(h, "getSlotWidth", b), E(h, "getTitlePosition", l))
                    }; q.prototype.fix3dPosition = function (a, b) {
                        var c = this.axis, e = c.chart; if ("colorAxis" === c.coll || !e.chart3d || !e.is3d()) return a; var f = g * e.options.chart.options3d.alpha, d = g * e.options.chart.options3d.beta, h = J(b && c.options.title.position3d, c.options.labels.position3d); b = J(b && c.options.title.skew3d,
                            c.options.labels.skew3d); var l = e.chart3d.frame3d, k = e.plotLeft, q = e.plotWidth + k, n = e.plotTop, m = e.plotHeight + n, v = e = 0, x = { x: 0, y: 1, z: 0 }, E = !1; a = c.axis3D.swapZ({ x: a.x, y: a.y, z: 0 }); if (c.isZAxis) if (c.opposite) { if (null === l.axes.z.top) return {}; v = a.y - n; a.x = l.axes.z.top.x; a.y = l.axes.z.top.y; k = l.axes.z.top.xDir; E = !l.top.frontFacing } else { if (null === l.axes.z.bottom) return {}; v = a.y - m; a.x = l.axes.z.bottom.x; a.y = l.axes.z.bottom.y; k = l.axes.z.bottom.xDir; E = !l.bottom.frontFacing } else if (c.horiz) if (c.opposite) {
                                if (null === l.axes.x.top) return {};
                                v = a.y - n; a.y = l.axes.x.top.y; a.z = l.axes.x.top.z; k = l.axes.x.top.xDir; E = !l.top.frontFacing
                            } else { if (null === l.axes.x.bottom) return {}; v = a.y - m; a.y = l.axes.x.bottom.y; a.z = l.axes.x.bottom.z; k = l.axes.x.bottom.xDir; E = !l.bottom.frontFacing } else if (c.opposite) { if (null === l.axes.y.right) return {}; e = a.x - q; a.x = l.axes.y.right.x; a.z = l.axes.y.right.z; k = l.axes.y.right.xDir; k = { x: k.z, y: k.y, z: -k.x } } else { if (null === l.axes.y.left) return {}; e = a.x - k; a.x = l.axes.y.left.x; a.z = l.axes.y.left.z; k = l.axes.y.left.xDir } "chart" !== h && ("flap" ===
                                h ? c.horiz ? (d = Math.sin(f), f = Math.cos(f), c.opposite && (d = -d), E && (d = -d), x = { x: k.z * d, y: f, z: -k.x * d }) : k = { x: Math.cos(d), y: 0, z: Math.sin(d) } : "ortho" === h ? c.horiz ? (x = Math.cos(f), h = Math.sin(d) * x, f = -Math.sin(f), d = -x * Math.cos(d), x = { x: k.y * d - k.z * f, y: k.z * h - k.x * d, z: k.x * f - k.y * h }, f = 1 / Math.sqrt(x.x * x.x + x.y * x.y + x.z * x.z), E && (f = -f), x = { x: f * x.x, y: f * x.y, z: f * x.z }) : k = { x: Math.cos(d), y: 0, z: Math.sin(d) } : c.horiz ? x = { x: Math.sin(d) * Math.sin(f), y: Math.cos(f), z: -Math.cos(d) * Math.sin(f) } : k = { x: Math.cos(d), y: 0, z: Math.sin(d) }); a.x += e * k.x + v *
                                    x.x; a.y += e * k.y + v * x.y; a.z += e * k.z + v * x.z; e = C([a], c.chart)[0]; b && (0 > t(C([a, { x: a.x + k.x, y: a.y + k.y, z: a.z + k.z }, { x: a.x + x.x, y: a.y + x.y, z: a.z + x.z }], c.chart)) && (k = { x: -k.x, y: -k.y, z: -k.z }), a = C([{ x: a.x, y: a.y, z: a.z }, { x: a.x + k.x, y: a.y + k.y, z: a.z + k.z }, { x: a.x + x.x, y: a.y + x.y, z: a.z + x.z }], c.chart), e.matrix = [a[1].x - a[0].x, a[1].y - a[0].y, a[2].x - a[0].x, a[2].y - a[0].y, e.x, e.y], e.matrix[4] -= e.x * e.matrix[0] + e.y * e.matrix[2], e.matrix[5] -= e.x * e.matrix[1] + e.y * e.matrix[3]); return e
                    }; q.prototype.swapZ = function (a, b) {
                        var c = this.axis; return c.isZAxis ?
                            (b = b ? 0 : c.chart.plotLeft, { x: b + a.z, y: a.y, z: a.x - b }) : a
                    }; return q
                }(); return D
            }); D(a, "Core/Series/Series3D.js", [a["Core/Math3D.js"], a["Core/Series/Series.js"], a["Core/Utilities.js"]], function (a, y, r) {
                var A = this && this.__extends || function () {
                    var a = function (c, b) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, b) { a.__proto__ = b } || function (a, b) { for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]) }; return a(c, b) }; return function (c, b) {
                        function f() { this.constructor = c } a(c, b); c.prototype = null === b ? Object.create(b) :
                            (f.prototype = b.prototype, new f)
                    }
                }(), n = a.perspective; a = r.addEvent; var G = r.extend, m = r.merge, z = r.pick, f = r.isNumber; r = function (a) {
                    function c() { return null !== a && a.apply(this, arguments) || this } A(c, a); c.prototype.translate = function () { a.prototype.translate.apply(this, arguments); this.chart.is3d() && this.translate3dPoints() }; c.prototype.translate3dPoints = function () {
                        var a = this.options, c = this.chart, g = z(this.zAxis, c.options.zAxis[0]), k = [], q, t = []; this.zPadding = (a.stacking ? f(a.stack) ? a.stack : 0 : this.index || 0) * (a.depth ||
                            0 + (a.groupZPadding || 1)); for (q = 0; q < this.data.length; q++) { a = this.data[q]; if (g && g.translate) { var m = g.logarithmic && g.val2lin ? g.val2lin(a.z) : a.z; a.plotZ = g.translate(m); a.isInside = a.isInside ? m >= g.min && m <= g.max : !1 } else a.plotZ = this.zPadding; a.axisXpos = a.plotX; a.axisYpos = a.plotY; a.axisZpos = a.plotZ; k.push({ x: a.plotX, y: a.plotY, z: a.plotZ }); t.push(a.plotX || 0) } this.rawPointsX = t; c = n(k, c, !0); for (q = 0; q < this.data.length; q++)a = this.data[q], g = c[q], a.plotX = g.x, a.plotY = g.y, a.plotZ = g.z
                    }; c.defaultOptions = m(y.defaultOptions);
                    return c
                }(y); a(y, "afterTranslate", function () { this.chart.is3d() && this.translate3dPoints() }); G(y.prototype, { translate3dPoints: r.prototype.translate3dPoints }); return r
            }); D(a, "Series/Area3D/Area3DSeries.js", [a["Core/Math3D.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, y, r) {
                function A(a) {
                    var f = a.apply(this, [].slice.call(arguments, 1)); if (!this.chart.is3d()) return f; var c = G.getGraphPath, b = this.options, l = Math.round(this.yAxis.getThreshold(b.threshold)), g = []; if (this.rawPointsX) for (var m =
                        0; m < this.points.length; m++)g.push({ x: this.rawPointsX[m], y: b.stacking ? this.points[m].yBottom : l, z: this.zPadding }); b = this.chart.options.chart.options3d; g = n(g, this.chart, !0).map(function (a) { return { plotX: a.x, plotY: a.y, plotZ: a.z } }); this.group && b && b.depth && b.beta && (this.markerGroup && (this.markerGroup.add(this.group), this.markerGroup.attr({ translateX: 0, translateY: 0 })), this.group.attr({ zIndex: Math.max(1, 270 < b.beta || 90 > b.beta ? b.depth - Math.round(this.zPadding || 0) : Math.round(this.zPadding || 0)) })); g.reversed =
                            !0; c = c.call(this, g, !0, !0); c[0] && "M" === c[0][0] && (c[0] = ["L", c[0][1], c[0][2]]); this.areaPath && (c = this.areaPath.splice(0, this.areaPath.length / 2).concat(c), c.xMap = this.areaPath.xMap, this.areaPath = c); return f
                } var n = a.perspective, G = y.seriesTypes.line.prototype, m = r.wrap, z = []; return { compose: function (a) { -1 === z.indexOf(a) && (z.push(a), m(a.prototype, "getGraphPath", A)) } }
            }); D(a, "Series/Column3D/Column3DComposition.js", [a["Series/Column/ColumnSeries.js"], a["Core/Globals.js"], a["Core/Series/Series.js"], a["Core/Math3D.js"],
            a["Core/Series/SeriesRegistry.js"], a["Core/Axis/Stacking/StackItem.js"], a["Core/Utilities.js"]], function (a, y, r, F, n, G, m) {
                function z(a, b) { var c = a.series, f = { totalStacks: 0 }, g, l = 1; c.forEach(function (a) { g = A(a.options.stack, b ? 0 : c.length - 1 - a.index); f[g] ? f[g].series.push(a) : (f[g] = { series: [a], position: l }, l++) }); f.totalStacks = l + 1; return f } function f(a) {
                    var b = a.apply(this, [].slice.call(arguments, 1)); this.chart.is3d && this.chart.is3d() && (b.stroke = this.options.edgeColor || b.fill, b["stroke-width"] = A(this.options.edgeWidth,
                        1)); return b
                } function k(a, b, c) { var f = this.chart.is3d && this.chart.is3d(); f && (this.options.inactiveOtherPoints = !0); a.call(this, b, c); f && (this.options.inactiveOtherPoints = !1) } function c(a) { for (var b = [], c = 1; c < arguments.length; c++)b[c - 1] = arguments[c]; return this.series.chart.is3d() ? this.graphic && "g" !== this.graphic.element.nodeName : a.apply(this, b) } var b = a.prototype, l = y.svg, g = F.perspective; y = m.addEvent; var A = m.pick; m = m.wrap; m(b, "translate", function (a) {
                    a.apply(this, [].slice.call(arguments, 1)); this.chart.is3d() &&
                        this.translate3dShapes()
                }); m(r.prototype, "justifyDataLabel", function (a) { return arguments[2].outside3dPlot ? !1 : a.apply(this, [].slice.call(arguments, 1)) }); b.translate3dPoints = function () { }; b.translate3dShapes = function () {
                    var a = this, b = a.chart, c = a.options, f = c.depth, l = (c.stacking ? c.stack || 0 : a.index) * (f + (c.groupZPadding || 1)), k = a.borderWidth % 2 ? .5 : 0, n; b.inverted && !a.yAxis.reversed && (k *= -1); !1 !== c.grouping && (l = 0); l += c.groupZPadding || 1; a.data.forEach(function (c) {
                        c.outside3dPlot = null; if (null !== c.y) {
                            var m = c.shapeArgs,
                            h = c.tooltipPos, q;[["x", "width"], ["y", "height"]].forEach(function (b) { q = m[b[0]] - k; 0 > q && (m[b[1]] += m[b[0]] + k, m[b[0]] = -k, q = 0); q + m[b[1]] > a[b[0] + "Axis"].len && 0 !== m[b[1]] && (m[b[1]] = a[b[0] + "Axis"].len - m[b[0]]); if (0 !== m[b[1]] && (m[b[0]] >= a[b[0] + "Axis"].len || m[b[0]] + m[b[1]] <= k)) { for (var e in m) m[e] = "y" === e ? -9999 : 0; c.outside3dPlot = !0 } }); "rect" === c.shapeType && (c.shapeType = "cuboid"); m.z = l; m.depth = f; m.insidePlotArea = !0; n = { x: m.x + m.width / 2, y: m.y, z: l + f / 2 }; b.inverted && (n.x = m.height, n.y = c.clientX); c.plot3d = g([n], b, !0,
                                !1)[0]; h = g([{ x: h[0], y: h[1], z: l + f / 2 }], b, !0, !1)[0]; c.tooltipPos = [h.x, h.y]
                        }
                    }); a.z = l
                }; m(b, "animate", function (a) {
                    if (this.chart.is3d()) {
                        var b = arguments[1], c = this.yAxis, f = this, g = this.yAxis.reversed; l && (b ? f.data.forEach(function (a) { null !== a.y && (a.height = a.shapeArgs.height, a.shapey = a.shapeArgs.y, a.shapeArgs.height = 1, g || (a.shapeArgs.y = a.stackY ? a.plotY + c.translate(a.stackY) : a.plotY + (a.negative ? -a.height : a.height))) }) : (f.data.forEach(function (a) {
                            if (null !== a.y && (a.shapeArgs.height = a.height, a.shapeArgs.y = a.shapey,
                                a.graphic)) a.graphic[a.outside3dPlot ? "attr" : "animate"](a.shapeArgs, f.options.animation)
                        }), this.drawDataLabels()))
                    } else a.apply(this, [].slice.call(arguments, 1))
                }); m(b, "plotGroup", function (a, b, c, f, g, l) {
                    "dataLabelsGroup" !== b && "markerGroup" !== b && this.chart.is3d() && (this[b] && delete this[b], l && (this.chart.columnGroup || (this.chart.columnGroup = this.chart.renderer.g("columnGroup").add(l)), this[b] = this.chart.columnGroup, this.chart.columnGroup.attr(this.getPlotBox()), this[b].survive = !0, "group" === b && (arguments[3] =
                        "visible"))); return a.apply(this, Array.prototype.slice.call(arguments, 1))
                }); m(b, "setVisible", function (a, b) { var c = this; c.chart.is3d() && c.data.forEach(function (a) { a.visible = a.options.visible = b = "undefined" === typeof b ? !A(c.visible, a.visible) : b; c.options.data[c.data.indexOf(a)] = a.options; a.graphic && a.graphic.attr({ visibility: b ? "visible" : "hidden" }) }); a.apply(this, Array.prototype.slice.call(arguments, 1)) }); y(a, "afterInit", function () {
                    if (this.chart.is3d()) {
                        var a = this.options, b = a.grouping, c = a.stacking, f = this.yAxis.options.reversedStacks,
                        g = 0; if ("undefined" === typeof b || b) { b = z(this.chart, c); g = a.stack || 0; for (c = 0; c < b[g].series.length && b[g].series[c] !== this; c++); g = 10 * (b.totalStacks - b[g].position) + (f ? c : -c); this.xAxis.reversed || (g = 10 * b.totalStacks - g) } a.depth = a.depth || 25; this.z = this.z || 0; a.zIndex = g
                    }
                }); m(b, "pointAttribs", f); m(b, "setState", k); m(b.pointClass.prototype, "hasNewShapeType", c); n.seriesTypes.columnRange && (y = n.seriesTypes.columnrange.prototype, m(y, "pointAttribs", f), m(y, "setState", k), m(y.pointClass.prototype, "hasNewShapeType", c), y.plotGroup =
                    b.plotGroup, y.setVisible = b.setVisible); m(r.prototype, "alignDataLabel", function (a, b, c, f, l) {
                        var k = this.chart; f.outside3dPlot = b.outside3dPlot; if (k.is3d() && this.is("column")) { var m = this.options, n = A(f.inside, !!this.options.stacking), q = k.options.chart.options3d, h = b.pointWidth / 2 || 0; m = { x: l.x + h, y: l.y, z: this.z + m.depth / 2 }; k.inverted && (n && (l.width = 0, m.x += b.shapeArgs.height / 2), 90 <= q.alpha && 270 >= q.alpha && (m.y += b.shapeArgs.width)); m = g([m], k, !0, !1)[0]; l.x = m.x - h; l.y = b.outside3dPlot ? -9E9 : m.y } a.apply(this, [].slice.call(arguments,
                            1))
                    }); m(G.prototype, "getStackBox", function (a, b) { var c = a.apply(this, [].slice.call(arguments, 1)), f = this.axis.chart, l = b.width; if (f.is3d() && this.base) { var k = +this.base.split(",")[0], m = f.series[k]; k = f.options.chart.options3d; m && m instanceof n.seriesTypes.column && (m = { x: c.x + (f.inverted ? c.height : l / 2), y: c.y, z: m.options.depth / 2 }, f.inverted && (c.width = 0, 90 <= k.alpha && 270 >= k.alpha && (m.y += l)), m = g([m], f, !0, !1)[0], c.x = m.x - l / 2, c.y = m.y) } return c }); ""; return a
            }); D(a, "Series/Pie3D/Pie3DPoint.js", [a["Core/Series/SeriesRegistry.js"]],
                function (a) {
                    var A = this && this.__extends || function () { var a = function (n, r) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, n) { a.__proto__ = n } || function (a, n) { for (var f in n) n.hasOwnProperty(f) && (a[f] = n[f]) }; return a(n, r) }; return function (n, r) { function m() { this.constructor = n } a(n, r); n.prototype = null === r ? Object.create(r) : (m.prototype = r.prototype, new m) } }(); a = a.seriesTypes.pie.prototype.pointClass; var r = a.prototype.haloPath; return function (a) {
                        function n() {
                            var n = null !== a && a.apply(this, arguments) ||
                                this; n.series = void 0; return n
                        } A(n, a); n.prototype.haloPath = function () { return this.series.chart.is3d() ? [] : r.apply(this, arguments) }; return n
                    }(a)
                }); D(a, "Series/Pie3D/Pie3DSeries.js", [a["Core/Globals.js"], a["Series/Pie3D/Pie3DPoint.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, y, r, F) {
                    var n = this && this.__extends || function () {
                        var a = function (f, c) {
                            a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, c) { a.__proto__ = c } || function (a, c) {
                                for (var b in c) c.hasOwnProperty(b) &&
                                    (a[b] = c[b])
                            }; return a(f, c)
                        }; return function (f, c) { function b() { this.constructor = f } a(f, c); f.prototype = null === c ? Object.create(c) : (b.prototype = c.prototype, new b) }
                    }(), A = a.deg2rad, m = a.svg; a = F.extend; var z = F.pick; r = function (a) {
                        function f() { return null !== a && a.apply(this, arguments) || this } n(f, a); f.prototype.addPoint = function () { a.prototype.addPoint.apply(this, arguments); this.chart.is3d() && this.update(this.userOptions, !0) }; f.prototype.animate = function (c) {
                            if (this.chart.is3d()) {
                                var b = this.options.animation; var f =
                                    this.center; var g = this.group, k = this.markerGroup; m && (!0 === b && (b = {}), c ? (g.oldtranslateX = z(g.oldtranslateX, g.translateX), g.oldtranslateY = z(g.oldtranslateY, g.translateY), f = { translateX: f[0], translateY: f[1], scaleX: .001, scaleY: .001 }, g.attr(f), k && (k.attrSetters = g.attrSetters, k.attr(f))) : (f = { translateX: g.oldtranslateX, translateY: g.oldtranslateY, scaleX: 1, scaleY: 1 }, g.animate(f, b), k && k.animate(f, b)))
                            } else a.prototype.animate.apply(this, arguments)
                        }; f.prototype.drawDataLabels = function () {
                            if (this.chart.is3d()) {
                                var c =
                                    this.chart.options.chart.options3d; this.data.forEach(function (a) { var b = a.shapeArgs, f = b.r, k = (b.start + b.end) / 2; a = a.labelPosition; var m = a.connectorPosition, n = -f * (1 - Math.cos((b.alpha || c.alpha) * A)) * Math.sin(k), r = f * (Math.cos((b.beta || c.beta) * A) - 1) * Math.cos(k);[a.natural, m.breakAt, m.touchingSliceAt].forEach(function (a) { a.x += r; a.y += n }) })
                            } a.prototype.drawDataLabels.apply(this, arguments)
                        }; f.prototype.pointAttribs = function (c) {
                            var b = a.prototype.pointAttribs.apply(this, arguments), f = this.options; this.chart.is3d() &&
                                !this.chart.styledMode && (b.stroke = f.edgeColor || c.color || this.color, b["stroke-width"] = z(f.edgeWidth, 1)); return b
                        }; f.prototype.translate = function () {
                            a.prototype.translate.apply(this, arguments); if (this.chart.is3d()) {
                                var c = this, b = c.options, f = b.depth || 0, g = c.chart.options.chart.options3d, k = g.alpha, m = g.beta, n = b.stacking ? (b.stack || 0) * f : c._i * f; n += f / 2; !1 !== b.grouping && (n = 0); c.data.forEach(function (a) {
                                    var g = a.shapeArgs; a.shapeType = "arc3d"; g.z = n; g.depth = .75 * f; g.alpha = k; g.beta = m; g.center = c.center; g = (g.end + g.start) /
                                        2; a.slicedTranslation = { translateX: Math.round(Math.cos(g) * b.slicedOffset * Math.cos(k * A)), translateY: Math.round(Math.sin(g) * b.slicedOffset * Math.cos(k * A)) }
                                })
                            }
                        }; f.prototype.drawTracker = function () { a.prototype.drawTracker.apply(this, arguments); this.chart.is3d() && this.points.forEach(function (a) { a.graphic && ["out", "inn", "side1", "side2"].forEach(function (b) { a.graphic && (a.graphic[b].element.point = a) }) }) }; return f
                    }(r.seriesTypes.pie); a(r.prototype, { pointClass: y }); ""; return r
                }); D(a, "Series/Pie3D/Pie3DComposition.js",
                    [a["Series/Pie3D/Pie3DPoint.js"], a["Series/Pie3D/Pie3DSeries.js"], a["Core/Series/SeriesRegistry.js"]], function (a, y, r) { r.seriesTypes.pie.prototype.pointClass.prototype.haloPath = a.prototype.haloPath; r.seriesTypes.pie = y }); D(a, "Series/Scatter3D/Scatter3DPoint.js", [a["Series/Scatter/ScatterSeries.js"], a["Core/Utilities.js"]], function (a, y) {
                        var r = this && this.__extends || function () {
                            var a = function (n, m) {
                                a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, f) { a.__proto__ = f } || function (a, f) {
                                    for (var k in f) f.hasOwnProperty(k) &&
                                        (a[k] = f[k])
                                }; return a(n, m)
                            }; return function (n, m) { function r() { this.constructor = n } a(n, m); n.prototype = null === m ? Object.create(m) : (r.prototype = m.prototype, new r) }
                        }(), A = y.defined; return function (a) { function n() { var m = null !== a && a.apply(this, arguments) || this; m.options = void 0; m.series = void 0; return m } r(n, a); n.prototype.applyOptions = function () { a.prototype.applyOptions.apply(this, arguments); A(this.z) || (this.z = 0); return this }; return n }(a.prototype.pointClass)
                    }); D(a, "Series/Scatter3D/Scatter3DSeries.js", [a["Core/Math3D.js"],
                    a["Series/Scatter3D/Scatter3DPoint.js"], a["Series/Scatter/ScatterSeries.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, y, r, D, n) {
                        var A = this && this.__extends || function () {
                            var a = function (f, c) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, c) { a.__proto__ = c } || function (a, c) { for (var b in c) c.hasOwnProperty(b) && (a[b] = c[b]) }; return a(f, c) }; return function (f, c) {
                                function b() { this.constructor = f } a(f, c); f.prototype = null === c ? Object.create(c) : (b.prototype = c.prototype,
                                    new b)
                            }
                        }(), m = a.pointCameraDistance; a = n.extend; var z = n.merge; n = function (a) { function f() { var c = null !== a && a.apply(this, arguments) || this; c.data = void 0; c.options = void 0; c.points = void 0; return c } A(f, a); f.prototype.pointAttribs = function (c) { var b = a.prototype.pointAttribs.apply(this, arguments); this.chart.is3d() && c && (b.zIndex = m(c, this.chart)); return b }; f.defaultOptions = z(r.defaultOptions, { tooltip: { pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>" } }); return f }(r); a(n.prototype,
                            { axisTypes: ["xAxis", "yAxis", "zAxis"], directTouch: !0, parallelArrays: ["x", "y", "z"], pointArrayMap: ["x", "y", "z"], pointClass: y }); D.registerSeriesType("scatter3d", n); ""; return n
                    }); D(a, "masters/highcharts-3d.src.js", [a["Core/Globals.js"], a["Core/Renderer/SVG/SVGRenderer3D.js"], a["Core/Chart/Chart3D.js"], a["Core/Axis/ZAxis.js"], a["Core/Axis/Axis3DComposition.js"], a["Series/Area3D/Area3DSeries.js"]], function (a, y, r, D, n, G) {
                        y.compose(a.SVGRenderer); r.compose(a.Chart, a.Fx); D.compose(a.Chart); n.compose(a.Axis,
                            a.Tick); G.compose(a.seriesTypes.area)
                    })
});
//# sourceMappingURL=highcharts-3d.js.map