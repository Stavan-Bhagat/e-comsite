
// Status Codes
exports.STATUS_SUCCESS = 200;
exports.STATUS_CREATED = 201;
exports.STATUS_BAD_REQUEST = 400;
exports.STATUS_UNAUTHORIZED = 401;
exports.STATUS_NOT_FOUND = 404;
exports.STATUS_INTERNAL_SERVER_ERROR = 500;

// Messages
exports.MSG_SUCCESS = 'Operation completed successfully.';
exports.MSG_CREATED = 'Resource created successfully.';
exports.MSG_NO_CONTENT = 'No content to return.';
exports.MSG_BAD_REQUEST = 'Bad request. Please check your input.';
exports.MSG_NOT_FOUND = 'Resource not found.';
exports.MSG_INTERNAL_SERVER_ERROR = 'Internal server error. Please try again later.';

// Product-specific Messages
exports.MSG_PRODUCT_FETCHED = 'Product fetched successfully.';
exports.MSG_PRODUCT_NOT_FOUND = 'Product not found.';
exports.MSG_PRODUCT_ADDED = 'Product added successfully.';
exports.MSG_PRODUCT_UPDATED = 'Product updated successfully.';
exports.MSG_PRODUCT_DELETED = 'Product deleted successfully.';
exports.MSG_NO_PRODUCTS_FOUND = 'No product data found.';
exports.MSG_CATEGORY_PRODUCTS_FETCHED = 'Products by category fetched successfully.';
exports.MSG_CATEGORY_NOT_FOUND = 'No products found for this category.';

// User-specific Messages
exports.MSG_REGISTER_SUCCESS = 'Registration successful. Please verify your email.';
exports.MSG_LOGIN_SUCCESS = 'Login successful.';
exports.MSG_EMAIL_NOT_VERIFIED = 'Email not verified. Please verify your email.';
exports.MSG_INCORRECT_PASSWORD = 'Incorrect password.';
exports.MSG_USER_NOT_FOUND = 'User not found.';
exports.MSG_EMAIL_VERIFIED = 'Email already verified.';
exports.MSG_NO_USER_DATA_FOUND = 'No user data found.';
exports.MSG_USER_UPDATED = 'User data updated successfully.';
exports.MSG_USER_DELETED = 'User data deleted successfully.';
exports.MSG_ACCESS_TOKEN_REFRESHED = 'Access token refreshed successfully.';
exports.MSG_REFRESH_TOKEN_EXPIRED = 'Refresh token has expired.';
exports.MSG_INVALID_REFRESH_TOKEN = 'Invalid refresh token.';

// order-specific messages
exports.MSG_ORDER_CREATED = 'Order created successfully.';
exports.MSG_ORDERS_FETCHED = 'Orders fetched successfully.';

// socket-specific messages
exports.MSG_SOCKET_IO_NOT_INITIALIZED = 'Socket.IO not initialized. Call the init function first.';
exports.MSG_SERVER_INSTANCE_REQUIRED = 'Server instance is required to initialize Socket.IO.';
