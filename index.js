import puppeteer from 'puppeteer';

import cheerio from 'cheerio';

export default async function getLinkPreview(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: []
  });
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2', timeout: 0});
  const content = await page.content();
  const $ = cheerio.load(content);



  browser.close();
  
  const data = (()=>{
    
  const img =  ( () => {
    const ogImg = $('meta[property="og:image"]');
    if (
      ogImg.attr('content') != null &&
      ogImg.attr('content').length > 0
    ) {
      return ogImg.attr('content');
    }
    const twitterImg = $('meta[name="twitter:image"]');
    if (
      twitterImg.attr('content') != null &&
      twitterImg.attr('content').length > 0 
    ) {
      return twitterImg.attr('content');
    }
    const imgRelLink = $('link[rel="icon"]');
    if (
      imgRelLink.attr('href') != null &&
      imgRelLink.attr('href').length > 0 
    ) {
      return url+imgRelLink.attr('href');
    }

    let imgs = Array.from($("img"));
    if (imgs.length > 0) {
      imgs = imgs.filter(img => {
        let addImg = true;
        if (img.naturalWidth > img.naturalHeight) {
          if (img.naturalWidth / img.naturalHeight > 3) {
            addImg = false;
          }
        } else {
          if (img.naturalHeight / img.naturalWidth > 3) {
            addImg = false;
          }
        }
        if (img.naturalHeight <= 50 || img.naturalWidth <= 50) {
          addImg = false;
        }
        return addImg;
      });
      /* imgs.forEach(img =>
        img.src.indexOf("//") === -1
          ? (img.src = `${new URL(url).origin}/${src}`)
          : img.src
      ); */
      return imgs[0].src === undefined? null:imgs[0].src;
    }
    return null;
  });

  const title = (() => {
    const ogTitle = $('meta[property="og:title"]');
    if (ogTitle.attr('content') != null && ogTitle.attr('content').length > 0) {
      return ogTitle.attr('content');
    }
    const twitterTitle = $('meta[name="twitter:title"]');
    if (twitterTitle.attr('content') != null && twitterTitle.attr('content').length > 0) {
      return twitterTitle.attr('content');
    }
    const docTitle = $('title').text();
    if (docTitle != null && docTitle.length > 0) {
      return docTitle;
    }
    const h1 = $("h1").text();
    if (h1 != null && h1.length > 0) {
      return h1;
    }
    const h2 = $("h1").text();
    if (h2 != null && h2.length > 0) {
      return h2;
    }
    return null;
  });

  const description =(() => {
    const ogDescription = $(
      'meta[property="og:description"]'
    );
    if (ogDescription.attr('content') != null && ogDescription.attr('content').length > 0) {
      return ogDescription.attr('content');
    }
    const twitterDescription = $(
      'meta[name="twitter:description"]'
    );
    if (twitterDescription.attr('content') != null && twitterDescription.attr('content').length > 0) {
      return twitterDescription.attr('content');
    }
    const metaDescription = $('meta[name="description"]');
    if (metaDescription.attr('content') != null && metaDescription.attr('content').length > 0) {
      return metaDescription.attr('content');
    }
    paragraphs = $("p");
    let fstVisibleParagraph = null;
    for (let i = 0; i < paragraphs.length; i++) {
      if (
        // if object is visible in dom
        paragraphs[i].offsetParent !== null &&
        !paragraphs[i].childElementCount != 0
      ) {
        fstVisibleParagraph = paragraphs[i].textContent;
        break;
      }
    }
    return fstVisibleParagraph;
  });

  
    const domainName = (() => {
      const canonicalLink = $("link[rel=canonical]");
      if (canonicalLink.attr('href') != null && canonicalLink.attr('href').length > 0) {
        return canonicalLink.attr('href');
      }
      const ogUrlMeta = $('meta[property="og:url"]');
      if (ogUrlMeta.attr('content') != null && ogUrlMeta.attr('content').length > 0) {
        return ogUrlMeta.attr('content');
      }
      return url ;
    });

 return  {"img": img(), "title": title(), "description": description(), "domain":domainName()};
  })
  return data();
}

