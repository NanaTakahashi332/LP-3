// $(window).on('load', function () {
//   const $loading = $('#loading');
//   const $box     = $('#loading_box');
//   const curtain  = $loading.find('.curtain')[0];

//   // 800 -> 2200 に変更
//   $box.delay(2200).fadeOut(300);

//   let finished = false;
//   const finish = () => {
//     if (finished) return;
//     finished = true;
//     $loading.fadeOut(0, function () { $(this).remove(); });
//   };

//   if (curtain) {
//     setTimeout(() => {
//       curtain.classList.add('is-active');
//     }, 1700); // 1700ミリ秒 = 1.7秒待機

//     curtain.addEventListener('animationend', (e) => {
//       if (e.animationName === 'fadeout') finish();
//     }, { once: true });

//     const prefersReduced = window.matchMedia &&
//       window.matchMedia('(prefers-reduced-motion: reduce)').matches;

//     // 元の1700ms → 3400ms に変更
//     setTimeout(finish, prefersReduced ? 50 : 3400); 
//   } else {
//     // setTimeout(finish, 3000);
//   }
// });

$(window).on('load', function () {
  const $loading = $('#loading');
  const $box     = $('#loading_box');
  const curtain  = $loading.find('.curtain')[0];

  $box.delay(2200).fadeOut(300);

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    $loading.fadeOut(0, function () { $(this).remove(); });
  };

  if (curtain) {
    setTimeout(() => {
      curtain.classList.add('is-active');
      setTimeout(() => {
        $loading.css('background', 'transparent'); 
      }, 800); 

    }, 1700); 

    curtain.addEventListener('animationend', (e) => {
      if (e.animationName === 'fadeout') finish();
    }, { once: true });

    const prefersReduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setTimeout(finish, prefersReduced ? 50 : 3400); 
  } else {
    setTimeout(finish, 2700);
  }
});