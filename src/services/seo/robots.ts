import { NextApiHandler } from 'next';
import { INTERNAL_SERVER_ERROR_MESSAGE, INTERNAL_SERVER_ERROR_STATUS_CODE } from 'src/shared/constants/error.constant';

const robotsApi: NextApiHandler = async (req, res) => {
  try {
    if (req.headers.host !== 'blog.sujames.com') {
      res.write("User-Agent: *\nDisallow: /");
    } else {
      res.write("User-Agent: *\nDisallow: /pages");
    }

    res.end();
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send(INTERNAL_SERVER_ERROR_MESSAGE);
  }
}

export default robotsApi;
