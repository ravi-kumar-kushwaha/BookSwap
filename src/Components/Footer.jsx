import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content px-10 pt-12 pb-6">
      <div className="footer flex flex-wrap justify-between gap-10">
        <nav className="min-w-[200px]">
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Add Book</a>
          <a className="link link-hover">Search & Request</a>
          <a className="link link-hover">Sent Requests</a>
          <a className="link link-hover">Received Requests</a>
        </nav>

        <nav className="min-w-[200px]">
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About BookSwap</a>
          <a className="link link-hover">Contact Support</a>
          <a className="link link-hover">Careers</a>
          <a className="link link-hover">Press</a>
        </nav>

        <nav className="min-w-[200px]">
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of Use</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Cookies</a>
        </nav>

        <form className="min-w-[250px]">
          <h6 className="footer-title">Newsletter</h6>
          <fieldset>
            <label className="label-text mb-2 block">Stay updated with BookSwap</label>
            <div className="join">
              <input
                type="email"
                placeholder="you@BookSwap.com"
                className="input input-bordered join-item"
              />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </div>

      <div className="mt-10 border-t border-gray-300 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} BookSwap Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

