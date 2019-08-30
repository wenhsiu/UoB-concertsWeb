from era.items import EraItem
import scrapy
import time


class eraSpider(scrapy.Spider):
	name = 'era'
	# allowed_domains = ['era.ticket']
	start_urls = ['https://www.ticket.com.tw/application/UTK01/UTK0101_06.aspx?TYPE=1&CATEGORY=77']

	

	def parse(self, response):
		# item = EraItem()
		target = response.css('div.moreBox')
		web = 'https://www.ticket.com.tw/application/UTK02/'

		for t in target:

			item = EraItem()
			item['id'] = t.css('div.caption p.text-right a.btn.btn-danger.outline::attr(href)').get().split('=')[-1]  
			item['title'] = t.css('div.caption h4.list-group-item-heading::text').get()
			item['date'] = t.css('div.caption p.group.inner.list-group-item-date span::text').get()
			item['description'] = t.css('div.caption div.list-group-item-text::text').get()
			item['url'] = web + t.css('div.caption p.text-right a.btn.btn-danger.outline::attr(href)').get().split('/')[-1]
			item['image_urls'] = [t.css('a img.list-group-image::attr(data-original)').get()]

			yield item

# response.css('div.moreBox').css('div.caption p.group.inner.list-group-item-date span::text').get()


# urllib.urlretrieve(imglist[i],"./crawlImages/"+str(amazonSpider.imgcount)+".jpg")
# item['Path'] = "./crawlImages/"+str(amazonSpider.imgcount)+".jpg"
# amazonSpider.imgcount = amazonSpider.imgcount + 1
# yield item