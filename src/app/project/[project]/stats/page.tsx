import db from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const StatsPage = async ({ params }: { params: Promise<{ project: string }> }) => {
    const projectId = (await params).project
    const project = await db.projects.findFirst({
        where: { id: projectId },
        include: {
            Links: {
                include: {
                    scans: {
                        orderBy: { scannedAt: 'desc' }
                    },
                    _count: { select: { scans: true } }
                }
            }
        }
    })

    if (!project) {
        notFound()
    }

    const allScans = project.Links.flatMap(link =>
        link.scans.map(scan => ({ ...scan, urlIn: link.urlIn }))
    )

    const totalScans = allScans.length

    // Scans por dia
    const scansByDay: Record<string, number> = {}
    // Scans por hora do dia
    const scansByHour: Record<number, number> = {}
    // Scans por link
    const scansByLink: Record<string, number> = {}

    for (const scan of allScans) {
        const date = scan.scannedAt.toISOString().split('T')[0]
        scansByDay[date] = (scansByDay[date] || 0) + 1

        const hour = scan.scannedAt.getHours()
        scansByHour[hour] = (scansByHour[hour] || 0) + 1

        scansByLink[scan.urlIn] = (scansByLink[scan.urlIn] || 0) + 1
    }

    const sortedDays = Object.entries(scansByDay).sort(([a], [b]) => b.localeCompare(a))
    const maxDayCount = Math.max(...Object.values(scansByDay), 1)
    const maxHourCount = Math.max(...Object.values(scansByHour), 1)
    const sortedLinks = Object.entries(scansByLink).sort(([, a], [, b]) => b - a)

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-2xl">
                <div className="flex gap-5 items-center">
                    <Link href={`/project/${projectId}`}>
                        <ArrowLeft />
                    </Link>
                    <h1 className="text-2xl font-bold">{project.name} - Stats</h1>
                </div>

                <div className="text-4xl font-bold">
                    {totalScans} <span className="text-lg text-muted-foreground font-normal">scans no total</span>
                </div>

                {totalScans === 0 ? (
                    <p className="text-muted-foreground">Nenhum scan registrado ainda.</p>
                ) : (
                    <>
                        {/* Scans por dia */}
                        <section className="w-full">
                            <h2 className="text-lg font-semibold mb-3">Scans por dia</h2>
                            <div className="flex flex-col gap-2">
                                {sortedDays.map(([day, count]) => (
                                    <div key={day} className="flex items-center gap-3">
                                        <span className="text-sm text-muted-foreground w-24 shrink-0">{day}</span>
                                        <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                                            <div
                                                className="bg-foreground h-full rounded-full transition-all"
                                                style={{ width: `${(count / maxDayCount) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-sm font-medium w-10 text-right">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Scans por hora */}
                        <section className="w-full">
                            <h2 className="text-lg font-semibold mb-3">Scans por hora do dia</h2>
                            <div className="flex items-end gap-1 h-32">
                                {Array.from({ length: 24 }, (_, hour) => {
                                    const count = scansByHour[hour] || 0
                                    const height = count > 0 ? Math.max((count / maxHourCount) * 100, 8) : 2
                                    return (
                                        <div key={hour} className="flex-1 flex flex-col items-center gap-1">
                                            <span className="text-[10px] text-muted-foreground">
                                                {count > 0 ? count : ''}
                                            </span>
                                            <div
                                                className={`w-full rounded-t ${count > 0 ? 'bg-foreground' : 'bg-muted'}`}
                                                style={{ height: `${height}%` }}
                                            />
                                            <span className="text-[10px] text-muted-foreground">
                                                {hour.toString().padStart(2, '0')}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>

                        {/* Ranking de links */}
                        <section className="w-full">
                            <h2 className="text-lg font-semibold mb-3">Ranking de links</h2>
                            <div className="flex flex-col gap-2">
                                {sortedLinks.map(([urlIn, count], i) => (
                                    <div key={urlIn} className="flex items-center gap-3">
                                        <span className="text-sm text-muted-foreground w-6">{i + 1}.</span>
                                        <span className="text-sm flex-1 truncate">{urlIn}</span>
                                        <span className="text-sm font-medium">{count} scans</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                )}
            </main>
        </div>
    )
}

export default StatsPage
