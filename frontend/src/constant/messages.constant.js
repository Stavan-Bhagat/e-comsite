export const MESSAGES = {
  ERROR: {
    LOGIN_FAILED: 'Login failed: ',
    REGISTER_FAILED: 'Failed to register the user. ',
    NOT_FOUND: 'Resource Not Found',
    CART_FETCH_FAILED: 'Error fetching cart data: ',
    NO_ORDER_DETAILS: 'No order details available.',
    FETCH_FAILED: 'Failed to fetch the data. Please try again later.',
    FAILED_NOTIFICATION_PERMISSION: 'Failed to request notification permission.',
  },
  INFO: {
    CRUD: {
      SUCCESS: {
        CREATED: 'Created Successfully',
        UPDATED: 'Updated Successfully',
        DELETED: 'Deleted Successfully',
      },
      FAILED: {
        CREATE: 'Failed to Create,Please try again later.',
        UPDATE: 'Failed to Update,Please try again later.',
        DELETE: 'Failed to Delete,Please try again later.',
      },
      CANCELLED: {
        DELETE: 'Deletion canceled',
      },
    },
    ORDER: {
      ORDER_PLACED: 'Your order has been placed successfully!',
      ORDER_CONFIRMED: 'Order Confirmed',
      FAILED_NOTIFICATION: 'Error handling notification.',
    },
    VERIFY_EMAIL:
      "Please check your email to verify your account within 5 minutes, If you haven't received the email, please register again",
    PROCESSING_REQUEST: 'Processing your request',
    ORDER_CONFIRMATION: 'Order Confirmation',
    NOTIFICATION_NOT_SUPPORT: 'Browser does not support notifications.',
    PRODUCT_ADDED: 'New product added!',
  },
  SUCCESS: {
    LOGIN_SUCCESS: 'Login successful!',
  },
  FORMS: {
    SUBMIT_SUCCESS: 'Submitted Successfully.',
    SUBMIT_FAILED: 'Failed to submit the data. Please try again later.',
    LABELS: {
      PRODUCT_NAME: 'Product Name',
      BRAND_NAME: 'Brand Name',
      CATEGORY: 'Category',
      STOCK: 'Stock',
      DESCRIPTION: 'Description',
      PRICE: 'Price',
      SELLING_PRICE: 'Selling Price',
      UPLOAD_IMAGES: 'Upload Images',
    },
    PLACEHOLDERS: {
      PRODUCT_NAME: 'Enter product name',
      BRAND_NAME: 'Enter brand name',
      CATEGORY: 'Enter category',
      STOCK: 'Enter stock',
      DESCRIPTION: 'Enter description',
      PRICE: 'Enter price',
      SELLING_PRICE: 'Enter selling price',
    },
    VALIDATION: {
      // Register/login
      EMAIL_REQUIRED: 'Email is required',
      EMAIL_INVALID: 'Invalid email address',
      PASSWORD_REQUIRED: 'Password is required',
      PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
      PASSWORD_COMPLEXITY:
        'Password must include upper and lower case letters, a number, and a special character',
      PASSWORD_CONFIRM_REQUIRED: 'Confirm Password is required',
      PASSWORD_CONFIRM_MATCH: 'Passwords do not match',
      NAME_REQUIRED: 'Name is required',
      ADDRESS_REQUIRED: 'Address is required',
      // product add/update
      PRODUCT_NAME_REQUIRED: 'Product name is required.',
      BRAND_NAME_REQUIRED: 'Brand name is required.',
      CATEGORY_REQUIRED: 'Category is required.',
      STOCK_REQUIRED: 'Stock is required.',
      DESCRIPTION_REQUIRED: 'Description is required.',
      PRICE_REQUIRED: 'Price is required.',
    },
  },
  CONSTANT_NAME: {
    DELETE_CONFIRMATION: {
      TITLE: 'Confirm to delete',
      MESSAGE: 'Are you sure you want to delete it?',
    },
    USERS: 'All Users',
    PRODUCTS: 'All Products',
    ORDERS: 'Order Details',
  },
};

export const a = 6;
