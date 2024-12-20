import parser from 'html-react-parser';

export default function WorkDataViewer({ name, workDone, email }) {
    if (typeof workDone !== 'string') return null;
    return (<div>
        <div className="space-y-1 mb-2">
            <p className="text-body-18 capitalize max-w-min whitespace-nowrap px-3">{name}</p>
            {email &&
                <p className="text-body-18 max-w-min whitespace-nowrap px-3 text-xs text-gray-600">{email}</p>}
        </div>
        <div className="bg-white p-4 rounded-md border-[.5px] border-border">
            {parser(workDone)}
        </div>
    </div>);
}