// _services/globalApi.js
import { request, gql } from 'graphql-request';

const Master_Url = 'https://api-ap-south-1.hygraph.com/v2/clz7ybrxz06v007uzugsvjw5v/master';

const GetCategory = async () => {
  const query = gql`
    query Category {
      categories {
        id
        name
        bgColor {
          hex
        }
        icon {
          url
        }
      }
    }`;
  const result = await request(Master_Url, query);
  return result;
}

const GetBusinessList = async () => {
  const query = gql`
  query BusinessLists {
  businessLists {
    id
    email
    name
    image {
      url
    }
    address
    about
    category {
      name
    }
    contactPerson
  }
}`;
  const result = await request(Master_Url, query);
  return result;
}

const getBusinessByCategory = async (category) => {
  const query = gql`
  query searchBuisnesslist {
  businessLists(where: {category: {name: "`+ category + `"}}) {
    name
    image {
      url
    }
    category {
      name
    }
    address
    about
    email
    contactPerson
  }
}`;
  const result = await request(Master_Url, query);
  return result;
}

const GetBusinessById= async (id)=>{
  const query = gql`
  query GetBusinessById {
  businessLists(where: {id: "clza5ev5h03na07pje0i1en81"}) {
    name
    image {
      url
    }
    category {
      name
    }
    address
    about
    email
    contactPerson
  }
}`;
const result = await request(Master_Url, query);
return result;


}

export default { GetCategory, GetBusinessList, getBusinessByCategory,GetBusinessById };
