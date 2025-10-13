import { useState, useRef, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlayCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const generateContent = (count = 12) => {
	return Array.from({ length: count }).map((_, index) => {
		const width = 400;
		const height = Math.floor(Math.random() * (500 - 200 + 1) + 200);
		return {
			id: Date.now() + index,
			title: `Content Title`,
			author: `User`,
			type: Math.random() > 0.7 ? 'video' : 'image',
			src: `https://picsum.photos/${width}/${height}?random=${Date.now() + index}`,
			width,
			height,
		}
	});
}

export default function Home() {
	const [tab, setTab] = useState('all');
	const [content, setContent] = useState(() => generateContent());
	const observerRef = useRef(null);

	const fetchMoreContent = useCallback(() => {
		const newContent = generateContent();
		setContent(prevContent => [...prevContent, ...newContent]);
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting) {
					fetchMoreContent();
				}
			},
			{ threshold: 1.0 }
		);

		const currentObserverRef = observerRef.current;

		if (currentObserverRef) {
			observer.observe(currentObserverRef);
		}

		return () => {
			if (currentObserverRef) {
				observer.unobserve(currentObserverRef);
			}
		};
	}, [fetchMoreContent, tab]);

	return (
		<Tabs value={tab} onValueChange={setTab} className="w-full">
			<TabsList>
				<TabsTrigger value="all">All</TabsTrigger>
				<TabsTrigger value="image">Pictures</TabsTrigger>
				<TabsTrigger value="video">Videos</TabsTrigger>
			</TabsList>
			<TabsContent value="all">
				<ContentGrid content={content} />
				{tab === 'all' && <div ref={observerRef} />}
			</TabsContent>
			<TabsContent value="image">
				<ContentGrid content={content.filter(item => item.type === 'image')} />
				{tab === 'image' && <div ref={observerRef} />}
			</TabsContent>
			<TabsContent value="video">
				<ContentGrid content={content.filter(item => item.type === 'video')} />
				{tab === 'video' && <div ref={observerRef} />}
			</TabsContent>
		</Tabs>
	);
}

function ContentGrid({ content }: { content: ReturnType<typeof generateContent> }) {
	return (
		<div className="columns-1 gap-2 sm:columns-2 md:columns-3 lg:columns-4 pt-4">
			{content.map((item) => (
				<ImageCard key={item.id} item={item} />
			))}
		</div>
	)
}

function ImageCard({ item }: { item: ReturnType<typeof generateContent>[0] }) {
	const [isLoaded, setIsLoaded] = useState(false);
	const aspectRatio = item.width / item.height;

	return (
		<Card className="group relative mb-2 break-inside-avoid overflow-hidden rounded-lg py-0 block gap-0" style={{ contentVisibility: 'auto' }}>
			<div style={{ aspectRatio: `${aspectRatio}` }} className="relative">
				<Skeleton className="h-full w-full" />
				<img
					alt={item.title}
					className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
					src={item.src}
					loading="lazy"
					onLoad={() => setIsLoaded(true)}
				/>
			</div>
			<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
				<div className="absolute bottom-0 left-0 p-4">
					<h3 className="text-lg font-semibold text-white">{item.title}</h3>
					<p className="text-sm text-white/80">By {item.author}</p>
				</div>
			</div>
			{item.type === 'video' && (
				<div className="absolute inset-0 flex items-center justify-center">
					<PlayCircle className="h-12 w-12 text-white opacity-0 transition-opacity group-hover:opacity-100" />
				</div>
			)}
		</Card>
	);
}
