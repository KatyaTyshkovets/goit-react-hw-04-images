import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { ThreeDots} from 'react-loader-spinner';
import GlobalStyled from './Wrapper/Wrapper.styled';
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import * as API from './Services/Api';
import Modal from "./Modal/Modal";
import { Box } from './Wrapper/Container.styled';
import { useState, useEffect } from "react";


export const App = () => {
  const [q, setQ] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [isShowModal, setIsShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [imageData, setImageData] = useState({url: null, alt: ''})

  useEffect(() => {
    const onFetch = async () => {
      if (q === '') {
        return;
      }
      if (q !== '' || page !== 1) {
        setLoading(true);
      }
      try {
        const { hits, totalHits } = await API.getImages({ q, page });

        if (page >= 1) {
          setTotal(totalHits);
          setLastPage(Math.ceil(total / 12));
          setItems(state => (page === 1 ? hits : [...state, ...hits]));
          if (page === 1) {
            toast.success(` We found ${totalHits} images.`);
          }
        }

        if (hits.length < 12) {
          toast(`Sorry no more found images for "${q}"`);
        }
      } catch (error) {
        toast.warning('Last page');
      } finally {
        setLoading(false);
      }
    };
    onFetch();
  }, [q, page, total]);

  const formOnSumbit = values => {
    if (values === q && values !== '') {
      toast.info('Please entry new name');
      setItems([]);
      setQ('');
      setPage(1);
      setTotal(null);
      return;
    }
    if (values === '') {
      setItems([]);
      setQ('');
      setPage(1);
      toast.info('Please entry name');
      return;
    }

    setQ(values);
    setPage(1);
  };

  const onToggleModal= (e) => {
  setIsShowModal(prevState => !isShowModal);
  if (!isShowModal) {
    setImageData({ url: e.target.dataset.set, alt: e.target.alt });
  };
};

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

    return (
      <GlobalStyled>
        <Searchbar onSubmit={formOnSumbit} />
        <Box>
          {loading && (<ThreeDots color="#00BFFF" height={60} width={60} />)}
           <ToastContainer
            autoClose={2000}
            theme='colored'
          />
          </Box>
         {items.length !== 0 && (
          <ImageGallery images={items} onClick={onToggleModal} />
        )}
          {items.length >= 12 && page !== lastPage && (
          <Button onClick={loadMore}>Load more</Button>
        )}
       {isShowModal && (
          <Modal onClose={onToggleModal}>
            <img src={imageData.url} alt={imageData.alt} />
          </Modal>
        )}
      </GlobalStyled>
    );
  }

