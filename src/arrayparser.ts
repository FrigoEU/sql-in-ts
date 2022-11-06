const arrayParserState: {
  i: number;
  char: null | string;
  str: string;
  quoted: boolean;
  last: number;
  p?: string;
} = {
  i: 0,
  char: null,
  str: "",
  quoted: false,
  last: 0,
};

export function arrayParser<T>(x: string, parser: (s: string) => T): Array<T> {
  arrayParserState.i = arrayParserState.last = 0;
  return arrayParserLoop(arrayParserState, x, parser);
}

function arrayParserLoop<T>(
  s: typeof arrayParserState,
  x: string,
  parser: (s: string) => T
): Array<T> {
  const xs: T[] = [];
  for (; s.i < x.length; s.i++) {
    s.char = x[s.i];
    if (s.quoted) {
      if (s.char === "\\") {
        s.str += x[++s.i];
      } else if (s.char === '"') {
        xs.push(parser(s.str));
        s.str = "";
        s.quoted = x[s.i + 1] === '"';
        s.last = s.i + 2;
      } else {
        s.str += s.char;
      }
    } else if (s.char === '"') {
      s.quoted = true;
    } else if (s.char === "{") {
      s.last = ++s.i;
      xs.push(...arrayParserLoop(s, x, parser));
    } else if (s.char === "}") {
      s.quoted = false;
      s.last < s.i && xs.push(parser(x.slice(s.last, s.i)));
      s.last = s.i + 1;
      break;
    } else if (s.char === "," && s.p !== "}" && s.p !== '"') {
      xs.push(parser(x.slice(s.last, s.i)));
      s.last = s.i + 1;
    }
    s.p = s.char;
  }
  s.last < s.i && xs.push(parser(x.slice(s.last, s.i + 1)));
  return xs;
}
