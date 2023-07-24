import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {AddFilterAC} from "../store/notes-reducer";
import React from "react";
import {useDispatch} from "react-redux";

type PropsType = {
    filter: string
    setFilter: (filter: string) => void
    tags: string[]
}

export const FilterForm = (props: PropsType) => {
    const {filter, setFilter, tags} = props

    const dispatch = useDispatch()

    const handleChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value as string);
    };

    return (
        <FormControl>
            <Select
                value={filter}
                label="filter"
                onChange={handleChange}
            >
                {tags.map(tag => {
                    const onFilterTagClick = () => {
                        dispatch(AddFilterAC(tags[tags.indexOf(tag)]))
                    }
                    return <MenuItem value={tag}
                                     key={tags.indexOf(tag)}
                                     onClick={onFilterTagClick}
                    >{tag}</MenuItem>
                })
                }
                <MenuItem value={'all'}>All</MenuItem>
            </Select>
        </FormControl>
    )
}