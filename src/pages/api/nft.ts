import axios from 'axios';

export default async function handler(req, res) {
  const { tokenId } = req.query;
  try {
    const response = await axios.get(
      `https://cdn.nftmania.io/pfp/itscrv/json/${tokenId}.json`,
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching NFT data', error });
  }
}
