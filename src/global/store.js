import apiGet from './storeSchema/api_get'
import apiPost from './storeSchema/api_post'
import apiPut from './storeSchema/api_put'
import apiDelete from './storeSchema/api_delete'

const storeSchema =
{
  actions: {
    ...apiGet,
    ...apiPost,
    ...apiPut,
    ...apiDelete
  },
};

export default storeSchema