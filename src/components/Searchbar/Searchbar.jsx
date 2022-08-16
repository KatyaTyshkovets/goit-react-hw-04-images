import PropTypes from 'prop-types';
import { MdOutlineImageSearch } from 'react-icons/md';
import { Formik } from 'formik';
import { Header, SearchForm, Button, Input } from './Searchbar.styled';





const Searchbar = ({onSubmit}) => {
 
  const handleSubmit = ({ q }, { resetForm }) => {
    
    onSubmit(q);
    resetForm();
  };
  
    return (
      <Header>
        <Formik initialValues={{ q: '' }} onSubmit={handleSubmit}>
          <SearchForm >
            <Button type="submit">
              <MdOutlineImageSearch size={30} />
            </Button>
            <Input
              name='q'
              type="text"
              placeholder="Search images and photos"
            />
          </SearchForm>
        </Formik>
      </Header>
        
    );
  }



Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default Searchbar
