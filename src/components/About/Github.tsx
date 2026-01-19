"use client";

import GitHubCalendar from "react-github-calendar";

export default function Github() {
    return (
        <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-8">
                Days I <strong className="purple">Code</strong>
            </h1>
            <div className="flex justify-center">
                <GitHubCalendar
                    username="karanagg166"
                    blockSize={15}
                    blockMargin={5}
                    fontSize={16}
                    colorScheme="dark"
                />
            </div>
        </div>
    );
}
