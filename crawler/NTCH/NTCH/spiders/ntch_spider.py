from NTCH.items import NtchItem
import scrapy
from scrapy.http import FormRequest


class ntchSpider(scrapy.Spider):
	name = 'NTCH'
	start_urls = ['https://www.artsticket.com.tw/CKSCC2005/Product/Product00/ProductsCategoriesPage.aspx?ProductsCategoryId=8JNfZ4VZd5R%2b6AG8ujzh6g']
	# count = 0
	
	# def parse(self, response):

	# 	current_page = response.css('a.circlePageCurrent::text').get()
	# 	last_page = response.css('ul.pagerUl::text').getall()[-1].split()[0][1:-1]
	# 	count = 0

	# 	# print('***'+ str(count))

	# 	# if count < 5:
	# 	for i in range(0, 3):
	# 		eventtarget = '_ctl0$ContentPlaceHolder1$rptPaging$_ctl' + str(i) + '$btnPage'
	# 		count += 1
	# 		# print('***' + response.css('a.circlePageCurrent::text').get())
	# 		yield scrapy.FormRequest.from_response(response,
	# 				formdata={'__EVENTTARGET': eventtarget,
	# 					'__VIEWSTATE': response.css('input#__VIEWSTATE::attr(value)').get()},
	# 				callback = self.parse_item,
	# 				dont_click = True)

	# 	while count != last_page:
	# 		pass
	# 		yield scrapy.FormRequest.from_response(response,
	# 			formdata={'__EVENTTARGET': '_ctl0$ContentPlaceHolder1$rptPaging$_ctl3$btnPage',
	# 				'__VIEWSTATE': response.css('input#__VIEWSTATE::attr(value)').get()},
	# 			callback = self.parse_item,
	# 			dont_click = True)


	# def parse_item(self, response):
	def parse(self, response):
		target = response.css('div.program')
		web = "https://www.artsticket.com.tw/CKSCC2005/Product/Product00/"

		for t in target:

			item = NtchItem()
			stringId = t.css('a.programPic::attr(href)').get()
			if stringId is not None:
				item['id'] = stringId.split('=')[-1]
			item['title'] = t.css('a.programTitle::text').get()
			item['date'] = t.css('a.programTime::text').get()
			item['description'] = t.css('div.list-group-item-text::text').get()
			if stringId is not None:
				item['url'] = web + stringId.split('/')[-1]
			item['image_urls'] = [t.css('img::attr(data-echo)').get()]

			yield item
