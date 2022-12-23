<div align="center">
<i>НАПОМЕНА: <b>ПРОЈЕКАТ ЈЕ ФАЗИ ЈАВНОГ ТЕСТИРАЊА</b></i><br>
Презентзација на: <a href="https://infoportal.app">https://infoportal.app</a>
</div>

!["Platform_sample"](/sample.png)
  
# Једноставна платформа за гласање
Овај репо садржи код _платформе за гласање_ написан у `Solidity`-ју и `TypeScript`-у. Део платформе је постављен на _Polygon_ блокчејн мрежу.  
Фронтенд део платформе је написан упоребом `SvelteKit` фрејмворка и намењен је _self-host_ варијанти употребе.

|Компонента система|Верзија|
|-|-|
|`contracts`|`1.5 test-net`|
|`frontend`|`0.95`|

[![wakatime](https://wakatime.com/badge/github/vexy/simple_voting.svg)](https://wakatime.com/badge/github/vexy/simple_voting?style=for-the-badge)

## 📦 Основне функционалности
Платформ подржава следеће функционалности:
  - Бесплатна регистрација
  - Постављање нових питања
  - Преглед постављених питања на платформи
  - Одговарање на постављена питања

!["Platform_sample"](/sample2.png)
!["Platform_sample"](/sample3.png)
!["Platform_sample"](/sample1.png)

> По потреби, проверавајте стање [пројекта](https://github.com/vexy/simple_voting/projects/1) и/или пријавите [проблем](https://github.com/vexy/simple_voting/issues).

### Предуслови
За употребу ове платформе потребно је поседовање неког дигиталног новчаника (_digital wallet_) који је подешен за повезивање на блокчејн мрежу.  
У овом тренутку, једино је подржан [MetaMask](https://metamask.io/) новчаник.

### Постављање на блокчејн мреже (_deployment_)
За више информација о постављању на глвне мреже, погледајте [`DEPLOYMENTS фајл`](/DEPLOYMENTS.md).

# Ауторски рад 🙌
На платформи су коришћени [CSS стилови](https://markodenic.com/tools/buttons-generator/) и материјали од [Markа Denića](https://github.com/markodenic).  
Осим `Hardhat` и `Metamask.js` пакета, платформа не користи друге, екстерне библиотеке.

---

<div align="center">
  <p>Направљено у Србији, априла 2022 🇷🇸</p>
  <a href="https://stackexchange.com/users/215166">
    <img src="https://stackexchange.com/users/flair/215166.png?theme=clean" width="208" height="58" alt="profile for Vexy on Stack Exchange, a network of free, community-driven Q&amp;A sites" title="profile for Vexy on Stack Exchange, a network of free, community-driven Q&amp;A sites">
  </a>
  <p>Copyright (C) 2022 <a href="https://github.com/vexy">Vexy</a>
</div>
  

**PGP**: `6302D860 B74CBD34 6482DBA2 518766D0 8213DBC0`