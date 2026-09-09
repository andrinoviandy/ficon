import React, { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import routes from '../../../routes'
import Header from '../Header';
import Page404 from '../../../views/404'
import { setDimensionWidth } from '../../../redux/n2n/global';
import { getCookies, removeCookies } from "global/helper/cookie";
import { decodeData } from "global/helper/jwt";

const PageContent = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const mainContentRef = useRef(null);
    const { dimensionComponent, toggleSidebar } = useSelector(state => state.global);
    document.title = "KFCOLLS " + (location?.state?.menu?.name ? ("| " + location?.state?.menu?.name) : '') + (location?.state?.menu?.submenu?.name ? ` - ${location?.state?.menu?.submenu?.name}` : "");

    const [loginData, setLoginData] = useState({});
    const [listNotif, setListNotif] = useState([]);
    useEffect(() => {
        const get = async () => {
            // const decode = await decodeData(localStorage.getItem('loginData'));
            const decode = await decodeData(getCookies("loginData"));
            setLoginData(decode);
        };
        get();
    }, []);

    // Scroll back to top on new page load
    useEffect(() => {
        mainContentRef.current.scroll({
            top: 0,
            behavior: "smooth"
        });
    }, [])

    useEffect(() => {
        if (mainContentRef.current) {
            function handleResize() {
                dispatch(setDimensionWidth(mainContentRef.current.offsetWidth))
            };
            window.addEventListener('resize', handleResize);
            handleResize();
            return () => window.removeEventListener('resize', handleResize);
        };
    }, [dispatch, toggleSidebar]);

    const USERNAME = loginData?.USERNAME;

    return (
        <div className="drawer-content flex flex-col ">
            <Header toggleSidebar={toggleSidebar} listNotif={listNotif} />
            <main className="flex-1 overflow-y-auto pt-0 px-0" style={{ marginTop: dimensionComponent.height }} ref={mainContentRef}>
                {/* <Suspense fallback={<SuspenseContent />}> */}
                <Routes>
                    {
                        routes.map((route, key) => {
                            return (
                                <Route
                                    key={key}
                                    exact={true}
                                    path={`${route.path}`}
                                    element={<route.component setListNotif={setListNotif} />}
                                />
                            )
                        })
                    }

                    {/* Redirecting unknown url to 404 page */}
                    <Route path="*" element={<Page404 />} />
                </Routes>
                {/* </Suspense> */}
            </main>
        </div>
    )
}

export default PageContent