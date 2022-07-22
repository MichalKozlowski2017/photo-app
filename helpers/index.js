export const shutterSpeed = (d) => {
  if (d >= 1) {
      return Math.round(d*10)/10 + 's';
  }
  var df = d, ld = 0, bot = 1, top;
  var limit = 1e3;
  var tol = 1/1e6;
  while (limit-- > 0) {
      df = 1 / (df - Math.floor(df));
      var td = bot;
      bot = Math.floor(bot * df + ld);
      ld = td;
      top = Math.ceil(d * bot);

      if (Math.abs(top/bot - d) < tol) {
          break;
      }
  }
  return top + '/' + bot + 's';
}