import React from "react";
import { Facebook } from "lucide-react";
import { Instagram } from "lucide-react";
import { Youtube } from "lucide-react";
import { Twitter } from "lucide-react";
function Footer() {
  return (
    <footer>
      <hr className="border border-gray-300 dark:border-gray-700" />
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center ">
          <div className="flex mb-5 flex-col items-center justify-between gap-2">
            <h1 className="text-xl font-bold">QuickCart</h1>
            <p className="text-sm">
              Your one stop shop for everything your need
            </p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-3">
            <a href="" className="text-sm hover:text-underline">
              About Us
            </a>
            <a href="" className="text-sm hover:text-underline">
              Contact
            </a>
            <a href="" className="text-sm hover:text-underline">
              Privacy
            </a>
            <a href="" className="text-sm hover:text-underline">
              Privacy Policy
            </a>
            <a href="" className="text-sm hover:text-underline">
              Terms and conditions
            </a>
          </div>
        </div>
        <div className="mt-5 text-center">
          <p className="text-sm">Follow us:</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="" className="text-sm hover:opaciy-75">
              <Facebook />
            </a>
            <a href="" className="text-sm hover:opaciy-75">
              <Instagram />
            </a>
            <a href="" className="text-sm hover:opaciy-75">
              <Twitter />
            </a>
            <a href="" className="text-sm hover:opaciy-75">
              <Youtube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
