export const renderFilteredWebsites = (websites: any) => {
    // Define the categories you want to render
    const allowedCategories = [1, 2, 3];
  
    // Filter the websites based on allowed categories
    const filteredWebsites = websites.filter((website) =>
      allowedCategories.includes(website.category)
    );
  
    // Map over the filtered websites to render the links
    return filteredWebsites.map((website) => (
      <a key={website.url} href={website.url} target="_blank" rel="noopener noreferrer">
        {website.category === 1 ? 'Official Website' : website.category === 2 ? 'Community Wiki' : 'Wikipedia'}
      </a>
    ));
  };