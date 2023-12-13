'use strict'

import { HeaderSite } from "../components/Header/header-site.js";
import { FooterSite } from "../components/Footer/footer-site.js";
import { addClass, removeClass, createCircleForBtn } from "./funcs.js";
import { createModal } from "../../js/modal.js";
import { getAllData, postData, putData, deleteData } from "../../js/HTTPreq.js";

window.customElements.define('header-site', HeaderSite)
window.customElements.define('footer-site', FooterSite)

let tokenObj = getCookie('accessToken')
let { isLogin, userToken } = tokenObj