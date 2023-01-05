import React from "react";

export const API_CONSTANTS = {
  BASE_URL: "https://claim.primarykeytech.in/api", //'https://primarykeytech.in/glocal/api',
  login: "/api/login", //used
  register: "/api/register", //used
  createOrder: "/api/order/create",
  punchOrder: "/api/createorder", //used
  businessSetting: "api/business-setting",
  generateQRCode: "/api/qrcode/generate_code.php", //used
  getMerchant: "/api/user/merchant", //used
  getCustomers: "/api/user/customer", //used
  merchantWiseDiscounts: "/api/business-setting/merchant_id/",
  getOrderList: "/api/orderlist", //used
  pendingOrderList: "/api/orderlist",
  dashboardData: "/api/dashboard/list", //used
  addUser: "api/newuser",
  editUser: "/api/edituser/",
  confirmOrder: "/api/confirmorder",
  contactUs: "/api/contact-us/primarykeytech",
  forgotPassword: "/api/forgotpasswordmobile",
  addVisitor: "/api/checkUserByMobile",
  eventList: "/api/eventList",
  eventVenueList: "/api/eventVenueList",
  claimList: "/api/claim_list",
  getClaimDetails: "/api/get-claim-details",
  addImagesToClaimQuestion:
    "/api/add-images-to-claim-question",
  getAssessmentDetails:
    "/api/get-assessment-details",
    getAssessmentDetailsNew:
    "/api/get-assessment-details-new",

    dashboardList: '/api/dashboard-list',
    updateAssessmentDetails: '/api/update-assessment-detail-by-id',
    uploadAssessmentImages: '/api/add-assessment-image',
    getAssessmentDetailProduct: '/api/get-assessment-detail-product',
    uploadAccidentImage: '/api/storeAccidentImages',
};

export let userDetails = null;
export let loadingVisible = null;
export let alertVisible = null;
export let userRole = null;
