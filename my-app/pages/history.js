import React from 'react';
import { useRouter } from 'next/router';
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { Card, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'
import styles from '@/styles/History.module.css';

export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();
    let parsedHistory = [];
    
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    // console.log(parsedHistory);

    function historyClicked(e,index) {
        e.preventDefault();
        const title = parsedHistory[index].title;
        const q = parsedHistory[index].q;
        let item = `title=${title}&q=${q}`;
        // router.push(`/artwork?${item}`);
        // console.log(title);
        // console.log(q);
    }

    function removedHistoryClicked(e,index) {
        e.stopPropagation();
        setSearchHistory(current => {
            let x = [...current];
            x.splice(index, 1);
            return x;
        });
    }

    return(
        <div>
            {parsedHistory.length > 0 ? (
                <ListGroup>
                    {parsedHistory.map((historyItem,index) => (
                        <ListGroup.Item className={styles.historyListItem} key={index} onClick={(event)=>{historyClicked(event,index)}}>
                            {Object.keys(historyItem).map((item,index) => (
                                <React.Fragment key={index}>
                                    {item}: <strong>{historyItem[item]}</strong>&nbsp;
                                </React.Fragment>
                            ))}
                            <Button 
                            className="float-end" 
                            variant="danger" 
                            size="sm" 
                            onClick={(e) => removedHistoryClicked(e, index)}>
                                    &times;
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : 
            (
                <Card>
                    <Card.Body>
                        <h4>Nothing Here</h4>
                        Try searching for some artwork.
                    </Card.Body>
                </Card>
            )}
        </div>
    )
}