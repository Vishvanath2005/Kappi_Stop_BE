const LoginService = require("./Login_Service");

exports.simpleLogin = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    if (!password || (!email && !phone)) {
      return res.status(400).json({
        success: false,
        message: "Email/Phone and Password are required"
      });
    }

    const result = await LoginService.simpleLogin({ email, phone, password });

    if (!result.success) {
      return res.status(401).json(result); // user not found or wrong password
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result.data
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
