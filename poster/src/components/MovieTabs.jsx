import React from 'react'

class MovieTabs extends React.Component {
    // componentWillUpdate(nextProps,nextState) {
    //     console.log("WillReceiveProps")
    //     console.log("nextProps sort_by",nextProps.sort_by,nextProps.pages)
    //     console.log("prevState sort_by",this.props.sort_by,this.props.pages)
    // }

    // componentDidUpdate(prev) {
    //     if(prev.pages == 0) {
            
    // }
    
    // shouldComponentUpdate(nextProps,nextState) {
    //     if (nextProps.sort_by !== this.props.sort_by ){
    //         return true;
    //     }
    //     return false;
    // }

    render() {
        console.log("render MovieTabs",this,this.props.page,this.props.pages);
    const { sort_by,updateSortBy,pages,updatePages,total_pages } = this.props;
    // const handleClick = (value) => () => {
    //     updateSortBy(value);
    // }
    const handleClick = (value) => {
        // console.log(value)
        return () => {
            updateSortBy(value);
        }
    }

    const choicePage = (page) => {
        // console.log(page)
        return () => {
            updatePages(page);
        }
    }

    const PagePlus = (page) => {
        page++;
        return () => {
            updatePages(page);
        }
    }

    const PageMinus = (page) => {
        
        if(page<=total_pages && page>1){
            page--;
            return () => {
                updatePages(page);
            }
        }
    }

    // const getClassLink = (value) => {
    //     return ( `nav-link ${sort_by === value ? "active" : "" }` )
    // }

    return (
        <ul className="tabs nav nav-pills">
            <li className="nav-item">
                <div 
                    // className={getClassLink("popularity.desc")}
                    className={`nav-link ${sort_by === "popularity.desc" ? "active" : "" }`}
                    onClick={handleClick("popularity.desc")}
                > 
                    Popularity desc
                </div>
            </li>
            <li className="nav-item">
                <div 
                    className={`nav-link ${sort_by === "revenue.desc" ? "active" : "" }`}
                    onClick={handleClick("revenue.desc")}
                >
                    Revenue desc
                </div>
            </li>
            <li className="nav-item">
                <div 
                    className={`nav-link ${sort_by === "vote_average.desc" ? "active" : "" }`}
                    onClick={handleClick("vote_average.desc")}
                >
                    Vote average desc
                </div>
            </li>


            <div className="mt-3 row ml-1">
            <button
                className={`nav-link`}
                type="button"
                onClick={ PageMinus(pages) }
            >
                Back
            </button>
            <ul className="tabs nav nav-pills ml-1 mr-1">
                <li 
                    className={`nav-link ${pages === "1" ? "active" : "" }`} 
                    onClick={choicePage("1")}
                >1</li>
                <li 
                    className={`nav-link ${pages === "2" ? "active" : "" }`}
                    onClick={choicePage("2")}
                >2</li>
                <li 
                    className={`nav-link ${pages === "3" ? "active" : "" }`}
                    onClick={choicePage("3")}
                >3</li>
                                <li 
                    className={`nav-link ${pages === "4" ? "active" : "" }`}
                    onClick={choicePage("4")}
                >4</li>
                <li
                   className={`nav-link ${pages === "500" ? "active" : "" }`} // нужно указывать строчку для использования этого класса (конкретное число )
                   onClick={choicePage("500")}
                >
                    {total_pages}
                </li>
                    
            </ul>
            <button
            type="button"
            className={`nav-link`}
            onClick={PagePlus(pages)}
            >
            Go
            </button>

            </div>
        </ul>
    )
}
}

export default MovieTabs