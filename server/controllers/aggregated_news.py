## Will contain the all the news aggregated from different sources
# Call all the functions from the news_sources and return the aggregated news

from fastapi import APIRouter
from controllers.news_sources import RSS_feed

router = APIRouter()

@router.get("/aggregated_news")
async def aggregated_news():
    pass