import { Component } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { ThreeDots} from 'react-loader-spinner';
import GlobalStyled from './Wrapper/Wrapper.styled';
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import * as API from './Services/Api';
import Modal from "./Modal";
import { Box } from './Wrapper/Container.styled';




export class App extends Component {
  state = {
    q: '',
    page: 1,
    items: [],
    totalHits: null,
    loading: false,
    isShowModal: false,
    lastPage: null,
  };

  async componentDidUpdate(_, prevState) {
    const { q, page } = this.state;
    if (prevState.q !== q || prevState.page !== page) {
      this.setState({ loading: true });
      try {
        if (q === '') {
          return this.setState({
            items: [],
            q: '',
          });
        }
        const { hits, totalHits } = await API.getImages({ q, page });
        if (totalHits || hits.length) {
          if (page === 1) {
            toast.success(`we found ${totalHits}images`);
          }
          if (page >= 1) {
            this.setState({
              totalHits: totalHits,
              lastPage: Math.ceil(totalHits / 12),
            });
          }
        }
        if (hits.length < 12) {
          toast.warning(`Sorry no more found images for "${q}"`);
        }
        this.setState({
          items: prevState.q !== q ? hits : [...prevState.items, ...hits],
        });
    } catch (error) {
      toast.error('Last page'); 
    } finally {
      this.setState({ loading: false });
    }
    
    }
  }

  formOnSumbit = values => {
    const { q } = this.state;
    if (values === q && values !== '') {
      toast.info("Please entry new name");
      return this.setState({
        items: [],
        q: '',
        page: 1,
        totalHits: null,
      });
    }
      if (values === '') {
        this.setState({
          items: [],
          q: '',
          page: 1,
        });
        toast.info('Please entry name!');
      }
     
    this.setState({
      page: 1,
      q: values,
    });
  };
  
   onToggleModal = e => {
    this.setState(({ isShowModal }) => ({
      isShowModal: !isShowModal,
    }));
    if (!this.state.isShowModal) {
      this.setState({
        largeImageURL: e.target.dataset.set,
        alt: e.target.alt,
      });
    }
  };
  
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }


  render() {
     const { items, isShowModal, largeImageURL, alt, loading, page, lastPage } =
      this.state;

    return (
      <GlobalStyled>
        <Searchbar onSubmit={this.formOnSumbit} />
        <Box>
          {loading && (<ThreeDots color="#00BFFF" height={60} width={60} />)}
           <ToastContainer
            autoClose={2000}
            theme='colored'
          />
          </Box>
         {items.length !== 0 && (
          <ImageGallery images={items} onClick={this.onToggleModal} />
        )}
        {isShowModal && (
          <Modal onClose={this.onToggleModal}>
            <img src={largeImageURL} alt={alt} />
          </Modal>
        )}
        {items.length >= 12 && page !== lastPage && (
          <Button onClick={this.loadMore}>Load more</Button>
        )}
       
      </GlobalStyled>
    );
  }
}
