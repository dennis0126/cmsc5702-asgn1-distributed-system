// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === "POST") {
    const searchKeyword = req.body.searchKeyword;
    res.redirect(`/?search=${encodeURI(searchKeyword)}`);
  }
}
