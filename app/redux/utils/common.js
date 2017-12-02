export default {

  uid() {
    const p1 = generateStr() + generateStr()
    const p2 = generateStr()
    const p3 = generateStr()
    const p4 = generateStr()
    const p5 = generateStr() + generateStr() + generateStr()
    return `${p1}-${p2}-${p3}-${p4}-${p5}`
  },

  // client uid will start with 8 zeros
  clientUid() {
    const p1 = `00000000`
    const p2 = generateStr()
    const p3 = generateStr()
    const p4 = generateStr()
    const p5 = generateStr() + generateStr() + generateStr()
    return `${p1}-${p2}-${p3}-${p4}-${p5}`
  },

  stripHtmlTags(html) {
    if (!html) {
      return html
    }

    // let browser to do it for us
    const tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  },

  computeIntHash(str, max) {
    const chars = str.split('');
    const prime = 3;
    let sum = 0;
    for (let i = 0; i < chars.length; i++) {
        const code = chars[i].charCodeAt(0);
        sum += code * i * prime;
    }

    const index = sum % max;
    return index;
  },
}

function generateStr() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
