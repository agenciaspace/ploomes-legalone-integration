// Health check endpoint
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  return res.status(200).json({
    status: 'ok',
    service: 'Ploomes & Legal One Integration',
    version: '0.1.0',
    timestamp: new Date().toISOString(),
  });
};
