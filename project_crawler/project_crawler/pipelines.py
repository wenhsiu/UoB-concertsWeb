# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
import sqlite3
import scrapy
from scrapy.pipelines.images import ImagesPipeline
from scrapy.exceptions import DropItem


class ProjectCrawlerPipeline(object):
    def process_item(self, item, spider):
        return item


class SQLitePipeline(object):
	def open_spider(self, spider):
		db_name = spider.settings.get('SQLITE_DB')
		# db_name = '/Users/wenhsiuhsu/Desktop/UoB computer science/final project/project/db/concerts.db'

		self.db_conn = sqlite3.connect(db_name)
		self.db_cur = self.db_conn.cursor()

	def close_spider(self, spider):
		self.db_conn.commit()
		self.db_conn.close()

	def process_item(self, item, spider):
		self.insert_db(item)
		return item

	def insert_db(self, item):
		values = (
			item['id'],
			item['title'],
			item['date'],
			item['description'],
			item['url'],
			item['image_paths'][0]
		)

		cmd = """INSERT OR IGNORE INTO concert_info (id, title, date, description, url, img) VALUES(?, ?, ?, ?, ?, ?)"""
		self.db_cur.execute(cmd, values)


class ProjectImagesPipeline(ImagesPipeline):
	def get_media_requests(self, item, info):
		for image_url in item['image_urls']:
			yield scrapy.Request(image_url)

	def file_path(self, request, response=None, info=None):
		# image_guid = request.meta.get('filename', '')
		image_guid = request.url.split('/')[-1]
		return 'full/%s' % (image_guid)

	def item_completed(self, results, item, info):
		image_paths = [x['path'] for ok, x in results if ok]
		if not image_paths:
			raise DropItem("Item contains no images")
		item['image_paths'] = image_paths
		return item

