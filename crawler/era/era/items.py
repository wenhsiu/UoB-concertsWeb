# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class EraItem(scrapy.Item):
	# define the fields for your item here like:
	# name = scrapy.Field()
	id = scrapy.Field()
	title = scrapy.Field()
	date = scrapy.Field()
	description = scrapy.Field()
	url = scrapy.Field()
	image_urls = scrapy.Field()
	images = scrapy.Field()
	image_paths = scrapy.Field()
	# pass