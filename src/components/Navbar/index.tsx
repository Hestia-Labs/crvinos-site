import Icon from "../Icons";

export default function Navbar() {
    return (
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-5 py-4 bg-transparent z-20">
        <Icon name={"CRVinos"} className="sm:h-20 sm:w-20 h-16 w-16" />
        <div className="flex space-x-4">
          <Icon name={"Facebook"} link="https://www.facebook.com/p/CR-VINOS-MX-100078033250234/" className="sm:h-12 sm:w-12 h-10 w-10" />
          <Icon name={"Instagram"} link="https://www.instagram.com/crvinosmx/" className="sm:h-12 sm:w-12 h-10 w-10" />
        </div>
      </nav>
    );
  }
