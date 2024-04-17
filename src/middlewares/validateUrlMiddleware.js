import UrlService from '../services/UrlService.js';

const urlService = UrlService.getInstance();

export default async (req, res, next) => {
  const selectedUrl = await urlService.getUrlByCode(req.params.code);

  const isOneTime = selectedUrl?.one_time && selectedUrl?.visits > 0;
  const isExpiredTime = selectedUrl?.expired_time
    ? new Date(selectedUrl.expired_time).getTime() <= new Date().getTime()
    : false;

  if (!selectedUrl.enabled) {
    return res.status(404).json({ error: 'Url disabled' });
  }

  if (isOneTime || isExpiredTime) {
    return res.status(404).json({ error: 'Url expired' });
  }

  next();
};
