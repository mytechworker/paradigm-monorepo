import { Menu } from 'antd';
import { NextRouter } from 'next/router';
import { useDispatch } from 'react-redux';

// // redux actions
// import { removeBookmarkedArticleByUser } from '@client/redux/article';
// import { addToExistingCollection, deleteCollectionByUser } from '@client/redux/collection';
// import { addBookmarkByUser, removeBookmarkByUser } from '@client/redux/features/articleSlice';
// import { addFollowing, removeFollowing } from '@client/redux/following/index';
// import { addBookmarkCategory, removeBookmarkCategory } from '@client/redux/followingCategory/index';

// mock functions
const removeBookmarkedArticleByUser = (data: any, data1: any) => {};
const addToExistingCollection = (data: any) => {};
const deleteCollectionByUser = (data: any, data1: any) => {};
const addBookmarkByUser = (data: any) => {};
const removeBookmarkByUser = (data: any) => {};
const addFollowing = (data: any) => {};
const removeFollowing = (data: any) => {};
const addBookmarkCategory = (data: any) => {};
const removeBookmarkCategory = (data: any) => {};

// Buttons
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

// Icons
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

// icons
import {
  AddToExistingCollectionIcon,
  AddToNewCollectionIcon,
  DeleteCollectionIcon,
  EditCollectionIcon,
  ShareCollectionIcon,
  ShareMenuIcon,
} from '@client/components/icons/CollectionIcon';
import ArticleIcon from '../components/icons/ArticleIcon';
import BookmarkIcon from '../components/icons/BookmarkIcon';

// all aricles menu
export const useArticleMenu = (
  bookmark: any,
  collection: any,
  userId: any,
  handleAddToNewCollection: any,
  currentActivePage: any,
  setCount: Function,
) => {
  const dispatch: any = useDispatch();

  // remove article from user bookmark
  const handleRemoveBookmark = async (articleId: any, userId: any, setVisible: (visible: boolean) => void) => {
    if (userId && articleId) {
      const response = await dispatch(
        removeBookmarkByUser({
          user_id: userId,
          article_id: articleId,
        }),
      );
      if (response) {
        dispatch(removeBookmarkedArticleByUser(articleId, response?.data?.totalLength));
      }
      setCount(currentActivePage - 1);
    }
    setVisible(false);
  };
  // add article to user bookmark
  const handleAddBookmark = (articleId: any, userId: any, setVisible: (visible: boolean) => void) => {
    if (userId && articleId) {
      dispatch(addBookmarkByUser({ user_id: userId, article_id: articleId }));
    }
    setVisible(false);
  };
  // add article to existing collection
  const handleAddToExistingCollection = (cid: any, aid: any, setVisible: (visible: boolean) => void) => {
    const data = { collection_id: cid, article_id: aid };
    dispatch(addToExistingCollection(data));
    setVisible(false);
  };

  const handleEditArticleAdmin = (e: any, id: any, setVisible: (visible: boolean) => void) => {
    const href = `/admin/articleData/edit/${id}`;
    window.open(href, '_blank');
    setVisible(false);
  };

  // article page url to bind it with social media menus
  // const url = process.env.BASE_URL?.concat(Router.asPath)!;

  const articleMenu = (id: any, auth: any, router: NextRouter, setVisible: (visible: boolean) => void) => (
    <Menu>
      {auth && auth?.authenticated && auth?.role === 'admin' ? (
        <Menu.Item onClick={(e: any) => handleEditArticleAdmin(e, id, setVisible)}>
          <ArticleIcon width="16" height="16" />
          Edit Article
        </Menu.Item>
      ) : (
        ''
      )}
      {auth.role !== 'admin' &&
        (bookmark && bookmark.some(({ article_id }: any) => article_id === id)
          ? auth?.authenticated && (
              <Menu.Item onClick={() => handleRemoveBookmark(id, userId, setVisible)}>
                <BookmarkIcon fill="transparent" className="remove" />
                Remove Bookmark
              </Menu.Item>
            )
          : auth?.authenticated && (
              <Menu.Item onClick={() => handleAddBookmark(id, userId, setVisible)}>
                <BookmarkIcon fill="#000" className="add" />
                Add Bookmark
              </Menu.Item>
            ))}

      {auth.role !== 'admin' && collection && auth?.authenticated && (
        <Menu.SubMenu
          title={
            <span>
              <AddToExistingCollectionIcon width="14" />
              Add to existing collection
            </span>
          }
        >
          {collection &&
            collection
              .map((item: any) => {
                return (
                  !item.articles_id.some((bid: any) => bid == id) && (
                    <Menu.Item
                      style={{ textTransform: 'capitalize' }}
                      key={item.id}
                      onClick={() => handleAddToExistingCollection(item.id, id, setVisible)}
                    >
                      {item.title}
                    </Menu.Item>
                  )
                );
              })
              .reverse()}
        </Menu.SubMenu>
      )}
      {auth.role !== 'admin' && auth?.authenticated && (
        <Menu.Item
          onClick={() => {
            handleAddToNewCollection(id);
            setVisible(false);
          }}
        >
          <AddToNewCollectionIcon />
          Add to new collection
        </Menu.Item>
      )}
      {router?.query?.pageType && (
        <Menu.SubMenu
          title={
            <span>
              <ShareMenuIcon />
              Share this article
            </span>
          }
        >
          <Menu.Item className="share-menu">
            <WhatsappShareButton url={process.env.BASE_URL?.concat(router.asPath)!}>
              <span className="share-menu-tabs">
                <WhatsappIcon size={20} round={true} />
                <p>Whatsapp</p>
              </span>
            </WhatsappShareButton>
          </Menu.Item>
          <Menu.Item className="share-menu">
            <FacebookShareButton url={process.env.BASE_URL?.concat(router.asPath)!}>
              <span className="share-menu-tabs">
                <FacebookIcon size={20} round={true} />
                <p>Facebook</p>
              </span>
            </FacebookShareButton>
          </Menu.Item>
          <Menu.Item className="share-menu">
            <TelegramShareButton url={process.env.BASE_URL?.concat(router.asPath)!}>
              <span className="share-menu-tabs">
                <TelegramIcon size={20} round={true} />
                <p>Telegram</p>
              </span>
            </TelegramShareButton>
          </Menu.Item>
          <Menu.Item className="share-menu">
            <LinkedinShareButton url={process.env.BASE_URL?.concat(router.asPath)!}>
              <span className="share-menu-tabs">
                <LinkedinIcon size={20} round={true} />
                <p>Linkedin</p>
              </span>
            </LinkedinShareButton>
          </Menu.Item>
          <Menu.Item className="share-menu">
            <EmailShareButton url={process.env.BASE_URL?.concat(router.asPath)!}>
              <span className="share-menu-tabs">
                <EmailIcon size={20} round={true} />
                <p>Email</p>
              </span>
            </EmailShareButton>
          </Menu.Item>
          <Menu.Item className="share-menu">
            <RedditShareButton url={process.env.BASE_URL?.concat(router.asPath)!}>
              <span className="share-menu-tabs">
                <RedditIcon size={20} round={true} />
                <p>Reddit</p>
              </span>
            </RedditShareButton>
          </Menu.Item>
          <Menu.Item className="share-menu">
            <TwitterShareButton url={process.env.BASE_URL?.concat(router.asPath)!}>
              <span className="share-menu-tabs">
                <TwitterIcon size={20} round={true} />
                <p>Twitter</p>
              </span>
            </TwitterShareButton>
          </Menu.Item>
        </Menu.SubMenu>
      )}
    </Menu>
  );
  return { articleMenu };
};

// collection articles menu
export const useCollectionMenu = (
  auth: any,
  onEditCollection: any,
  handleShareModalOpen: any,
  setCount: Function,
  currentActivePage: any,
) => {
  const dispatch: any = useDispatch();
  // delete collection
  const handleDeleteCollection = (cid: any) => {
    if (cid) {
      if (window.confirm('Are you Sure ?')) {
        if (!auth.profileId) return;

        dispatch(deleteCollectionByUser(cid, auth.profileId))
          .then(() => {
            setCount(currentActivePage - 1);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  // collection menu
  const collectionMenu = (item: any, setVisible: (visible: boolean) => void) => (
    <Menu>
      <Menu.Item
        onClick={() => {
          setVisible(false);
          onEditCollection(item);
        }}
      >
        <EditCollectionIcon width="14" />
        Edit Collection
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setVisible(false);
          handleDeleteCollection(item.id ? item.id : item._id);
        }}
      >
        <DeleteCollectionIcon width="14" />
        Delete Collection
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setVisible(false);
          handleShareModalOpen(`${process.env.BASE_URL}/collections/${item.id}`);
        }}
      >
        <ShareCollectionIcon width="14" />
        Share Collection
      </Menu.Item>
    </Menu>
  );
  return { collectionMenu };
};

// company menu
export const useCompanyMenu = (logedInUserId: any, userFollowingCompany: any) => {
  const dispatch: any = useDispatch();

  // handle Unfollow
  const handleUnfollow = (companyId: any, uid: any) => {
    dispatch(removeFollowing({ user_id: uid, company_id: companyId }));
  };

  // handle follow
  const handleFollow = (companyId: any, uid: any) => {
    dispatch(addFollowing({ user_id: uid, company_id: companyId }));
  };

  // follo unfollow menu
  const companyMenu = (item: any) => {
    return (
      <Menu>
        {userFollowingCompany?.some((company: any) => company?.companyId == item?._id) ? (
          <Menu.Item onClick={() => handleUnfollow(item?._id, logedInUserId)}>
            <BookmarkIcon fill="transparent" className="remove" />
            Remove Bookmark
          </Menu.Item>
        ) : (
          <Menu.Item onClick={() => handleFollow(item?._id, logedInUserId)}>
            <BookmarkIcon fill="#000" className="add" />
            Add Bookmark
          </Menu.Item>
        )}
      </Menu>
    );
  };

  return { companyMenu };
};

// category menu
export const useCategoryMenu = (
  logInUserId: any,
  followingCategory: any,
  currentActivePage: any,
  setCount: Function,
) => {
  const dispatch: any = useDispatch();

  const handleAddBookmarkCategory = (categoryId: any, uid: any, setVisible: any) => {
    if (categoryId && uid) {
      dispatch(
        addBookmarkCategory({
          logInUserId: uid,
          categoryId: categoryId,
        }),
      );
    }
    setVisible(false);
  };
  const handleRemoveBookmarkCategory = (categoryId: any, uid: any, setVisible: any) => {
    if (categoryId && uid) {
      dispatch(
        removeBookmarkCategory({
          logInUserId: uid,
          categoryId: categoryId,
        }),
      );
      setCount(currentActivePage - 1);
    }
    setVisible(false);
  };

  // category menu
  const categoryMenu = (item: any, setVisible: any) => {
    return (
      <Menu>
        {followingCategory?.some((category: any) => category?.categoryId == item?._id) ? (
          <Menu.Item onClick={() => handleRemoveBookmarkCategory(item?._id, logInUserId, setVisible)}>
            <BookmarkIcon fill="transparent" className="remove" />
            Remove Bookmark
          </Menu.Item>
        ) : (
          <Menu.Item onClick={() => handleAddBookmarkCategory(item?._id, logInUserId, setVisible)}>
            <BookmarkIcon fill="#000" className="add" />
            Add Bookmark
          </Menu.Item>
        )}
      </Menu>
    );
  };

  return { categoryMenu };
};
