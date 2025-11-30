
// const animTiming = {
//   duration: 500,
//   easing: 'ease-in-out',
// };

// // 1122追加
// /**
//  * @param {HTMLElement} el - <details> 要素
//  * @param {HTMLElement} answer - <p class="answer"> 要素
//  */
// function closeAccordion(el, answer) {
//   if (!el.hasAttribute('open')) return; // 既に閉じていたら何もしない

//   // 現在のスタイル（marginやpadding）を計算して取得
//   const computedStyle = getComputedStyle(answer);
//   const marginTop = computedStyle.marginTop;
//   const marginBottom = computedStyle.marginBottom;
//   const paddingTop = computedStyle.paddingTop;
//   const paddingBottom = computedStyle.paddingBottom;

//   // --- 閉じるアニメーション ---
//   const closingAnim = answer.animate(
//     [
//       {
//         height: answer.offsetHeight + 'px',
//         opacity: 1,
//         marginTop: marginTop,
//         marginBottom: marginBottom,
//         paddingTop: paddingTop,
//         paddingBottom: paddingBottom,
//       },
//       {
//         height: 0,
//         opacity: 0,
//         marginTop: 0,
//         marginBottom: 0,
//         paddingTop: 0,
//         paddingBottom: 0,
//       },
//     ],
//     animTiming
//   );

//   closingAnim.onfinish = () => {
//     el.removeAttribute('open');
//   };
// }

// document.addEventListener('DOMContentLoaded', () => {

//   const allAccordions = document.querySelectorAll('.accordion.details');

//   allAccordions.forEach(function (el) {
//     const summary = el.querySelector('.summary');
//     const answer = el.querySelector('.answer');

//     summary.addEventListener('click', (event) => {
//       event.preventDefault();

//       allAccordions.forEach(otherEl => {
//         if (otherEl !== el && otherEl.hasAttribute('open')) {
//           const otherAnswer = otherEl.querySelector('.answer');
//           closeAccordion(otherEl, otherAnswer); 
//         }
//       });

//       const computedStyle = getComputedStyle(answer);
//       const marginTop = computedStyle.marginTop;
//       const marginBottom = computedStyle.marginBottom;
//       const paddingTop = computedStyle.paddingTop;
//       const paddingBottom = computedStyle.paddingBottom;

//       // detailsのopenを判定する
//       if (el.hasAttribute('open')) {
//         // 閉じるアニメーション
//         closeAccordion(el, answer); 

//       } else {
//         // 開くアニメーション
//         el.setAttribute('open', 'true');

//         // openを付けた直後の高さを取得
//         const fullHeight = answer.offsetHeight;

//         const openingAnim = answer.animate(
//           [
//             {
//               height: 0,
//               opacity: 0,
//               marginTop: 0,
//               marginBottom: 0,
//               paddingTop: 0,
//               paddingBottom: 0,
//             },
//             {
//               height: fullHeight + 'px',
//               opacity: 1,
//               marginTop: marginTop,
//               marginBottom: marginBottom,
//               paddingTop: paddingTop,
//               paddingBottom: paddingBottom,
//             },
//           ],
//           animTiming
//         );
//       }
//     });
//   });
// });

const animTiming = {
  duration: 500,
  easing: "ease-in-out",
  fill: "forwards", // アニメ終了後も最終値を維持
};

/**
 * 現在進行中のアニメーションがあればキャンセル
 * @param {HTMLElement} answer
 */
function cancelRunningAnimations(answer) {
  const running = answer.getAnimations();
  running.forEach((anim) => anim.cancel());
}

/**
 * アニメ用にセットしたインラインスタイルをリセット
 * @param {HTMLElement} answer
 */
function resetAnswerStyles(answer) {
  answer.style.height = "";
  answer.style.opacity = "";
  answer.style.marginTop = "";
  answer.style.marginBottom = "";
  answer.style.paddingTop = "";
  answer.style.paddingBottom = "";
}

/**
 * アコーディオンを閉じる
 * @param {HTMLElement} el       <details> 要素
 * @param {HTMLElement} answer   .answer 要素
 */
function closeAccordion(el, answer) {
  if (!el.hasAttribute("open")) return; // 既に閉じてたら何もしない

  cancelRunningAnimations(answer);

  const computedStyle = getComputedStyle(answer);
  const marginTop = computedStyle.marginTop;
  const marginBottom = computedStyle.marginBottom;
  const paddingTop = computedStyle.paddingTop;
  const paddingBottom = computedStyle.paddingBottom;

  const startHeight = answer.offsetHeight;

  const closingAnim = answer.animate(
    [
      {
        height: startHeight + "px",
        opacity: 1,
        marginTop,
        marginBottom,
        paddingTop,
        paddingBottom,
      },
      {
        height: 0,
        opacity: 0,
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
      },
    ],
    animTiming
  );

  closingAnim.onfinish = () => {
    el.removeAttribute("open");
    resetAnswerStyles(answer);
  };

  // 途中で別の操作が入ったときもリセットしておく
  closingAnim.oncancel = () => {
    resetAnswerStyles(answer);
  };
}

/**
 * アコーディオンを開く
 * @param {HTMLElement} el       <details> 要素
 * @param {HTMLElement} answer   .answer 要素
 */
function openAccordion(el, answer) {
  if (el.hasAttribute("open")) return; // 既に開いてたら何もしない

  cancelRunningAnimations(answer);
  resetAnswerStyles(answer);

  // 一旦 open を付けて自然な高さを取得
  el.setAttribute("open", "true");

  const computedStyle = getComputedStyle(answer);
  const marginTop = computedStyle.marginTop;
  const marginBottom = computedStyle.marginBottom;
  const paddingTop = computedStyle.paddingTop;
  const paddingBottom = computedStyle.paddingBottom;

  const fullHeight = answer.offsetHeight; // コンテンツの本来の高さ

  // 0の状態を先に適用しておく（ここで一瞬もとの高さが見えないようにする）
  answer.style.height = "0px";
  answer.style.opacity = "0";
  answer.style.marginTop = "0px";
  answer.style.marginBottom = "0px";
  answer.style.paddingTop = "0px";
  answer.style.paddingBottom = "0px";

  // 次フレームでアニメ開始
  requestAnimationFrame(() => {
    const openingAnim = answer.animate(
      [
        {
          height: 0,
          opacity: 0,
          marginTop: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
        },
        {
          height: fullHeight + "px",
          opacity: 1,
          marginTop,
          marginBottom,
          paddingTop,
          paddingBottom,
        },
      ],
      animTiming
    );

    openingAnim.onfinish = () => {
      // アニメ終了後はインラインスタイルを消して素の状態へ戻す
      resetAnswerStyles(answer);
      el.setAttribute("open", "true");
    };

    openingAnim.oncancel = () => {
      resetAnswerStyles(answer);
    };
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const allAccordions = document.querySelectorAll(".accordion.details");

  allAccordions.forEach((el) => {
    const summary = el.querySelector(".summary");
    const answer = el.querySelector(".answer");

    if (!summary || !answer) return;

    summary.addEventListener("click", (event) => {
      event.preventDefault();

      // 他のアコーディオンを閉じる
      allAccordions.forEach((otherEl) => {
        if (otherEl !== el && otherEl.hasAttribute("open")) {
          const otherAnswer = otherEl.querySelector(".answer");
          if (otherAnswer) {
            closeAccordion(otherEl, otherAnswer);
          }
        }
      });

      // 自分をトグル
      if (el.hasAttribute("open")) {
        closeAccordion(el, answer);
      } else {
        openAccordion(el, answer);
      }
    });
  });
});