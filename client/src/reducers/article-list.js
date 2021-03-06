export default (state = {}, action) => {
  switch (action.type) {
    case 'ARTICLE_FAVORITED':
    case 'ARTICLE_UNFAVORITED':
      return {
        ...state,
        articles: state.articles.map(article => {
          if (article.slug === action.payload.article.slug) {
            return {
              ...article,
              favorited: action.payload.article.favorited,
              favoritesCount: action.payload.article.favoritesCount,
            }
          }
          return article
        }),
      }
    case 'SET_PAGE':
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        currentPage: action.page,
      }
    case 'APPLY_TAG_FILTER':
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: null,
        tag: action.tag,
        currentPage: 0,
      }
    case 'HOME_PAGE_LOADED': {
      if (action.error) {
        return {}
      }
      const [{tags}, {articles, articlesCount}] = action.payload
      return {
        ...state,
        tags,
        articles,
        articlesCount,
        currentPage: 0,
        tab: action.tab,
      }
    }
    case 'HOME_PAGE_UNLOADED':
      return {}
    case 'CHANGE_TAB':
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: action.tab,
        currentPage: 0,
        tag: null,
      }
    case 'PROFILE_PAGE_LOADED':
    case 'PROFILE_FAVORITES_PAGE_LOADED': {
      const [, {articles, articlesCount} = {}] = action.payload || []
      return {
        ...state,
        articles,
        articlesCount,
        currentPage: 0,
      }
    }
    case 'PROFILE_PAGE_UNLOADED':
    case 'PROFILE_FAVORITES_PAGE_UNLOADED':
      return {}
    default: {
      return state
    }
  }
}
