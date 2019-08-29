from project_crawler.items import ProjectCrawlerItem
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.settings import Settings
from project_crawler import settings as my_settings


class EraSpider(scrapy.Spider):
	name = 'Era'
	start_urls = ['https://www.ticket.com.tw/application/UTK01/UTK0101_06.aspx?TYPE=1&CATEGORY=77']

	def parse(self, response):
		target = response.css('div.moreBox')
		web = 'https://www.ticket.com.tw/application/UTK02/'

		for t in target:

			item = ProjectCrawlerItem()
			item['id'] = t.css('div.caption p.text-right a.btn.btn-danger.outline::attr(href)').get().split('=')[-1]
			item['title'] = t.css('div.caption h4.list-group-item-heading::text').get()
			item['date'] = t.css('div.caption p.group.inner.list-group-item-date span::text').get()
			item['description'] = t.css('div.caption div.list-group-item-text::text').get()
			item['url'] = web + t.css('div.caption p.text-right a.btn.btn-danger.outline::attr(href)').get().split('/')[-1]
			item['image_urls'] = [t.css('a img.list-group-image::attr(data-original)').get()]

			yield item


class NtchSpider(scrapy.Spider):
	name = 'NTCH'
	start_urls = ['https://www.artsticket.com.tw/CKSCC2005/Product/Product00/ProductsCategoriesPage.aspx?ProductsCategoryId=8JNfZ4VZd5R%2b6AG8ujzh6g']

	def parse(self, response):
		target = response.css('div.program')
		web = "https://www.artsticket.com.tw/CKSCC2005/Product/Product00/"

		for t in target:

			item = ProjectCrawlerItem()
			stringId = t.css('a.programPic::attr(href)').get()
			if stringId is not None:
				item['id'] = stringId.split('=')[-1]
			item['title'] = t.css('a.programTitle::text').get()
			item['date'] = t.css('a.programTime::text').get()
			item['description'] = t.css('div.list-group-item-text::text').get()
			if stringId is not None:
				item['url'] = web + stringId.split('/')[-1]
			item['image_urls'] = [t.css('img::attr(src)').get()]

			yield item


crawler_settings = Settings()
crawler_settings.setmodule(my_settings)

process = CrawlerProcess(settings=crawler_settings)
process.crawl(EraSpider)
process.crawl(NtchSpider)
process.start()