const superagent = require('superagent');
const cheerio = require('cheerio');

const reptileUrl = "https://book.douban.com/latest";

function getLatestbook(){
    var book = [];


    superagent.get(reptileUrl).end(function (err, res){
        let $ = cheerio.load(res.text);
        let data = [];
        $('.cover-col-4 li').each(function(i, elem){
            let _this = $(elem);
            data.push({
                href : _this.find('a').attr('href'),
                img : _this.find('a img').attr('src'),
                title : _this.find('.detail-frame a').text(),
                img : _this.find('.detail-frame .color-gray').text()
            });
        });
        return book.concat(data)
    });

    return book

}

module.exports.getLatestbook = getLatestbook