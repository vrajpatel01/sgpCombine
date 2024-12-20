'use client';
import { useState, useEffect } from 'react';

import * as React from 'react';
import { Input } from './input';
import { Button } from './button';
import { Badge } from './badge';
import { XIcon } from 'lucide-react';

const TagInput = React.forwardRef(({ className, form, ...props }, ref) => {
    let { value, name, disabled } = props;
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([...value]);

    const addTag = () => {
        if (tag.length === 0) return props.setError(name, { type: 'manual', message: 'Please enter tag to add' });
        if (tags.includes(tag.toLowerCase())) return props.setError(name, { type: 'manual', message: 'Tag already exists' });
        props.clearErrors(name);
        props.setValue(name, [...tags, tag.toLowerCase()]);
        setTags([...tags, tag.toLowerCase()]);
        value.push(tag);
        setTag('')
    }

    const removeTag = (i) => {
        props.setValue(name, value.filter((_, index) => index !== i));
        value.splice(i, 1);
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    }
    useEffect(() => {
        if (value.length !== tags.length) {
            setTags([...value])
        }
    }, [value, tags, tag])

    return (
        <div onKeyDown={handleEnter} className='space-y-2'>
            <div className='flex justify-center items-center gap-3'>
                <Input disabled={disabled} value={tag} placeholder={props.placeholder} onChange={(e) => setTag(e.target.value)} className={className} ref={ref} />
                {!disabled && <Button type="button" onClick={addTag} className="bg-secondary-foreground hover:bg-secondary-foreground/80" >Add</Button>}
            </div>
            {tags.length > 0 && <div className='flex gap-1 w-full flex-wrap'>
                {value.map((tag, i) => (
                    <Badge className='p-2 px-4 bg-secondary-foreground' key={i}>
                        <span>
                            {tag}
                        </span>
                        {!disabled &&
                            <XIcon className='w-4 h-4 ml-2 cursor-pointer' onClick={() => removeTag(i)} />}
                    </Badge>
                ))}
            </div>}
        </div>
    )
});

TagInput.displayName = 'TagInput';

export { TagInput }