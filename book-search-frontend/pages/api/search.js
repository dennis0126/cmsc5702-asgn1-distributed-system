// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === "POST") {
    const searchKeyword = req.body.searchKeyword;

    // redirect to book page when search keyword is isbn13
    if (/^[0-9]{13}$/.test(searchKeyword)) {
      res.redirect(`/book/${searchKeyword}`);
    }

    res.redirect(`/?search=${encodeURI(searchKeyword)}`);
  }
}
