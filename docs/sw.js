if(!self.define){let e,i={};const a=(a,c)=>(a=new URL(a+".js",c).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,r)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let s={};const d=e=>a(e,n),b={module:{uri:n},exports:s,require:d};i[n]=Promise.all(c.map((e=>b[e]||d(e)))).then((e=>(r(...e),s)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-bc7a2b9a.js",revision:null},{url:"assets/index-fa6473e7.css",revision:null},{url:"icon.png",revision:"4a20c2dbaa8f8241b2047509485c6db8"},{url:"img/avatars/avatar_placeholder.png",revision:"eb2b82c57dda81c9aa7546a27b8399c1"},{url:"img/avatars/char_001.png",revision:"44b9b61a2bcd53e492cebecaad475c2c"},{url:"img/avatars/char_002.png",revision:"6585c8e18940caf255865ee08b8fb14e"},{url:"img/avatars/char_003.png",revision:"04e2c969e6c1f63767578b5b3505d2c4"},{url:"img/avatars/char_004.png",revision:"590003678d70f917409a44a79b106fb5"},{url:"img/avatars/char_005.png",revision:"fb780ae51de70f54870d763c328b6051"},{url:"img/boss/bossEnemy.png",revision:"c276410bfe92b38ed82342ace4ad8ab2"},{url:"img/char/enemy_cupcake.png",revision:"1d01a8f6a603f3769454cc6c84d2a1e7"},{url:"img/char/enemy_gasman.png",revision:"4e2cd9d3d9d434e29f22778fb19acb48"},{url:"img/char/enemy_komet.png",revision:"b8768f5072e6f7ca82adeac305065604"},{url:"img/char/enemy_pingu.png",revision:"86f8f8797f19ae6ce1230229f3f9f5d6"},{url:"img/char/enemy_plasma.png",revision:"8d9e22f179965c7a2c056b7dbe76fbbd"},{url:"img/char/enemy_rocket.png",revision:"90458f85c8e063d1ac215f98af88f46b"},{url:"img/char/enemy_satenna.png",revision:"00f2f74384b90f7ba18bea297c33a637"},{url:"img/char/enemy_space_debris1.png",revision:"ebba32f9a19c3ac4e9b2cac210bb7044"},{url:"img/char/enemy_space_debris2.png",revision:"38de9d5c9f952f0d66e3ea79a40f9357"},{url:"img/char/plasma.png",revision:"97efa4a7b44f4631deadc04b8af5519d"},{url:"img/char/playership1.png",revision:"8fd2b57c76b376b5f0d9196af3c2afec"},{url:"img/char/playership10.png",revision:"12f028bd94a2b59b0c1e25d8cc258aba"},{url:"img/char/playership11.png",revision:"a91d8e45db8fa626e3c5bc19d29ccc2c"},{url:"img/char/playership12.png",revision:"3edfbde65dd07b363159bb339286d00a"},{url:"img/char/playership13.png",revision:"136fc102f3abe0c4e42e7109a3aac0e2"},{url:"img/char/playership14.png",revision:"cdcd41899f13c4c7b7302ae3c22ed670"},{url:"img/char/playership15.png",revision:"77a2771c55b30d2ccdccb12427f04808"},{url:"img/char/playership16.png",revision:"ec45ad5e5c912e48b572fb6487420fae"},{url:"img/char/playership17.png",revision:"96db1cbb70bb336dc5f6c4c44b347cbf"},{url:"img/char/playership18.png",revision:"f3f4c7fddcb242659e4baf68579380d9"},{url:"img/char/playership2.png",revision:"007d0a9eb5a5b53643ee441193c85c67"},{url:"img/char/playership3.png",revision:"5f5b60ca83965c42e56eabc031760e0d"},{url:"img/char/playership4.png",revision:"3864d88bf485b031bd007d325f9328dc"},{url:"img/char/playership5.png",revision:"909a588f7f13c7d4544035dac0b4eba8"},{url:"img/char/playership6.png",revision:"89b8fd0d3ec4f22ba9aa10a0fd93f5e3"},{url:"img/char/playership7.png",revision:"583d87e82b94281ec50b603cdff1109c"},{url:"img/char/playership8.png",revision:"d08d5cc59efa786b33ffc9ed844b29a2"},{url:"img/char/playership9.png",revision:"5056f2c93c7640d3565aa676a7a0ce5d"},{url:"img/crowns/bronze.png",revision:"2f1e686338694976cd617a7839962206"},{url:"img/crowns/gold.png",revision:"b92e8fb5da6e9f4158f30af00cfd284a"},{url:"img/crowns/silver.png",revision:"6999fe20bc9b5c15278e0720ced0b5fc"},{url:"img/icons/android-chrome-192x192.png",revision:"f130a0b70e386170cf6f011c0ca8c4f4"},{url:"img/icons/android-chrome-512x512.png",revision:"0ff1bc4d14e5c9abcacba7c600d97814"},{url:"img/icons/android-chrome-maskable-192x192.png",revision:"845a39478d0e2d4d5d32a092de2de250"},{url:"img/icons/android-chrome-maskable-512x512.png",revision:"2695f5feb66cdb0c6f09d0e415824cf9"},{url:"img/icons/apple-touch-icon-120x120.png",revision:"936d6e411cabd71f0e627011c3f18fe2"},{url:"img/icons/apple-touch-icon-152x152.png",revision:"1a034e64d80905128113e5272a5ab95e"},{url:"img/icons/apple-touch-icon-180x180.png",revision:"c43cd371a49ee4ca17ab3a60e72bdd51"},{url:"img/icons/apple-touch-icon-60x60.png",revision:"9a2b5c0f19de617685b7b5b42464e7db"},{url:"img/icons/apple-touch-icon-76x76.png",revision:"af28d69d59284dd202aa55e57227b11b"},{url:"img/icons/apple-touch-icon.png",revision:"66830ea6be8e7e94fb55df9f7b778f2e"},{url:"img/icons/favicon-16x16.png",revision:"4bb1a55479d61843b89a2fdafa7849b3"},{url:"img/icons/favicon-32x32.png",revision:"98b614336d9a12cb3f7bedb001da6fca"},{url:"img/icons/msapplication-icon-144x144.png",revision:"b89032a4a5a1879f30ba05a13947f26f"},{url:"img/icons/mstile-150x150.png",revision:"058a3335d15a3eb84e7ae3707ba09620"},{url:"img/icons/safari-pinned-tab.svg",revision:"6de16254d1b4193353e7015f9177535d"},{url:"img/items/clock/clock.png",revision:"2fedd5f4ba1acb1eb1f610a24ccfbebb"},{url:"img/items/darkhole/darkhole.png",revision:"0b27455f0e9011c5113cdcf51c44b358"},{url:"img/items/magnet/magnet.png",revision:"cf19297d0b5156f95e9f7308fb5d70d0"},{url:"img/items/skull/skull.png",revision:"67d068f63ed3372a904a1a498c2cc961"},{url:"img/items/snowflake/snowflake.png",revision:"0bd5bfe59977de1802d94e7e7dd6768d"},{url:"img/placeholder_wappen_150.png",revision:"c3857d9e2b40ac42ae5a4b3acf694d89"},{url:"img/spacefield.png",revision:"6d8c7b84f3aa30a5ed08da7287f4b855"},{url:"img/uiol/spaceshipinside.png",revision:"d21f07c1b611fcd18850fab269833904"},{url:"index.html",revision:"5b2778b2d4ff32e3206476fb7bbe957a"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"icon.png",revision:"4a20c2dbaa8f8241b2047509485c6db8"},{url:"manifest.webmanifest",revision:"7fa8e77cf23ef77be0ef8b1412b94732"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
