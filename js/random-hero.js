/* 首页 banner 随机图 —— 按包等概率抽，一轮内不重复 */
(function () {
  var CDN = 'https://cdn.web.small.vvoch.chat/';
  var GROUPS = {
  "ba": [
    "BLOGPictureHead/ba/01.jpg",
    "BLOGPictureHead/ba/02.jpg",
    "BLOGPictureHead/ba/03.jpg",
    "BLOGPictureHead/ba/04.jpg",
    "BLOGPictureHead/ba/05.jpg",
    "BLOGPictureHead/ba/06.png",
    "BLOGPictureHead/ba/07.jpg",
    "BLOGPictureHead/ba/08.jpg",
    "BLOGPictureHead/ba/09.jpg",
    "BLOGPictureHead/ba/10.jpg",
    "BLOGPictureHead/ba/11.jpg",
    "BLOGPictureHead/ba/12.png",
    "BLOGPictureHead/ba/13.png",
    "BLOGPictureHead/ba/14.jpg",
    "BLOGPictureHead/ba/15.jpg",
    "BLOGPictureHead/ba/16.jpg",
    "BLOGPictureHead/ba/17.png",
    "BLOGPictureHead/ba/18.jpg",
    "BLOGPictureHead/ba/19.png",
    "BLOGPictureHead/ba/20.jpg",
    "BLOGPictureHead/ba/21.jpg",
    "BLOGPictureHead/ba/22.jpg",
    "BLOGPictureHead/ba/23.png",
    "BLOGPictureHead/ba/24.png"
  ],
  "loli": [
    "BLOGPictureHead/loli/01.png",
    "BLOGPictureHead/loli/02.png",
    "BLOGPictureHead/loli/03.png",
    "BLOGPictureHead/loli/04.jpg",
    "BLOGPictureHead/loli/05.jpg",
    "BLOGPictureHead/loli/06.png",
    "BLOGPictureHead/loli/07.png",
    "BLOGPictureHead/loli/08.jpg",
    "BLOGPictureHead/loli/09.png"
  ],
  "anime": [
    "BLOGPictureHead/anime/01.jpg",
    "BLOGPictureHead/anime/02.jpg",
    "BLOGPictureHead/anime/03.jpg",
    "BLOGPictureHead/anime/04.jpg",
    "BLOGPictureHead/anime/05.jpg",
    "BLOGPictureHead/anime/06.jpg",
    "BLOGPictureHead/anime/07.jpg",
    "BLOGPictureHead/anime/08.jpg",
    "BLOGPictureHead/anime/09.jpg",
    "BLOGPictureHead/anime/10.jpg",
    "BLOGPictureHead/anime/11.jpg",
    "BLOGPictureHead/anime/12.jpg",
    "BLOGPictureHead/anime/13.jpg",
    "BLOGPictureHead/anime/14.jpg",
    "BLOGPictureHead/anime/15.jpg",
    "BLOGPictureHead/anime/16.jpg",
    "BLOGPictureHead/anime/17.jpg",
    "BLOGPictureHead/anime/18.jpg",
    "BLOGPictureHead/anime/19.jpg",
    "BLOGPictureHead/anime/20.jpg",
    "BLOGPictureHead/anime/21.jpg",
    "BLOGPictureHead/anime/22.jpg"
  ],
  "eromanga": [
    "BLOGPictureHead/eromanga/01.png",
    "BLOGPictureHead/eromanga/02.png",
    "BLOGPictureHead/eromanga/03.png",
    "BLOGPictureHead/eromanga/04.png",
    "BLOGPictureHead/eromanga/05.png",
    "BLOGPictureHead/eromanga/06.png",
    "BLOGPictureHead/eromanga/07.png",
    "BLOGPictureHead/eromanga/08.png",
    "BLOGPictureHead/eromanga/09.png",
    "BLOGPictureHead/eromanga/10.jpg",
    "BLOGPictureHead/eromanga/11.png",
    "BLOGPictureHead/eromanga/12.png",
    "BLOGPictureHead/eromanga/13.png",
    "BLOGPictureHead/eromanga/14.png",
    "BLOGPictureHead/eromanga/15.png",
    "BLOGPictureHead/eromanga/16.png"
  ],
  "kaguya": [
    "BLOGPictureHead/kaguya/01.jpg",
    "BLOGPictureHead/kaguya/02.jpg",
    "BLOGPictureHead/kaguya/03.png",
    "BLOGPictureHead/kaguya/04.jpg",
    "BLOGPictureHead/kaguya/05.jpg",
    "BLOGPictureHead/kaguya/06.jpg",
    "BLOGPictureHead/kaguya/07.png",
    "BLOGPictureHead/kaguya/08.jpg",
    "BLOGPictureHead/kaguya/09.jpg",
    "BLOGPictureHead/kaguya/10.jpg",
    "BLOGPictureHead/kaguya/11.jpg",
    "BLOGPictureHead/kaguya/12.jpg"
  ]
};
  // 每个包的权重，想让谁多出现就调大
  var WEIGHT = { ba: 1, loli: 1, anime: 1, eromanga: 1, kaguya: 1 };

  var p = location.pathname;
  if (p !== '/' && p !== '/index.html') return;

  var keys = Object.keys(GROUPS).filter(function (k) { return GROUPS[k].length; });
  var total = 0;
  keys.forEach(function (k) { total += (WEIGHT[k] || 1); });
  var r = Math.random() * total, pick = keys[0];
  for (var i = 0; i < keys.length; i++) { r -= (WEIGHT[keys[i]] || 1); if (r <= 0) { pick = keys[i]; break; } }

  var bagKey = 'heroBag_' + pick;
  var bag;
  try { bag = JSON.parse(sessionStorage.getItem(bagKey) || '[]'); } catch (e) { bag = []; }
  if (!bag.length) {
    bag = GROUPS[pick].slice();
    for (var j = bag.length - 1; j > 0; j--) {
      var t = Math.floor(Math.random() * (j + 1)); var tmp = bag[j]; bag[j] = bag[t]; bag[t] = tmp;
    }
  }
  var url = CDN + bag.pop();
  try { sessionStorage.setItem(bagKey, JSON.stringify(bag)); } catch (e) {}

  document.documentElement.style.setProperty('--hero-img', 'url("' + url + '")');
  document.documentElement.setAttribute('data-hero', '1');

  var probe = new Image();
  probe.onerror = function () { document.documentElement.removeAttribute('data-hero'); };
  probe.src = url;

  var l = document.createElement('link');
  l.rel = 'preload'; l.as = 'image'; l.href = url;
  document.head.appendChild(l);
})();
