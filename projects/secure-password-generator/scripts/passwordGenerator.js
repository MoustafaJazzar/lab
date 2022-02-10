class PasswordGenerator {
    pwlen
    rng_state
    rng_pool = new Array();
    rng_pptr = 0;
    rng_psize = 256;
    S = new Array();
    i
    j
    constructor() {
        this.init();
    }

    init() {
        try {
            if (this.rng_pptr < this.rng_psize) {
                var t = Math.floor((this.rng_psize - this.rng_pptr) / 2) + 1,
                    a = new Uint16Array(t);
                window.crypto.getRandomValues(a);
                for (var r = 0; r < a.length; r++) {
                    var o = a[r];
                    (this.rng_pool[this.rng_pptr++] = o >>> 8),
                    (this.rng_pool[this.rng_pptr++] = 255 & o);
                }
            }
        } catch (e) {
            console.error(e);
        }
        for (; this.rng_pptr < this.rng_psize;) {
            o = Math.floor(65536 * Math.random());
            this.rng_pool[this.rng_pptr++] = o >>> 8;
            this.rng_pool[this.rng_pptr++] = 255 & o;
            this.rng_pptr = 0;
            this.rng_seed_time();
        }
    }
    rng_seed_int(e) {
        var n = this;
        (n.rng_pool[n.rng_pptr++] ^= 255 & e),
        (n.rng_pool[n.rng_pptr++] ^= (e >> 8) & 255),
        (n.rng_pool[n.rng_pptr++] ^= (e >> 16) & 255),
        (n.rng_pool[n.rng_pptr++] ^= (e >> 24) & 255),
        n.rng_pptr >= n.rng_psize && (n.rng_pptr -= n.rng_psize);
    }
    rng_seed_time() {
        this.rng_seed_int(new Date().getTime());
    }
    rng_get_byte() {
        var e = this;
        if (null == e.rng_state) {
            for (
                e.rng_seed_time(),
                e.rng_state = e.prng_newstate(),
                e.rng_state.init(e.rng_pool),
                e.rng_pptr = 0; e.rng_pptr < e.rng_pool.length;
                ++e.rng_pptr
            )
                e.rng_pool[e.rng_pptr] = 0;
            e.rng_pptr = 0;
        }
        return e.rng_state.next();
    }
    rng_get_bytes(e) {
        var n;
        for (n = 0; n < e.length; ++n) e[n] = this.rng_get_byte();
    }
    get_random(e, n) {
        var t = n - e + 1;
        this.rng_seed_time();
        for (var a = new Array(), r = 0; r < 4; r++) a[r] = 0;
        this.rng_get_bytes(a);
        var o = 0;
        for (r = 0; r < 4; r++)(o *= 256), (o += a[r]);
        return (o %= t) + e;
    }
    get_random_password(e, n) {
        if (
            ("number" != typeof e && (e = 12),
                "number" != typeof n && (n = 16),
                n < e)
        ) {
            var t = e;
            (e = n), (n = t);
        }
        return (this.pwlen = this.get_random(e, n)), this.rand_str(this.pwlen);
    }
    rand_str(e, n) {
        var t = "";
        n =
            void 0 !== n ?
            n :
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        for (var a = 0; a < e; a++) t += n.charAt(this.get_random(0, n.length - 1));
        return t;
    }
    createRandomHexString(e) {
        for (var n = "0123456789ABCDEF", t = "", a = 0; a < e; ++a) {
            var r = this.get_random(0, n.length - 1);
            t += n.substring(r, r + 1);
        }
        return t;
    }
    prng_newstate() {
        var e = new Array();
        return (
            (Array.prototype.init = this.ARC4init),
            (Array.prototype.next = this.ARC4next),
            (e.i = 0),
            (e.j = 0),
            (e.S = new Array()),
            e
        );
    }
    ARC4init(e) {
        var n, t, a;
        for (n = 0; n < 256; ++n) this.S[n] = n;
        for (t = 0, n = 0; n < 256; ++n)
            (t = (t + this.S[n] + e[n % e.length]) & 255),
            (a = this.S[n]),
            (this.S[n] = this.S[t]),
            (this.S[t] = a);
        (this.i = 0), (this.j = 0);
    }
    ARC4next() {
        var e;
        return (
            (this.i = (this.i + 1) & 255),
            (this.j = (this.j + this.S[this.i]) & 255),
            (e = this.S[this.i]),
            (this.S[this.i] = this.S[this.j]),
            (this.S[this.j] = e),
            this.S[(e + this.S[this.i]) & 255]
        );
    }

    generate({
        length = 5,
        uppercase = true,
        lowercase = true,
        numbers = true,
        symbols = true,
        ambiguous = true,
    }) {
        let candidates,
            m = [],
            charbank = "",
            _ = "",
            lowers = "abcdefghjkmnpqrstuvwxyz",
            uppers = "ABCDEFGHJKMNPQRSTUVWXYZ",
            digits = "23456789",
            _sympols = `~\`!@#$%^&*()_-+={[}]|:;"'<,>.?/\\`;
        if (lowercase) m[m.length] = "L";
        if (uppercase) m[m.length] = "U";
        if (symbols) m[m.length] = "S";
        for (; m.length < length;) m[m.length] = "A";
        let i;
        for (
            m.sort(() => {
                return 2 * this.get_random(0, 1) - 1;
            }),
            ambiguous || (lowers += "ilo"),
            lowercase && (charbank += lowers),
            ambiguous || (uppers += "ILO"),
            uppercase && (charbank += uppers),
            ambiguous || (digits += "10"),
            numbers && (charbank += digits),
            // symbols && (charbank += "!@#$%^&*"),
            symbols && (charbank += _sympols),
            i = 0; i < length; i++
        ) {
            switch (m[i]) {
                case "L":
                    candidates = lowers;
                    break;
                case "U":
                    candidates = uppers;
                    break;
                case "D":
                    candidates = digits;
                    break;
                case "S":
                    candidates = _sympols;
                    break;
                case "A":
                    candidates = charbank;
            }
            _ += candidates.charAt(this.get_random(0, candidates.length - 1));
        }
        return _;
    }
}

const P = new PasswordGenerator();

export default P.generate.bind(P);